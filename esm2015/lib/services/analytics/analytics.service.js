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
import * as moment_ from 'moment';
import * as i0 from "@angular/core";
import * as i1 from "ngx-cookie-service";
import * as i2 from "@angular/common/http";
/** @type {?} */
const moment = moment_;
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
        if (this.cookieService.check('ngS3AnalyticsSessionId')) {
            this.sessionId = this.cookieService.get('ngS3AnalyticsSessionId');
        }
        else {
            this.sessionId = uuid.v4();
            this.cookieService.set('ngS3AnalyticsSessionId', this.sessionId, new Date(new Date().getTime() + (1000 * 60 * 60)));
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
        // converting the base64 to buffer data
        // const buffer: Buffer = bf.Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
        // const buffer: Buffer = bf.Buffer.from(image, 'base64');
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
                console.log(err);
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
            eventTime: moment.utc(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            screenshot: screenshotName,
            additionalInfo: JSON.stringify(userData),
            utm: this.getUTMParameters(window.location.href),
            demographicInfo: JSON.stringify(this.demographicInfo)
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
        return JSON.stringify(utmObject);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1zMy1hbmFseXRpY3MvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sS0FBSyxHQUFHLE1BQU0sU0FBUyxDQUFDO0FBQy9CLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEtBQUssSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUc3QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDOzs7OztNQUM1QixNQUFNLEdBQUcsT0FBTzs7OztBQU90QixNQUFNOzs7OztJQU9KLFlBQW9CLGFBQTRCLEVBQVUsV0FBdUI7UUFBN0Qsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQURqRixvQkFBZSxHQUFRLEVBQUUsQ0FBQztRQUV4QixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsRUFBRTtZQUNqRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDZDthQUFNO1lBQ0wsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztTQUMvRTtRQUNELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7Ozs7O0lBTU8sWUFBWTtRQUNsQixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLHdC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QyxDQUFDO1lBQ25DLENBQUMsRUFBQyxDQUFDO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7Ozs7O0lBS08sS0FBSztRQUNYLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUMsU0FBUzs7OztRQUN0RCxDQUFDLEdBQVEsRUFBRSxFQUFFO1lBQ1gsSUFBSSxDQUFDLGVBQWUsR0FBRyxHQUFHLENBQUM7WUFDM0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5SCxDQUFDLEVBQ0YsQ0FBQztJQUNKLENBQUM7OztZQXBPRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7OztZQVRRLGFBQWE7WUFDYixVQUFVOzs7Ozs7OztJQWNqQixxQ0FBa0I7O0lBQ2xCLDJDQUEwQjs7Ozs7SUFDZCx5Q0FBb0M7Ozs7O0lBQUUsdUNBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgQVdTIGZyb20gJ2F3cy1zZGsnO1xuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudCc7XG5pbXBvcnQgKiBhcyB1dWlkIGZyb20gJ3V1aWQnO1xuaW1wb3J0ICogYXMgYmYgZnJvbSAnYnVmZmVyJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnbmd4LWNvb2tpZS1zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuLyoqXG4gKiBBbmFseXRpY3MgU2VydmljZVxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBbmFseXRpY3NTZXJ2aWNlIHtcblxuICAvKipcbiAgICogU2Vzc2lvbklkIG9mIHBsdWdpblxuICAgKi9cbiAgc2Vzc2lvbklkOiBzdHJpbmc7XG4gIGRlbW9ncmFwaGljSW5mbzogYW55ID0ge307XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29va2llU2VydmljZTogQ29va2llU2VydmljZSwgcHJpdmF0ZSBodHRwU2VydmljZTogSHR0cENsaWVudCkge1xuICAgIGlmICghdGhpcy5jb29raWVTZXJ2aWNlLmNoZWNrKCdkZW1vZ3JhcGhpYy1pbmZvJykpIHtcbiAgICAgIHRoaXMuZ2V0SXAoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZW1vZ3JhcGhpY0luZm8gPSBKU09OLnBhcnNlKHRoaXMuY29va2llU2VydmljZS5nZXQoJ2RlbW9ncmFwaGljLWluZm8nKSk7XG4gICAgfVxuICAgIHRoaXMuc2V0U2Vzc2lvbklkKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tpbmcgd2hldGhlciBzZXNzaW9uSWQgcHJlc2VudCBpbiBjb29raWUgb3Igbm90XG4gICAqIGlmIG5vIHNlc3Npb24gaWQgY29va2llIHByZXNlbnQsIGFkZGluZyBuZXcgc2Vzc2lvbiBpZCBvdGhlcndpc2UgcmV1c2luZyB0aGUgc2Vzc2lvbiBpZCB2YWx1ZVxuICAgKi9cbiAgcHJpdmF0ZSBzZXRTZXNzaW9uSWQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY29va2llU2VydmljZS5jaGVjaygnbmdTM0FuYWx5dGljc1Nlc3Npb25JZCcpKSB7XG4gICAgICB0aGlzLnNlc3Npb25JZCA9IHRoaXMuY29va2llU2VydmljZS5nZXQoJ25nUzNBbmFseXRpY3NTZXNzaW9uSWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXNzaW9uSWQgPSB1dWlkLnY0KCk7XG4gICAgICB0aGlzLmNvb2tpZVNlcnZpY2Uuc2V0KCduZ1MzQW5hbHl0aWNzU2Vzc2lvbklkJywgdGhpcy5zZXNzaW9uSWQsIG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgKDEwMDAgKiA2MCAqIDYwKSkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQdXNoaW5nIEFuYWx5dGljcyBkYXRhIHRvIGRpZmZlcmVudCBidWNrZXQgYmFzZWQgb24gQXV0aGVudGljYXRpb24gZmxhZ1xuICAgKiBAcGFyYW0gZGF0YSBcbiAgICovXG4gIHB1YmxpYyBwdXNoRGF0YShkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoZW52aXJvbm1lbnQuaXNBdXRoKSB7XG4gICAgICB0aGlzLnB1Ymxpc2hUT0F1dGhTMyhkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wdWJsaXNoVE9VbkF1dGhTMyhkYXRhKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHVzaGluZyBkYXRhIHRvIFVuQXV0aGVudGljYXRlZCBCdWNrZXQgUzNcbiAgICogQHBhcmFtIGRhdGEgXG4gICAqL1xuICBwcml2YXRlIHB1Ymxpc2hUT1VuQXV0aFMzKGRhdGE6IGFueSk6IHZvaWQge1xuXG4gICAgLyoqKiBDb25zdHJ1Y3QgUzMgQnVja2V0IG9iamVjdCAqL1xuICAgIGNvbnN0IHMzQnVja2V0OiBBV1MuUzMgPSB0aGlzLmNvbnN0cnVjdFMzT2JqZWN0KCk7XG5cbiAgICAvKioqIFNldHRpbmcgdGhlIHBhcmFtcyBmb3IgczMgKi9cbiAgICBjb25zdCBwYXJhbXM6IHsgQnVja2V0OiBzdHJpbmcsIEtleTogc3RyaW5nLCBCb2R5OiBzdHJpbmcsIENvbnRlbnRUeXBlOiBzdHJpbmcgfSA9IHtcbiAgICAgIEJ1Y2tldDogZW52aXJvbm1lbnQuYnVja2V0TmFtZS5wdWJsaWNCdWNrZXQsXG4gICAgICBLZXk6IGAke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdfV8ke3RoaXMuc2Vzc2lvbklkfV8ke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKX0uanNvbmAsXG4gICAgICBCb2R5OiB0aGlzLnByb2Nlc3NGb3JBdGhlbmEoZGF0YS5ldmVudFZhbHVlcyksXG4gICAgICBDb250ZW50VHlwZTogJ2pzb24nXG4gICAgfTtcblxuICAgIC8qKiogUHVzaGluZyB0aGUgZGF0YSB0byBzMyAqL1xuICAgIHMzQnVja2V0LnB1dE9iamVjdChwYXJhbXMsIChlcnI6IEFXUy5BV1NFcnJvciwgcmVzRGF0YTogYW55KSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0aW5nIEpTT04gQXJyYXkgdG8gc3RyaW5nIFxuICAgKiBAcGFyYW0gZGF0YSBcbiAgICovXG4gIHByb2Nlc3NGb3JBdGhlbmEoZGF0YTogQXJyYXk8QW5hbHl0aWNzQmVhbj4pOiBzdHJpbmcge1xuICAgIHJldHVybiBkYXRhLm1hcCgob2JqZWN0OiBhbnkpID0+IHtcbiAgICAgIG9iamVjdFsnc2Vzc2lvbklkJ10gPSB0aGlzLnNlc3Npb25JZDtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmplY3QpO1xuICAgIH0pLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgLyoqXG4gICAgKiBQdXNoaW5nIGRhdGEgdG8gQXV0aGVudGljYXRlZCBCdWNrZXQgUzNcbiAgICAqIEBwYXJhbSBkYXRhIFxuICAgICovXG4gIHB1Ymxpc2hUT0F1dGhTMyhkYXRhOiBhbnkpIHtcblxuICAgIC8qKiogQ29uc3RydWN0IFMzIEJ1Y2tldCBvYmplY3QgKi9cbiAgICBjb25zdCBzM0J1Y2tldDogQVdTLlMzID0gdGhpcy5jb25zdHJ1Y3RTM09iamVjdCgpO1xuICAgIC8qKiogU2V0dGluZyB0aGUgcGFyYW1zIGZvciBzMyAqL1xuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIEJ1Y2tldDogZW52aXJvbm1lbnQuYnVja2V0TmFtZS5hdXRoZW50aWNhdGVkQnVja2V0LFxuICAgICAgS2V5OiBgJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXX1fJHt0aGlzLnNlc3Npb25JZH1fJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCl9Lmpzb25gLFxuICAgICAgQm9keTogdGhpcy5wcm9jZXNzRm9yQXRoZW5hKGRhdGEuZXZlbnRWYWx1ZXMpLFxuICAgICAgQ29udGVudFR5cGU6ICdqc29uJ1xuICAgIH07XG4gICAgLyoqKiBQdXNoaW5nIHRoZSBkYXRhIHRvIHMzICovXG4gICAgczNCdWNrZXQucHV0T2JqZWN0KHBhcmFtcywgKGVycjogQVdTLkFXU0Vycm9yLCByZXNEYXRhOiBhbnkpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignZXJyb3InLCBlcnIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH1cblxuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgUzMgT2JqZWN0IHVzaW5nIEFXUyBTREtcbiAgICovXG4gIHByaXZhdGUgY29uc3RydWN0UzNPYmplY3QoKTogQVdTLlMzIHtcbiAgICByZXR1cm4gbmV3IEFXUy5TMyh7XG4gICAgICBhY2Nlc3NLZXlJZDogZW52aXJvbm1lbnQuYWNjZXNzS2V5SWQsXG4gICAgICBzZWNyZXRBY2Nlc3NLZXk6IGVudmlyb25tZW50LnNlY3JldEFjY2Vzc0tleSxcbiAgICAgIHJlZ2lvbjogZW52aXJvbm1lbnQucmVnaW9uXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVXBsb2FkaW5nIGNhcHR1cmVkIGJhc2U2NCBpbWFnZSB0byBTM1xuICAgKiBAcGFyYW0gaW1hZ2UgLSBCYXNlNjQgU3RyaW5nXG4gICAqIEBwYXJhbSBzY3JlZW5zaG90TmFtZSAtIFNjcmVlbnNob3QgbmFtZSBsaW5rZWQgd2l0aCBwYWdlTG9hZGVkIGRhdGFcbiAgICovXG4gIHB1YmxpYyBzYXZlU2NyZWVuc2hvdHNJblMzKGh0bWxUZW1wbGF0ZTogc3RyaW5nLCBzY3JlZW5zaG90TmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgLy8gY29udmVydGluZyB0aGUgYmFzZTY0IHRvIGJ1ZmZlciBkYXRhXG4gICAgLy8gY29uc3QgYnVmZmVyOiBCdWZmZXIgPSBiZi5CdWZmZXIuZnJvbShpbWFnZS5yZXBsYWNlKC9eZGF0YTppbWFnZVxcL1xcdys7YmFzZTY0LC8sICcnKSwgJ2Jhc2U2NCcpO1xuICAgIC8vIGNvbnN0IGJ1ZmZlcjogQnVmZmVyID0gYmYuQnVmZmVyLmZyb20oaW1hZ2UsICdiYXNlNjQnKTtcbiAgICAvLyBjb25zdHJ1Y3RpbmcgdGhlIFMzIG9iamVjdFxuICAgIGNvbnN0IHMzQnVja2V0OiBBV1MuUzMgPSB0aGlzLmNvbnN0cnVjdFMzT2JqZWN0KCk7XG4gICAgLy8gcHJlcGFyaW5nIGRhdGEgdG8gYmUgcHVzaGVkIHRvIGJ1Y2tldFxuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIEJ1Y2tldDogZW52aXJvbm1lbnQuYnVja2V0TmFtZS5zY3JlZW5zaG90QnVja2V0LFxuICAgICAgS2V5OiBgJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXX0vJHt0aGlzLnNlc3Npb25JZH0vc2NyZWVuc2hvdHMvJHtzY3JlZW5zaG90TmFtZX0uaHRtbGAsXG4gICAgICBCb2R5OiBodG1sVGVtcGxhdGUsXG4gICAgICBDb250ZW50VHlwZTogJ3RleHQvaHRtbCdcbiAgICB9O1xuXG4gICAgLyoqIFB1c2hpbmcgdG8gUzMgYnVja2V0ICovXG4gICAgczNCdWNrZXQudXBsb2FkKHBhcmFtcywgKGVycjogQVdTLkFXU0Vycm9yLCByZXNEYXRhOiBhbnkpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFB1c2hpbmcgY29uc29sZSBlcnJvcnMgdG8gUzMgYnVja2V0XG4gICAqIEBwYXJhbSBkYXRhIFxuICAgKi9cbiAgcHVibGljIHB1Ymxpc2hDb25zb2xlRXJyb3JzKGRhdGE6IGFueSk6IHZvaWQge1xuXG4gICAgLy8gQ29uZmlndXJpbmcgdGhlIHMzXG4gICAgY29uc3QgczNCdWNrZXQ6IEFXUy5TMyA9IHRoaXMuY29uc3RydWN0UzNPYmplY3QoKTtcbiAgICBkYXRhWydzZXNzaW9uSWQnXSA9IHRoaXMuc2Vzc2lvbklkO1xuXG4gICAgLy8gU2V0dGluZyB0aGUgcGFyYW1zIGZvciBzM1xuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIEJ1Y2tldDogZW52aXJvbm1lbnQuYnVja2V0TmFtZS5hdXRoZW50aWNhdGVkQnVja2V0LFxuICAgICAgS2V5OiBgJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXX1fJHt0aGlzLnNlc3Npb25JZH1fY29uc29sZV9lcnJvcnNfJHtuZXcgRGF0ZSgpLmdldFRpbWUoKX0uanNvbmAsXG4gICAgICBCb2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICAgIENvbnRlbnRUeXBlOiAnanNvbidcbiAgICB9O1xuICAgIC8vIFB1c2hpbmcgdGhlIGRhdGEgdG8gczNcbiAgICBzM0J1Y2tldC5wdXRPYmplY3QocGFyYW1zLCAoZXJyOiBBV1MuQVdTRXJyb3IsIHJlc0RhdGE6IGFueSkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cblxuXG4gIC8qKlxuICAgKiBTZXR0aW5nIGFuYWx5dGljcyBvYmplY3QgdG8gYmUgc2F2ZWQgaW4gUzMgYnVja2V0XG4gICAqIEBwYXJhbSB1c2VyRGF0YSAtIERhdGEgdHJhbnNmZXJyZWQgdG8gRXZlbnQgRGlyZWN0aXZlXG4gICAqIEBwYXJhbSBldmVudERldGFpbHMgLSBQb3NpdGlvbiBvZiBldmVudHNcbiAgICogQHBhcmFtIGV2ZW50TmFtZSAgLSBUeXBlIG9mIGV2ZW50XG4gICAqIEBwYXJhbSBzY3JlZW5zaG90TmFtZSAgLSBmaWxlIG5hbWUgb2Ygc2F2ZWQgc2NyZWVuc2hvdCBpZiB0aGUgZXZlbnQgaXMgUGFnZUxvYWRlZFxuICAgKi9cbiAgc2V0QW5hbHl0aWNzRGF0YShcbiAgICB1c2VyRGF0YTogYW55ID0ge30sXG4gICAgZXZlbnREZXRhaWxzOiBhbnksXG4gICAgZXZlbnROYW1lOiBzdHJpbmcsXG4gICAgc2NyZWVuc2hvdE5hbWU6IHN0cmluZyxcbiAgICBldmVudENvbXBvbmVudD86IHN0cmluZyk6IEFuYWx5dGljc0JlYW4ge1xuICAgIGNvbnN0IGFuYWx5dGljc0JlYW46IEFuYWx5dGljc0JlYW4gPSB7XG4gICAgICBldmVudExhYmVsOiBldmVudE5hbWUsXG4gICAgICBldmVudENvbXBvbmVudDogZXZlbnRDb21wb25lbnQgPyBldmVudENvbXBvbmVudCA6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnPycpWzBdLFxuICAgICAgYnJvd3Nlcjogd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQsXG4gICAgICBmdWxsVVJMOiB3aW5kb3cubG9jYXRpb24uaHJlZixcbiAgICAgIHJlc29sdXRpb246IHdpbmRvdy5pbm5lcldpZHRoICsgJ3gnICsgd2luZG93LmlubmVySGVpZ2h0LFxuICAgICAgeENvb3JkOiBldmVudERldGFpbHNbJ2NsaWVudFgnXSAhPT0gdW5kZWZpbmVkID8gZXZlbnREZXRhaWxzWydjbGllbnRYJ10udG9TdHJpbmcoKSA6ICcwJyB8fCAnMCcsXG4gICAgICB5Q29vcmQ6IGV2ZW50RGV0YWlsc1snY2xpZW50WSddICE9PSB1bmRlZmluZWQgPyBldmVudERldGFpbHNbJ2NsaWVudFknXS50b1N0cmluZygpIDogJzAnIHx8ICcwJyxcbiAgICAgIHBhZ2VYQ29vcmQ6IHdpbmRvdy5wYWdlWE9mZnNldC50b1N0cmluZygpIHx8ICcwJyxcbiAgICAgIHBhZ2VZQ29vcmQ6IHdpbmRvdy5wYWdlWU9mZnNldC50b1N0cmluZygpIHx8ICcwJyxcbiAgICAgIGV2ZW50VGltZTogbW9tZW50LnV0YyhuZXcgRGF0ZSgpKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKSxcbiAgICAgIHNjcmVlbnNob3Q6IHNjcmVlbnNob3ROYW1lLFxuICAgICAgYWRkaXRpb25hbEluZm86IEpTT04uc3RyaW5naWZ5KHVzZXJEYXRhKSxcbiAgICAgIHV0bTogdGhpcy5nZXRVVE1QYXJhbWV0ZXJzKHdpbmRvdy5sb2NhdGlvbi5ocmVmKSxcbiAgICAgIGRlbW9ncmFwaGljSW5mbzogSlNPTi5zdHJpbmdpZnkodGhpcy5kZW1vZ3JhcGhpY0luZm8pXG4gICAgfTtcbiAgICByZXR1cm4gYW5hbHl0aWNzQmVhbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXR0aW5nIFVUTSBQYXJhbWV0ZXJzIGJ5IHByb2Nlc3NpbmcgY3VycmVudCBwYWdlVVJMXG4gICAqIEBwYXJhbSB1cmwgLSBQYWdlIFVSTFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRVVE1QYXJhbWV0ZXJzKHVybDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCB1dG1PYmplY3QgPSB7fTtcbiAgICBpZiAodXJsLmluY2x1ZGVzKCd1dG0nKSkge1xuICAgICAgY29uc3QgdXRtUGFyYW1zID0gdXJsLnNwbGl0KCc/JylbMV0uc3BsaXQoJyYnKTtcbiAgICAgIHV0bVBhcmFtcy5tYXAocGFyYW0gPT4ge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBwYXJhbS5zcGxpdCgnPScpO1xuICAgICAgICB1dG1PYmplY3RbcGFyYW1zWzBdXSA9IHBhcmFtc1sxXTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodXRtT2JqZWN0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdXNlciBkZW1vZ3JhcGhpYyBpbmZvcm1hdGlvbiBpbiBjb29raWVzXG4gICAqL1xuICBwcml2YXRlIGdldElwKCk6IHZvaWQge1xuICAgIHRoaXMuaHR0cFNlcnZpY2UuZ2V0KCdodHRwczovL2lwYXBpLmNvL2pzb24vJykuc3Vic2NyaWJlKFxuICAgICAgKHJlczogYW55KSA9PiB7XG4gICAgICAgIHRoaXMuZGVtb2dyYXBoaWNJbmZvID0gcmVzO1xuICAgICAgICB0aGlzLmNvb2tpZVNlcnZpY2Uuc2V0KCdkZW1vZ3JhcGhpYy1pbmZvJywgSlNPTi5zdHJpbmdpZnkocmVzKSwgbmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgKyAoMTAwMCAqIDYwICogNjAgKiAyNCAqIDcpKSk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxufVxuIl19