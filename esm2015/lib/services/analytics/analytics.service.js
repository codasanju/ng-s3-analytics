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
export class AnalyticsService {
    /**
     * Analytics Service constructor
     * @param {?} httpService
     * @param {?} pluginConfig
     * @param {?} environmentService
     */
    constructor(httpService, pluginConfig, environmentService) {
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
     * @private
     * @return {?}
     */
    setSessionId() {
        if (sessionStorage.getItem(this.constants.SESSION_ID)) {
            this.sessionId = sessionStorage.getItem(this.constants.SESSION_ID);
        }
        else {
            this.sessionId = uuid.v4();
            sessionStorage.setItem(this.constants.SESSION_ID, this.sessionId);
        }
    }
    /**
     * Checking the IP range to be restrict
     * @param {?} data - data to be pushed
     * @return {?}
     */
    pushData(data) {
        if (this.pluginConfig.handleConfiguration(data.eventValues[0])) {
            /** @type {?} */
            const analyticsObjectList = this.pluginConfig.removeCheckUrls(data.eventValues);
            if (analyticsObjectList.length > 0) {
                this.publishTOAuthS3(analyticsObjectList);
            }
        }
    }
    /**
     * Converting JSON Array to string
     * @private
     * @param {?} data
     * @return {?}
     */
    processForAthena(data) {
        if (data && data.length > 0) {
            return data.map((/**
             * @param {?} object
             * @return {?}
             */
            (object) => {
                object['sessionId'] = this.sessionId;
                object['eventId'] = `${this.sessionId}T${new Date(object.eventTime).getTime()}`;
                return JSON.stringify(object);
            })).join('\n');
        }
        else {
            return JSON.stringify(data);
        }
    }
    /**
     * Preparing data to be pushed to DataStorage
     * @private
     * @param {?} data  data to be pushed
     * @return {?}
     */
    publishTOAuthS3(data) {
        /** @type {?} */
        const filename = `${new Date().toISOString().split('T')[0]}_${this.sessionId}_${new Date().toISOString()}.json`;
        /** @type {?} */
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.pushDataToS3(filename, this.processForAthena(data), headers);
    }
    /**
     * Pushing data to corresponding bucket using data collection api
     * @private
     * @param {?} path - service path
     * @param {?} data - data to be pushed
     * @param {?} headers
     * @return {?}
     */
    pushDataToS3(path, data, headers) {
        /** @type {?} */
        const url = `${environment.dataCollectionApi}${path}`;
        this.httpService.put(url, data, { headers: headers }).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => { }), (/**
         * @param {?} err
         * @return {?}
         */
        err => { }));
    }
    /**
     * Save the captured HTML to the data collection
     * @param {?} htmlTemplate - DOM Content
     * @param {?} screenshotName - filename to be saved
     * @return {?}
     */
    saveScreenshotsInS3(htmlTemplate, screenshotName) {
        if (this.pluginConfig.checkDisableTracking()) {
            /** @type {?} */
            const filename = `assets/${new Date().toISOString().split('T')[0]}/${this.sessionId}/${screenshotName}.html`;
            /** @type {?} */
            const headers = new HttpHeaders({ 'Content-Type': 'text/html' });
            this.pushDataToS3(filename, htmlTemplate, headers);
        }
    }
    /**
     * Pushing console errors to S3 bucket
     * @param {?} data
     * @return {?}
     */
    publishConsoleErrors(data) {
        if (this.pluginConfig.checkDisableTracking()) {
            data['sessionId'] = this.sessionId;
            data['eventId'] = `${this.sessionId}T${new Date(data.eventTime).getTime()}_CONSOLE_ERROR`;
            /** @type {?} */
            const filename = `${new Date().toISOString().split('T')[0]}_${this.sessionId}_console_errors_${new Date().getTime()}.json`;
            /** @type {?} */
            const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
            this.pushDataToS3(filename, data, headers);
        }
    }
    /**
     * Setting analytics object to be saved in S3 bucket
     * @param {?=} userData - Data transferred to Event Directive
     * @param {?=} eventDetails - Position of events
     * @param {?=} eventName  - Type of event
     * @param {?=} screenshotName  - file name of saved screenshot if the event is PageLoaded
     * @param {?=} optional
     * @return {?}
     */
    setAnalyticsData(userData = {}, eventDetails, eventName, screenshotName, optional) {
        /** @type {?} */
        const analyticsBean = {
            eventLabel: eventName,
            eventComponent: optional && optional.eventComponent ? optional.eventComponent : window.location.pathname.split('?')[0],
            browser: window.navigator.userAgent,
            fullURL: window.location.href,
            origin: window.location.origin,
            resolution: `${window.innerWidth}x${window.innerHeight}`,
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
    }
    /**
     * Event details
     * @private
     * @param {?} value
     * @return {?}
     */
    getEventDetails(value) {
        return value !== undefined ? value.toString() : '0';
    }
    /**
     * Get HTML Content
     * @private
     * @param {?} targetElement - target element
     * @param {?} eventName
     * @return {?}
     */
    getHtmlElement(targetElement, eventName) {
        if (eventName !== this.eventLabels.MOUSE_MOVE && eventName !== this.eventLabels.SCROLL) {
            return targetElement !== undefined ? targetElement['innerHTML'] : '';
        }
        else {
            return '';
        }
    }
    /**
     * @private
     * @return {?}
     */
    getEmptyKeyStrokeData() {
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
    }
    /**
     * Performance details
     * @private
     * @return {?}
     */
    getPerformanceDetails() {
        /** @type {?} */
        const performance = window.performance;
        return {
            navigation: performance.navigation,
            timeOrigin: performance.timeOrigin,
            timing: performance.timing
        };
    }
    /**
     * Memory usage of the application is provided by Google Chrome
     * @private
     * @param {?} userAgent - User agent to check the browser
     * @return {?}
     */
    geMemoryUsageInfo(userAgent) {
        /** @type {?} */
        const isChrome = userAgent.split('chrome').length > 1;
        /** @type {?} */
        const memory = isChrome ? window.performance['memory'] : '';
        return memory;
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
     * Getting user info
     * @private
     * @return {?}
     */
    getUserInfo() {
        this.environmentService.getUserInfo().subscribe((/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            this.userInfo = res;
        }));
    }
}
AnalyticsService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
AnalyticsService.ctorParameters = () => [
    { type: HttpClient },
    { type: PluginConfigService },
    { type: EnvironmentService }
];
/** @nocollapse */ AnalyticsService.ngInjectableDef = i0.defineInjectable({ factory: function AnalyticsService_Factory() { return new AnalyticsService(i0.inject(i1.HttpClient), i0.inject(i2.PluginConfigService), i0.inject(i3.EnvironmentService)); }, token: AnalyticsService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEtBQUssSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUU3QixPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxXQUFXLEVBQXNCLFNBQVMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3JGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOzs7Ozs7OztBQU94RSxNQUFNOzs7Ozs7O0lBa0JKLFlBQ1UsV0FBdUIsRUFDdkIsWUFBaUMsRUFDakMsa0JBQXNDO1FBRnRDLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3ZCLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQUNqQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBakJoRCx1QkFBdUI7UUFDdkIsb0JBQWUsR0FBUSxFQUFFLENBQUM7UUFDMUIsNEJBQTRCO1FBQzVCLGdCQUFXLEdBQUcsV0FBVyxDQUFDO1FBQzFCLGdCQUFnQjtRQUNoQixjQUFTLEdBQUcsU0FBUyxDQUFDO1FBYXBCLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7Ozs7Ozs7SUFNTyxZQUFZO1FB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QUFDO1FBQ3RCLENBQUMsRUFDRixDQUFDO0lBQ0osQ0FBQzs7O1lBelBGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7O1lBVFEsVUFBVTtZQUVWLG1CQUFtQjtZQUNuQixrQkFBa0I7Ozs7Ozs7O0lBVXpCLHFDQUFrQjs7Ozs7SUFFbEIsMkNBQTBCOzs7OztJQUUxQix1Q0FBMEI7Ozs7O0lBRTFCLHFDQUFzQjs7SUFFdEIsb0NBQW1COzs7OztJQVFqQix1Q0FBK0I7Ozs7O0lBQy9CLHdDQUF5Qzs7Ozs7SUFDekMsOENBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudCc7XG5pbXBvcnQgKiBhcyB1dWlkIGZyb20gJ3V1aWQnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiwgUGVyZm9ybWFuY2VCZWFuLCBVc2VyQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgRXZlbnRMYWJlbHMsIEtleVN0cm9rZUV2ZW50VHlwZSwgQ29uc3RhbnRzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuaW1wb3J0IHsgUGx1Z2luQ29uZmlnU2VydmljZSB9IGZyb20gJy4vaGFuZGxlQ29uZmlnJztcbmltcG9ydCB7IEVudmlyb25tZW50U2VydmljZSB9IGZyb20gJy4uL2Vudmlyb25tZW50L2Vudmlyb25tZW50LnNlcnZpY2UnO1xuLyoqXG4gKiBBbmFseXRpY3MgU2VydmljZVxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBbmFseXRpY3NTZXJ2aWNlIHtcblxuICAvKiogU2Vzc2lvbklkIG9mIHBsdWdpbiAqL1xuICBzZXNzaW9uSWQ6IHN0cmluZztcbiAgLyoqIERlbW9ncmFwaGljIGluZm8gKi9cbiAgZGVtb2dyYXBoaWNJbmZvOiBhbnkgPSB7fTtcbiAgLyoqIEV2ZW50IGxhYmVsIGNvbnN0YW50cyAqL1xuICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuICAvKiogQ29uc3RhbnRzICovXG4gIGNvbnN0YW50cyA9IENvbnN0YW50cztcblxuICB1c2VySW5mbzogVXNlckJlYW47XG5cbiAgLyoqXG4gICAqIEFuYWx5dGljcyBTZXJ2aWNlIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBwbHVnaW5Db25maWdcbiAgICogQHBhcmFtIGh0dHBTZXJ2aWNlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGh0dHBTZXJ2aWNlOiBIdHRwQ2xpZW50LFxuICAgIHByaXZhdGUgcGx1Z2luQ29uZmlnOiBQbHVnaW5Db25maWdTZXJ2aWNlLFxuICAgIHByaXZhdGUgZW52aXJvbm1lbnRTZXJ2aWNlOiBFbnZpcm9ubWVudFNlcnZpY2UpIHtcbiAgICB0aGlzLnBsdWdpbkNvbmZpZy5nZXRFbnZpcm9ubWVudENvbmZpZygpO1xuICAgIHRoaXMuZ2V0VXNlckluZm8oKTtcbiAgICB0aGlzLnNldFNlc3Npb25JZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNraW5nIHdoZXRoZXIgc2Vzc2lvbklkIHByZXNlbnQgaW4gY29va2llIG9yIG5vdFxuICAgKiBpZiBubyBzZXNzaW9uIGlkIGNvb2tpZSBwcmVzZW50LCBhZGRpbmcgbmV3IHNlc3Npb24gaWQgb3RoZXJ3aXNlIHJldXNpbmcgdGhlIHNlc3Npb24gaWQgdmFsdWVcbiAgICovXG4gIHByaXZhdGUgc2V0U2Vzc2lvbklkKCk6IHZvaWQge1xuICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKHRoaXMuY29uc3RhbnRzLlNFU1NJT05fSUQpKSB7XG4gICAgICB0aGlzLnNlc3Npb25JZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0odGhpcy5jb25zdGFudHMuU0VTU0lPTl9JRCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2Vzc2lvbklkID0gdXVpZC52NCgpO1xuICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSh0aGlzLmNvbnN0YW50cy5TRVNTSU9OX0lELCB0aGlzLnNlc3Npb25JZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNraW5nIHRoZSBJUCByYW5nZSB0byBiZSByZXN0cmljdFxuICAgKiBAcGFyYW0gZGF0YSAtIGRhdGEgdG8gYmUgcHVzaGVkXG4gICAqL1xuICBwdWJsaWMgcHVzaERhdGEoZGF0YTogYW55KTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGx1Z2luQ29uZmlnLmhhbmRsZUNvbmZpZ3VyYXRpb24oZGF0YS5ldmVudFZhbHVlc1swXSkpIHtcbiAgICAgIGNvbnN0IGFuYWx5dGljc09iamVjdExpc3QgPSB0aGlzLnBsdWdpbkNvbmZpZy5yZW1vdmVDaGVja1VybHMoZGF0YS5ldmVudFZhbHVlcyk7XG4gICAgICBpZiAoYW5hbHl0aWNzT2JqZWN0TGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMucHVibGlzaFRPQXV0aFMzKGFuYWx5dGljc09iamVjdExpc3QpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cblxuICAvKipcbiAgICogQ29udmVydGluZyBKU09OIEFycmF5IHRvIHN0cmluZ1xuICAgKiBAcGFyYW0gZGF0YVxuICAgKi9cbiAgcHJpdmF0ZSBwcm9jZXNzRm9yQXRoZW5hKGRhdGE6IEFycmF5PEFuYWx5dGljc0JlYW4+KTogc3RyaW5nIHtcbiAgICBpZiAoZGF0YSAmJiBkYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBkYXRhLm1hcCgob2JqZWN0OiBhbnkpID0+IHtcbiAgICAgICAgb2JqZWN0WydzZXNzaW9uSWQnXSA9IHRoaXMuc2Vzc2lvbklkO1xuICAgICAgICBvYmplY3RbJ2V2ZW50SWQnXSA9IGAke3RoaXMuc2Vzc2lvbklkfVQke25ldyBEYXRlKG9iamVjdC5ldmVudFRpbWUpLmdldFRpbWUoKX1gO1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqZWN0KTtcbiAgICAgIH0pLmpvaW4oJ1xcbicpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAgKiBQcmVwYXJpbmcgZGF0YSB0byBiZSBwdXNoZWQgdG8gRGF0YVN0b3JhZ2VcbiAgICAqIEBwYXJhbSBkYXRhICBkYXRhIHRvIGJlIHB1c2hlZFxuICAgICovXG4gIHByaXZhdGUgcHVibGlzaFRPQXV0aFMzKGRhdGE6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gYCR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF19XyR7dGhpcy5zZXNzaW9uSWR9XyR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpfS5qc29uYDtcbiAgICBjb25zdCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcbiAgICB0aGlzLnB1c2hEYXRhVG9TMyhmaWxlbmFtZSwgdGhpcy5wcm9jZXNzRm9yQXRoZW5hKGRhdGEpLCBoZWFkZXJzKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFB1c2hpbmcgZGF0YSB0byBjb3JyZXNwb25kaW5nIGJ1Y2tldCB1c2luZyBkYXRhIGNvbGxlY3Rpb24gYXBpXG4gICAqIEBwYXJhbSBwYXRoIC0gc2VydmljZSBwYXRoXG4gICAqIEBwYXJhbSBkYXRhIC0gZGF0YSB0byBiZSBwdXNoZWRcbiAgICovXG4gIHByaXZhdGUgcHVzaERhdGFUb1MzKHBhdGg6IHN0cmluZywgZGF0YTogYW55LCBoZWFkZXJzOiBIdHRwSGVhZGVycyk6IHZvaWQge1xuICAgIGNvbnN0IHVybCA9IGAke2Vudmlyb25tZW50LmRhdGFDb2xsZWN0aW9uQXBpfSR7cGF0aH1gO1xuICAgIHRoaXMuaHR0cFNlcnZpY2UucHV0KHVybCwgZGF0YSwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pLnN1YnNjcmliZShyZXMgPT4geyB9LCBlcnIgPT4ge30pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhdmUgdGhlIGNhcHR1cmVkIEhUTUwgdG8gdGhlIGRhdGEgY29sbGVjdGlvblxuICAgKiBAcGFyYW0gaHRtbFRlbXBsYXRlIC0gRE9NIENvbnRlbnRcbiAgICogQHBhcmFtIHNjcmVlbnNob3ROYW1lIC0gZmlsZW5hbWUgdG8gYmUgc2F2ZWRcbiAgICovXG4gIHB1YmxpYyBzYXZlU2NyZWVuc2hvdHNJblMzKGh0bWxUZW1wbGF0ZTogc3RyaW5nLCBzY3JlZW5zaG90TmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGx1Z2luQ29uZmlnLmNoZWNrRGlzYWJsZVRyYWNraW5nKCkpIHtcbiAgICAgIGNvbnN0IGZpbGVuYW1lID0gYGFzc2V0cy8ke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdfS8ke3RoaXMuc2Vzc2lvbklkfS8ke3NjcmVlbnNob3ROYW1lfS5odG1sYDtcbiAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ3RleHQvaHRtbCcgfSk7XG4gICAgICB0aGlzLnB1c2hEYXRhVG9TMyhmaWxlbmFtZSwgaHRtbFRlbXBsYXRlLCBoZWFkZXJzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHVzaGluZyBjb25zb2xlIGVycm9ycyB0byBTMyBidWNrZXRcbiAgICogQHBhcmFtIGRhdGEgXG4gICAqL1xuICBwdWJsaWMgcHVibGlzaENvbnNvbGVFcnJvcnMoZGF0YTogYW55KTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGx1Z2luQ29uZmlnLmNoZWNrRGlzYWJsZVRyYWNraW5nKCkpIHtcbiAgICAgIGRhdGFbJ3Nlc3Npb25JZCddID0gdGhpcy5zZXNzaW9uSWQ7XG4gICAgICBkYXRhWydldmVudElkJ10gPSBgJHt0aGlzLnNlc3Npb25JZH1UJHtuZXcgRGF0ZShkYXRhLmV2ZW50VGltZSkuZ2V0VGltZSgpfV9DT05TT0xFX0VSUk9SYDtcbiAgICAgIGNvbnN0IGZpbGVuYW1lID0gYCR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF19XyR7dGhpcy5zZXNzaW9uSWR9X2NvbnNvbGVfZXJyb3JzXyR7bmV3IERhdGUoKS5nZXRUaW1lKCl9Lmpzb25gO1xuICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG4gICAgICB0aGlzLnB1c2hEYXRhVG9TMyhmaWxlbmFtZSwgZGF0YSwgaGVhZGVycyk7XG4gICAgfVxuICB9XG5cblxuXG4gIC8qKlxuICAgKiBTZXR0aW5nIGFuYWx5dGljcyBvYmplY3QgdG8gYmUgc2F2ZWQgaW4gUzMgYnVja2V0XG4gICAqIEBwYXJhbSB1c2VyRGF0YSAtIERhdGEgdHJhbnNmZXJyZWQgdG8gRXZlbnQgRGlyZWN0aXZlXG4gICAqIEBwYXJhbSBldmVudERldGFpbHMgLSBQb3NpdGlvbiBvZiBldmVudHNcbiAgICogQHBhcmFtIGV2ZW50TmFtZSAgLSBUeXBlIG9mIGV2ZW50XG4gICAqIEBwYXJhbSBzY3JlZW5zaG90TmFtZSAgLSBmaWxlIG5hbWUgb2Ygc2F2ZWQgc2NyZWVuc2hvdCBpZiB0aGUgZXZlbnQgaXMgUGFnZUxvYWRlZFxuICAgKi9cbiAgcHVibGljIHNldEFuYWx5dGljc0RhdGEoXG4gICAgdXNlckRhdGE6IGFueSA9IHt9LFxuICAgIGV2ZW50RGV0YWlsczogYW55LFxuICAgIGV2ZW50TmFtZTogc3RyaW5nLFxuICAgIHNjcmVlbnNob3ROYW1lOiBzdHJpbmcsXG4gICAgb3B0aW9uYWw/OiB7XG4gICAgICBldmVudENvbXBvbmVudD86IHN0cmluZyxcbiAgICAgIGtleVN0cm9rZURhdGE/OiBLZXlTdHJva2VFdmVudFR5cGUsXG4gICAgICBjb25zb2xlRXJyb3JzPzogc3RyaW5nXG4gICAgfSk6IEFuYWx5dGljc0JlYW4ge1xuICAgIGNvbnN0IGFuYWx5dGljc0JlYW46IEFuYWx5dGljc0JlYW4gPSB7XG4gICAgICBldmVudExhYmVsOiBldmVudE5hbWUsXG4gICAgICBldmVudENvbXBvbmVudDogb3B0aW9uYWwgJiYgb3B0aW9uYWwuZXZlbnRDb21wb25lbnQgPyBvcHRpb25hbC5ldmVudENvbXBvbmVudCA6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnPycpWzBdLFxuICAgICAgYnJvd3Nlcjogd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQsXG4gICAgICBmdWxsVVJMOiB3aW5kb3cubG9jYXRpb24uaHJlZixcbiAgICAgIG9yaWdpbjogd2luZG93LmxvY2F0aW9uLm9yaWdpbixcbiAgICAgIHJlc29sdXRpb246IGAke3dpbmRvdy5pbm5lcldpZHRofXgke3dpbmRvdy5pbm5lckhlaWdodH1gLFxuICAgICAgeENvb3JkOiB0aGlzLmdldEV2ZW50RGV0YWlscyhldmVudERldGFpbHNbJ2NsaWVudFgnXSksXG4gICAgICB5Q29vcmQ6IHRoaXMuZ2V0RXZlbnREZXRhaWxzKGV2ZW50RGV0YWlsc1snY2xpZW50WSddKSxcbiAgICAgIHBhZ2VYQ29vcmQ6IHdpbmRvdy5wYWdlWE9mZnNldC50b1N0cmluZygpIHx8ICcwJyxcbiAgICAgIHBhZ2VZQ29vcmQ6IHdpbmRvdy5wYWdlWU9mZnNldC50b1N0cmluZygpIHx8ICcwJyxcbiAgICAgIGV2ZW50VGltZTogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgc2NyZWVuc2hvdDogc2NyZWVuc2hvdE5hbWUsXG4gICAgICBhZGRpdGlvbmFsSW5mbzogdXNlckRhdGEsXG4gICAgICBlcnJvcnM6IChvcHRpb25hbCAmJiBvcHRpb25hbC5jb25zb2xlRXJyb3JzKSA/IG9wdGlvbmFsLmNvbnNvbGVFcnJvcnMgOiAnJyxcbiAgICAgIHV0bTogdGhpcy5nZXRVVE1QYXJhbWV0ZXJzKHdpbmRvdy5sb2NhdGlvbi5ocmVmKSxcbiAgICAgIGRlbW9ncmFwaGljSW5mbzogdGhpcy5wbHVnaW5Db25maWcuZ2V0RGVtb2dyYXBoaWNJbmZvKCksXG4gICAgICBrZXlTdHJva2VEYXRhOiAob3B0aW9uYWwgJiYgb3B0aW9uYWwua2V5U3Ryb2tlRGF0YSkgPyBvcHRpb25hbC5rZXlTdHJva2VEYXRhIDogdGhpcy5nZXRFbXB0eUtleVN0cm9rZURhdGEoKSxcbiAgICAgIGh0bWxFbGVtZW50OiB0aGlzLmdldEh0bWxFbGVtZW50KGV2ZW50RGV0YWlsc1sndGFyZ2V0J10sIGV2ZW50TmFtZSksXG4gICAgICBwZXJmb3JtYW5jZTogdGhpcy5nZXRQZXJmb3JtYW5jZURldGFpbHMoKSxcbiAgICAgIHVzZXJJbmZvOiB0aGlzLnVzZXJJbmZvXG4gICAgfTtcbiAgICByZXR1cm4gYW5hbHl0aWNzQmVhbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBFdmVudCBkZXRhaWxzXG4gICAqIEBwYXJhbSB2YWx1ZSBcbiAgICovXG4gIHByaXZhdGUgZ2V0RXZlbnREZXRhaWxzKHZhbHVlOiBhbnkpOiBzdHJpbmcge1xuICAgIHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUudG9TdHJpbmcoKSA6ICcwJztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgSFRNTCBDb250ZW50XG4gICAqIEBwYXJhbSB0YXJnZXRFbGVtZW50IC0gdGFyZ2V0IGVsZW1lbnRcbiAgICovXG4gIHByaXZhdGUgZ2V0SHRtbEVsZW1lbnQodGFyZ2V0RWxlbWVudDogYW55LCBldmVudE5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKGV2ZW50TmFtZSAhPT0gdGhpcy5ldmVudExhYmVscy5NT1VTRV9NT1ZFICYmIGV2ZW50TmFtZSAhPT0gdGhpcy5ldmVudExhYmVscy5TQ1JPTEwpIHtcbiAgICAgIHJldHVybiB0YXJnZXRFbGVtZW50ICE9PSB1bmRlZmluZWQgPyB0YXJnZXRFbGVtZW50Wydpbm5lckhUTUwnXSA6ICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9XG5cblxuICBwcml2YXRlIGdldEVtcHR5S2V5U3Ryb2tlRGF0YSgpOiBLZXlTdHJva2VFdmVudFR5cGUge1xuICAgIHJldHVybiB7XG4gICAgICBrZXk6ICcnLFxuICAgICAga2V5Q29kZTogJycsXG4gICAgICBjb2RlOiAnJyxcbiAgICAgIGVsZW1lbnRJZDogJycsXG4gICAgICBmb3JtOiAnJyxcbiAgICAgIGh0bWxFbGVtZW50VHlwZTogJycsXG4gICAgICBpc0Zvcm06IGZhbHNlLFxuICAgICAgdGFnTmFtZTogJycsXG4gICAgICB2YWx1ZTogJydcbiAgICB9O1xuICB9XG5cblxuICAvKipcbiAgICogUGVyZm9ybWFuY2UgZGV0YWlsc1xuICAgKi9cbiAgcHJpdmF0ZSBnZXRQZXJmb3JtYW5jZURldGFpbHMoKTogUGVyZm9ybWFuY2VCZWFuIHtcbiAgICBjb25zdCBwZXJmb3JtYW5jZSA9IHdpbmRvdy5wZXJmb3JtYW5jZTtcbiAgICByZXR1cm4ge1xuICAgICAgbmF2aWdhdGlvbjogcGVyZm9ybWFuY2UubmF2aWdhdGlvbixcbiAgICAgIHRpbWVPcmlnaW46IHBlcmZvcm1hbmNlLnRpbWVPcmlnaW4sXG4gICAgICB0aW1pbmc6IHBlcmZvcm1hbmNlLnRpbWluZ1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogTWVtb3J5IHVzYWdlIG9mIHRoZSBhcHBsaWNhdGlvbiBpcyBwcm92aWRlZCBieSBHb29nbGUgQ2hyb21lXG4gICAqIEBwYXJhbSB1c2VyQWdlbnQgLSBVc2VyIGFnZW50IHRvIGNoZWNrIHRoZSBicm93c2VyXG4gICAqL1xuICBwcml2YXRlIGdlTWVtb3J5VXNhZ2VJbmZvKHVzZXJBZ2VudDogYW55KSB7XG4gICAgY29uc3QgaXNDaHJvbWUgPSB1c2VyQWdlbnQuc3BsaXQoJ2Nocm9tZScpLmxlbmd0aCA+IDE7XG4gICAgY29uc3QgbWVtb3J5ID0gaXNDaHJvbWUgPyB3aW5kb3cucGVyZm9ybWFuY2VbJ21lbW9yeSddIDogJyc7XG4gICAgcmV0dXJuIG1lbW9yeTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXR0aW5nIFVUTSBQYXJhbWV0ZXJzIGJ5IHByb2Nlc3NpbmcgY3VycmVudCBwYWdlVVJMXG4gICAqIEBwYXJhbSB1cmwgLSBQYWdlIFVSTFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRVVE1QYXJhbWV0ZXJzKHVybDogc3RyaW5nKTogYW55IHtcbiAgICBjb25zdCB1dG1PYmplY3QgPSB7fTtcbiAgICBpZiAodXJsLmluY2x1ZGVzKCd1dG0nKSkge1xuICAgICAgY29uc3QgdXRtUGFyYW1zID0gdXJsLnNwbGl0KCc/JylbMV0uc3BsaXQoJyYnKTtcbiAgICAgIHV0bVBhcmFtcy5tYXAocGFyYW0gPT4ge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBwYXJhbS5zcGxpdCgnPScpO1xuICAgICAgICB1dG1PYmplY3RbcGFyYW1zWzBdXSA9IHBhcmFtc1sxXTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdXRtT2JqZWN0O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHRpbmcgdXNlciBpbmZvXG4gICAqL1xuICBwcml2YXRlIGdldFVzZXJJbmZvKCkge1xuICAgIHRoaXMuZW52aXJvbm1lbnRTZXJ2aWNlLmdldFVzZXJJbmZvKCkuc3Vic2NyaWJlKFxuICAgICAgKHJlczogVXNlckJlYW4pID0+IHtcbiAgICAgICAgdGhpcy51c2VySW5mbyA9IHJlcztcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbn1cbiJdfQ==