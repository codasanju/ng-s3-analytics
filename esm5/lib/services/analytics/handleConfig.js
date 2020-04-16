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
var PluginConfigService = /** @class */ (function () {
    function PluginConfigService(httpClient, injector, cookieService) {
        this.httpClient = httpClient;
        this.injector = injector;
        this.cookieService = cookieService;
        /** Constants */
        this.constants = Constants;
    }
    /**
     * @return {?}
     */
    PluginConfigService.prototype.getEnvironmentConfig = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var env = this.injector.get(EnvironmentService);
        env.getEnvObservable().subscribe((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            _this.fetchRemoteConfig();
        }), (/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            // tslint:disable-next-line: max-line-length
            console.error('unable to fetch xAnalytics remote configuration. Please make sure you have configured the correct URL, if the issue persist please check the dashboard for more info or contact xA Team. ');
        }));
    };
    /**
     * @return {?}
     */
    PluginConfigService.prototype.fetchRemoteConfig = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.httpClient.get(environment.remoteConfigApi)
            .subscribe((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            _this.remotePluginConfig = res['body'];
            if (_this.remotePluginConfig.showConsent) {
                /** @type {?} */
                var content = _this.remotePluginConfig.consentContent ?
                    _this.remotePluginConfig.consentContent : environment.consentContent;
                _this.checkShowConsent(content);
            }
        }), (/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            console.error('collection error', err);
        }));
    };
    /**
     * @param {?} analyticsBean
     * @return {?}
     */
    PluginConfigService.prototype.handleConfiguration = /**
     * @param {?} analyticsBean
     * @return {?}
     */
    function (analyticsBean) {
        return this.checkDisableTracking() &&
            this.checkDomain(analyticsBean.fullURL) &&
            this.checkIpRange(analyticsBean.demographicInfo['ip']);
    };
    /**
     * @return {?}
     */
    PluginConfigService.prototype.checkDisableTracking = /**
     * @return {?}
     */
    function () {
        if (this.remotePluginConfig) {
            return !this.remotePluginConfig.disableTracking;
        }
        else {
            return true;
        }
    };
    /**
     * @param {?} fullUrl
     * @return {?}
     */
    PluginConfigService.prototype.checkDomain = /**
     * @param {?} fullUrl
     * @return {?}
     */
    function (fullUrl) {
        if (this.remotePluginConfig && this.remotePluginConfig.ignoreDomains.length > 0) {
            return !(this.remotePluginConfig.ignoreDomains.filter((/**
             * @param {?} domain
             * @return {?}
             */
            function (domain) { return fullUrl.indexOf(domain) >= 0; })).length > 0);
        }
        else {
            return true;
        }
    };
    /**
     * @param {?} trackedObjects
     * @return {?}
     */
    PluginConfigService.prototype.removeCheckUrls = /**
     * @param {?} trackedObjects
     * @return {?}
     */
    function (trackedObjects) {
        var _this = this;
        if (trackedObjects && trackedObjects.length > 0 && this.remotePluginConfig) {
            return trackedObjects.map((/**
             * @param {?} analytics
             * @return {?}
             */
            function (analytics) {
                if (!(_this.remotePluginConfig.ignoreUrls.filter((/**
                 * @param {?} url
                 * @return {?}
                 */
                function (url) { return analytics.eventComponent.indexOf(url) >= 0; })).length > 0)) {
                    return analytics;
                }
            })).filter((/**
             * @param {?} object
             * @return {?}
             */
            function (object) { return object !== undefined; }));
        }
        else {
            return trackedObjects;
        }
    };
    /**
   * IP range restriction added
   * @restrictIPRange is a regex
   * if @restrictIPRange is match with current IP,
   * the analytics data will be restricted
   */
    /**
     * IP range restriction added
     * \@restrictIPRange is a regex
     * if \@restrictIPRange is match with current IP,
     * the analytics data will be restricted
     * @private
     * @param {?} ip
     * @return {?}
     */
    PluginConfigService.prototype.checkIpRange = /**
     * IP range restriction added
     * \@restrictIPRange is a regex
     * if \@restrictIPRange is match with current IP,
     * the analytics data will be restricted
     * @private
     * @param {?} ip
     * @return {?}
     */
    function (ip) {
        if (ip && this.remotePluginConfig && this.remotePluginConfig.ignoreIPRanges.length > 0) {
            /** @type {?} */
            var ipRange = this.remotePluginConfig.ignoreIPRanges;
            return ip.match(ipRange) ? false : true;
        }
        else {
            return true;
        }
    };
    /**
  * Set user demographic information in cookies
  */
    /**
     * Set user demographic information in cookies
     * @return {?}
     */
    PluginConfigService.prototype.getIp = /**
     * Set user demographic information in cookies
     * @return {?}
     */
    function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.httpClient.get(this.constants.DEMOGRAPHIC_API_URL).toPromise()];
                    case 1:
                        _a.demographicInfo = _b.sent();
                        this.cookieService.set(this.constants.DEMOGRAPHIC_INFO, JSON.stringify(this.demographicInfo), new Date(new Date().getTime() + (1000 * 60 * 60 * 24)));
                        return [2 /*return*/, this.demographicInfo];
                }
            });
        });
    };
    /**
     * @return {?}
     */
    PluginConfigService.prototype.setDemographicInfo = /**
     * @return {?}
     */
    function () {
        if (!this.cookieService.check(this.constants.DEMOGRAPHIC_INFO)) {
            this.getIp();
        }
        else {
            this.demographicInfo = JSON.parse(this.cookieService.get(this.constants.DEMOGRAPHIC_INFO));
        }
        return this.demographicInfo;
    };
    /**
     * @return {?}
     */
    PluginConfigService.prototype.getDemographicInfo = /**
     * @return {?}
     */
    function () {
        if (this.remotePluginConfig && this.remotePluginConfig.disableDemographicInfo) {
            return {};
        }
        else {
            return this.setDemographicInfo();
        }
    };
    /**
     * @param {?} content
     * @return {?}
     */
    PluginConfigService.prototype.checkShowConsent = /**
     * @param {?} content
     * @return {?}
     */
    function (content) {
        /** @type {?} */
        var divEl = document.createElement('div');
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
        var textEl = document.createTextNode(content);
        divEl.appendChild(textEl);
        document.body.appendChild(divEl);
    };
    PluginConfigService.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] },
    ];
    PluginConfigService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: Injector },
        { type: CookieService }
    ]; };
    /** @nocollapse */ PluginConfigService.ngInjectableDef = i0.defineInjectable({ factory: function PluginConfigService_Factory() { return new PluginConfigService(i0.inject(i1.HttpClient), i0.inject(i0.INJECTOR), i0.inject(i2.CookieService)); }, token: PluginConfigService, providedIn: "root" });
    return PluginConfigService;
}());
export { PluginConfigService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlQ29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2FuYWx5dGljcy9oYW5kbGVDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRzVELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7QUFHbkQ7SUFNSSw2QkFDWSxVQUFzQixFQUN0QixRQUFrQixFQUNsQixhQUE0QjtRQUY1QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFMeEMsZ0JBQWdCO1FBQ2hCLGNBQVMsR0FBRyxTQUFTLENBQUM7SUFNdEIsQ0FBQzs7OztJQUVELGtEQUFvQjs7O0lBQXBCO1FBQUEsaUJBV0M7O1lBVlMsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDO1FBQ2pELEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFNBQVM7Ozs7UUFDNUIsVUFBQyxHQUFRO1lBQ0wsS0FBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDN0IsQ0FBQzs7OztRQUNELFVBQUMsR0FBUTtZQUNMLDRDQUE0QztZQUM1QyxPQUFPLENBQUMsS0FBSyxDQUFDLDJMQUEyTCxDQUFDLENBQUM7UUFDL00sQ0FBQyxFQUNKLENBQUM7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QyxDQUFDO1FBQzFCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7O2dCQXhJSixVQUFVLFNBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzs7Z0JBVHpCLFVBQVU7Z0JBREUsUUFBUTtnQkFPcEIsYUFBYTs7OzhCQVB0QjtDQW1KQyxBQXpJRCxJQXlJQztTQXhJWSxtQkFBbUI7OztJQUM1QixpREFBaUM7O0lBQ2pDLDhDQUFxQjs7Ozs7SUFFckIsd0NBQXNCOzs7OztJQUVsQix5Q0FBOEI7Ozs7O0lBQzlCLHVDQUEwQjs7Ozs7SUFDMUIsNENBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gJy4uLy4uL2Vudmlyb25tZW50L2Vudmlyb25tZW50JztcbmltcG9ydCB7IFBsdWdpbkNvbmZpZywgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEVudmlyb25tZW50U2VydmljZSB9IGZyb20gJy4uL2Vudmlyb25tZW50L2Vudmlyb25tZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuaW1wb3J0IHsgQ29va2llU2VydmljZSB9IGZyb20gJ25neC1jb29raWUtc2VydmljZSc7XG5cblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBQbHVnaW5Db25maWdTZXJ2aWNlIHtcbiAgICByZW1vdGVQbHVnaW5Db25maWc6IFBsdWdpbkNvbmZpZztcbiAgICBkZW1vZ3JhcGhpY0luZm86IGFueTtcbiAgICAvKiogQ29uc3RhbnRzICovXG4gICAgY29uc3RhbnRzID0gQ29uc3RhbnRzO1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQsXG4gICAgICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgICAgICBwcml2YXRlIGNvb2tpZVNlcnZpY2U6IENvb2tpZVNlcnZpY2UpIHtcblxuICAgIH1cblxuICAgIGdldEVudmlyb25tZW50Q29uZmlnKCkge1xuICAgICAgICBjb25zdCBlbnYgPSB0aGlzLmluamVjdG9yLmdldChFbnZpcm9ubWVudFNlcnZpY2UpO1xuICAgICAgICBlbnYuZ2V0RW52T2JzZXJ2YWJsZSgpLnN1YnNjcmliZShcbiAgICAgICAgICAgIChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZmV0Y2hSZW1vdGVDb25maWcoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG1heC1saW5lLWxlbmd0aFxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3VuYWJsZSB0byBmZXRjaCB4QW5hbHl0aWNzIHJlbW90ZSBjb25maWd1cmF0aW9uLiBQbGVhc2UgbWFrZSBzdXJlIHlvdSBoYXZlIGNvbmZpZ3VyZWQgdGhlIGNvcnJlY3QgVVJMLCBpZiB0aGUgaXNzdWUgcGVyc2lzdCBwbGVhc2UgY2hlY2sgdGhlIGRhc2hib2FyZCBmb3IgbW9yZSBpbmZvIG9yIGNvbnRhY3QgeEEgVGVhbS4gJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuICAgIHB1YmxpYyBmZXRjaFJlbW90ZUNvbmZpZygpIHtcbiAgICAgICAgdGhpcy5odHRwQ2xpZW50LmdldChlbnZpcm9ubWVudC5yZW1vdGVDb25maWdBcGkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnID0gcmVzWydib2R5J107XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZy5zaG93Q29uc2VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnLmNvbnNlbnRDb250ZW50ID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZy5jb25zZW50Q29udGVudCA6IGVudmlyb25tZW50LmNvbnNlbnRDb250ZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja1Nob3dDb25zZW50KGNvbnRlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdjb2xsZWN0aW9uIGVycm9yJywgZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGhhbmRsZUNvbmZpZ3VyYXRpb24oYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGVja0Rpc2FibGVUcmFja2luZygpICYmXG4gICAgICAgICAgICB0aGlzLmNoZWNrRG9tYWluKGFuYWx5dGljc0JlYW4uZnVsbFVSTCkgJiZcbiAgICAgICAgICAgIHRoaXMuY2hlY2tJcFJhbmdlKGFuYWx5dGljc0JlYW4uZGVtb2dyYXBoaWNJbmZvWydpcCddKTtcblxuICAgIH1cblxuICAgIGNoZWNrRGlzYWJsZVRyYWNraW5nKCkge1xuICAgICAgICBpZiAodGhpcy5yZW1vdGVQbHVnaW5Db25maWcpIHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5yZW1vdGVQbHVnaW5Db25maWcuZGlzYWJsZVRyYWNraW5nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja0RvbWFpbihmdWxsVXJsOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnICYmIHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnLmlnbm9yZURvbWFpbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuICEodGhpcy5yZW1vdGVQbHVnaW5Db25maWcuaWdub3JlRG9tYWlucy5maWx0ZXIoZG9tYWluID0+IGZ1bGxVcmwuaW5kZXhPZihkb21haW4pID49IDApLmxlbmd0aCA+IDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVtb3ZlQ2hlY2tVcmxzKHRyYWNrZWRPYmplY3RzOiBBcnJheTxBbmFseXRpY3NCZWFuPik6IEFycmF5PEFuYWx5dGljc0JlYW4+IHtcbiAgICAgICAgaWYgKHRyYWNrZWRPYmplY3RzICYmIHRyYWNrZWRPYmplY3RzLmxlbmd0aCA+IDAgJiYgdGhpcy5yZW1vdGVQbHVnaW5Db25maWcpIHtcbiAgICAgICAgICAgIHJldHVybiB0cmFja2VkT2JqZWN0cy5tYXAoYW5hbHl0aWNzID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoISh0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZy5pZ25vcmVVcmxzLmZpbHRlcih1cmwgPT4gYW5hbHl0aWNzLmV2ZW50Q29tcG9uZW50LmluZGV4T2YodXJsKSA+PSAwKS5sZW5ndGggPiAwKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYW5hbHl0aWNzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmZpbHRlcihvYmplY3QgPT4gb2JqZWN0ICE9PSB1bmRlZmluZWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRyYWNrZWRPYmplY3RzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAqIElQIHJhbmdlIHJlc3RyaWN0aW9uIGFkZGVkXG4gICAqIEByZXN0cmljdElQUmFuZ2UgaXMgYSByZWdleFxuICAgKiBpZiBAcmVzdHJpY3RJUFJhbmdlIGlzIG1hdGNoIHdpdGggY3VycmVudCBJUCxcbiAgICogdGhlIGFuYWx5dGljcyBkYXRhIHdpbGwgYmUgcmVzdHJpY3RlZFxuICAgKi9cbiAgICBwcml2YXRlIGNoZWNrSXBSYW5nZShpcDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChpcCAmJiB0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZyAmJiB0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZy5pZ25vcmVJUFJhbmdlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBpcFJhbmdlID0gdGhpcy5yZW1vdGVQbHVnaW5Db25maWcuaWdub3JlSVBSYW5nZXM7XG4gICAgICAgICAgICByZXR1cm4gaXAubWF0Y2goaXBSYW5nZSkgPyBmYWxzZSA6IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAqIFNldCB1c2VyIGRlbW9ncmFwaGljIGluZm9ybWF0aW9uIGluIGNvb2tpZXNcbiAgKi9cbiAgICBhc3luYyBnZXRJcCgpIHtcbiAgICAgICAgdGhpcy5kZW1vZ3JhcGhpY0luZm8gPSBhd2FpdCB0aGlzLmh0dHBDbGllbnQuZ2V0KHRoaXMuY29uc3RhbnRzLkRFTU9HUkFQSElDX0FQSV9VUkwpLnRvUHJvbWlzZSgpO1xuICAgICAgICB0aGlzLmNvb2tpZVNlcnZpY2Uuc2V0KFxuICAgICAgICAgICAgdGhpcy5jb25zdGFudHMuREVNT0dSQVBISUNfSU5GTyxcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHRoaXMuZGVtb2dyYXBoaWNJbmZvKSxcbiAgICAgICAgICAgIG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgKDEwMDAgKiA2MCAqIDYwICogMjQpKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmRlbW9ncmFwaGljSW5mbztcbiAgICB9XG5cblxuICAgIHNldERlbW9ncmFwaGljSW5mbygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvb2tpZVNlcnZpY2UuY2hlY2sodGhpcy5jb25zdGFudHMuREVNT0dSQVBISUNfSU5GTykpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0SXAoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGVtb2dyYXBoaWNJbmZvID0gSlNPTi5wYXJzZSh0aGlzLmNvb2tpZVNlcnZpY2UuZ2V0KHRoaXMuY29uc3RhbnRzLkRFTU9HUkFQSElDX0lORk8pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5kZW1vZ3JhcGhpY0luZm87XG4gICAgfVxuXG4gICAgZ2V0RGVtb2dyYXBoaWNJbmZvKCkge1xuICAgICAgICBpZiAodGhpcy5yZW1vdGVQbHVnaW5Db25maWcgJiYgdGhpcy5yZW1vdGVQbHVnaW5Db25maWcuZGlzYWJsZURlbW9ncmFwaGljSW5mbykge1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0RGVtb2dyYXBoaWNJbmZvKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja1Nob3dDb25zZW50KGNvbnRlbnQ6IHN0cmluZykge1xuICAgICAgICBjb25zdCBkaXZFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkaXZFbC5jbGFzc0xpc3QuYWRkKCdjb25zZW50LXdyYXBwZXInKTtcbiAgICAgICAgZGl2RWwuc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xuICAgICAgICBkaXZFbC5zdHlsZS5ib3R0b20gPSAnMCc7XG4gICAgICAgIGRpdkVsLnN0eWxlLmxlZnQgPSAnMCc7XG4gICAgICAgIGRpdkVsLnN0eWxlLnJpZ2h0ID0gJzAnO1xuICAgICAgICBkaXZFbC5zdHlsZS5wYWRkaW5nID0gJzE1cHgnO1xuICAgICAgICBkaXZFbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzMzNjZmZic7XG4gICAgICAgIGRpdkVsLnN0eWxlLmNvbG9yID0gJyNmZmYnO1xuICAgICAgICBkaXZFbC5zdHlsZS5mb250U2l6ZSA9ICcxMnB4JztcbiAgICAgICAgZGl2RWwuc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgIGNvbnN0IHRleHRFbCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNvbnRlbnQpO1xuICAgICAgICBkaXZFbC5hcHBlbmRDaGlsZCh0ZXh0RWwpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdkVsKTtcbiAgICB9XG59XG4iXX0=