/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import * as uuid from 'uuid';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventLabels, Constants } from '../../types/event.types';
import { PluginConfigService } from './handleConfig';
import { EnvironmentService } from '../environment/environment.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./handleConfig";
import * as i3 from "../environment/environment.service";
/**
 * Analytics Service
 */
var AnalyticsService = /** @class */ (function () {
    /**
     * Analytics Service constructor
     * @param pluginConfig
     * @param httpService
     */
    function AnalyticsService(httpService, pluginConfig, environmentService) {
        this.httpService = httpService;
        this.pluginConfig = pluginConfig;
        this.environmentService = environmentService;
        /** Demographic info */
        this.demographicInfo = {};
        /** Event label constants */
        this.eventLabels = EventLabels;
        /** Constants */
        this.constants = Constants;
        this.pluginConfig.getEnvironmentConfig();
        this.getUserInfo();
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
        if (sessionStorage.getItem(this.constants.SESSION_ID)) {
            this.sessionId = sessionStorage.getItem(this.constants.SESSION_ID);
        }
        else {
            this.sessionId = uuid.v4();
            sessionStorage.setItem(this.constants.SESSION_ID, this.sessionId);
        }
    };
    /**
     * Checking the IP range to be restrict
     * @param data - data to be pushed
     */
    /**
     * Checking the IP range to be restrict
     * @param {?} data - data to be pushed
     * @return {?}
     */
    AnalyticsService.prototype.pushData = /**
     * Checking the IP range to be restrict
     * @param {?} data - data to be pushed
     * @return {?}
     */
    function (data) {
        if (this.pluginConfig.handleConfiguration(data.eventValues[0])) {
            /** @type {?} */
            var analyticsObjectList = this.pluginConfig.removeCheckUrls(data.eventValues);
            if (analyticsObjectList.length > 0) {
                this.publishTOAuthS3(analyticsObjectList);
            }
        }
    };
    /**
     * Converting JSON Array to string
     * @param data
     */
    /**
     * Converting JSON Array to string
     * @private
     * @param {?} data
     * @return {?}
     */
    AnalyticsService.prototype.processForAthena = /**
     * Converting JSON Array to string
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        if (data && data.length > 0) {
            return data.map((/**
             * @param {?} object
             * @return {?}
             */
            function (object) {
                object['sessionId'] = _this.sessionId;
                return JSON.stringify(object);
            })).join('\n');
        }
        else {
            return JSON.stringify(data);
        }
    };
    /**
      * Preparing data to be pushed to DataStorage
      * @param data  data to be pushed
      */
    /**
     * Preparing data to be pushed to DataStorage
     * @private
     * @param {?} data  data to be pushed
     * @return {?}
     */
    AnalyticsService.prototype.publishTOAuthS3 = /**
     * Preparing data to be pushed to DataStorage
     * @private
     * @param {?} data  data to be pushed
     * @return {?}
     */
    function (data) {
        /** @type {?} */
        var filename = new Date().toISOString().split('T')[0] + "_" + this.sessionId + "_" + new Date().toISOString() + ".json";
        /** @type {?} */
        var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.pushDataToS3(filename, this.processForAthena(data), headers);
    };
    /**
     * Pushing data to corresponding bucket using data collection api
     * @param path - service path
     * @param data - data to be pushed
     */
    /**
     * Pushing data to corresponding bucket using data collection api
     * @private
     * @param {?} path - service path
     * @param {?} data - data to be pushed
     * @param {?} headers
     * @return {?}
     */
    AnalyticsService.prototype.pushDataToS3 = /**
     * Pushing data to corresponding bucket using data collection api
     * @private
     * @param {?} path - service path
     * @param {?} data - data to be pushed
     * @param {?} headers
     * @return {?}
     */
    function (path, data, headers) {
        /** @type {?} */
        var url = "" + environment.dataCollectionApi + path;
        this.httpService.put(url, data, { headers: headers }).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { }), (/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            console.log(err);
        }));
    };
    /**
     * Save the captured HTML to the data collection
     * @param htmlTemplate - DOM Content
     * @param screenshotName - filename to be saved
     */
    /**
     * Save the captured HTML to the data collection
     * @param {?} htmlTemplate - DOM Content
     * @param {?} screenshotName - filename to be saved
     * @return {?}
     */
    AnalyticsService.prototype.saveScreenshotsInS3 = /**
     * Save the captured HTML to the data collection
     * @param {?} htmlTemplate - DOM Content
     * @param {?} screenshotName - filename to be saved
     * @return {?}
     */
    function (htmlTemplate, screenshotName) {
        if (this.pluginConfig.checkDisableTracking()) {
            /** @type {?} */
            var filename = "assets/" + new Date().toISOString().split('T')[0] + "/" + this.sessionId + "/" + screenshotName + ".html";
            /** @type {?} */
            var headers = new HttpHeaders({ 'Content-Type': 'text/html' });
            this.pushDataToS3(filename, htmlTemplate, headers);
        }
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
        if (this.pluginConfig.checkDisableTracking()) {
            data['sessionId'] = this.sessionId;
            /** @type {?} */
            var filename = new Date().toISOString().split('T')[0] + "_" + this.sessionId + "_console_errors_" + new Date().getTime() + ".json";
            /** @type {?} */
            var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
            this.pushDataToS3(filename, data, headers);
        }
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
     * @param {?=} optional
     * @return {?}
     */
    AnalyticsService.prototype.setAnalyticsData = /**
     * Setting analytics object to be saved in S3 bucket
     * @param {?=} userData - Data transferred to Event Directive
     * @param {?=} eventDetails - Position of events
     * @param {?=} eventName  - Type of event
     * @param {?=} screenshotName  - file name of saved screenshot if the event is PageLoaded
     * @param {?=} optional
     * @return {?}
     */
    function (userData, eventDetails, eventName, screenshotName, optional) {
        if (userData === void 0) { userData = {}; }
        /** @type {?} */
        var analyticsBean = {
            eventLabel: eventName,
            eventComponent: optional && optional.eventComponent ? optional.eventComponent : window.location.pathname.split('?')[0],
            browser: window.navigator.userAgent,
            fullURL: window.location.href,
            origin: window.location.origin,
            resolution: window.innerWidth + "x" + window.innerHeight,
            xCoord: this.getEventDetails(eventDetails['clientX']),
            yCoord: this.getEventDetails(eventDetails['clientY']),
            pageXCoord: window.pageXOffset.toString() || '0',
            pageYCoord: window.pageYOffset.toString() || '0',
            eventTime: new Date().toISOString(),
            screenshot: screenshotName,
            additionalInfo: userData,
            errors: (optional && optional.consoleErrors) ? optional.consoleErrors : '',
            utm: this.getUTMParameters(window.location.href),
            demographicInfo: this.pluginConfig.getDemographicInfo(),
            keyStrokeData: (optional && optional.keyStrokeData) ? optional.keyStrokeData : this.getEmptyKeyStrokeData(),
            htmlElement: this.getHtmlElement(eventDetails['target'], eventName),
            performance: this.getPerformanceDetails(),
            userInfo: this.userInfo
        };
        return analyticsBean;
    };
    /**
     * Event details
     * @param value
     */
    /**
     * Event details
     * @private
     * @param {?} value
     * @return {?}
     */
    AnalyticsService.prototype.getEventDetails = /**
     * Event details
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value !== undefined ? value.toString() : '0';
    };
    /**
     * Get HTML Content
     * @param targetElement - target element
     */
    /**
     * Get HTML Content
     * @private
     * @param {?} targetElement - target element
     * @param {?} eventName
     * @return {?}
     */
    AnalyticsService.prototype.getHtmlElement = /**
     * Get HTML Content
     * @private
     * @param {?} targetElement - target element
     * @param {?} eventName
     * @return {?}
     */
    function (targetElement, eventName) {
        if (eventName !== this.eventLabels.MOUSE_MOVE && eventName !== this.eventLabels.SCROLL) {
            return targetElement !== undefined ? targetElement['innerHTML'] : '';
        }
        else {
            return '';
        }
    };
    /**
     * @private
     * @return {?}
     */
    AnalyticsService.prototype.getEmptyKeyStrokeData = /**
     * @private
     * @return {?}
     */
    function () {
        return {
            key: '',
            keyCode: '',
            code: '',
            elementId: '',
            form: '',
            htmlElementType: '',
            isForm: false,
            tagName: '',
            value: ''
        };
    };
    /**
     * Performance details
     */
    /**
     * Performance details
     * @private
     * @return {?}
     */
    AnalyticsService.prototype.getPerformanceDetails = /**
     * Performance details
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var performance = window.performance;
        return {
            navigation: performance.navigation,
            timeOrigin: performance.timeOrigin,
            timing: performance.timing
        };
    };
    /**
     * Memory usage of the application is provided by Google Chrome
     * @param userAgent - User agent to check the browser
     */
    /**
     * Memory usage of the application is provided by Google Chrome
     * @private
     * @param {?} userAgent - User agent to check the browser
     * @return {?}
     */
    AnalyticsService.prototype.geMemoryUsageInfo = /**
     * Memory usage of the application is provided by Google Chrome
     * @private
     * @param {?} userAgent - User agent to check the browser
     * @return {?}
     */
    function (userAgent) {
        /** @type {?} */
        var isChrome = userAgent.split('chrome').length > 1;
        /** @type {?} */
        var memory = isChrome ? window.performance['memory'] : '';
        return memory;
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
     * Getting user info
     */
    /**
     * Getting user info
     * @private
     * @return {?}
     */
    AnalyticsService.prototype.getUserInfo = /**
     * Getting user info
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.environmentService.getUserInfo().subscribe((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            _this.userInfo = res;
            console.log('receive user bean', _this.userInfo);
        }));
    };
    AnalyticsService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    AnalyticsService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: PluginConfigService },
        { type: EnvironmentService }
    ]; };
    /** @nocollapse */ AnalyticsService.ngInjectableDef = i0.defineInjectable({ factory: function AnalyticsService_Factory() { return new AnalyticsService(i0.inject(i1.HttpClient), i0.inject(i2.PluginConfigService), i0.inject(i3.EnvironmentService)); }, token: AnalyticsService, providedIn: "root" });
    return AnalyticsService;
}());
export { AnalyticsService };
if (false) {
    /**
     * SessionId of plugin
     * @type {?}
     */
    AnalyticsService.prototype.sessionId;
    /**
     * Demographic info
     * @type {?}
     */
    AnalyticsService.prototype.demographicInfo;
    /**
     * Event label constants
     * @type {?}
     */
    AnalyticsService.prototype.eventLabels;
    /**
     * Constants
     * @type {?}
     */
    AnalyticsService.prototype.constants;
    /** @type {?} */
    AnalyticsService.prototype.userInfo;
    /**
     * @type {?}
     * @private
     */
    AnalyticsService.prototype.httpService;
    /**
     * @type {?}
     * @private
     */
    AnalyticsService.prototype.pluginConfig;
    /**
     * @type {?}
     * @private
     */
    AnalyticsService.prototype.environmentService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEtBQUssSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUU3QixPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxXQUFXLEVBQXNCLFNBQVMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3JGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOzs7Ozs7OztBQUl4RTtJQWdCRTs7OztPQUlHO0lBQ0gsMEJBQ1UsV0FBdUIsRUFDdkIsWUFBaUMsRUFDakMsa0JBQXNDO1FBRnRDLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3ZCLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQUNqQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBakJoRCx1QkFBdUI7UUFDdkIsb0JBQWUsR0FBUSxFQUFFLENBQUM7UUFDMUIsNEJBQTRCO1FBQzVCLGdCQUFXLEdBQUcsV0FBVyxDQUFDO1FBQzFCLGdCQUFnQjtRQUNoQixjQUFTLEdBQUcsU0FBUyxDQUFDO1FBYXBCLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7O09BR0c7Ozs7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Ozs7OztJQUNLLHNDQUFXOzs7OztJQUFuQjtRQUFBLGlCQU9DO1FBTkMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVM7Ozs7UUFDN0MsVUFBQyxHQUFhO1lBQ1osS0FBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7WUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEQsQ0FBQyxFQUNGLENBQUM7SUFDSixDQUFDOztnQkExUEYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7O2dCQVRRLFVBQVU7Z0JBRVYsbUJBQW1CO2dCQUNuQixrQkFBa0I7OzsyQkFQM0I7Q0F1UUMsQUE1UEQsSUE0UEM7U0F6UFksZ0JBQWdCOzs7Ozs7SUFHM0IscUNBQWtCOzs7OztJQUVsQiwyQ0FBMEI7Ozs7O0lBRTFCLHVDQUEwQjs7Ozs7SUFFMUIscUNBQXNCOztJQUV0QixvQ0FBbUI7Ozs7O0lBUWpCLHVDQUErQjs7Ozs7SUFDL0Isd0NBQXlDOzs7OztJQUN6Qyw4Q0FBOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gJy4uLy4uL2Vudmlyb25tZW50L2Vudmlyb25tZW50JztcbmltcG9ydCAqIGFzIHV1aWQgZnJvbSAndXVpZCc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuLCBQZXJmb3JtYW5jZUJlYW4sIFVzZXJCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBFdmVudExhYmVscywgS2V5U3Ryb2tlRXZlbnRUeXBlLCBDb25zdGFudHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5pbXBvcnQgeyBQbHVnaW5Db25maWdTZXJ2aWNlIH0gZnJvbSAnLi9oYW5kbGVDb25maWcnO1xuaW1wb3J0IHsgRW52aXJvbm1lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vZW52aXJvbm1lbnQvZW52aXJvbm1lbnQuc2VydmljZSc7XG4vKipcbiAqIEFuYWx5dGljcyBTZXJ2aWNlXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEFuYWx5dGljc1NlcnZpY2Uge1xuXG4gIC8qKiBTZXNzaW9uSWQgb2YgcGx1Z2luICovXG4gIHNlc3Npb25JZDogc3RyaW5nO1xuICAvKiogRGVtb2dyYXBoaWMgaW5mbyAqL1xuICBkZW1vZ3JhcGhpY0luZm86IGFueSA9IHt9O1xuICAvKiogRXZlbnQgbGFiZWwgY29uc3RhbnRzICovXG4gIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG4gIC8qKiBDb25zdGFudHMgKi9cbiAgY29uc3RhbnRzID0gQ29uc3RhbnRzO1xuXG4gIHVzZXJJbmZvOiBVc2VyQmVhbjtcblxuICAvKipcbiAgICogQW5hbHl0aWNzIFNlcnZpY2UgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHBsdWdpbkNvbmZpZ1xuICAgKiBAcGFyYW0gaHR0cFNlcnZpY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaHR0cFNlcnZpY2U6IEh0dHBDbGllbnQsXG4gICAgcHJpdmF0ZSBwbHVnaW5Db25maWc6IFBsdWdpbkNvbmZpZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBlbnZpcm9ubWVudFNlcnZpY2U6IEVudmlyb25tZW50U2VydmljZSkge1xuICAgIHRoaXMucGx1Z2luQ29uZmlnLmdldEVudmlyb25tZW50Q29uZmlnKCk7XG4gICAgdGhpcy5nZXRVc2VySW5mbygpO1xuICAgIHRoaXMuc2V0U2Vzc2lvbklkKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tpbmcgd2hldGhlciBzZXNzaW9uSWQgcHJlc2VudCBpbiBjb29raWUgb3Igbm90XG4gICAqIGlmIG5vIHNlc3Npb24gaWQgY29va2llIHByZXNlbnQsIGFkZGluZyBuZXcgc2Vzc2lvbiBpZCBvdGhlcndpc2UgcmV1c2luZyB0aGUgc2Vzc2lvbiBpZCB2YWx1ZVxuICAgKi9cbiAgcHJpdmF0ZSBzZXRTZXNzaW9uSWQoKTogdm9pZCB7XG4gICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0odGhpcy5jb25zdGFudHMuU0VTU0lPTl9JRCkpIHtcbiAgICAgIHRoaXMuc2Vzc2lvbklkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmNvbnN0YW50cy5TRVNTSU9OX0lEKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXNzaW9uSWQgPSB1dWlkLnY0KCk7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKHRoaXMuY29uc3RhbnRzLlNFU1NJT05fSUQsIHRoaXMuc2Vzc2lvbklkKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tpbmcgdGhlIElQIHJhbmdlIHRvIGJlIHJlc3RyaWN0XG4gICAqIEBwYXJhbSBkYXRhIC0gZGF0YSB0byBiZSBwdXNoZWRcbiAgICovXG4gIHB1YmxpYyBwdXNoRGF0YShkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wbHVnaW5Db25maWcuaGFuZGxlQ29uZmlndXJhdGlvbihkYXRhLmV2ZW50VmFsdWVzWzBdKSkge1xuICAgICAgY29uc3QgYW5hbHl0aWNzT2JqZWN0TGlzdCA9IHRoaXMucGx1Z2luQ29uZmlnLnJlbW92ZUNoZWNrVXJscyhkYXRhLmV2ZW50VmFsdWVzKTtcbiAgICAgIGlmIChhbmFseXRpY3NPYmplY3RMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5wdWJsaXNoVE9BdXRoUzMoYW5hbHl0aWNzT2JqZWN0TGlzdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuXG4gIC8qKlxuICAgKiBDb252ZXJ0aW5nIEpTT04gQXJyYXkgdG8gc3RyaW5nXG4gICAqIEBwYXJhbSBkYXRhXG4gICAqL1xuICBwcml2YXRlIHByb2Nlc3NGb3JBdGhlbmEoZGF0YTogQXJyYXk8QW5hbHl0aWNzQmVhbj4pOiBzdHJpbmcge1xuICAgIGlmIChkYXRhICYmIGRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIGRhdGEubWFwKChvYmplY3Q6IGFueSkgPT4ge1xuICAgICAgICBvYmplY3RbJ3Nlc3Npb25JZCddID0gdGhpcy5zZXNzaW9uSWQ7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmplY3QpO1xuICAgICAgfSkuam9pbignXFxuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICAqIFByZXBhcmluZyBkYXRhIHRvIGJlIHB1c2hlZCB0byBEYXRhU3RvcmFnZVxuICAgICogQHBhcmFtIGRhdGEgIGRhdGEgdG8gYmUgcHVzaGVkXG4gICAgKi9cbiAgcHJpdmF0ZSBwdWJsaXNoVE9BdXRoUzMoZGF0YTogYW55KTogdm9pZCB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBgJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXX1fJHt0aGlzLnNlc3Npb25JZH1fJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCl9Lmpzb25gO1xuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xuICAgIHRoaXMucHVzaERhdGFUb1MzKGZpbGVuYW1lLCB0aGlzLnByb2Nlc3NGb3JBdGhlbmEoZGF0YSksIGhlYWRlcnMpO1xuICB9XG5cblxuICAvKipcbiAgICogUHVzaGluZyBkYXRhIHRvIGNvcnJlc3BvbmRpbmcgYnVja2V0IHVzaW5nIGRhdGEgY29sbGVjdGlvbiBhcGlcbiAgICogQHBhcmFtIHBhdGggLSBzZXJ2aWNlIHBhdGhcbiAgICogQHBhcmFtIGRhdGEgLSBkYXRhIHRvIGJlIHB1c2hlZFxuICAgKi9cbiAgcHJpdmF0ZSBwdXNoRGF0YVRvUzMocGF0aDogc3RyaW5nLCBkYXRhOiBhbnksIGhlYWRlcnM6IEh0dHBIZWFkZXJzKTogdm9pZCB7XG4gICAgY29uc3QgdXJsID0gYCR7ZW52aXJvbm1lbnQuZGF0YUNvbGxlY3Rpb25BcGl9JHtwYXRofWA7XG4gICAgdGhpcy5odHRwU2VydmljZS5wdXQodXJsLCBkYXRhLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSkuc3Vic2NyaWJlKHJlcyA9PiB7IH0sIGVyciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhdmUgdGhlIGNhcHR1cmVkIEhUTUwgdG8gdGhlIGRhdGEgY29sbGVjdGlvblxuICAgKiBAcGFyYW0gaHRtbFRlbXBsYXRlIC0gRE9NIENvbnRlbnRcbiAgICogQHBhcmFtIHNjcmVlbnNob3ROYW1lIC0gZmlsZW5hbWUgdG8gYmUgc2F2ZWRcbiAgICovXG4gIHB1YmxpYyBzYXZlU2NyZWVuc2hvdHNJblMzKGh0bWxUZW1wbGF0ZTogc3RyaW5nLCBzY3JlZW5zaG90TmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGx1Z2luQ29uZmlnLmNoZWNrRGlzYWJsZVRyYWNraW5nKCkpIHtcbiAgICAgIGNvbnN0IGZpbGVuYW1lID0gYGFzc2V0cy8ke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdfS8ke3RoaXMuc2Vzc2lvbklkfS8ke3NjcmVlbnNob3ROYW1lfS5odG1sYDtcbiAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ3RleHQvaHRtbCcgfSk7XG4gICAgICB0aGlzLnB1c2hEYXRhVG9TMyhmaWxlbmFtZSwgaHRtbFRlbXBsYXRlLCBoZWFkZXJzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHVzaGluZyBjb25zb2xlIGVycm9ycyB0byBTMyBidWNrZXRcbiAgICogQHBhcmFtIGRhdGEgXG4gICAqL1xuICBwdWJsaWMgcHVibGlzaENvbnNvbGVFcnJvcnMoZGF0YTogYW55KTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGx1Z2luQ29uZmlnLmNoZWNrRGlzYWJsZVRyYWNraW5nKCkpIHtcbiAgICAgIGRhdGFbJ3Nlc3Npb25JZCddID0gdGhpcy5zZXNzaW9uSWQ7XG4gICAgICBjb25zdCBmaWxlbmFtZSA9IGAke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdfV8ke3RoaXMuc2Vzc2lvbklkfV9jb25zb2xlX2Vycm9yc18ke25ldyBEYXRlKCkuZ2V0VGltZSgpfS5qc29uYDtcbiAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xuICAgICAgdGhpcy5wdXNoRGF0YVRvUzMoZmlsZW5hbWUsIGRhdGEsIGhlYWRlcnMpO1xuICAgIH1cbiAgfVxuXG5cblxuICAvKipcbiAgICogU2V0dGluZyBhbmFseXRpY3Mgb2JqZWN0IHRvIGJlIHNhdmVkIGluIFMzIGJ1Y2tldFxuICAgKiBAcGFyYW0gdXNlckRhdGEgLSBEYXRhIHRyYW5zZmVycmVkIHRvIEV2ZW50IERpcmVjdGl2ZVxuICAgKiBAcGFyYW0gZXZlbnREZXRhaWxzIC0gUG9zaXRpb24gb2YgZXZlbnRzXG4gICAqIEBwYXJhbSBldmVudE5hbWUgIC0gVHlwZSBvZiBldmVudFxuICAgKiBAcGFyYW0gc2NyZWVuc2hvdE5hbWUgIC0gZmlsZSBuYW1lIG9mIHNhdmVkIHNjcmVlbnNob3QgaWYgdGhlIGV2ZW50IGlzIFBhZ2VMb2FkZWRcbiAgICovXG4gIHB1YmxpYyBzZXRBbmFseXRpY3NEYXRhKFxuICAgIHVzZXJEYXRhOiBhbnkgPSB7fSxcbiAgICBldmVudERldGFpbHM6IGFueSxcbiAgICBldmVudE5hbWU6IHN0cmluZyxcbiAgICBzY3JlZW5zaG90TmFtZTogc3RyaW5nLFxuICAgIG9wdGlvbmFsPzoge1xuICAgICAgZXZlbnRDb21wb25lbnQ/OiBzdHJpbmcsXG4gICAgICBrZXlTdHJva2VEYXRhPzogS2V5U3Ryb2tlRXZlbnRUeXBlLFxuICAgICAgY29uc29sZUVycm9ycz86IHN0cmluZ1xuICAgIH0pOiBBbmFseXRpY3NCZWFuIHtcbiAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID0ge1xuICAgICAgZXZlbnRMYWJlbDogZXZlbnROYW1lLFxuICAgICAgZXZlbnRDb21wb25lbnQ6IG9wdGlvbmFsICYmIG9wdGlvbmFsLmV2ZW50Q29tcG9uZW50ID8gb3B0aW9uYWwuZXZlbnRDb21wb25lbnQgOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJz8nKVswXSxcbiAgICAgIGJyb3dzZXI6IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LFxuICAgICAgZnVsbFVSTDogd2luZG93LmxvY2F0aW9uLmhyZWYsXG4gICAgICBvcmlnaW46IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4sXG4gICAgICByZXNvbHV0aW9uOiBgJHt3aW5kb3cuaW5uZXJXaWR0aH14JHt3aW5kb3cuaW5uZXJIZWlnaHR9YCxcbiAgICAgIHhDb29yZDogdGhpcy5nZXRFdmVudERldGFpbHMoZXZlbnREZXRhaWxzWydjbGllbnRYJ10pLFxuICAgICAgeUNvb3JkOiB0aGlzLmdldEV2ZW50RGV0YWlscyhldmVudERldGFpbHNbJ2NsaWVudFknXSksXG4gICAgICBwYWdlWENvb3JkOiB3aW5kb3cucGFnZVhPZmZzZXQudG9TdHJpbmcoKSB8fCAnMCcsXG4gICAgICBwYWdlWUNvb3JkOiB3aW5kb3cucGFnZVlPZmZzZXQudG9TdHJpbmcoKSB8fCAnMCcsXG4gICAgICBldmVudFRpbWU6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgIHNjcmVlbnNob3Q6IHNjcmVlbnNob3ROYW1lLFxuICAgICAgYWRkaXRpb25hbEluZm86IHVzZXJEYXRhLFxuICAgICAgZXJyb3JzOiAob3B0aW9uYWwgJiYgb3B0aW9uYWwuY29uc29sZUVycm9ycykgPyBvcHRpb25hbC5jb25zb2xlRXJyb3JzIDogJycsXG4gICAgICB1dG06IHRoaXMuZ2V0VVRNUGFyYW1ldGVycyh3aW5kb3cubG9jYXRpb24uaHJlZiksXG4gICAgICBkZW1vZ3JhcGhpY0luZm86IHRoaXMucGx1Z2luQ29uZmlnLmdldERlbW9ncmFwaGljSW5mbygpLFxuICAgICAga2V5U3Ryb2tlRGF0YTogKG9wdGlvbmFsICYmIG9wdGlvbmFsLmtleVN0cm9rZURhdGEpID8gb3B0aW9uYWwua2V5U3Ryb2tlRGF0YSA6IHRoaXMuZ2V0RW1wdHlLZXlTdHJva2VEYXRhKCksXG4gICAgICBodG1sRWxlbWVudDogdGhpcy5nZXRIdG1sRWxlbWVudChldmVudERldGFpbHNbJ3RhcmdldCddLCBldmVudE5hbWUpLFxuICAgICAgcGVyZm9ybWFuY2U6IHRoaXMuZ2V0UGVyZm9ybWFuY2VEZXRhaWxzKCksXG4gICAgICB1c2VySW5mbzogdGhpcy51c2VySW5mb1xuICAgIH07XG4gICAgcmV0dXJuIGFuYWx5dGljc0JlYW47XG4gIH1cblxuICAvKipcbiAgICogRXZlbnQgZGV0YWlsc1xuICAgKiBAcGFyYW0gdmFsdWUgXG4gICAqL1xuICBwcml2YXRlIGdldEV2ZW50RGV0YWlscyh2YWx1ZTogYW55KTogc3RyaW5nIHtcbiAgICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlLnRvU3RyaW5nKCkgOiAnMCc7XG4gIH1cblxuICAvKipcbiAgICogR2V0IEhUTUwgQ29udGVudFxuICAgKiBAcGFyYW0gdGFyZ2V0RWxlbWVudCAtIHRhcmdldCBlbGVtZW50XG4gICAqL1xuICBwcml2YXRlIGdldEh0bWxFbGVtZW50KHRhcmdldEVsZW1lbnQ6IGFueSwgZXZlbnROYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmIChldmVudE5hbWUgIT09IHRoaXMuZXZlbnRMYWJlbHMuTU9VU0VfTU9WRSAmJiBldmVudE5hbWUgIT09IHRoaXMuZXZlbnRMYWJlbHMuU0NST0xMKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0RWxlbWVudCAhPT0gdW5kZWZpbmVkID8gdGFyZ2V0RWxlbWVudFsnaW5uZXJIVE1MJ10gOiAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfVxuXG5cbiAgcHJpdmF0ZSBnZXRFbXB0eUtleVN0cm9rZURhdGEoKTogS2V5U3Ryb2tlRXZlbnRUeXBlIHtcbiAgICByZXR1cm4ge1xuICAgICAga2V5OiAnJyxcbiAgICAgIGtleUNvZGU6ICcnLFxuICAgICAgY29kZTogJycsXG4gICAgICBlbGVtZW50SWQ6ICcnLFxuICAgICAgZm9ybTogJycsXG4gICAgICBodG1sRWxlbWVudFR5cGU6ICcnLFxuICAgICAgaXNGb3JtOiBmYWxzZSxcbiAgICAgIHRhZ05hbWU6ICcnLFxuICAgICAgdmFsdWU6ICcnXG4gICAgfTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFBlcmZvcm1hbmNlIGRldGFpbHNcbiAgICovXG4gIHByaXZhdGUgZ2V0UGVyZm9ybWFuY2VEZXRhaWxzKCk6IFBlcmZvcm1hbmNlQmVhbiB7XG4gICAgY29uc3QgcGVyZm9ybWFuY2UgPSB3aW5kb3cucGVyZm9ybWFuY2U7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hdmlnYXRpb246IHBlcmZvcm1hbmNlLm5hdmlnYXRpb24sXG4gICAgICB0aW1lT3JpZ2luOiBwZXJmb3JtYW5jZS50aW1lT3JpZ2luLFxuICAgICAgdGltaW5nOiBwZXJmb3JtYW5jZS50aW1pbmdcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIE1lbW9yeSB1c2FnZSBvZiB0aGUgYXBwbGljYXRpb24gaXMgcHJvdmlkZWQgYnkgR29vZ2xlIENocm9tZVxuICAgKiBAcGFyYW0gdXNlckFnZW50IC0gVXNlciBhZ2VudCB0byBjaGVjayB0aGUgYnJvd3NlclxuICAgKi9cbiAgcHJpdmF0ZSBnZU1lbW9yeVVzYWdlSW5mbyh1c2VyQWdlbnQ6IGFueSkge1xuICAgIGNvbnN0IGlzQ2hyb21lID0gdXNlckFnZW50LnNwbGl0KCdjaHJvbWUnKS5sZW5ndGggPiAxO1xuICAgIGNvbnN0IG1lbW9yeSA9IGlzQ2hyb21lID8gd2luZG93LnBlcmZvcm1hbmNlWydtZW1vcnknXSA6ICcnO1xuICAgIHJldHVybiBtZW1vcnk7XG4gIH1cblxuICAvKipcbiAgICogR2V0dGluZyBVVE0gUGFyYW1ldGVycyBieSBwcm9jZXNzaW5nIGN1cnJlbnQgcGFnZVVSTFxuICAgKiBAcGFyYW0gdXJsIC0gUGFnZSBVUkxcbiAgICovXG4gIHByaXZhdGUgZ2V0VVRNUGFyYW1ldGVycyh1cmw6IHN0cmluZyk6IGFueSB7XG4gICAgY29uc3QgdXRtT2JqZWN0ID0ge307XG4gICAgaWYgKHVybC5pbmNsdWRlcygndXRtJykpIHtcbiAgICAgIGNvbnN0IHV0bVBhcmFtcyA9IHVybC5zcGxpdCgnPycpWzFdLnNwbGl0KCcmJyk7XG4gICAgICB1dG1QYXJhbXMubWFwKHBhcmFtID0+IHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gcGFyYW0uc3BsaXQoJz0nKTtcbiAgICAgICAgdXRtT2JqZWN0W3BhcmFtc1swXV0gPSBwYXJhbXNbMV07XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHV0bU9iamVjdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXR0aW5nIHVzZXIgaW5mb1xuICAgKi9cbiAgcHJpdmF0ZSBnZXRVc2VySW5mbygpIHtcbiAgICB0aGlzLmVudmlyb25tZW50U2VydmljZS5nZXRVc2VySW5mbygpLnN1YnNjcmliZShcbiAgICAgIChyZXM6IFVzZXJCZWFuKSA9PiB7XG4gICAgICAgIHRoaXMudXNlckluZm8gPSByZXM7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZWNlaXZlIHVzZXIgYmVhbicsIHRoaXMudXNlckluZm8pO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxufVxuIl19