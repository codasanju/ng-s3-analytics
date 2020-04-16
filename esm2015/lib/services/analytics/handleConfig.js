/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { EnvironmentService } from '../environment/environment.service';
import { Constants } from '../../types/event.types';
import { CookieService } from 'ngx-cookie-service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "ngx-cookie-service";
export class PluginConfigService {
    /**
     * @param {?} httpClient
     * @param {?} injector
     * @param {?} cookieService
     */
    constructor(httpClient, injector, cookieService) {
        this.httpClient = httpClient;
        this.injector = injector;
        this.cookieService = cookieService;
        /** Constants */
        this.constants = Constants;
    }
    /**
     * @return {?}
     */
    getEnvironmentConfig() {
        /** @type {?} */
        const env = this.injector.get(EnvironmentService);
        env.getEnvObservable().subscribe((/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            this.fetchRemoteConfig();
        }), (/**
         * @param {?} err
         * @return {?}
         */
        (err) => {
            // tslint:disable-next-line: max-line-length
            console.error('unable to fetch xAnalytics remote configuration. Please make sure you have configured the correct URL, if the issue persist please check the dashboard for more info or contact xA Team. ');
        }));
    }
    /**
     * @return {?}
     */
    fetchRemoteConfig() {
        this.httpClient.get(environment.remoteConfigApi)
            .subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            this.remotePluginConfig = res['body'];
            if (this.remotePluginConfig.showConsent) {
                /** @type {?} */
                const content = this.remotePluginConfig.consentContent ?
                    this.remotePluginConfig.consentContent : environment.consentContent;
                this.checkShowConsent(content);
            }
        }), (/**
         * @param {?} err
         * @return {?}
         */
        err => {
            console.error('collection error', err);
        }));
    }
    /**
     * @param {?} analyticsBean
     * @return {?}
     */
    handleConfiguration(analyticsBean) {
        return this.checkDisableTracking() &&
            this.checkDomain(analyticsBean.fullURL) &&
            this.checkIpRange(analyticsBean.demographicInfo['ip']);
    }
    /**
     * @return {?}
     */
    checkDisableTracking() {
        if (this.remotePluginConfig) {
            return !this.remotePluginConfig.disableTracking;
        }
        else {
            return true;
        }
    }
    /**
     * @param {?} fullUrl
     * @return {?}
     */
    checkDomain(fullUrl) {
        if (this.remotePluginConfig && this.remotePluginConfig.ignoreDomains.length > 0) {
            return !(this.remotePluginConfig.ignoreDomains.filter((/**
             * @param {?} domain
             * @return {?}
             */
            domain => fullUrl.indexOf(domain) >= 0)).length > 0);
        }
        else {
            return true;
        }
    }
    /**
     * @param {?} trackedObjects
     * @return {?}
     */
    removeCheckUrls(trackedObjects) {
        if (trackedObjects && trackedObjects.length > 0 && this.remotePluginConfig) {
            return trackedObjects.map((/**
             * @param {?} analytics
             * @return {?}
             */
            analytics => {
                if (!(this.remotePluginConfig.ignoreUrls.filter((/**
                 * @param {?} url
                 * @return {?}
                 */
                url => analytics.eventComponent.indexOf(url) >= 0)).length > 0)) {
                    return analytics;
                }
            })).filter((/**
             * @param {?} object
             * @return {?}
             */
            object => object !== undefined));
        }
        else {
            return trackedObjects;
        }
    }
    /**
     * IP range restriction added
     * \@restrictIPRange is a regex
     * if \@restrictIPRange is match with current IP,
     * the analytics data will be restricted
     * @private
     * @param {?} ip
     * @return {?}
     */
    checkIpRange(ip) {
        if (ip && this.remotePluginConfig) {
            /** @type {?} */
            const ipRange = this.remotePluginConfig.ignoreIPRanges;
            return ip.match(ipRange) ? false : true;
        }
        else {
            return true;
        }
    }
    /**
     * Set user demographic information in cookies
     * @return {?}
     */
    getIp() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.demographicInfo = yield this.httpClient.get(this.constants.DEMOGRAPHIC_API_URL).toPromise();
            this.cookieService.set(this.constants.DEMOGRAPHIC_INFO, JSON.stringify(this.demographicInfo), new Date(new Date().getTime() + (1000 * 60 * 60 * 24)));
            return this.demographicInfo;
        });
    }
    /**
     * @return {?}
     */
    setDemographicInfo() {
        if (!this.cookieService.check(this.constants.DEMOGRAPHIC_INFO)) {
            this.getIp();
        }
        else {
            this.demographicInfo = JSON.parse(this.cookieService.get(this.constants.DEMOGRAPHIC_INFO));
        }
        return this.demographicInfo;
    }
    /**
     * @return {?}
     */
    getDemographicInfo() {
        if (this.remotePluginConfig && this.remotePluginConfig.disableDemographicInfo) {
            return {};
        }
        else {
            return this.setDemographicInfo();
        }
    }
    /**
     * @param {?} content
     * @return {?}
     */
    checkShowConsent(content) {
        /** @type {?} */
        const divEl = document.createElement('div');
        divEl.classList.add('consent-wrapper');
        divEl.style.position = 'fixed';
        divEl.style.bottom = '0';
        divEl.style.left = '0';
        divEl.style.right = '0';
        divEl.style.padding = '15px';
        divEl.style.backgroundColor = '#3366ff';
        divEl.style.color = '#fff';
        divEl.style.fontSize = '12px';
        divEl.style.textAlign = 'center';
        /** @type {?} */
        const textEl = document.createTextNode(content);
        divEl.appendChild(textEl);
        document.body.appendChild(divEl);
    }
}
PluginConfigService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
PluginConfigService.ctorParameters = () => [
    { type: HttpClient },
    { type: Injector },
    { type: CookieService }
];
/** @nocollapse */ PluginConfigService.ngInjectableDef = i0.defineInjectable({ factory: function PluginConfigService_Factory() { return new PluginConfigService(i0.inject(i1.HttpClient), i0.inject(i0.INJECTOR), i0.inject(i2.CookieService)); }, token: PluginConfigService, providedIn: "root" });
if (false) {
    /** @type {?} */
    PluginConfigService.prototype.remotePluginConfig;
    /** @type {?} */
    PluginConfigService.prototype.demographicInfo;
    /**
     * Constants
     * @type {?}
     */
    PluginConfigService.prototype.constants;
    /**
     * @type {?}
     * @private
     */
    PluginConfigService.prototype.httpClient;
    /**
     * @type {?}
     * @private
     */
    PluginConfigService.prototype.injector;
    /**
     * @type {?}
     * @private
     */
    PluginConfigService.prototype.cookieService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlQ29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2FuYWx5dGljcy9oYW5kbGVDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRzVELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7QUFJbkQsTUFBTTs7Ozs7O0lBS0YsWUFDWSxVQUFzQixFQUN0QixRQUFrQixFQUNsQixhQUE0QjtRQUY1QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFMeEMsZ0JBQWdCO1FBQ2hCLGNBQVMsR0FBRyxTQUFTLENBQUM7SUFNdEIsQ0FBQzs7OztJQUVELG9CQUFvQjs7Y0FDVixHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUM7UUFDakQsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUMsU0FBUzs7OztRQUM1QixDQUFDLEdBQVEsRUFBRSxFQUFFO1lBQ1QsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDN0IsQ0FBQzs7OztRQUNELENBQUMsR0FBUSxFQUFFLEVBQUU7WUFDVCw0Q0FBNEM7WUFDNUMsT0FBTyxDQUFDLEtBQUssQ0FBQywyTEFBMkwsQ0FBQyxDQUFDO1FBQy9NLENBQUMs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b0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vZW52aXJvbm1lbnQvZW52aXJvbm1lbnQnO1xuaW1wb3J0IHsgUGx1Z2luQ29uZmlnLCBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRW52aXJvbm1lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vZW52aXJvbm1lbnQvZW52aXJvbm1lbnQuc2VydmljZSc7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnbmd4LWNvb2tpZS1zZXJ2aWNlJztcblxuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFBsdWdpbkNvbmZpZ1NlcnZpY2Uge1xuICAgIHJlbW90ZVBsdWdpbkNvbmZpZzogUGx1Z2luQ29uZmlnO1xuICAgIGRlbW9ncmFwaGljSW5mbzogYW55O1xuICAgIC8qKiBDb25zdGFudHMgKi9cbiAgICBjb25zdGFudHMgPSBDb25zdGFudHM7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgaHR0cENsaWVudDogSHR0cENsaWVudCxcbiAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgIHByaXZhdGUgY29va2llU2VydmljZTogQ29va2llU2VydmljZSkge1xuXG4gICAgfVxuXG4gICAgZ2V0RW52aXJvbm1lbnRDb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGVudiA9IHRoaXMuaW5qZWN0b3IuZ2V0KEVudmlyb25tZW50U2VydmljZSk7XG4gICAgICAgIGVudi5nZXRFbnZPYnNlcnZhYmxlKCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5mZXRjaFJlbW90ZUNvbmZpZygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnI6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbWF4LWxpbmUtbGVuZ3RoXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcigndW5hYmxlIHRvIGZldGNoIHhBbmFseXRpY3MgcmVtb3RlIGNvbmZpZ3VyYXRpb24uIFBsZWFzZSBtYWtlIHN1cmUgeW91IGhhdmUgY29uZmlndXJlZCB0aGUgY29ycmVjdCBVUkwsIGlmIHRoZSBpc3N1ZSBwZXJzaXN0IHBsZWFzZSBjaGVjayB0aGUgZGFzaGJvYXJkIGZvciBtb3JlIGluZm8gb3IgY29udGFjdCB4QSBUZWFtLiAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcHVibGljIGZldGNoUmVtb3RlQ29uZmlnKCkge1xuICAgICAgICB0aGlzLmh0dHBDbGllbnQuZ2V0KGVudmlyb25tZW50LnJlbW90ZUNvbmZpZ0FwaSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgcmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdGVQbHVnaW5Db25maWcgPSByZXNbJ2JvZHknXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnLnNob3dDb25zZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5yZW1vdGVQbHVnaW5Db25maWcuY29uc2VudENvbnRlbnQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnLmNvbnNlbnRDb250ZW50IDogZW52aXJvbm1lbnQuY29uc2VudENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrU2hvd0NvbnNlbnQoY29udGVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2NvbGxlY3Rpb24gZXJyb3InLCBlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ29uZmlndXJhdGlvbihhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoZWNrRGlzYWJsZVRyYWNraW5nKCkgJiZcbiAgICAgICAgICAgIHRoaXMuY2hlY2tEb21haW4oYW5hbHl0aWNzQmVhbi5mdWxsVVJMKSAmJlxuICAgICAgICAgICAgdGhpcy5jaGVja0lwUmFuZ2UoYW5hbHl0aWNzQmVhbi5kZW1vZ3JhcGhpY0luZm9bJ2lwJ10pO1xuXG4gICAgfVxuXG4gICAgY2hlY2tEaXNhYmxlVHJhY2tpbmcoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZykge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZy5kaXNhYmxlVHJhY2tpbmc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoZWNrRG9tYWluKGZ1bGxVcmw6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5yZW1vdGVQbHVnaW5Db25maWcgJiYgdGhpcy5yZW1vdGVQbHVnaW5Db25maWcuaWdub3JlRG9tYWlucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gISh0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZy5pZ25vcmVEb21haW5zLmZpbHRlcihkb21haW4gPT4gZnVsbFVybC5pbmRleE9mKGRvbWFpbikgPj0gMCkubGVuZ3RoID4gMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW1vdmVDaGVja1VybHModHJhY2tlZE9iamVjdHM6IEFycmF5PEFuYWx5dGljc0JlYW4+KTogQXJyYXk8QW5hbHl0aWNzQmVhbj4ge1xuICAgICAgICBpZiAodHJhY2tlZE9iamVjdHMgJiYgdHJhY2tlZE9iamVjdHMubGVuZ3RoID4gMCAmJiB0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZykge1xuICAgICAgICAgICAgcmV0dXJuIHRyYWNrZWRPYmplY3RzLm1hcChhbmFseXRpY3MgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghKHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnLmlnbm9yZVVybHMuZmlsdGVyKHVybCA9PiBhbmFseXRpY3MuZXZlbnRDb21wb25lbnQuaW5kZXhPZih1cmwpID49IDApLmxlbmd0aCA+IDApKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhbmFseXRpY3M7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuZmlsdGVyKG9iamVjdCA9PiBvYmplY3QgIT09IHVuZGVmaW5lZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJhY2tlZE9iamVjdHM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICogSVAgcmFuZ2UgcmVzdHJpY3Rpb24gYWRkZWRcbiAgICogQHJlc3RyaWN0SVBSYW5nZSBpcyBhIHJlZ2V4XG4gICAqIGlmIEByZXN0cmljdElQUmFuZ2UgaXMgbWF0Y2ggd2l0aCBjdXJyZW50IElQLFxuICAgKiB0aGUgYW5hbHl0aWNzIGRhdGEgd2lsbCBiZSByZXN0cmljdGVkXG4gICAqL1xuICAgIHByaXZhdGUgY2hlY2tJcFJhbmdlKGlwOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGlwICYmIHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnKSB7XG4gICAgICAgICAgICBjb25zdCBpcFJhbmdlID0gdGhpcy5yZW1vdGVQbHVnaW5Db25maWcuaWdub3JlSVBSYW5nZXM7XG4gICAgICAgICAgICByZXR1cm4gaXAubWF0Y2goaXBSYW5nZSkgPyBmYWxzZSA6IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAqIFNldCB1c2VyIGRlbW9ncmFwaGljIGluZm9ybWF0aW9uIGluIGNvb2tpZXNcbiAgKi9cbiAgICBhc3luYyBnZXRJcCgpIHtcbiAgICAgICAgdGhpcy5kZW1vZ3JhcGhpY0luZm8gPSBhd2FpdCB0aGlzLmh0dHBDbGllbnQuZ2V0KHRoaXMuY29uc3RhbnRzLkRFTU9HUkFQSElDX0FQSV9VUkwpLnRvUHJvbWlzZSgpO1xuICAgICAgICB0aGlzLmNvb2tpZVNlcnZpY2Uuc2V0KFxuICAgICAgICAgICAgdGhpcy5jb25zdGFudHMuREVNT0dSQVBISUNfSU5GTyxcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHRoaXMuZGVtb2dyYXBoaWNJbmZvKSxcbiAgICAgICAgICAgIG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgKDEwMDAgKiA2MCAqIDYwICogMjQpKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmRlbW9ncmFwaGljSW5mbztcbiAgICB9XG5cblxuICAgIHNldERlbW9ncmFwaGljSW5mbygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvb2tpZVNlcnZpY2UuY2hlY2sodGhpcy5jb25zdGFudHMuREVNT0dSQVBISUNfSU5GTykpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0SXAoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGVtb2dyYXBoaWNJbmZvID0gSlNPTi5wYXJzZSh0aGlzLmNvb2tpZVNlcnZpY2UuZ2V0KHRoaXMuY29uc3RhbnRzLkRFTU9HUkFQSElDX0lORk8pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5kZW1vZ3JhcGhpY0luZm87XG4gICAgfVxuXG4gICAgZ2V0RGVtb2dyYXBoaWNJbmZvKCkge1xuICAgICAgICBpZiAodGhpcy5yZW1vdGVQbHVnaW5Db25maWcgJiYgdGhpcy5yZW1vdGVQbHVnaW5Db25maWcuZGlzYWJsZURlbW9ncmFwaGljSW5mbykge1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0RGVtb2dyYXBoaWNJbmZvKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja1Nob3dDb25zZW50KGNvbnRlbnQ6IHN0cmluZykge1xuICAgICAgICBjb25zdCBkaXZFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkaXZFbC5jbGFzc0xpc3QuYWRkKCdjb25zZW50LXdyYXBwZXInKTtcbiAgICAgICAgZGl2RWwuc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xuICAgICAgICBkaXZFbC5zdHlsZS5ib3R0b20gPSAnMCc7XG4gICAgICAgIGRpdkVsLnN0eWxlLmxlZnQgPSAnMCc7XG4gICAgICAgIGRpdkVsLnN0eWxlLnJpZ2h0ID0gJzAnO1xuICAgICAgICBkaXZFbC5zdHlsZS5wYWRkaW5nID0gJzE1cHgnO1xuICAgICAgICBkaXZFbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzMzNjZmZic7XG4gICAgICAgIGRpdkVsLnN0eWxlLmNvbG9yID0gJyNmZmYnO1xuICAgICAgICBkaXZFbC5zdHlsZS5mb250U2l6ZSA9ICcxMnB4JztcbiAgICAgICAgZGl2RWwuc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgIGNvbnN0IHRleHRFbCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNvbnRlbnQpO1xuICAgICAgICBkaXZFbC5hcHBlbmRDaGlsZCh0ZXh0RWwpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdkVsKTtcbiAgICB9XG59XG4iXX0=