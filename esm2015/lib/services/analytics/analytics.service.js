/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { environment } from '../../environment/environment';
import * as uuid from 'uuid';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { EventLabels } from '../../types/event.types';
import * as i0 from "@angular/core";
import * as i1 from "ngx-cookie-service";
import * as i2 from "@angular/common/http";
/**
 * Analytics Service
 */
export class AnalyticsService {
    /**
     * @param {?} cookieService
     * @param {?} httpService
     */
    constructor(cookieService, httpService) {
        this.cookieService = cookieService;
        this.httpService = httpService;
        this.demographicInfo = {};
        this.eventLabels = EventLabels;
        if (!this.cookieService.check('demographic-info')) {
            this.getIp();
        }
        else {
            this.demographicInfo = JSON.parse(this.cookieService.get('demographic-info'));
        }
        this.setSessionId();
    }
    /**
     * Checking whether sessionId present in cookie or not
     * if no session id cookie present, adding new session id otherwise reusing the session id value
     * @private
     * @return {?}
     */
    setSessionId() {
        if (sessionStorage.getItem('ngS3AnalyticsSessionId')) {
            this.sessionId = sessionStorage.getItem('ngS3AnalyticsSessionId');
        }
        else {
            this.sessionId = uuid.v4();
            sessionStorage.setItem('ngS3AnalyticsSessionId', this.sessionId);
        }
    }
    /**
     * Pushing Analytics data to different bucket based on Authentication flag
     * @param {?} data
     * @return {?}
     */
    pushData(data) {
        if (environment.isAuth) {
            this.publishTOAuthS3(data);
        }
        else {
            this.publishTOUnAuthS3(data);
        }
    }
    /**
     * Pushing data to UnAuthenticated Bucket S3
     * @private
     * @param {?} data
     * @return {?}
     */
    publishTOUnAuthS3(data) {
        /**
         * Construct S3 Bucket object
         * @type {?}
         */
        const s3Bucket = this.constructS3Object();
        /**
         * Setting the params for s3
         * @type {?}
         */
        const params = {
            Bucket: environment.bucketName.publicBucket,
            // tslint:disable-next-line: max-line-length
            Key: `${new Date().toISOString().split('T')[0]}_${this.sessionId}_${new Date().toISOString()}.json`,
            Body: this.processForAthena(data.eventValues),
            ContentType: 'json'
        };
        /*** Pushing the data to s3 */
        s3Bucket.putObject(params, (/**
         * @param {?} err
         * @param {?} resData
         * @return {?}
         */
        (err, resData) => {
            if (err) {
                console.error(err);
            }
        }));
    }
    /**
     * Converting JSON Array to string
     * @param {?} data
     * @return {?}
     */
    processForAthena(data) {
        return data.map((/**
         * @param {?} object
         * @return {?}
         */
        (object) => {
            object['sessionId'] = this.sessionId;
            return JSON.stringify(object);
        })).join('\n');
    }
    /**
     * Pushing data to Authenticated Bucket S3
     * @param {?} data
     * @return {?}
     */
    publishTOAuthS3(data) {
        /**
         * Construct S3 Bucket object
         * @type {?}
         */
        const s3Bucket = this.constructS3Object();
        /**
         * Setting the params for s3
         * @type {?}
         */
        const params = {
            Bucket: environment.bucketName.authenticatedBucket,
            Key: `${new Date().toISOString().split('T')[0]}_${this.sessionId}_${new Date().toISOString()}.json`,
            Body: this.processForAthena(data.eventValues),
            ContentType: 'json'
        };
        /*** Pushing the data to s3 */
        s3Bucket.putObject(params, (/**
         * @param {?} err
         * @param {?} resData
         * @return {?}
         */
        (err, resData) => {
            if (err) {
                console.error('error', err);
            }
        }));
    }
    /**
     * Construct S3 Object using AWS SDK
     * @private
     * @return {?}
     */
    constructS3Object() {
        return new AWS.S3({
            accessKeyId: environment.accessKeyId,
            secretAccessKey: environment.secretAccessKey,
            region: environment.region
        });
    }
    /**
     * Uploading captured base64 image to S3
     * @param {?} htmlTemplate
     * @param {?} screenshotName - Screenshot name linked with pageLoaded data
     * @return {?}
     */
    saveScreenshotsInS3(htmlTemplate, screenshotName) {
        // constructing the S3 object
        /** @type {?} */
        const s3Bucket = this.constructS3Object();
        // preparing data to be pushed to bucket
        /** @type {?} */
        const params = {
            Bucket: environment.bucketName.screenshotBucket,
            Key: `${new Date().toISOString().split('T')[0]}/${this.sessionId}/screenshots/${screenshotName}.html`,
            Body: htmlTemplate,
            ContentType: 'text/html'
        };
        /** Pushing to S3 bucket */
        s3Bucket.upload(params, (/**
         * @param {?} err
         * @param {?} resData
         * @return {?}
         */
        (err, resData) => {
            if (err) {
                console.error(err);
            }
        }));
    }
    /**
     * Pushing console errors to S3 bucket
     * @param {?} data
     * @return {?}
     */
    publishConsoleErrors(data) {
        // Configuring the s3
        /** @type {?} */
        const s3Bucket = this.constructS3Object();
        data['sessionId'] = this.sessionId;
        // Setting the params for s3
        /** @type {?} */
        const params = {
            Bucket: environment.bucketName.authenticatedBucket,
            Key: `${new Date().toISOString().split('T')[0]}_${this.sessionId}_console_errors_${new Date().getTime()}.json`,
            Body: JSON.stringify(data),
            ContentType: 'json'
        };
        // Pushing the data to s3
        s3Bucket.putObject(params, (/**
         * @param {?} err
         * @param {?} resData
         * @return {?}
         */
        (err, resData) => {
            if (err) {
                console.error(err);
            }
        }));
    }
    /**
     * Setting analytics object to be saved in S3 bucket
     * @param {?=} userData - Data transferred to Event Directive
     * @param {?=} eventDetails - Position of events
     * @param {?=} eventName  - Type of event
     * @param {?=} screenshotName  - file name of saved screenshot if the event is PageLoaded
     * @param {?=} eventComponent
     * @return {?}
     */
    setAnalyticsData(userData = {}, eventDetails, eventName, screenshotName, eventComponent) {
        /** @type {?} */
        const analyticsBean = {
            eventLabel: eventName,
            eventComponent: eventComponent ? eventComponent : window.location.pathname.split('?')[0],
            browser: window.navigator.userAgent,
            fullURL: window.location.href,
            resolution: window.innerWidth + 'x' + window.innerHeight,
            xCoord: eventDetails['clientX'] !== undefined ? eventDetails['clientX'].toString() : '0' || '0',
            yCoord: eventDetails['clientY'] !== undefined ? eventDetails['clientY'].toString() : '0' || '0',
            pageXCoord: window.pageXOffset.toString() || '0',
            pageYCoord: window.pageYOffset.toString() || '0',
            eventTime: new Date().toISOString(),
            screenshot: screenshotName,
            additionalInfo: JSON.stringify(userData),
            utm: this.getUTMParameters(window.location.href),
            demographicInfo: this.demographicInfo,
            htmlElement: eventDetails['target'] ? eventDetails['target']['innerHTML'] : ''
        };
        return analyticsBean;
    }
    /**
     * Getting UTM Parameters by processing current pageURL
     * @private
     * @param {?} url - Page URL
     * @return {?}
     */
    getUTMParameters(url) {
        /** @type {?} */
        const utmObject = {};
        if (url.includes('utm')) {
            /** @type {?} */
            const utmParams = url.split('?')[1].split('&');
            utmParams.map((/**
             * @param {?} param
             * @return {?}
             */
            param => {
                /** @type {?} */
                const params = param.split('=');
                utmObject[params[0]] = params[1];
            }));
        }
        return utmObject;
    }
    /**
     * Set user demographic information in cookies
     * @private
     * @return {?}
     */
    getIp() {
        this.httpService.get('https://ipapi.co/json/').subscribe((/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            this.demographicInfo = res;
            this.cookieService.set('demographic-info', JSON.stringify(res), new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 7)));
        }));
    }
}
AnalyticsService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
AnalyticsService.ctorParameters = () => [
    { type: CookieService },
    { type: HttpClient }
];
/** @nocollapse */ AnalyticsService.ngInjectableDef = i0.defineInjectable({ factory: function AnalyticsService_Factory() { return new AnalyticsService(i0.inject(i1.CookieService), i0.inject(i2.HttpClient)); }, token: AnalyticsService, providedIn: "root" });
if (false) {
    /**
     * SessionId of plugin
     * @type {?}
     */
    AnalyticsService.prototype.sessionId;
    /** @type {?} */
    AnalyticsService.prototype.demographicInfo;
    /** @type {?} */
    AnalyticsService.prototype.eventLabels;
    /**
     * @type {?}
     * @private
     */
    AnalyticsService.prototype.cookieService;
    /**
     * @type {?}
     * @private
     */
    AnalyticsService.prototype.httpService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sS0FBSyxHQUFHLE1BQU0sU0FBUyxDQUFDO0FBQy9CLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEtBQUssSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUU3QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7OztBQU90RCxNQUFNOzs7OztJQVFKLFlBQW9CLGFBQTRCLEVBQVUsV0FBdUI7UUFBN0Qsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUZqRixvQkFBZSxHQUFRLEVBQUUsQ0FBQztRQUMxQixnQkFBVyxHQUFHLFdBQVcsQ0FBQztRQUV4QixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsRUFBRTtZQUNqRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDZDthQUFNO1lBQ0wsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztTQUMvRTtRQUNELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7Ozs7O0lBTU8sWUFBWTtRQUNsQixJQUFJLGNBQWMsQ0FB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Q0FBQzs7Ozs7O0lBS08sS0FBSztRQUNYLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUMsU0FBUzs7OztRQUN0RCxDQUFDLEdBQVEsRUFBRSxFQUFFO1lBQ1gsSUFBSSxDQUFDLGVBQWUsR0FBRyxHQUFHLENBQUM7WUFDM0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5SCxDQUFDLEVBQ0YsQ0FBQztJQUNKLENBQUM7OztZQW5PRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7OztZQVJRLGFBQWE7WUFDYixVQUFVOzs7Ozs7OztJQWFqQixxQ0FBa0I7O0lBQ2xCLDJDQUEwQjs7SUFDMUIsdUNBQTBCOzs7OztJQUNkLHlDQUFvQzs7Ozs7SUFBRSx1Q0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBBV1MgZnJvbSAnYXdzLXNkayc7XG5pbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gJy4uLy4uL2Vudmlyb25tZW50L2Vudmlyb25tZW50JztcbmltcG9ydCAqIGFzIHV1aWQgZnJvbSAndXVpZCc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgQ29va2llU2VydmljZSB9IGZyb20gJ25neC1jb29raWUtc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgRXZlbnRMYWJlbHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG4vKipcbiAqIEFuYWx5dGljcyBTZXJ2aWNlXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEFuYWx5dGljc1NlcnZpY2Uge1xuXG4gIC8qKlxuICAgKiBTZXNzaW9uSWQgb2YgcGx1Z2luXG4gICAqL1xuICBzZXNzaW9uSWQ6IHN0cmluZztcbiAgZGVtb2dyYXBoaWNJbmZvOiBhbnkgPSB7fTtcbiAgZXZlbnRMYWJlbHMgPSBFdmVudExhYmVscztcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb29raWVTZXJ2aWNlOiBDb29raWVTZXJ2aWNlLCBwcml2YXRlIGh0dHBTZXJ2aWNlOiBIdHRwQ2xpZW50KSB7XG4gICAgaWYgKCF0aGlzLmNvb2tpZVNlcnZpY2UuY2hlY2soJ2RlbW9ncmFwaGljLWluZm8nKSkge1xuICAgICAgdGhpcy5nZXRJcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRlbW9ncmFwaGljSW5mbyA9IEpTT04ucGFyc2UodGhpcy5jb29raWVTZXJ2aWNlLmdldCgnZGVtb2dyYXBoaWMtaW5mbycpKTtcbiAgICB9XG4gICAgdGhpcy5zZXRTZXNzaW9uSWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja2luZyB3aGV0aGVyIHNlc3Npb25JZCBwcmVzZW50IGluIGNvb2tpZSBvciBub3RcbiAgICogaWYgbm8gc2Vzc2lvbiBpZCBjb29raWUgcHJlc2VudCwgYWRkaW5nIG5ldyBzZXNzaW9uIGlkIG90aGVyd2lzZSByZXVzaW5nIHRoZSBzZXNzaW9uIGlkIHZhbHVlXG4gICAqL1xuICBwcml2YXRlIHNldFNlc3Npb25JZCgpOiB2b2lkIHtcbiAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnbmdTM0FuYWx5dGljc1Nlc3Npb25JZCcpKSB7XG4gICAgICB0aGlzLnNlc3Npb25JZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ25nUzNBbmFseXRpY3NTZXNzaW9uSWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXNzaW9uSWQgPSB1dWlkLnY0KCk7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCduZ1MzQW5hbHl0aWNzU2Vzc2lvbklkJywgdGhpcy5zZXNzaW9uSWQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQdXNoaW5nIEFuYWx5dGljcyBkYXRhIHRvIGRpZmZlcmVudCBidWNrZXQgYmFzZWQgb24gQXV0aGVudGljYXRpb24gZmxhZ1xuICAgKiBAcGFyYW0gZGF0YSBcbiAgICovXG4gIHB1YmxpYyBwdXNoRGF0YShkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoZW52aXJvbm1lbnQuaXNBdXRoKSB7XG4gICAgICB0aGlzLnB1Ymxpc2hUT0F1dGhTMyhkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wdWJsaXNoVE9VbkF1dGhTMyhkYXRhKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHVzaGluZyBkYXRhIHRvIFVuQXV0aGVudGljYXRlZCBCdWNrZXQgUzNcbiAgICogQHBhcmFtIGRhdGEgXG4gICAqL1xuICBwcml2YXRlIHB1Ymxpc2hUT1VuQXV0aFMzKGRhdGE6IGFueSk6IHZvaWQge1xuXG4gICAgLyoqKiBDb25zdHJ1Y3QgUzMgQnVja2V0IG9iamVjdCAqL1xuICAgIGNvbnN0IHMzQnVja2V0OiBBV1MuUzMgPSB0aGlzLmNvbnN0cnVjdFMzT2JqZWN0KCk7XG5cbiAgICAvKioqIFNldHRpbmcgdGhlIHBhcmFtcyBmb3IgczMgKi9cbiAgICBjb25zdCBwYXJhbXM6IHsgQnVja2V0OiBzdHJpbmcsIEtleTogc3RyaW5nLCBCb2R5OiBzdHJpbmcsIENvbnRlbnRUeXBlOiBzdHJpbmcgfSA9IHtcbiAgICAgIEJ1Y2tldDogZW52aXJvbm1lbnQuYnVja2V0TmFtZS5wdWJsaWNCdWNrZXQsXG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG1heC1saW5lLWxlbmd0aFxuICAgICAgS2V5OiBgJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXX1fJHt0aGlzLnNlc3Npb25JZH1fJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCl9Lmpzb25gLFxuICAgICAgQm9keTogdGhpcy5wcm9jZXNzRm9yQXRoZW5hKGRhdGEuZXZlbnRWYWx1ZXMpLFxuICAgICAgQ29udGVudFR5cGU6ICdqc29uJ1xuICAgIH07XG4gICAgLyoqKiBQdXNoaW5nIHRoZSBkYXRhIHRvIHMzICovXG4gICAgczNCdWNrZXQucHV0T2JqZWN0KHBhcmFtcywgKGVycjogQVdTLkFXU0Vycm9yLCByZXNEYXRhOiBhbnkpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRpbmcgSlNPTiBBcnJheSB0byBzdHJpbmcgXG4gICAqIEBwYXJhbSBkYXRhIFxuICAgKi9cbiAgcHJvY2Vzc0ZvckF0aGVuYShkYXRhOiBBcnJheTxBbmFseXRpY3NCZWFuPik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGRhdGEubWFwKChvYmplY3Q6IGFueSkgPT4ge1xuICAgICAgb2JqZWN0WydzZXNzaW9uSWQnXSA9IHRoaXMuc2Vzc2lvbklkO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iamVjdCk7XG4gICAgfSkuam9pbignXFxuJyk7XG4gIH1cblxuICAvKipcbiAgICAqIFB1c2hpbmcgZGF0YSB0byBBdXRoZW50aWNhdGVkIEJ1Y2tldCBTM1xuICAgICogQHBhcmFtIGRhdGEgXG4gICAgKi9cbiAgcHVibGlzaFRPQXV0aFMzKGRhdGE6IGFueSkge1xuXG4gICAgLyoqKiBDb25zdHJ1Y3QgUzMgQnVja2V0IG9iamVjdCAqL1xuICAgIGNvbnN0IHMzQnVja2V0OiBBV1MuUzMgPSB0aGlzLmNvbnN0cnVjdFMzT2JqZWN0KCk7XG4gICAgLyoqKiBTZXR0aW5nIHRoZSBwYXJhbXMgZm9yIHMzICovXG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgQnVja2V0OiBlbnZpcm9ubWVudC5idWNrZXROYW1lLmF1dGhlbnRpY2F0ZWRCdWNrZXQsXG4gICAgICBLZXk6IGAke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdfV8ke3RoaXMuc2Vzc2lvbklkfV8ke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKX0uanNvbmAsXG4gICAgICBCb2R5OiB0aGlzLnByb2Nlc3NGb3JBdGhlbmEoZGF0YS5ldmVudFZhbHVlcyksXG4gICAgICBDb250ZW50VHlwZTogJ2pzb24nXG4gICAgfTtcbiAgICAvKioqIFB1c2hpbmcgdGhlIGRhdGEgdG8gczMgKi9cbiAgICBzM0J1Y2tldC5wdXRPYmplY3QocGFyYW1zLCAoZXJyOiBBV1MuQVdTRXJyb3IsIHJlc0RhdGE6IGFueSkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdlcnJvcicsIGVycik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgfVxuXG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBTMyBPYmplY3QgdXNpbmcgQVdTIFNES1xuICAgKi9cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RTM09iamVjdCgpOiBBV1MuUzMge1xuICAgIHJldHVybiBuZXcgQVdTLlMzKHtcbiAgICAgIGFjY2Vzc0tleUlkOiBlbnZpcm9ubWVudC5hY2Nlc3NLZXlJZCxcbiAgICAgIHNlY3JldEFjY2Vzc0tleTogZW52aXJvbm1lbnQuc2VjcmV0QWNjZXNzS2V5LFxuICAgICAgcmVnaW9uOiBlbnZpcm9ubWVudC5yZWdpb25cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGxvYWRpbmcgY2FwdHVyZWQgYmFzZTY0IGltYWdlIHRvIFMzXG4gICAqIEBwYXJhbSBpbWFnZSAtIEJhc2U2NCBTdHJpbmdcbiAgICogQHBhcmFtIHNjcmVlbnNob3ROYW1lIC0gU2NyZWVuc2hvdCBuYW1lIGxpbmtlZCB3aXRoIHBhZ2VMb2FkZWQgZGF0YVxuICAgKi9cbiAgcHVibGljIHNhdmVTY3JlZW5zaG90c0luUzMoaHRtbFRlbXBsYXRlOiBzdHJpbmcsIHNjcmVlbnNob3ROYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAvLyBjb25zdHJ1Y3RpbmcgdGhlIFMzIG9iamVjdFxuICAgIGNvbnN0IHMzQnVja2V0OiBBV1MuUzMgPSB0aGlzLmNvbnN0cnVjdFMzT2JqZWN0KCk7XG4gICAgLy8gcHJlcGFyaW5nIGRhdGEgdG8gYmUgcHVzaGVkIHRvIGJ1Y2tldFxuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIEJ1Y2tldDogZW52aXJvbm1lbnQuYnVja2V0TmFtZS5zY3JlZW5zaG90QnVja2V0LFxuICAgICAgS2V5OiBgJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXX0vJHt0aGlzLnNlc3Npb25JZH0vc2NyZWVuc2hvdHMvJHtzY3JlZW5zaG90TmFtZX0uaHRtbGAsXG4gICAgICBCb2R5OiBodG1sVGVtcGxhdGUsXG4gICAgICBDb250ZW50VHlwZTogJ3RleHQvaHRtbCdcbiAgICB9O1xuXG4gICAgLyoqIFB1c2hpbmcgdG8gUzMgYnVja2V0ICovXG4gICAgczNCdWNrZXQudXBsb2FkKHBhcmFtcywgKGVycjogQVdTLkFXU0Vycm9yLCByZXNEYXRhOiBhbnkpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFB1c2hpbmcgY29uc29sZSBlcnJvcnMgdG8gUzMgYnVja2V0XG4gICAqIEBwYXJhbSBkYXRhIFxuICAgKi9cbiAgcHVibGljIHB1Ymxpc2hDb25zb2xlRXJyb3JzKGRhdGE6IGFueSk6IHZvaWQge1xuXG4gICAgLy8gQ29uZmlndXJpbmcgdGhlIHMzXG4gICAgY29uc3QgczNCdWNrZXQ6IEFXUy5TMyA9IHRoaXMuY29uc3RydWN0UzNPYmplY3QoKTtcbiAgICBkYXRhWydzZXNzaW9uSWQnXSA9IHRoaXMuc2Vzc2lvbklkO1xuXG4gICAgLy8gU2V0dGluZyB0aGUgcGFyYW1zIGZvciBzM1xuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIEJ1Y2tldDogZW52aXJvbm1lbnQuYnVja2V0TmFtZS5hdXRoZW50aWNhdGVkQnVja2V0LFxuICAgICAgS2V5OiBgJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXX1fJHt0aGlzLnNlc3Npb25JZH1fY29uc29sZV9lcnJvcnNfJHtuZXcgRGF0ZSgpLmdldFRpbWUoKX0uanNvbmAsXG4gICAgICBCb2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICAgIENvbnRlbnRUeXBlOiAnanNvbidcbiAgICB9O1xuICAgIC8vIFB1c2hpbmcgdGhlIGRhdGEgdG8gczNcbiAgICBzM0J1Y2tldC5wdXRPYmplY3QocGFyYW1zLCAoZXJyOiBBV1MuQVdTRXJyb3IsIHJlc0RhdGE6IGFueSkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIFNldHRpbmcgYW5hbHl0aWNzIG9iamVjdCB0byBiZSBzYXZlZCBpbiBTMyBidWNrZXRcbiAgICogQHBhcmFtIHVzZXJEYXRhIC0gRGF0YSB0cmFuc2ZlcnJlZCB0byBFdmVudCBEaXJlY3RpdmVcbiAgICogQHBhcmFtIGV2ZW50RGV0YWlscyAtIFBvc2l0aW9uIG9mIGV2ZW50c1xuICAgKiBAcGFyYW0gZXZlbnROYW1lICAtIFR5cGUgb2YgZXZlbnRcbiAgICogQHBhcmFtIHNjcmVlbnNob3ROYW1lICAtIGZpbGUgbmFtZSBvZiBzYXZlZCBzY3JlZW5zaG90IGlmIHRoZSBldmVudCBpcyBQYWdlTG9hZGVkXG4gICAqL1xuICBzZXRBbmFseXRpY3NEYXRhKFxuICAgIHVzZXJEYXRhOiBhbnkgPSB7fSxcbiAgICBldmVudERldGFpbHM6IGFueSxcbiAgICBldmVudE5hbWU6IHN0cmluZyxcbiAgICBzY3JlZW5zaG90TmFtZTogc3RyaW5nLFxuICAgIGV2ZW50Q29tcG9uZW50Pzogc3RyaW5nKTogQW5hbHl0aWNzQmVhbiB7XG4gICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9IHtcbiAgICAgIGV2ZW50TGFiZWw6IGV2ZW50TmFtZSxcbiAgICAgIGV2ZW50Q29tcG9uZW50OiBldmVudENvbXBvbmVudCA/IGV2ZW50Q29tcG9uZW50IDogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCc/JylbMF0sXG4gICAgICBicm93c2VyOiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCxcbiAgICAgIGZ1bGxVUkw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxuICAgICAgcmVzb2x1dGlvbjogd2luZG93LmlubmVyV2lkdGggKyAneCcgKyB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gICAgICB4Q29vcmQ6IGV2ZW50RGV0YWlsc1snY2xpZW50WCddICE9PSB1bmRlZmluZWQgPyBldmVudERldGFpbHNbJ2NsaWVudFgnXS50b1N0cmluZygpIDogJzAnIHx8ICcwJyxcbiAgICAgIHlDb29yZDogZXZlbnREZXRhaWxzWydjbGllbnRZJ10gIT09IHVuZGVmaW5lZCA/IGV2ZW50RGV0YWlsc1snY2xpZW50WSddLnRvU3RyaW5nKCkgOiAnMCcgfHwgJzAnLFxuICAgICAgcGFnZVhDb29yZDogd2luZG93LnBhZ2VYT2Zmc2V0LnRvU3RyaW5nKCkgfHwgJzAnLFxuICAgICAgcGFnZVlDb29yZDogd2luZG93LnBhZ2VZT2Zmc2V0LnRvU3RyaW5nKCkgfHwgJzAnLFxuICAgICAgZXZlbnRUaW1lOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICBzY3JlZW5zaG90OiBzY3JlZW5zaG90TmFtZSxcbiAgICAgIGFkZGl0aW9uYWxJbmZvOiBKU09OLnN0cmluZ2lmeSh1c2VyRGF0YSksXG4gICAgICB1dG06IHRoaXMuZ2V0VVRNUGFyYW1ldGVycyh3aW5kb3cubG9jYXRpb24uaHJlZiksXG4gICAgICBkZW1vZ3JhcGhpY0luZm86IHRoaXMuZGVtb2dyYXBoaWNJbmZvLFxuICAgICAgaHRtbEVsZW1lbnQ6IGV2ZW50RGV0YWlsc1sndGFyZ2V0J10gPyBldmVudERldGFpbHNbJ3RhcmdldCddWydpbm5lckhUTUwnXSA6ICcnXG4gICAgfTtcbiAgICByZXR1cm4gYW5hbHl0aWNzQmVhbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXR0aW5nIFVUTSBQYXJhbWV0ZXJzIGJ5IHByb2Nlc3NpbmcgY3VycmVudCBwYWdlVVJMXG4gICAqIEBwYXJhbSB1cmwgLSBQYWdlIFVSTFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRVVE1QYXJhbWV0ZXJzKHVybDogc3RyaW5nKTogYW55IHtcbiAgICBjb25zdCB1dG1PYmplY3QgPSB7fTtcbiAgICBpZiAodXJsLmluY2x1ZGVzKCd1dG0nKSkge1xuICAgICAgY29uc3QgdXRtUGFyYW1zID0gdXJsLnNwbGl0KCc/JylbMV0uc3BsaXQoJyYnKTtcbiAgICAgIHV0bVBhcmFtcy5tYXAocGFyYW0gPT4ge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBwYXJhbS5zcGxpdCgnPScpO1xuICAgICAgICB1dG1PYmplY3RbcGFyYW1zWzBdXSA9IHBhcmFtc1sxXTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdXRtT2JqZWN0O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB1c2VyIGRlbW9ncmFwaGljIGluZm9ybWF0aW9uIGluIGNvb2tpZXNcbiAgICovXG4gIHByaXZhdGUgZ2V0SXAoKTogdm9pZCB7XG4gICAgdGhpcy5odHRwU2VydmljZS5nZXQoJ2h0dHBzOi8vaXBhcGkuY28vanNvbi8nKS5zdWJzY3JpYmUoXG4gICAgICAocmVzOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5kZW1vZ3JhcGhpY0luZm8gPSByZXM7XG4gICAgICAgIHRoaXMuY29va2llU2VydmljZS5zZXQoJ2RlbW9ncmFwaGljLWluZm8nLCBKU09OLnN0cmluZ2lmeShyZXMpLCBuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSArICgxMDAwICogNjAgKiA2MCAqIDI0ICogNykpKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG59XG4iXX0=