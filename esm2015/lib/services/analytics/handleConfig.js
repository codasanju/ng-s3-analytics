/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { tap } from 'rxjs/operators';
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
        err => {
        }));
    }
    /**
     * @return {?}
     */
    fetchRemoteConfig() {
        console.log('fetch configuration called', environment, environment.remoteConfigApi);
        this.httpClient.get(environment.remoteConfigApi).pipe(tap((/**
         * @param {?} data
         * @return {?}
         */
        data => console.log(data)))).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            this.remotePluginConfig = res['body'];
            console.log('getting configuration', res, this.remotePluginConfig);
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
        console.log(analyticsBean);
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
     * @private
     * @return {?}
     */
    getIp() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.demographicInfo = yield this.httpClient.get(this.constants.DEMOGRAPHIC_API_URL);
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
            console.log(this.demographicInfo);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlQ29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2FuYWx5dGljcy9oYW5kbGVDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7O0FBSW5ELE1BQU07Ozs7OztJQUtGLFlBQ1ksVUFBc0IsRUFDdEIsUUFBa0IsRUFDbEIsYUFBNEI7UUFGNUIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBTHhDLGdCQUFnQjtRQUNoQixjQUFTLEdBQUcsU0FBUyxDQUFDO0lBTXRCLENBQUM7Ozs7SUFFRCxvQkFBb0I7O2NBQ1YsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDO1FBQ2pELEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFNBQVM7Ozs7UUFDNUIsQ0FBQyxHQUFRLEVBQUUsRUFBRTtZQUNULElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzdCLENBQUM7Ozs7UUFDRCxHQUFHLENBQUMsRUFBRTtRQUNOLENBQUMsRUFDSixDQUFDO0lBQ04sQ0FB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Y0FBYyxDQUFDLE9BQU8sQ0FBQztRQUMvQyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7OztZQTNJSixVQUFVLFNBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzs7WUFUekIsVUFBVTtZQURFLFFBQVE7WUFPcEIsYUFBYTs7Ozs7SUFLbEIsaURBQWlDOztJQUNqQyw4Q0FBcUI7Ozs7O0lBRXJCLHdDQUFzQjs7Ozs7SUFFbEIseUNBQThCOzs7OztJQUM5Qix1Q0FBMEI7Ozs7O0lBQzFCLDRDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudCc7XG5pbXBvcnQgeyBQbHVnaW5Db25maWcsIEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBFbnZpcm9ubWVudFNlcnZpY2UgfSBmcm9tICcuLi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcbmltcG9ydCB7IENvb2tpZVNlcnZpY2UgfSBmcm9tICduZ3gtY29va2llLXNlcnZpY2UnO1xuXG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgUGx1Z2luQ29uZmlnU2VydmljZSB7XG4gICAgcmVtb3RlUGx1Z2luQ29uZmlnOiBQbHVnaW5Db25maWc7XG4gICAgZGVtb2dyYXBoaWNJbmZvOiBhbnk7XG4gICAgLyoqIENvbnN0YW50cyAqL1xuICAgIGNvbnN0YW50cyA9IENvbnN0YW50cztcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBodHRwQ2xpZW50OiBIdHRwQ2xpZW50LFxuICAgICAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgcHJpdmF0ZSBjb29raWVTZXJ2aWNlOiBDb29raWVTZXJ2aWNlKSB7XG5cbiAgICB9XG5cbiAgICBnZXRFbnZpcm9ubWVudENvbmZpZygpIHtcbiAgICAgICAgY29uc3QgZW52ID0gdGhpcy5pbmplY3Rvci5nZXQoRW52aXJvbm1lbnRTZXJ2aWNlKTtcbiAgICAgICAgZW52LmdldEVudk9ic2VydmFibGUoKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZldGNoUmVtb3RlQ29uZmlnKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcHVibGljIGZldGNoUmVtb3RlQ29uZmlnKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnZmV0Y2ggY29uZmlndXJhdGlvbiBjYWxsZWQnLCBlbnZpcm9ubWVudCwgZW52aXJvbm1lbnQucmVtb3RlQ29uZmlnQXBpKTtcbiAgICAgICAgdGhpcy5odHRwQ2xpZW50LmdldChlbnZpcm9ubWVudC5yZW1vdGVDb25maWdBcGkpLnBpcGUoXG4gICAgICAgICAgICB0YXAoZGF0YSA9PiBjb25zb2xlLmxvZyhkYXRhKSlcbiAgICAgICAgKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICByZXMgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnID0gcmVzWydib2R5J107XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2dldHRpbmcgY29uZmlndXJhdGlvbicsIHJlcywgdGhpcy5yZW1vdGVQbHVnaW5Db25maWcpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZy5zaG93Q29uc2VudCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5yZW1vdGVQbHVnaW5Db25maWcuY29uc2VudENvbnRlbnQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdGVQbHVnaW5Db25maWcuY29uc2VudENvbnRlbnQgOiBlbnZpcm9ubWVudC5jb25zZW50Q29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja1Nob3dDb25zZW50KGNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2NvbGxlY3Rpb24gZXJyb3InLCBlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGhhbmRsZUNvbmZpZ3VyYXRpb24oYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbik6IGJvb2xlYW4ge1xuICAgICAgICBjb25zb2xlLmxvZyhhbmFseXRpY3NCZWFuKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tEaXNhYmxlVHJhY2tpbmcoKSAmJlxuICAgICAgICAgICAgdGhpcy5jaGVja0RvbWFpbihhbmFseXRpY3NCZWFuLmZ1bGxVUkwpICYmXG4gICAgICAgICAgICB0aGlzLmNoZWNrSXBSYW5nZShhbmFseXRpY3NCZWFuLmRlbW9ncmFwaGljSW5mb1snaXAnXSk7XG5cbiAgICB9XG5cbiAgICBjaGVja0Rpc2FibGVUcmFja2luZygpIHtcbiAgICAgICAgaWYgKHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnKSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMucmVtb3RlUGx1Z2luQ29uZmlnLmRpc2FibGVUcmFja2luZztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hlY2tEb21haW4oZnVsbFVybDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZyAmJiB0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZy5pZ25vcmVEb21haW5zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiAhKHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnLmlnbm9yZURvbWFpbnMuZmlsdGVyKGRvbWFpbiA9PiBmdWxsVXJsLmluZGV4T2YoZG9tYWluKSA+PSAwKS5sZW5ndGggPiAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbW92ZUNoZWNrVXJscyh0cmFja2VkT2JqZWN0czogQXJyYXk8QW5hbHl0aWNzQmVhbj4pOiBBcnJheTxBbmFseXRpY3NCZWFuPiB7XG4gICAgICAgIGlmICh0cmFja2VkT2JqZWN0cyAmJiB0cmFja2VkT2JqZWN0cy5sZW5ndGggPiAwICYmIHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJhY2tlZE9iamVjdHMubWFwKGFuYWx5dGljcyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCEodGhpcy5yZW1vdGVQbHVnaW5Db25maWcuaWdub3JlVXJscy5maWx0ZXIodXJsID0+IGFuYWx5dGljcy5ldmVudENvbXBvbmVudC5pbmRleE9mKHVybCkgPj0gMCkubGVuZ3RoID4gMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFuYWx5dGljcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5maWx0ZXIob2JqZWN0ID0+IG9iamVjdCAhPT0gdW5kZWZpbmVkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cmFja2VkT2JqZWN0cztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgKiBJUCByYW5nZSByZXN0cmljdGlvbiBhZGRlZFxuICAgKiBAcmVzdHJpY3RJUFJhbmdlIGlzIGEgcmVnZXhcbiAgICogaWYgQHJlc3RyaWN0SVBSYW5nZSBpcyBtYXRjaCB3aXRoIGN1cnJlbnQgSVAsXG4gICAqIHRoZSBhbmFseXRpY3MgZGF0YSB3aWxsIGJlIHJlc3RyaWN0ZWRcbiAgICovXG4gICAgcHJpdmF0ZSBjaGVja0lwUmFuZ2UoaXA6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoaXAgJiYgdGhpcy5yZW1vdGVQbHVnaW5Db25maWcpIHtcbiAgICAgICAgICAgIGNvbnN0IGlwUmFuZ2UgPSB0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZy5pZ25vcmVJUFJhbmdlcztcbiAgICAgICAgICAgIHJldHVybiBpcC5tYXRjaChpcFJhbmdlKSA/IGZhbHNlIDogdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICogU2V0IHVzZXIgZGVtb2dyYXBoaWMgaW5mb3JtYXRpb24gaW4gY29va2llc1xuICAqL1xuICAgIHByaXZhdGUgYXN5bmMgZ2V0SXAoKSB7XG4gICAgICAgIHRoaXMuZGVtb2dyYXBoaWNJbmZvID0gYXdhaXQgdGhpcy5odHRwQ2xpZW50LmdldCh0aGlzLmNvbnN0YW50cy5ERU1PR1JBUEhJQ19BUElfVVJMKTtcbiAgICAgICAgdGhpcy5jb29raWVTZXJ2aWNlLnNldChcbiAgICAgICAgICAgIHRoaXMuY29uc3RhbnRzLkRFTU9HUkFQSElDX0lORk8sXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh0aGlzLmRlbW9ncmFwaGljSW5mbyksXG4gICAgICAgICAgICBuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSArICgxMDAwICogNjAgKiA2MCAqIDI0KSkpO1xuICAgICAgICByZXR1cm4gdGhpcy5kZW1vZ3JhcGhpY0luZm87XG4gICAgfVxuXG5cbiAgICBzZXREZW1vZ3JhcGhpY0luZm8oKSB7XG4gICAgICAgIGlmICghdGhpcy5jb29raWVTZXJ2aWNlLmNoZWNrKHRoaXMuY29uc3RhbnRzLkRFTU9HUkFQSElDX0lORk8pKSB7XG4gICAgICAgICAgICB0aGlzLmdldElwKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRlbW9ncmFwaGljSW5mbyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRlbW9ncmFwaGljSW5mbyA9IEpTT04ucGFyc2UodGhpcy5jb29raWVTZXJ2aWNlLmdldCh0aGlzLmNvbnN0YW50cy5ERU1PR1JBUEhJQ19JTkZPKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZGVtb2dyYXBoaWNJbmZvO1xuICAgIH1cblxuICAgIGdldERlbW9ncmFwaGljSW5mbygpIHtcbiAgICAgICAgaWYgKHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnICYmIHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnLmRpc2FibGVEZW1vZ3JhcGhpY0luZm8pIHtcbiAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldERlbW9ncmFwaGljSW5mbygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hlY2tTaG93Q29uc2VudChjb250ZW50OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgZGl2RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGl2RWwuY2xhc3NMaXN0LmFkZCgnY29uc2VudC13cmFwcGVyJyk7XG4gICAgICAgIGRpdkVsLnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICAgICAgZGl2RWwuc3R5bGUuYm90dG9tID0gJzAnO1xuICAgICAgICBkaXZFbC5zdHlsZS5sZWZ0ID0gJzAnO1xuICAgICAgICBkaXZFbC5zdHlsZS5yaWdodCA9ICcwJztcbiAgICAgICAgZGl2RWwuc3R5bGUucGFkZGluZyA9ICcxNXB4JztcbiAgICAgICAgZGl2RWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyMzMzY2ZmYnO1xuICAgICAgICBkaXZFbC5zdHlsZS5jb2xvciA9ICcjZmZmJztcbiAgICAgICAgZGl2RWwuc3R5bGUuZm9udFNpemUgPSAnMTJweCc7XG4gICAgICAgIGRpdkVsLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICBjb25zdCB0ZXh0RWwgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjb250ZW50KTtcbiAgICAgICAgZGl2RWwuYXBwZW5kQ2hpbGQodGV4dEVsKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXZFbCk7XG4gICAgfVxufVxuIl19