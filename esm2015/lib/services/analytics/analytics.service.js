/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import * as uuid from 'uuid';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventLabels, Constants } from '../../types/event.types';
import * as i0 from "@angular/core";
import * as i1 from "ngx-cookie-service";
import * as i2 from "@angular/common/http";
/**
 * Analytics Service
 */
export class AnalyticsService {
    /**
     * Analytics Service constructor
     * @param {?} cookieService
     * @param {?} httpService
     */
    constructor(cookieService, httpService) {
        this.cookieService = cookieService;
        this.httpService = httpService;
        /** Demographic info */
        this.demographicInfo = {};
        /** Event label constants */
        this.eventLabels = EventLabels;
        /** Constants */
        this.constants = Constants;
        if (!this.cookieService.check(this.constants.DEMOGRAPHIC_INFO)) {
            this.getIp();
        }
        else {
            this.demographicInfo = JSON.parse(this.cookieService.get(this.constants.DEMOGRAPHIC_INFO));
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
        if (this.checkIpRange()) {
            this.publishTOAuthS3(data);
        }
    }
    /**
     * IP range restriction added
     * \@restrictIPRange is a regex
     * if \@restrictIPRange is match with current IP,
     * the analytics data will be restricted
     * @private
     * @return {?}
     */
    checkIpRange() {
        /** @type {?} */
        const ipRange = environment.restrictIPRange;
        if (ipRange && this.demographicInfo.ip) {
            return this.demographicInfo.ip.match(ipRange) ? false : true;
        }
        else {
            return true;
        }
    }
    /**
     * Converting JSON Array to string
     * @private
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
        this.pushDataToS3(filename, this.processForAthena(data.eventValues), headers);
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
        err => {
            console.log(err);
        }));
    }
    /**
     * Save the captured HTML to the data collection
     * @param {?} htmlTemplate - DOM Content
     * @param {?} screenshotName - filename to be saved
     * @return {?}
     */
    saveScreenshotsInS3(htmlTemplate, screenshotName) {
        /** @type {?} */
        const filename = `assets/${new Date().toISOString().split('T')[0]}/${this.sessionId}/${screenshotName}.html`;
        /** @type {?} */
        const headers = new HttpHeaders({ 'Content-Type': 'text/html' });
        this.pushDataToS3(filename, htmlTemplate, headers);
    }
    /**
     * Pushing console errors to S3 bucket
     * @param {?} data
     * @return {?}
     */
    publishConsoleErrors(data) {
        data['sessionId'] = this.sessionId;
        /** @type {?} */
        const filename = `${new Date().toISOString().split('T')[0]}_${this.sessionId}_console_errors_${new Date().getTime()}.json`;
        /** @type {?} */
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.pushDataToS3(filename, data, headers);
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
            utm: this.getUTMParameters(window.location.href),
            demographicInfo: this.demographicInfo,
            keyStrokeData: optional && optional.keyStrokeData,
            htmlElement: this.getHtmlElement(eventDetails['target']),
            performance: this.getPerformanceDetails(),
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
     * @return {?}
     */
    getHtmlElement(targetElement) {
        return targetElement !== undefined ? targetElement['innerHTML'] : '';
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
     * Set user demographic information in cookies
     * @private
     * @return {?}
     */
    getIp() {
        this.httpService.get(this.constants.DEMOGRAPHIC_API_URL).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            this.demographicInfo = res;
            this.cookieService.set(this.constants.DEMOGRAPHIC_INFO, JSON.stringify(res), new Date(new Date().getTime() + (1000 * 60 * 60 * 24)));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEtBQUssSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUU3QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsV0FBVyxFQUFzQixTQUFTLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7OztBQU9yRixNQUFNOzs7Ozs7SUFnQkosWUFDVSxhQUE0QixFQUM1QixXQUF1QjtRQUR2QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQWRqQyx1QkFBdUI7UUFDdkIsb0JBQWUsR0FBUSxFQUFFLENBQUM7UUFDMUIsNEJBQTRCO1FBQzVCLGdCQUFXLEdBQUcsV0FBVyxDQUFDO1FBQzFCLGdCQUFnQjtRQUNoQixjQUFTLEdBQUcsU0FBUyxDQUFDO1FBVXBCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDOUQsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2Q7YUFBTTtZQUNMLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFD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QW1CLENBQUMsQ0FBQyxTQUFTOzs7O1FBQ2hFLENBQUMsR0FBUSxFQUFFLEVBQUU7WUFDWCxJQUFJLENBQUMsZUFBZSxHQUFHLEdBQUcsQ0FBQztZQUMzQixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FDcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUNwRCxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVELENBQUMsRUFDRixDQUFDO0lBQ0osQ0FBQzs7O1lBM09GLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7O1lBUlEsYUFBYTtZQUNiLFVBQVU7Ozs7Ozs7O0lBV2pCLHFDQUFrQjs7Ozs7SUFFbEIsMkNBQTBCOzs7OztJQUUxQix1Q0FBMEI7Ozs7O0lBRTFCLHFDQUFzQjs7Ozs7SUFRcEIseUNBQW9DOzs7OztJQUNwQyx1Q0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gJy4uLy4uL2Vudmlyb25tZW50L2Vudmlyb25tZW50JztcbmltcG9ydCAqIGFzIHV1aWQgZnJvbSAndXVpZCc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuLCBQZXJmb3JtYW5jZUJlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnbmd4LWNvb2tpZS1zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgRXZlbnRMYWJlbHMsIEtleVN0cm9rZUV2ZW50VHlwZSwgQ29uc3RhbnRzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuLyoqXG4gKiBBbmFseXRpY3MgU2VydmljZVxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBbmFseXRpY3NTZXJ2aWNlIHtcblxuICAvKiogU2Vzc2lvbklkIG9mIHBsdWdpbiAqL1xuICBzZXNzaW9uSWQ6IHN0cmluZztcbiAgLyoqIERlbW9ncmFwaGljIGluZm8gKi9cbiAgZGVtb2dyYXBoaWNJbmZvOiBhbnkgPSB7fTtcbiAgLyoqIEV2ZW50IGxhYmVsIGNvbnN0YW50cyAqL1xuICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuICAvKiogQ29uc3RhbnRzICovXG4gIGNvbnN0YW50cyA9IENvbnN0YW50cztcblxuICAvKipcbiAgICogQW5hbHl0aWNzIFNlcnZpY2UgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGNvb2tpZVNlcnZpY2VcbiAgICogQHBhcmFtIGh0dHBTZXJ2aWNlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvb2tpZVNlcnZpY2U6IENvb2tpZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBodHRwU2VydmljZTogSHR0cENsaWVudCkge1xuICAgIGlmICghdGhpcy5jb29raWVTZXJ2aWNlLmNoZWNrKHRoaXMuY29uc3RhbnRzLkRFTU9HUkFQSElDX0lORk8pKSB7XG4gICAgICB0aGlzLmdldElwKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVtb2dyYXBoaWNJbmZvID0gSlNPTi5wYXJzZSh0aGlzLmNvb2tpZVNlcnZpY2UuZ2V0KHRoaXMuY29uc3RhbnRzLkRFTU9HUkFQSElDX0lORk8pKTtcbiAgICB9XG4gICAgdGhpcy5zZXRTZXNzaW9uSWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja2luZyB3aGV0aGVyIHNlc3Npb25JZCBwcmVzZW50IGluIGNvb2tpZSBvciBub3RcbiAgICogaWYgbm8gc2Vzc2lvbiBpZCBjb29raWUgcHJlc2VudCwgYWRkaW5nIG5ldyBzZXNzaW9uIGlkIG90aGVyd2lzZSByZXVzaW5nIHRoZSBzZXNzaW9uIGlkIHZhbHVlXG4gICAqL1xuICBwcml2YXRlIHNldFNlc3Npb25JZCgpOiB2b2lkIHtcbiAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmNvbnN0YW50cy5TRVNTSU9OX0lEKSkge1xuICAgICAgdGhpcy5zZXNzaW9uSWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKHRoaXMuY29uc3RhbnRzLlNFU1NJT05fSUQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlc3Npb25JZCA9IHV1aWQudjQoKTtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0odGhpcy5jb25zdGFudHMuU0VTU0lPTl9JRCwgdGhpcy5zZXNzaW9uSWQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja2luZyB0aGUgSVAgcmFuZ2UgdG8gYmUgcmVzdHJpY3RcbiAgICogQHBhcmFtIGRhdGEgLSBkYXRhIHRvIGJlIHB1c2hlZFxuICAgKi9cbiAgcHVibGljIHB1c2hEYXRhKGRhdGE6IGFueSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNoZWNrSXBSYW5nZSgpKSB7XG4gICAgICB0aGlzLnB1Ymxpc2hUT0F1dGhTMyhkYXRhKTtcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBJUCByYW5nZSByZXN0cmljdGlvbiBhZGRlZFxuICAgKiBAcmVzdHJpY3RJUFJhbmdlIGlzIGEgcmVnZXhcbiAgICogaWYgQHJlc3RyaWN0SVBSYW5nZSBpcyBtYXRjaCB3aXRoIGN1cnJlbnQgSVAsXG4gICAqIHRoZSBhbmFseXRpY3MgZGF0YSB3aWxsIGJlIHJlc3RyaWN0ZWRcbiAgICovXG4gIHByaXZhdGUgY2hlY2tJcFJhbmdlKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGlwUmFuZ2UgPSBlbnZpcm9ubWVudC5yZXN0cmljdElQUmFuZ2U7XG4gICAgaWYgKGlwUmFuZ2UgJiYgdGhpcy5kZW1vZ3JhcGhpY0luZm8uaXApIHtcbiAgICAgIHJldHVybiB0aGlzLmRlbW9ncmFwaGljSW5mby5pcC5tYXRjaChpcFJhbmdlKSA/IGZhbHNlIDogdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRpbmcgSlNPTiBBcnJheSB0byBzdHJpbmdcbiAgICogQHBhcmFtIGRhdGFcbiAgICovXG4gIHByaXZhdGUgcHJvY2Vzc0ZvckF0aGVuYShkYXRhOiBBcnJheTxBbmFseXRpY3NCZWFuPik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGRhdGEubWFwKChvYmplY3Q6IGFueSkgPT4ge1xuICAgICAgb2JqZWN0WydzZXNzaW9uSWQnXSA9IHRoaXMuc2Vzc2lvbklkO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iamVjdCk7XG4gICAgfSkuam9pbignXFxuJyk7XG4gIH1cblxuICAvKipcbiAgICAqIFByZXBhcmluZyBkYXRhIHRvIGJlIHB1c2hlZCB0byBEYXRhU3RvcmFnZVxuICAgICogQHBhcmFtIGRhdGEgIGRhdGEgdG8gYmUgcHVzaGVkXG4gICAgKi9cbiAgcHJpdmF0ZSBwdWJsaXNoVE9BdXRoUzMoZGF0YTogYW55KTogdm9pZCB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBgJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXX1fJHt0aGlzLnNlc3Npb25JZH1fJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCl9Lmpzb25gO1xuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xuICAgIHRoaXMucHVzaERhdGFUb1MzKGZpbGVuYW1lLCB0aGlzLnByb2Nlc3NGb3JBdGhlbmEoZGF0YS5ldmVudFZhbHVlcyksIGhlYWRlcnMpO1xuICB9XG5cblxuICAvKipcbiAgICogUHVzaGluZyBkYXRhIHRvIGNvcnJlc3BvbmRpbmcgYnVja2V0IHVzaW5nIGRhdGEgY29sbGVjdGlvbiBhcGlcbiAgICogQHBhcmFtIHBhdGggLSBzZXJ2aWNlIHBhdGhcbiAgICogQHBhcmFtIGRhdGEgLSBkYXRhIHRvIGJlIHB1c2hlZFxuICAgKi9cbiAgcHJpdmF0ZSBwdXNoRGF0YVRvUzMocGF0aDogc3RyaW5nLCBkYXRhOiBhbnksIGhlYWRlcnM6IEh0dHBIZWFkZXJzKTogdm9pZCB7XG4gICAgY29uc3QgdXJsID0gYCR7ZW52aXJvbm1lbnQuZGF0YUNvbGxlY3Rpb25BcGl9JHtwYXRofWA7XG5cbiAgICB0aGlzLmh0dHBTZXJ2aWNlLnB1dCh1cmwsIGRhdGEsIHsgaGVhZGVyczogaGVhZGVycyB9KS5zdWJzY3JpYmUocmVzID0+IHsgfSwgZXJyID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2F2ZSB0aGUgY2FwdHVyZWQgSFRNTCB0byB0aGUgZGF0YSBjb2xsZWN0aW9uXG4gICAqIEBwYXJhbSBodG1sVGVtcGxhdGUgLSBET00gQ29udGVudFxuICAgKiBAcGFyYW0gc2NyZWVuc2hvdE5hbWUgLSBmaWxlbmFtZSB0byBiZSBzYXZlZFxuICAgKi9cbiAgcHVibGljIHNhdmVTY3JlZW5zaG90c0luUzMoaHRtbFRlbXBsYXRlOiBzdHJpbmcsIHNjcmVlbnNob3ROYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBmaWxlbmFtZSA9IGBhc3NldHMvJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXX0vJHt0aGlzLnNlc3Npb25JZH0vJHtzY3JlZW5zaG90TmFtZX0uaHRtbGA7XG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAndGV4dC9odG1sJyB9KTtcbiAgICB0aGlzLnB1c2hEYXRhVG9TMyhmaWxlbmFtZSwgaHRtbFRlbXBsYXRlLCBoZWFkZXJzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQdXNoaW5nIGNvbnNvbGUgZXJyb3JzIHRvIFMzIGJ1Y2tldFxuICAgKiBAcGFyYW0gZGF0YSBcbiAgICovXG4gIHB1YmxpYyBwdWJsaXNoQ29uc29sZUVycm9ycyhkYXRhOiBhbnkpOiB2b2lkIHtcblxuICAgIGRhdGFbJ3Nlc3Npb25JZCddID0gdGhpcy5zZXNzaW9uSWQ7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBgJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXX1fJHt0aGlzLnNlc3Npb25JZH1fY29uc29sZV9lcnJvcnNfJHtuZXcgRGF0ZSgpLmdldFRpbWUoKX0uanNvbmA7XG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG4gICAgdGhpcy5wdXNoRGF0YVRvUzMoZmlsZW5hbWUsIGRhdGEsIGhlYWRlcnMpO1xuICB9XG5cblxuXG4gIC8qKlxuICAgKiBTZXR0aW5nIGFuYWx5dGljcyBvYmplY3QgdG8gYmUgc2F2ZWQgaW4gUzMgYnVja2V0XG4gICAqIEBwYXJhbSB1c2VyRGF0YSAtIERhdGEgdHJhbnNmZXJyZWQgdG8gRXZlbnQgRGlyZWN0aXZlXG4gICAqIEBwYXJhbSBldmVudERldGFpbHMgLSBQb3NpdGlvbiBvZiBldmVudHNcbiAgICogQHBhcmFtIGV2ZW50TmFtZSAgLSBUeXBlIG9mIGV2ZW50XG4gICAqIEBwYXJhbSBzY3JlZW5zaG90TmFtZSAgLSBmaWxlIG5hbWUgb2Ygc2F2ZWQgc2NyZWVuc2hvdCBpZiB0aGUgZXZlbnQgaXMgUGFnZUxvYWRlZFxuICAgKi9cbiAgcHVibGljIHNldEFuYWx5dGljc0RhdGEoXG4gICAgdXNlckRhdGE6IGFueSA9IHt9LFxuICAgIGV2ZW50RGV0YWlsczogYW55LFxuICAgIGV2ZW50TmFtZTogc3RyaW5nLFxuICAgIHNjcmVlbnNob3ROYW1lOiBzdHJpbmcsXG4gICAgb3B0aW9uYWw/OiB7XG4gICAgICBldmVudENvbXBvbmVudD86IHN0cmluZyxcbiAgICAgIGtleVN0cm9rZURhdGE/OiBLZXlTdHJva2VFdmVudFR5cGVcbiAgICB9KTogQW5hbHl0aWNzQmVhbiB7XG4gICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9IHtcbiAgICAgIGV2ZW50TGFiZWw6IGV2ZW50TmFtZSxcbiAgICAgIGV2ZW50Q29tcG9uZW50OiBvcHRpb25hbCAmJiBvcHRpb25hbC5ldmVudENvbXBvbmVudCA/IG9wdGlvbmFsLmV2ZW50Q29tcG9uZW50IDogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCc/JylbMF0sXG4gICAgICBicm93c2VyOiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCxcbiAgICAgIGZ1bGxVUkw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxuICAgICAgb3JpZ2luOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luLFxuICAgICAgcmVzb2x1dGlvbjogYCR7d2luZG93LmlubmVyV2lkdGh9eCR7d2luZG93LmlubmVySGVpZ2h0fWAsXG4gICAgICB4Q29vcmQ6IHRoaXMuZ2V0RXZlbnREZXRhaWxzKGV2ZW50RGV0YWlsc1snY2xpZW50WCddKSxcbiAgICAgIHlDb29yZDogdGhpcy5nZXRFdmVudERldGFpbHMoZXZlbnREZXRhaWxzWydjbGllbnRZJ10pLFxuICAgICAgcGFnZVhDb29yZDogd2luZG93LnBhZ2VYT2Zmc2V0LnRvU3RyaW5nKCkgfHwgJzAnLFxuICAgICAgcGFnZVlDb29yZDogd2luZG93LnBhZ2VZT2Zmc2V0LnRvU3RyaW5nKCkgfHwgJzAnLFxuICAgICAgZXZlbnRUaW1lOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICBzY3JlZW5zaG90OiBzY3JlZW5zaG90TmFtZSxcbiAgICAgIGFkZGl0aW9uYWxJbmZvOiB1c2VyRGF0YSxcbiAgICAgIHV0bTogdGhpcy5nZXRVVE1QYXJhbWV0ZXJzKHdpbmRvdy5sb2NhdGlvbi5ocmVmKSxcbiAgICAgIGRlbW9ncmFwaGljSW5mbzogdGhpcy5kZW1vZ3JhcGhpY0luZm8sXG4gICAgICBrZXlTdHJva2VEYXRhOiBvcHRpb25hbCAmJiBvcHRpb25hbC5rZXlTdHJva2VEYXRhLFxuICAgICAgaHRtbEVsZW1lbnQ6IHRoaXMuZ2V0SHRtbEVsZW1lbnQoZXZlbnREZXRhaWxzWyd0YXJnZXQnXSksXG4gICAgICBwZXJmb3JtYW5jZTogdGhpcy5nZXRQZXJmb3JtYW5jZURldGFpbHMoKSxcbiAgICB9O1xuICAgIHJldHVybiBhbmFseXRpY3NCZWFuO1xuICB9XG5cbiAgLyoqXG4gICAqIEV2ZW50IGRldGFpbHNcbiAgICogQHBhcmFtIHZhbHVlIFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRFdmVudERldGFpbHModmFsdWU6IGFueSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZS50b1N0cmluZygpIDogJzAnO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBIVE1MIENvbnRlbnRcbiAgICogQHBhcmFtIHRhcmdldEVsZW1lbnQgLSB0YXJnZXQgZWxlbWVudFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRIdG1sRWxlbWVudCh0YXJnZXRFbGVtZW50OiBhbnkpOiBzdHJpbmcge1xuICAgIHJldHVybiB0YXJnZXRFbGVtZW50ICE9PSB1bmRlZmluZWQgPyB0YXJnZXRFbGVtZW50Wydpbm5lckhUTUwnXSA6ICcnO1xuICB9XG5cblxuICAvKipcbiAgICogUGVyZm9ybWFuY2UgZGV0YWlsc1xuICAgKi9cbiAgcHJpdmF0ZSBnZXRQZXJmb3JtYW5jZURldGFpbHMoKTogUGVyZm9ybWFuY2VCZWFuIHtcbiAgICBjb25zdCBwZXJmb3JtYW5jZSA9IHdpbmRvdy5wZXJmb3JtYW5jZTtcbiAgICByZXR1cm4ge1xuICAgICAgbmF2aWdhdGlvbjogcGVyZm9ybWFuY2UubmF2aWdhdGlvbixcbiAgICAgIHRpbWVPcmlnaW46IHBlcmZvcm1hbmNlLnRpbWVPcmlnaW4sXG4gICAgICB0aW1pbmc6IHBlcmZvcm1hbmNlLnRpbWluZ1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogTWVtb3J5IHVzYWdlIG9mIHRoZSBhcHBsaWNhdGlvbiBpcyBwcm92aWRlZCBieSBHb29nbGUgQ2hyb21lXG4gICAqIEBwYXJhbSB1c2VyQWdlbnQgLSBVc2VyIGFnZW50IHRvIGNoZWNrIHRoZSBicm93c2VyXG4gICAqL1xuICBwcml2YXRlIGdlTWVtb3J5VXNhZ2VJbmZvKHVzZXJBZ2VudDogYW55KSB7XG4gICAgY29uc3QgaXNDaHJvbWUgPSB1c2VyQWdlbnQuc3BsaXQoJ2Nocm9tZScpLmxlbmd0aCA+IDE7XG4gICAgY29uc3QgbWVtb3J5ID0gaXNDaHJvbWUgPyB3aW5kb3cucGVyZm9ybWFuY2VbJ21lbW9yeSddIDogJyc7XG4gICAgcmV0dXJuIG1lbW9yeTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXR0aW5nIFVUTSBQYXJhbWV0ZXJzIGJ5IHByb2Nlc3NpbmcgY3VycmVudCBwYWdlVVJMXG4gICAqIEBwYXJhbSB1cmwgLSBQYWdlIFVSTFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRVVE1QYXJhbWV0ZXJzKHVybDogc3RyaW5nKTogYW55IHtcbiAgICBjb25zdCB1dG1PYmplY3QgPSB7fTtcbiAgICBpZiAodXJsLmluY2x1ZGVzKCd1dG0nKSkge1xuICAgICAgY29uc3QgdXRtUGFyYW1zID0gdXJsLnNwbGl0KCc/JylbMV0uc3BsaXQoJyYnKTtcbiAgICAgIHV0bVBhcmFtcy5tYXAocGFyYW0gPT4ge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBwYXJhbS5zcGxpdCgnPScpO1xuICAgICAgICB1dG1PYmplY3RbcGFyYW1zWzBdXSA9IHBhcmFtc1sxXTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdXRtT2JqZWN0O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB1c2VyIGRlbW9ncmFwaGljIGluZm9ybWF0aW9uIGluIGNvb2tpZXNcbiAgICovXG4gIHByaXZhdGUgZ2V0SXAoKTogdm9pZCB7XG4gICAgdGhpcy5odHRwU2VydmljZS5nZXQodGhpcy5jb25zdGFudHMuREVNT0dSQVBISUNfQVBJX1VSTCkuc3Vic2NyaWJlKFxuICAgICAgKHJlczogYW55KSA9PiB7XG4gICAgICAgIHRoaXMuZGVtb2dyYXBoaWNJbmZvID0gcmVzO1xuICAgICAgICB0aGlzLmNvb2tpZVNlcnZpY2Uuc2V0KFxuICAgICAgICAgIHRoaXMuY29uc3RhbnRzLkRFTU9HUkFQSElDX0lORk8sIEpTT04uc3RyaW5naWZ5KHJlcyksXG4gICAgICAgICAgbmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgKyAoMTAwMCAqIDYwICogNjAgKiAyNCkpKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG59XG4iXX0=