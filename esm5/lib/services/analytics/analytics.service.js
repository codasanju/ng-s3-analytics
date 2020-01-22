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
var AnalyticsService = /** @class */ (function () {
    function AnalyticsService(cookieService, httpService) {
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
     */
    /**
     * Checking whether sessionId present in cookie or not
     * if no session id cookie present, adding new session id otherwise reusing the session id value
     * @private
     * @return {?}
     */
    AnalyticsService.prototype.setSessionId = /**
     * Checking whether sessionId present in cookie or not
     * if no session id cookie present, adding new session id otherwise reusing the session id value
     * @private
     * @return {?}
     */
    function () {
        if (sessionStorage.getItem('ngS3AnalyticsSessionId')) {
            this.sessionId = sessionStorage.getItem('ngS3AnalyticsSessionId');
        }
        else {
            this.sessionId = uuid.v4();
            sessionStorage.setItem('ngS3AnalyticsSessionId', this.sessionId);
        }
    };
    /**
     * Pushing Analytics data to different bucket based on Authentication flag
     * @param data
     */
    /**
     * Pushing Analytics data to different bucket based on Authentication flag
     * @param {?} data
     * @return {?}
     */
    AnalyticsService.prototype.pushData = /**
     * Pushing Analytics data to different bucket based on Authentication flag
     * @param {?} data
     * @return {?}
     */
    function (data) {
        if (environment.isAuth) {
            this.publishTOAuthS3(data);
        }
        else {
            this.publishTOUnAuthS3(data);
        }
    };
    /**
     * Pushing data to UnAuthenticated Bucket S3
     * @param data
     */
    /**
     * Pushing data to UnAuthenticated Bucket S3
     * @private
     * @param {?} data
     * @return {?}
     */
    AnalyticsService.prototype.publishTOUnAuthS3 = /**
     * Pushing data to UnAuthenticated Bucket S3
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        /**
         * Construct S3 Bucket object
         * @type {?}
         */
        var s3Bucket = this.constructS3Object();
        /**
         * Setting the params for s3
         * @type {?}
         */
        var params = {
            Bucket: environment.bucketName.publicBucket,
            // tslint:disable-next-line: max-line-length
            Key: new Date().toISOString().split('T')[0] + "_" + this.sessionId + "_" + new Date().toISOString() + ".json",
            Body: this.processForAthena(data.eventValues),
            ContentType: 'json'
        };
        /*** Pushing the data to s3 */
        s3Bucket.putObject(params, (/**
         * @param {?} err
         * @param {?} resData
         * @return {?}
         */
        function (err, resData) {
            if (err) {
                console.error(err);
            }
        }));
    };
    /**
     * Converting JSON Array to string
     * @param data
     */
    /**
     * Converting JSON Array to string
     * @param {?} data
     * @return {?}
     */
    AnalyticsService.prototype.processForAthena = /**
     * Converting JSON Array to string
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        return data.map((/**
         * @param {?} object
         * @return {?}
         */
        function (object) {
            object['sessionId'] = _this.sessionId;
            return JSON.stringify(object);
        })).join('\n');
    };
    /**
      * Pushing data to Authenticated Bucket S3
      * @param data
      */
    /**
     * Pushing data to Authenticated Bucket S3
     * @param {?} data
     * @return {?}
     */
    AnalyticsService.prototype.publishTOAuthS3 = /**
     * Pushing data to Authenticated Bucket S3
     * @param {?} data
     * @return {?}
     */
    function (data) {
        /**
         * Construct S3 Bucket object
         * @type {?}
         */
        var s3Bucket = this.constructS3Object();
        /**
         * Setting the params for s3
         * @type {?}
         */
        var params = {
            Bucket: environment.bucketName.authenticatedBucket,
            Key: new Date().toISOString().split('T')[0] + "_" + this.sessionId + "_" + new Date().toISOString() + ".json",
            Body: this.processForAthena(data.eventValues),
            ContentType: 'json'
        };
        /*** Pushing the data to s3 */
        s3Bucket.putObject(params, (/**
         * @param {?} err
         * @param {?} resData
         * @return {?}
         */
        function (err, resData) {
            if (err) {
                console.error('error', err);
            }
        }));
    };
    /**
     * Construct S3 Object using AWS SDK
     */
    /**
     * Construct S3 Object using AWS SDK
     * @private
     * @return {?}
     */
    AnalyticsService.prototype.constructS3Object = /**
     * Construct S3 Object using AWS SDK
     * @private
     * @return {?}
     */
    function () {
        return new AWS.S3({
            accessKeyId: environment.accessKeyId,
            secretAccessKey: environment.secretAccessKey,
            region: environment.region
        });
    };
    /**
     * Uploading captured base64 image to S3
     * @param image - Base64 String
     * @param screenshotName - Screenshot name linked with pageLoaded data
     */
    /**
     * Uploading captured base64 image to S3
     * @param {?} htmlTemplate
     * @param {?} screenshotName - Screenshot name linked with pageLoaded data
     * @return {?}
     */
    AnalyticsService.prototype.saveScreenshotsInS3 = /**
     * Uploading captured base64 image to S3
     * @param {?} htmlTemplate
     * @param {?} screenshotName - Screenshot name linked with pageLoaded data
     * @return {?}
     */
    function (htmlTemplate, screenshotName) {
        // constructing the S3 object
        /** @type {?} */
        var s3Bucket = this.constructS3Object();
        // preparing data to be pushed to bucket
        /** @type {?} */
        var params = {
            Bucket: environment.bucketName.screenshotBucket,
            Key: new Date().toISOString().split('T')[0] + "/" + this.sessionId + "/screenshots/" + screenshotName + ".html",
            Body: htmlTemplate,
            ContentType: 'text/html'
        };
        /** Pushing to S3 bucket */
        s3Bucket.upload(params, (/**
         * @param {?} err
         * @param {?} resData
         * @return {?}
         */
        function (err, resData) {
            if (err) {
                console.error(err);
            }
        }));
    };
    /**
     * Pushing console errors to S3 bucket
     * @param data
     */
    /**
     * Pushing console errors to S3 bucket
     * @param {?} data
     * @return {?}
     */
    AnalyticsService.prototype.publishConsoleErrors = /**
     * Pushing console errors to S3 bucket
     * @param {?} data
     * @return {?}
     */
    function (data) {
        // Configuring the s3
        /** @type {?} */
        var s3Bucket = this.constructS3Object();
        data['sessionId'] = this.sessionId;
        // Setting the params for s3
        /** @type {?} */
        var params = {
            Bucket: environment.bucketName.authenticatedBucket,
            Key: new Date().toISOString().split('T')[0] + "_" + this.sessionId + "_console_errors_" + new Date().getTime() + ".json",
            Body: JSON.stringify(data),
            ContentType: 'json'
        };
        // Pushing the data to s3
        s3Bucket.putObject(params, (/**
         * @param {?} err
         * @param {?} resData
         * @return {?}
         */
        function (err, resData) {
            if (err) {
                console.error(err);
            }
        }));
    };
    /**
     * Setting analytics object to be saved in S3 bucket
     * @param userData - Data transferred to Event Directive
     * @param eventDetails - Position of events
     * @param eventName  - Type of event
     * @param screenshotName  - file name of saved screenshot if the event is PageLoaded
     */
    /**
     * Setting analytics object to be saved in S3 bucket
     * @param {?=} userData - Data transferred to Event Directive
     * @param {?=} eventDetails - Position of events
     * @param {?=} eventName  - Type of event
     * @param {?=} screenshotName  - file name of saved screenshot if the event is PageLoaded
     * @param {?=} eventComponent
     * @return {?}
     */
    AnalyticsService.prototype.setAnalyticsData = /**
     * Setting analytics object to be saved in S3 bucket
     * @param {?=} userData - Data transferred to Event Directive
     * @param {?=} eventDetails - Position of events
     * @param {?=} eventName  - Type of event
     * @param {?=} screenshotName  - file name of saved screenshot if the event is PageLoaded
     * @param {?=} eventComponent
     * @return {?}
     */
    function (userData, eventDetails, eventName, screenshotName, eventComponent) {
        if (userData === void 0) { userData = {}; }
        /** @type {?} */
        var analyticsBean = {
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
    };
    /**
     * Getting UTM Parameters by processing current pageURL
     * @param url - Page URL
     */
    /**
     * Getting UTM Parameters by processing current pageURL
     * @private
     * @param {?} url - Page URL
     * @return {?}
     */
    AnalyticsService.prototype.getUTMParameters = /**
     * Getting UTM Parameters by processing current pageURL
     * @private
     * @param {?} url - Page URL
     * @return {?}
     */
    function (url) {
        /** @type {?} */
        var utmObject = {};
        if (url.includes('utm')) {
            /** @type {?} */
            var utmParams = url.split('?')[1].split('&');
            utmParams.map((/**
             * @param {?} param
             * @return {?}
             */
            function (param) {
                /** @type {?} */
                var params = param.split('=');
                utmObject[params[0]] = params[1];
            }));
        }
        return utmObject;
    };
    /**
     * Set user demographic information in cookies
     */
    /**
     * Set user demographic information in cookies
     * @private
     * @return {?}
     */
    AnalyticsService.prototype.getIp = /**
     * Set user demographic information in cookies
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.httpService.get('https://ipapi.co/json/').subscribe((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            _this.demographicInfo = res;
            _this.cookieService.set('demographic-info', JSON.stringify(res), new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 7)));
        }));
    };
    AnalyticsService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    AnalyticsService.ctorParameters = function () { return [
        { type: CookieService },
        { type: HttpClient }
    ]; };
    /** @nocollapse */ AnalyticsService.ngInjectableDef = i0.defineInjectable({ factory: function AnalyticsService_Factory() { return new AnalyticsService(i0.inject(i1.CookieService), i0.inject(i2.HttpClient)); }, token: AnalyticsService, providedIn: "root" });
    return AnalyticsService;
}());
export { AnalyticsService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sS0FBSyxHQUFHLE1BQU0sU0FBUyxDQUFDO0FBQy9CLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEtBQUssSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUU3QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7OztBQUl0RDtJQVdFLDBCQUFvQixhQUE0QixFQUFVLFdBQXVCO1FBQTdELGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFGakYsb0JBQWUsR0FBUSxFQUFFLENBQUM7UUFDMUIsZ0JBQVcsR0FBRyxXQUFXLENBQUM7UUFFeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLEVBQUU7WUFDakQsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2Q7YUFBTTtZQUNMLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7U0FDL0U7UUFDRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7OztJQUNLLHVDQUFZOzs7Ozs7SUFBcEI7UUFD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LFVBQUEsS0FBSzs7b0JBQ1gsTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUMvQixTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLENBQUMsRUFBQyxDQUFDO1NBQ0o7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRUQ7O09BRUc7Ozs7OztJQUNLLGdDQUFLOzs7OztJQUFiO1FBQUEsaUJBT0M7UUFOQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLFNBQVM7Ozs7UUFDdEQsVUFBQyxHQUFRO1lBQ1AsS0FBSSxDQUFDLGVBQWUsR0FBRyxHQUFHLENBQUM7WUFDM0IsS0FBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5SCxDQUFDLEVBQ0YsQ0FBQztJQUNKLENBQUM7O2dCQW5PRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7Z0JBUlEsYUFBYTtnQkFDYixVQUFVOzs7MkJBTm5CO0NBK09DLEFBcE9ELElBb09DO1NBak9ZLGdCQUFnQjs7Ozs7O0lBSzNCLHFDQUFrQjs7SUFDbEIsMkNBQTBCOztJQUMxQix1Q0FBMEI7Ozs7O0lBQ2QseUNBQW9DOzs7OztJQUFFLHVDQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIEFXUyBmcm9tICdhd3Mtc2RrJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vZW52aXJvbm1lbnQvZW52aXJvbm1lbnQnO1xuaW1wb3J0ICogYXMgdXVpZCBmcm9tICd1dWlkJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnbmd4LWNvb2tpZS1zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBFdmVudExhYmVscyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcbi8qKlxuICogQW5hbHl0aWNzIFNlcnZpY2VcbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQW5hbHl0aWNzU2VydmljZSB7XG5cbiAgLyoqXG4gICAqIFNlc3Npb25JZCBvZiBwbHVnaW5cbiAgICovXG4gIHNlc3Npb25JZDogc3RyaW5nO1xuICBkZW1vZ3JhcGhpY0luZm86IGFueSA9IHt9O1xuICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvb2tpZVNlcnZpY2U6IENvb2tpZVNlcnZpY2UsIHByaXZhdGUgaHR0cFNlcnZpY2U6IEh0dHBDbGllbnQpIHtcbiAgICBpZiAoIXRoaXMuY29va2llU2VydmljZS5jaGVjaygnZGVtb2dyYXBoaWMtaW5mbycpKSB7XG4gICAgICB0aGlzLmdldElwKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVtb2dyYXBoaWNJbmZvID0gSlNPTi5wYXJzZSh0aGlzLmNvb2tpZVNlcnZpY2UuZ2V0KCdkZW1vZ3JhcGhpYy1pbmZvJykpO1xuICAgIH1cbiAgICB0aGlzLnNldFNlc3Npb25JZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNraW5nIHdoZXRoZXIgc2Vzc2lvbklkIHByZXNlbnQgaW4gY29va2llIG9yIG5vdFxuICAgKiBpZiBubyBzZXNzaW9uIGlkIGNvb2tpZSBwcmVzZW50LCBhZGRpbmcgbmV3IHNlc3Npb24gaWQgb3RoZXJ3aXNlIHJldXNpbmcgdGhlIHNlc3Npb24gaWQgdmFsdWVcbiAgICovXG4gIHByaXZhdGUgc2V0U2Vzc2lvbklkKCk6IHZvaWQge1xuICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCduZ1MzQW5hbHl0aWNzU2Vzc2lvbklkJykpIHtcbiAgICAgIHRoaXMuc2Vzc2lvbklkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnbmdTM0FuYWx5dGljc1Nlc3Npb25JZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlc3Npb25JZCA9IHV1aWQudjQoKTtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ25nUzNBbmFseXRpY3NTZXNzaW9uSWQnLCB0aGlzLnNlc3Npb25JZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFB1c2hpbmcgQW5hbHl0aWNzIGRhdGEgdG8gZGlmZmVyZW50IGJ1Y2tldCBiYXNlZCBvbiBBdXRoZW50aWNhdGlvbiBmbGFnXG4gICAqIEBwYXJhbSBkYXRhIFxuICAgKi9cbiAgcHVibGljIHB1c2hEYXRhKGRhdGE6IGFueSk6IHZvaWQge1xuICAgIGlmIChlbnZpcm9ubWVudC5pc0F1dGgpIHtcbiAgICAgIHRoaXMucHVibGlzaFRPQXV0aFMzKGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnB1Ymxpc2hUT1VuQXV0aFMzKGRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQdXNoaW5nIGRhdGEgdG8gVW5BdXRoZW50aWNhdGVkIEJ1Y2tldCBTM1xuICAgKiBAcGFyYW0gZGF0YSBcbiAgICovXG4gIHByaXZhdGUgcHVibGlzaFRPVW5BdXRoUzMoZGF0YTogYW55KTogdm9pZCB7XG5cbiAgICAvKioqIENvbnN0cnVjdCBTMyBCdWNrZXQgb2JqZWN0ICovXG4gICAgY29uc3QgczNCdWNrZXQ6IEFXUy5TMyA9IHRoaXMuY29uc3RydWN0UzNPYmplY3QoKTtcblxuICAgIC8qKiogU2V0dGluZyB0aGUgcGFyYW1zIGZvciBzMyAqL1xuICAgIGNvbnN0IHBhcmFtczogeyBCdWNrZXQ6IHN0cmluZywgS2V5OiBzdHJpbmcsIEJvZHk6IHN0cmluZywgQ29udGVudFR5cGU6IHN0cmluZyB9ID0ge1xuICAgICAgQnVja2V0OiBlbnZpcm9ubWVudC5idWNrZXROYW1lLnB1YmxpY0J1Y2tldCxcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbWF4LWxpbmUtbGVuZ3RoXG4gICAgICBLZXk6IGAke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdfV8ke3RoaXMuc2Vzc2lvbklkfV8ke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKX0uanNvbmAsXG4gICAgICBCb2R5OiB0aGlzLnByb2Nlc3NGb3JBdGhlbmEoZGF0YS5ldmVudFZhbHVlcyksXG4gICAgICBDb250ZW50VHlwZTogJ2pzb24nXG4gICAgfTtcbiAgICAvKioqIFB1c2hpbmcgdGhlIGRhdGEgdG8gczMgKi9cbiAgICBzM0J1Y2tldC5wdXRPYmplY3QocGFyYW1zLCAoZXJyOiBBV1MuQVdTRXJyb3IsIHJlc0RhdGE6IGFueSkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydGluZyBKU09OIEFycmF5IHRvIHN0cmluZyBcbiAgICogQHBhcmFtIGRhdGEgXG4gICAqL1xuICBwcm9jZXNzRm9yQXRoZW5hKGRhdGE6IEFycmF5PEFuYWx5dGljc0JlYW4+KTogc3RyaW5nIHtcbiAgICByZXR1cm4gZGF0YS5tYXAoKG9iamVjdDogYW55KSA9PiB7XG4gICAgICBvYmplY3RbJ3Nlc3Npb25JZCddID0gdGhpcy5zZXNzaW9uSWQ7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqZWN0KTtcbiAgICB9KS5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIC8qKlxuICAgICogUHVzaGluZyBkYXRhIHRvIEF1dGhlbnRpY2F0ZWQgQnVja2V0IFMzXG4gICAgKiBAcGFyYW0gZGF0YSBcbiAgICAqL1xuICBwdWJsaXNoVE9BdXRoUzMoZGF0YTogYW55KSB7XG5cbiAgICAvKioqIENvbnN0cnVjdCBTMyBCdWNrZXQgb2JqZWN0ICovXG4gICAgY29uc3QgczNCdWNrZXQ6IEFXUy5TMyA9IHRoaXMuY29uc3RydWN0UzNPYmplY3QoKTtcbiAgICAvKioqIFNldHRpbmcgdGhlIHBhcmFtcyBmb3IgczMgKi9cbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICBCdWNrZXQ6IGVudmlyb25tZW50LmJ1Y2tldE5hbWUuYXV0aGVudGljYXRlZEJ1Y2tldCxcbiAgICAgIEtleTogYCR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF19XyR7dGhpcy5zZXNzaW9uSWR9XyR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpfS5qc29uYCxcbiAgICAgIEJvZHk6IHRoaXMucHJvY2Vzc0ZvckF0aGVuYShkYXRhLmV2ZW50VmFsdWVzKSxcbiAgICAgIENvbnRlbnRUeXBlOiAnanNvbidcbiAgICB9O1xuICAgIC8qKiogUHVzaGluZyB0aGUgZGF0YSB0byBzMyAqL1xuICAgIHMzQnVja2V0LnB1dE9iamVjdChwYXJhbXMsIChlcnI6IEFXUy5BV1NFcnJvciwgcmVzRGF0YTogYW55KSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2Vycm9yJywgZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICB9XG5cblxuICAvKipcbiAgICogQ29uc3RydWN0IFMzIE9iamVjdCB1c2luZyBBV1MgU0RLXG4gICAqL1xuICBwcml2YXRlIGNvbnN0cnVjdFMzT2JqZWN0KCk6IEFXUy5TMyB7XG4gICAgcmV0dXJuIG5ldyBBV1MuUzMoe1xuICAgICAgYWNjZXNzS2V5SWQ6IGVudmlyb25tZW50LmFjY2Vzc0tleUlkLFxuICAgICAgc2VjcmV0QWNjZXNzS2V5OiBlbnZpcm9ubWVudC5zZWNyZXRBY2Nlc3NLZXksXG4gICAgICByZWdpb246IGVudmlyb25tZW50LnJlZ2lvblxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwbG9hZGluZyBjYXB0dXJlZCBiYXNlNjQgaW1hZ2UgdG8gUzNcbiAgICogQHBhcmFtIGltYWdlIC0gQmFzZTY0IFN0cmluZ1xuICAgKiBAcGFyYW0gc2NyZWVuc2hvdE5hbWUgLSBTY3JlZW5zaG90IG5hbWUgbGlua2VkIHdpdGggcGFnZUxvYWRlZCBkYXRhXG4gICAqL1xuICBwdWJsaWMgc2F2ZVNjcmVlbnNob3RzSW5TMyhodG1sVGVtcGxhdGU6IHN0cmluZywgc2NyZWVuc2hvdE5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIC8vIGNvbnN0cnVjdGluZyB0aGUgUzMgb2JqZWN0XG4gICAgY29uc3QgczNCdWNrZXQ6IEFXUy5TMyA9IHRoaXMuY29uc3RydWN0UzNPYmplY3QoKTtcbiAgICAvLyBwcmVwYXJpbmcgZGF0YSB0byBiZSBwdXNoZWQgdG8gYnVja2V0XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgQnVja2V0OiBlbnZpcm9ubWVudC5idWNrZXROYW1lLnNjcmVlbnNob3RCdWNrZXQsXG4gICAgICBLZXk6IGAke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdfS8ke3RoaXMuc2Vzc2lvbklkfS9zY3JlZW5zaG90cy8ke3NjcmVlbnNob3ROYW1lfS5odG1sYCxcbiAgICAgIEJvZHk6IGh0bWxUZW1wbGF0ZSxcbiAgICAgIENvbnRlbnRUeXBlOiAndGV4dC9odG1sJ1xuICAgIH07XG5cbiAgICAvKiogUHVzaGluZyB0byBTMyBidWNrZXQgKi9cbiAgICBzM0J1Y2tldC51cGxvYWQocGFyYW1zLCAoZXJyOiBBV1MuQVdTRXJyb3IsIHJlc0RhdGE6IGFueSkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUHVzaGluZyBjb25zb2xlIGVycm9ycyB0byBTMyBidWNrZXRcbiAgICogQHBhcmFtIGRhdGEgXG4gICAqL1xuICBwdWJsaWMgcHVibGlzaENvbnNvbGVFcnJvcnMoZGF0YTogYW55KTogdm9pZCB7XG5cbiAgICAvLyBDb25maWd1cmluZyB0aGUgczNcbiAgICBjb25zdCBzM0J1Y2tldDogQVdTLlMzID0gdGhpcy5jb25zdHJ1Y3RTM09iamVjdCgpO1xuICAgIGRhdGFbJ3Nlc3Npb25JZCddID0gdGhpcy5zZXNzaW9uSWQ7XG5cbiAgICAvLyBTZXR0aW5nIHRoZSBwYXJhbXMgZm9yIHMzXG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgQnVja2V0OiBlbnZpcm9ubWVudC5idWNrZXROYW1lLmF1dGhlbnRpY2F0ZWRCdWNrZXQsXG4gICAgICBLZXk6IGAke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdfV8ke3RoaXMuc2Vzc2lvbklkfV9jb25zb2xlX2Vycm9yc18ke25ldyBEYXRlKCkuZ2V0VGltZSgpfS5qc29uYCxcbiAgICAgIEJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgQ29udGVudFR5cGU6ICdqc29uJ1xuICAgIH07XG4gICAgLy8gUHVzaGluZyB0aGUgZGF0YSB0byBzM1xuICAgIHMzQnVja2V0LnB1dE9iamVjdChwYXJhbXMsIChlcnI6IEFXUy5BV1NFcnJvciwgcmVzRGF0YTogYW55KSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG5cblxuICAvKipcbiAgICogU2V0dGluZyBhbmFseXRpY3Mgb2JqZWN0IHRvIGJlIHNhdmVkIGluIFMzIGJ1Y2tldFxuICAgKiBAcGFyYW0gdXNlckRhdGEgLSBEYXRhIHRyYW5zZmVycmVkIHRvIEV2ZW50IERpcmVjdGl2ZVxuICAgKiBAcGFyYW0gZXZlbnREZXRhaWxzIC0gUG9zaXRpb24gb2YgZXZlbnRzXG4gICAqIEBwYXJhbSBldmVudE5hbWUgIC0gVHlwZSBvZiBldmVudFxuICAgKiBAcGFyYW0gc2NyZWVuc2hvdE5hbWUgIC0gZmlsZSBuYW1lIG9mIHNhdmVkIHNjcmVlbnNob3QgaWYgdGhlIGV2ZW50IGlzIFBhZ2VMb2FkZWRcbiAgICovXG4gIHNldEFuYWx5dGljc0RhdGEoXG4gICAgdXNlckRhdGE6IGFueSA9IHt9LFxuICAgIGV2ZW50RGV0YWlsczogYW55LFxuICAgIGV2ZW50TmFtZTogc3RyaW5nLFxuICAgIHNjcmVlbnNob3ROYW1lOiBzdHJpbmcsXG4gICAgZXZlbnRDb21wb25lbnQ/OiBzdHJpbmcpOiBBbmFseXRpY3NCZWFuIHtcbiAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID0ge1xuICAgICAgZXZlbnRMYWJlbDogZXZlbnROYW1lLFxuICAgICAgZXZlbnRDb21wb25lbnQ6IGV2ZW50Q29tcG9uZW50ID8gZXZlbnRDb21wb25lbnQgOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJz8nKVswXSxcbiAgICAgIGJyb3dzZXI6IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LFxuICAgICAgZnVsbFVSTDogd2luZG93LmxvY2F0aW9uLmhyZWYsXG4gICAgICByZXNvbHV0aW9uOiB3aW5kb3cuaW5uZXJXaWR0aCArICd4JyArIHdpbmRvdy5pbm5lckhlaWdodCxcbiAgICAgIHhDb29yZDogZXZlbnREZXRhaWxzWydjbGllbnRYJ10gIT09IHVuZGVmaW5lZCA/IGV2ZW50RGV0YWlsc1snY2xpZW50WCddLnRvU3RyaW5nKCkgOiAnMCcgfHwgJzAnLFxuICAgICAgeUNvb3JkOiBldmVudERldGFpbHNbJ2NsaWVudFknXSAhPT0gdW5kZWZpbmVkID8gZXZlbnREZXRhaWxzWydjbGllbnRZJ10udG9TdHJpbmcoKSA6ICcwJyB8fCAnMCcsXG4gICAgICBwYWdlWENvb3JkOiB3aW5kb3cucGFnZVhPZmZzZXQudG9TdHJpbmcoKSB8fCAnMCcsXG4gICAgICBwYWdlWUNvb3JkOiB3aW5kb3cucGFnZVlPZmZzZXQudG9TdHJpbmcoKSB8fCAnMCcsXG4gICAgICBldmVudFRpbWU6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgIHNjcmVlbnNob3Q6IHNjcmVlbnNob3ROYW1lLFxuICAgICAgYWRkaXRpb25hbEluZm86IEpTT04uc3RyaW5naWZ5KHVzZXJEYXRhKSxcbiAgICAgIHV0bTogdGhpcy5nZXRVVE1QYXJhbWV0ZXJzKHdpbmRvdy5sb2NhdGlvbi5ocmVmKSxcbiAgICAgIGRlbW9ncmFwaGljSW5mbzogdGhpcy5kZW1vZ3JhcGhpY0luZm8sXG4gICAgICBodG1sRWxlbWVudDogZXZlbnREZXRhaWxzWyd0YXJnZXQnXSA/IGV2ZW50RGV0YWlsc1sndGFyZ2V0J11bJ2lubmVySFRNTCddIDogJydcbiAgICB9O1xuICAgIHJldHVybiBhbmFseXRpY3NCZWFuO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHRpbmcgVVRNIFBhcmFtZXRlcnMgYnkgcHJvY2Vzc2luZyBjdXJyZW50IHBhZ2VVUkxcbiAgICogQHBhcmFtIHVybCAtIFBhZ2UgVVJMXG4gICAqL1xuICBwcml2YXRlIGdldFVUTVBhcmFtZXRlcnModXJsOiBzdHJpbmcpOiBhbnkge1xuICAgIGNvbnN0IHV0bU9iamVjdCA9IHt9O1xuICAgIGlmICh1cmwuaW5jbHVkZXMoJ3V0bScpKSB7XG4gICAgICBjb25zdCB1dG1QYXJhbXMgPSB1cmwuc3BsaXQoJz8nKVsxXS5zcGxpdCgnJicpO1xuICAgICAgdXRtUGFyYW1zLm1hcChwYXJhbSA9PiB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHBhcmFtLnNwbGl0KCc9Jyk7XG4gICAgICAgIHV0bU9iamVjdFtwYXJhbXNbMF1dID0gcGFyYW1zWzFdO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB1dG1PYmplY3Q7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHVzZXIgZGVtb2dyYXBoaWMgaW5mb3JtYXRpb24gaW4gY29va2llc1xuICAgKi9cbiAgcHJpdmF0ZSBnZXRJcCgpOiB2b2lkIHtcbiAgICB0aGlzLmh0dHBTZXJ2aWNlLmdldCgnaHR0cHM6Ly9pcGFwaS5jby9qc29uLycpLnN1YnNjcmliZShcbiAgICAgIChyZXM6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLmRlbW9ncmFwaGljSW5mbyA9IHJlcztcbiAgICAgICAgdGhpcy5jb29raWVTZXJ2aWNlLnNldCgnZGVtb2dyYXBoaWMtaW5mbycsIEpTT04uc3RyaW5naWZ5KHJlcyksIG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgKDEwMDAgKiA2MCAqIDYwICogMjQgKiA3KSkpO1xuICAgICAgfVxuICAgICk7XG4gIH1cbn1cbiJdfQ==