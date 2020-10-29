(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/common/http'), require('ngx-cookie-service'), require('uuid'), require('@angular/router'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@codaglobal/ng-s3-analytics', ['exports', '@angular/core', 'rxjs', '@angular/common/http', 'ngx-cookie-service', 'uuid', '@angular/router', '@angular/common'], factory) :
    (factory((global.codaglobal = global.codaglobal || {}, global.codaglobal['ng-s3-analytics'] = {}),global.ng.core,global.rxjs,global.ng.common.http,null,null,global.ng.router,global.ng.common));
}(this, (function (exports,i0,rxjs,i1,i2,uuid,i1$1,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgS3AnalyticsService = /** @class */ (function () {
        function NgS3AnalyticsService() {
        }
        NgS3AnalyticsService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        NgS3AnalyticsService.ctorParameters = function () { return []; };
        /** @nocollapse */ NgS3AnalyticsService.ngInjectableDef = i0.defineInjectable({ factory: function NgS3AnalyticsService_Factory() { return new NgS3AnalyticsService(); }, token: NgS3AnalyticsService, providedIn: "root" });
        return NgS3AnalyticsService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgS3AnalyticsComponent = /** @class */ (function () {
        function NgS3AnalyticsComponent() {
        }
        /**
         * @return {?}
         */
        NgS3AnalyticsComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        NgS3AnalyticsComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'lib-ng-s3-analytics',
                        template: "\n    <p>\n      ng-s3-analytics works!\n    </p>\n  ",
                        styles: []
                    },] },
        ];
        NgS3AnalyticsComponent.ctorParameters = function () { return []; };
        return NgS3AnalyticsComponent;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var environment = {
        dataCollectionApi: '',
        isPageLoadingToBeDetected: true,
        remoteConfigApi: '',
        ignoreUrls: [],
        ignoreCssRules: [],
        showConsent: false,
        // tslint:disable-next-line: max-line-length
        consentContent: 'We use cookies to ensure that we provide you with the best possible experience on our website.If you continue to use our site, we assume you accept our use of cookies. Privacy Policy',
        disableTracking: false,
        ignoreIPRanges: '',
        ignoreDomains: [],
        disableDemographicInfo: false,
        track: { mouse: true, scroll: true }
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var EventLabels = {
        PAGE_LOAD: 'PAGE_LOAD',
        MOUSE_HOVER: 'MOUSE_HOVER',
        BUTTON_CLICK: 'BUTTON_CLICK',
        MOUSE_MOVE: 'MOUSE_MOVE',
        SCROLL: 'SCROLL',
        CONSOLE_ERROR: 'CONSOLE_ERROR',
        KEY_STROKE: 'KEY_STROKE',
    };
    /** @enum {string} */
    var Constants = {
        DEMOGRAPHIC_INFO: 'demographic-info',
        SESSION_ID: 'ngS3AnalyticsSessionId',
        DEMOGRAPHIC_API_URL: 'https://ipapi.co/json/',
    };
    var KeyStrokeEventType = /** @class */ (function () {
        function KeyStrokeEventType() {
            this.key = '';
            this.keyCode = '';
            this.elementId = '';
            this.isForm = false;
            this.form = '';
            this.tagName = '';
            this.htmlElementType = '';
            this.value = '';
            this.code = '';
        }
        return KeyStrokeEventType;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var EnvironmentService = /** @class */ (function () {
        function EnvironmentService() {
            this.envConfig = new rxjs.Subject();
            this.userObject = new rxjs.Subject();
        }
        // Setting Configuration on environment
        // Setting Configuration on environment
        /**
         * @param {?} configuration
         * @param {?} isPageLoadingToBeDetected
         * @return {?}
         */
        EnvironmentService.prototype.setConfigurationToEnvironment =
            // Setting Configuration on environment
            /**
             * @param {?} configuration
             * @param {?} isPageLoadingToBeDetected
             * @return {?}
             */
            function (configuration, isPageLoadingToBeDetected) {
                environment.dataCollectionApi = configuration.dataCollectionApi;
                environment.isPageLoadingToBeDetected = isPageLoadingToBeDetected;
                environment.remoteConfigApi = configuration.remoteConfigApi;
                this.envConfig.next(environment);
                this.envConfig.complete();
                this.userObject.next({ userEmail: '', userProfileImage: '', userName: '', userPhoneNumber: '', userId: '', otherInfo: '' });
                environment.track = { mouse: true, scroll: true };
                if (configuration.track && configuration.track.mouse !== undefined) {
                    environment.track.mouse = configuration.track.mouse;
                }
                if (configuration.track && configuration.track.scroll !== undefined) {
                    environment.track.scroll = configuration.track.scroll;
                }
            };
        /**
         * @return {?}
         */
        EnvironmentService.prototype.getEnvObservable = /**
         * @return {?}
         */
            function () {
                return this.envConfig;
            };
        /**
         * @param {?} userObject
         * @return {?}
         */
        EnvironmentService.prototype.setUserInfo = /**
         * @param {?} userObject
         * @return {?}
         */
            function (userObject) {
                this.userObject.next(userObject);
            };
        /**
         * @return {?}
         */
        EnvironmentService.prototype.getUserInfo = /**
         * @return {?}
         */
            function () {
                return this.userObject.asObservable();
            };
        EnvironmentService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */ EnvironmentService.ngInjectableDef = i0.defineInjectable({ factory: function EnvironmentService_Factory() { return new EnvironmentService(); }, token: EnvironmentService, providedIn: "root" });
        return EnvironmentService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
                env.getEnvObservable().subscribe(( /**
                 * @param {?} res
                 * @return {?}
                 */function (res) {
                    _this.fetchRemoteConfig();
                }), ( /**
                 * @param {?} err
                 * @return {?}
                 */function (err) {
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
                    .subscribe(( /**
             * @param {?} res
             * @return {?}
             */function (res) {
                    _this.remotePluginConfig = res['body'];
                    if (_this.remotePluginConfig.showConsent) {
                        /** @type {?} */
                        var content = _this.remotePluginConfig.consentContent ?
                            _this.remotePluginConfig.consentContent : environment.consentContent;
                        _this.checkShowConsent(content);
                    }
                }), ( /**
                 * @param {?} err
                 * @return {?}
                 */function (err) {
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
                    return !(this.remotePluginConfig.ignoreDomains.filter(( /**
                     * @param {?} domain
                     * @return {?}
                     */function (domain) { return fullUrl.indexOf(domain) >= 0; })).length > 0);
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
                    return trackedObjects.map(( /**
                     * @param {?} analytics
                     * @return {?}
                     */function (analytics) {
                        if (!(_this.remotePluginConfig.ignoreUrls.filter(( /**
                         * @param {?} url
                         * @return {?}
                         */function (url) { return analytics.eventComponent.indexOf(url) >= 0; })).length > 0)) {
                            return analytics;
                        }
                    })).filter(( /**
                     * @param {?} object
                     * @return {?}
                     */function (object) { return object !== undefined; }));
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
                return __awaiter(this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
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
            { type: i0.Injectable, args: [{ providedIn: 'root' },] },
        ];
        PluginConfigService.ctorParameters = function () {
            return [
                { type: i1.HttpClient },
                { type: i0.Injector },
                { type: i2.CookieService }
            ];
        };
        /** @nocollapse */ PluginConfigService.ngInjectableDef = i0.defineInjectable({ factory: function PluginConfigService_Factory() { return new PluginConfigService(i0.inject(i1.HttpClient), i0.inject(i0.INJECTOR), i0.inject(i2.CookieService)); }, token: PluginConfigService, providedIn: "root" });
        return PluginConfigService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
                    return data.map(( /**
                     * @param {?} object
                     * @return {?}
                     */function (object) {
                        object['sessionId'] = _this.sessionId;
                        object['eventId'] = _this.sessionId + "T" + new Date(object.eventTime).getTime();
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
                var headers = new i1.HttpHeaders({ 'Content-Type': 'application/json' });
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
                this.httpService.put(url, data, { headers: headers }).subscribe(( /**
                 * @param {?} res
                 * @return {?}
                 */function (res) { }), ( /**
                 * @param {?} err
                 * @return {?}
                 */function (err) {
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
                    var headers = new i1.HttpHeaders({ 'Content-Type': 'text/html' });
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
                    data['eventId'] = this.sessionId + "T" + new Date(data.eventTime).getTime() + "_CONSOLE_ERROR";
                    /** @type {?} */
                    var filename = new Date().toISOString().split('T')[0] + "_" + this.sessionId + "_console_errors_" + new Date().getTime() + ".json";
                    /** @type {?} */
                    var headers = new i1.HttpHeaders({ 'Content-Type': 'application/json' });
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
                if (userData === void 0) {
                    userData = {};
                }
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
                    utmParams.map(( /**
                     * @param {?} param
                     * @return {?}
                     */function (param) {
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
                this.environmentService.getUserInfo().subscribe(( /**
                 * @param {?} res
                 * @return {?}
                 */function (res) {
                    _this.userInfo = res;
                    console.log('receive user bean', _this.userInfo);
                }));
            };
        AnalyticsService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        AnalyticsService.ctorParameters = function () {
            return [
                { type: i1.HttpClient },
                { type: PluginConfigService },
                { type: EnvironmentService }
            ];
        };
        /** @nocollapse */ AnalyticsService.ngInjectableDef = i0.defineInjectable({ factory: function AnalyticsService_Factory() { return new AnalyticsService(i0.inject(i1.HttpClient), i0.inject(PluginConfigService), i0.inject(EnvironmentService)); }, token: AnalyticsService, providedIn: "root" });
        return AnalyticsService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DataStorageService = /** @class */ (function () {
        function DataStorageService(analyticalService, http) {
            this.analyticalService = analyticalService;
            this.http = http;
            this.constants = Constants;
            this.allDataAnalyticsArray = [];
            this.keys = [];
            this.eventCollector = new Map();
            this.routeDetails = [];
            this.count = 0;
        }
        /**
         * @param {?} data
         * @return {?}
         */
        DataStorageService.prototype.setUrlKey = /**
         * @param {?} data
         * @return {?}
         */
            function (data) {
                var e_1, _a;
                /** @type {?} */
                var flag = 0;
                if (this.previousUrl === undefined) {
                    this.eventCollector.set(data, []);
                    this.previousUrl = data || '/';
                }
                else if (!(data === this.previousUrl)) {
                    try {
                        for (var _b = __values(Array.from(this.eventCollector.keys())), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var key = _c.value;
                            if (key === data) {
                                flag = 1;
                                break;
                            }
                        }
                    }
                    catch (e_1_1) {
                        e_1 = { error: e_1_1 };
                    }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return))
                                _a.call(_b);
                        }
                        finally {
                            if (e_1)
                                throw e_1.error;
                        }
                    }
                    if (flag === 0) {
                        this.eventCollector.set(data, []);
                    }
                    this.previousUrl = data;
                }
            };
        /**
         * @param {?} data
         * @return {?}
         */
        DataStorageService.prototype.appendToAnalyticsArray = /**
         * @param {?} data
         * @return {?}
         */
            function (data) {
                if (this.previousUrl === undefined) {
                    this.setUrlKey(data.eventComponent);
                }
                this.eventCollector.get(this.previousUrl).push(data);
            };
        /**
         * @return {?}
         */
        DataStorageService.prototype.pushDataArrayToS3 = /**
         * @return {?}
         */
            function () {
                var e_2, _a, e_3, _b;
                this.count++;
                try {
                    for (var _c = __values(Array.from(this.eventCollector.keys())), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var key = _d.value;
                        this.allDataAnalytics = {
                            pageUrl: key,
                            eventValues: Array.from(this.eventCollector.get(key).values())
                        };
                        this.keys.push(key);
                        if (this.allDataAnalytics.eventValues.length > 0) {
                            this.stopIdleTimer();
                            this.analyticalService.pushData(this.allDataAnalytics);
                        }
                        else {
                            this.startCalculateIdleTime();
                        }
                    }
                }
                catch (e_2_1) {
                    e_2 = { error: e_2_1 };
                }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return))
                            _a.call(_c);
                    }
                    finally {
                        if (e_2)
                            throw e_2.error;
                    }
                }
                this.eventCollector.clear();
                try {
                    for (var _e = __values(this.keys), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var key = _f.value;
                        this.eventCollector.set(key, []);
                    }
                }
                catch (e_3_1) {
                    e_3 = { error: e_3_1 };
                }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return))
                            _b.call(_e);
                    }
                    finally {
                        if (e_3)
                            throw e_3.error;
                    }
                }
            };
        /**
         * @param {?} routeDetails
         * @return {?}
         */
        DataStorageService.prototype.setRouteDetails = /**
         * @param {?} routeDetails
         * @return {?}
         */
            function (routeDetails) {
                this.routeDetails = routeDetails;
            };
        /**
         * @return {?}
         */
        DataStorageService.prototype.getRouteDetails = /**
         * @return {?}
         */
            function () {
                return this.routeDetails;
            };
        /**
         * If the session is idle for 30 min, the session will be cleared
         */
        /**
         * If the session is idle for 30 min, the session will be cleared
         * @return {?}
         */
        DataStorageService.prototype.startCalculateIdleTime = /**
         * If the session is idle for 30 min, the session will be cleared
         * @return {?}
         */
            function () {
                var _this = this;
                if (!this.idleTimerSubscription) {
                    this.idleTimerSubscription = rxjs.interval(1000 * 60 * 30).subscribe(( /**
                     * @param {?} x
                     * @return {?}
                     */function (x) {
                        /** @type {?} */
                        var sessionId = uuid.v4();
                        sessionStorage.setItem(_this.constants.SESSION_ID, sessionId);
                        _this.stopIdleTimer();
                    }));
                }
            };
        /**
         * if the idle timer is running, resetting the timer
         */
        /**
         * if the idle timer is running, resetting the timer
         * @return {?}
         */
        DataStorageService.prototype.stopIdleTimer = /**
         * if the idle timer is running, resetting the timer
         * @return {?}
         */
            function () {
                if (this.idleTimerSubscription) {
                    this.idleTimerSubscription.unsubscribe();
                    this.idleTimerSubscription = null;
                }
                this.startCalculateIdleTime();
            };
        DataStorageService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        DataStorageService.ctorParameters = function () {
            return [
                { type: AnalyticsService },
                { type: i1.HttpClient }
            ];
        };
        /** @nocollapse */ DataStorageService.ngInjectableDef = i0.defineInjectable({ factory: function DataStorageService_Factory() { return new DataStorageService(i0.inject(AnalyticsService), i0.inject(i1.HttpClient)); }, token: DataStorageService, providedIn: "root" });
        return DataStorageService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Button Directive to track click event
     * Selector can be added to any HTML Element
     */
    var ButtonDirective = /** @class */ (function () {
        /**
         * Button Tracking - Constructor
         * @param dataStorage - DataStorageService
         * @param analyticsService
         */
        function ButtonDirective(dataStorage, analyticsService) {
            this.dataStorage = dataStorage;
            this.analyticsService = analyticsService;
            // Gets important data about the button explicitly from the application
            // tslint:disable-next-line: no-input-rename
            this.data = {};
            this.eventLabels = EventLabels;
        }
        /**
         *  Listen to button click actions
         */
        /**
         *  Listen to button click actions
         * @param {?} $event
         * @return {?}
         */
        ButtonDirective.prototype.onClick = /**
         *  Listen to button click actions
         * @param {?} $event
         * @return {?}
         */
            function ($event) {
                this.eventDetails = $event;
                this.sendData();
            };
        /** Sending data on button click */
        /**
         * Sending data on button click
         * @return {?}
         */
        ButtonDirective.prototype.sendData = /**
         * Sending data on button click
         * @return {?}
         */
            function () {
                /** @type {?} */
                var analyticsBean = this.analyticsService.setAnalyticsData(this.data, this.eventDetails, this.eventLabels.BUTTON_CLICK, '');
                this.dataStorage.appendToAnalyticsArray(analyticsBean);
            };
        ButtonDirective.decorators = [
            { type: i0.Directive, args: [{
                        // tslint:disable-next-line: directive-selector
                        selector: '[track-btn]'
                    },] },
        ];
        ButtonDirective.ctorParameters = function () {
            return [
                { type: DataStorageService },
                { type: AnalyticsService }
            ];
        };
        ButtonDirective.propDecorators = {
            data: [{ type: i0.Input, args: ['track-btn',] }],
            onClick: [{ type: i0.HostListener, args: ['click', ['$event'],] }]
        };
        return ButtonDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ScrollDirective = /** @class */ (function () {
        function ScrollDirective(analyticsService, dataStorage) {
            this.analyticsService = analyticsService;
            this.dataStorage = dataStorage;
            // Gets important data about the component explicitly from the application
            // tslint:disable-next-line: no-input-rename
            this.data = {};
            this.eventLabels = EventLabels;
        }
        // Capture the change in data
        // Capture the change in data
        /**
         * @param {?} changes
         * @return {?}
         */
        ScrollDirective.prototype.ngOnChanges =
            // Capture the change in data
            /**
             * @param {?} changes
             * @return {?}
             */
            function (changes) {
                this.data = changes.data.currentValue;
            };
        // Triggered when any scroll event occurs
        // Triggered when any scroll event occurs
        /**
         * @param {?} $event
         * @return {?}
         */
        ScrollDirective.prototype.onScrollEvent =
            // Triggered when any scroll event occurs
            /**
             * @param {?} $event
             * @return {?}
             */
            function ($event) {
                var _this = this;
                if (environment.track.scroll) {
                    setTimeout(( /**
                     * @return {?}
                     */function () {
                        _this.sendData($event);
                    }), 100);
                }
            };
        /**
         * @param {?} event
         * @return {?}
         */
        ScrollDirective.prototype.sendData = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                /** @type {?} */
                var analyticsBean = this.analyticsService.setAnalyticsData(this.data, event, this.eventLabels.SCROLL, '');
                this.dataStorage.appendToAnalyticsArray(analyticsBean);
            };
        ScrollDirective.decorators = [
            { type: i0.Directive, args: [{
                        // tslint:disable-next-line: directive-selector
                        selector: '[track-scroll]'
                    },] },
        ];
        ScrollDirective.ctorParameters = function () {
            return [
                { type: AnalyticsService },
                { type: DataStorageService }
            ];
        };
        ScrollDirective.propDecorators = {
            data: [{ type: i0.Input, args: ['track-scroll',] }],
            onScrollEvent: [{ type: i0.HostListener, args: ['window:scroll', ['$event'],] }]
        };
        return ScrollDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ButtonHoverDirective = /** @class */ (function () {
        function ButtonHoverDirective(dataStorage, analyticsService) {
            this.dataStorage = dataStorage;
            this.analyticsService = analyticsService;
            this.eventLabels = EventLabels;
            // Gets important data about the button explicitly from the application
            // tslint:disable-next-line: no-input-rename
            this.data = {};
        }
        // Listen to button hover actions
        // Listen to button hover actions
        /**
         * @param {?} $event
         * @return {?}
         */
        ButtonHoverDirective.prototype.onMouseOver =
            // Listen to button hover actions
            /**
             * @param {?} $event
             * @return {?}
             */
            function ($event) {
                var _this = this;
                this.eventDetails = $event;
                setTimeout(( /**
                 * @return {?}
                 */function () {
                    _this.sendData();
                }), 10);
            };
        // Sending data on button hover
        // Sending data on button hover
        /**
         * @return {?}
         */
        ButtonHoverDirective.prototype.sendData =
            // Sending data on button hover
            /**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var analyticsBean = this.analyticsService.setAnalyticsData(this.data, this.eventDetails, this.eventLabels.MOUSE_HOVER, '');
                this.dataStorage.appendToAnalyticsArray(analyticsBean);
            };
        ButtonHoverDirective.decorators = [
            { type: i0.Directive, args: [{
                        // tslint:disable-next-line: directive-selector
                        selector: '[track-buttonHover]'
                    },] },
        ];
        ButtonHoverDirective.ctorParameters = function () {
            return [
                { type: DataStorageService },
                { type: AnalyticsService }
            ];
        };
        ButtonHoverDirective.propDecorators = {
            data: [{ type: i0.Input, args: ['track-buttonHover',] }],
            onMouseOver: [{ type: i0.HostListener, args: ['mouseover', ['$event'],] }]
        };
        return ButtonHoverDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var RouterService = /** @class */ (function () {
        function RouterService(routes, analyticsService, dataStorage) {
            this.routes = routes;
            this.analyticsService = analyticsService;
            this.dataStorage = dataStorage;
            this.eventLabels = EventLabels;
            this.navigateOn = '';
        }
        /**
         * Tracking router events
         */
        /**
         * Tracking router events
         * @return {?}
         */
        RouterService.prototype.trackRouterEvents = /**
         * Tracking router events
         * @return {?}
         */
            function () {
                var _this = this;
                /** Triggered when current page is loaded */
                this.routes.events.subscribe(( /**
                 * @param {?} event
                 * @return {?}
                 */function (event) {
                    /** Triggered when NavigationEnd event occurs */
                    if (event instanceof i1$1.NavigationEnd) {
                        if (_this.navigateOn !== event.url) {
                            _this.analyticsPushData(event);
                            _this.navigateOn = event.url;
                        }
                    }
                    else if (event instanceof i1$1.NavigationError) {
                        /** Triggered when NavigationError event occurs */
                        _this.analyticsPushData(event);
                    }
                }));
            };
        /**
         * Pushing analytics data
         * @param event - Router Event
         */
        /**
         * Pushing analytics data
         * @param {?} event - Router Event
         * @return {?}
         */
        RouterService.prototype.analyticsPushData = /**
         * Pushing analytics data
         * @param {?} event - Router Event
         * @return {?}
         */
            function (event) {
                var _this = this;
                /** @type {?} */
                var screenshotName = new Date().getTime().toString();
                this.analyticsData = this.analyticsService.setAnalyticsData({}, {}, this.eventLabels.PAGE_LOAD, screenshotName + ".html", { eventComponent: event.url });
                this.waitTillPageLoad(screenshotName);
                // Data is send only when user configure the page loading to be true
                this.dataStorage.setUrlKey(this.analyticsData.eventComponent);
                setTimeout(( /**
                 * @return {?}
                 */function () {
                    _this.dataStorage.appendToAnalyticsArray(_this.analyticsData);
                }), 0);
            };
        /**
         * Waiting for page to load completely
         * @param event
         */
        /**
         * Waiting for page to load completely
         * @param {?} screenshotName
         * @return {?}
         */
        RouterService.prototype.waitTillPageLoad = /**
         * Waiting for page to load completely
         * @param {?} screenshotName
         * @return {?}
         */
            function (screenshotName) {
                /** @type {?} */
                var _self = this;
                /** @type {?} */
                var interval = setInterval(( /**
                 * @return {?}
                 */function () {
                    if (document.readyState === 'complete') {
                        clearInterval(interval);
                        _self.captureTemplate(screenshotName);
                    }
                }), 1000);
            };
        /**
         * Capture template of loaded view
         * @param screenshotName - Screenshot image
         */
        /**
         * Capture template of loaded view
         * @param {?} screenshotName - Screenshot image
         * @return {?}
         */
        RouterService.prototype.captureTemplate = /**
         * Capture template of loaded view
         * @param {?} screenshotName - Screenshot image
         * @return {?}
         */
            function (screenshotName) {
                /** @type {?} */
                var fullPageHTML = ngS3AnalyticsJS.constructHTMLPage(this.processRegexOperations(document.querySelector('head').innerHTML), this.processRegexOperations(document.querySelector('body').innerHTML));
                this.analyticsService.saveScreenshotsInS3(fullPageHTML, screenshotName);
            };
        /**
         * @param {?} text
         * @return {?}
         */
        RouterService.prototype.processRegexOperations = /**
         * @param {?} text
         * @return {?}
         */
            function (text) {
                return ngS3AnalyticsJS.doRegex(text, window.location.origin);
            };
        RouterService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        RouterService.ctorParameters = function () {
            return [
                { type: i1$1.Router },
                { type: AnalyticsService },
                { type: DataStorageService }
            ];
        };
        /** @nocollapse */ RouterService.ngInjectableDef = i0.defineInjectable({ factory: function RouterService_Factory() { return new RouterService(i0.inject(i1$1.Router), i0.inject(AnalyticsService), i0.inject(DataStorageService)); }, token: RouterService, providedIn: "root" });
        return RouterService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PointerService = /** @class */ (function () {
        function PointerService(dataStorage, analyticsService) {
            this.dataStorage = dataStorage;
            this.analyticsService = analyticsService;
            this.eventLabels = EventLabels;
            // tslint:disable-next-line: no-input-rename
            this.data = {};
            this.trackingSubscription = new rxjs.Subscription();
        }
        /**
         * Track Mouse Movement
         */
        /**
         * Track Mouse Movement
         * @return {?}
         */
        PointerService.prototype.trackMouseMoveEvent = /**
         * Track Mouse Movement
         * @return {?}
         */
            function () {
                var _this = this;
                this.trackingSubscription.add(rxjs.fromEvent(window, 'mousemove')
                    .subscribe(( /**
             * @param {?} e
             * @return {?}
             */function (e) {
                    /**
                    * Checking whether user opt to disable tracking mouse
                    */
                    if (environment.track.mouse) {
                        _this.eventDetails = e;
                        _this.sendData();
                    }
                    else {
                        _this.trackingSubscription.unsubscribe();
                    }
                })));
            };
        /**
         * Pushing Mouse Move details
         */
        /**
         * Pushing Mouse Move details
         * @return {?}
         */
        PointerService.prototype.sendData = /**
         * Pushing Mouse Move details
         * @return {?}
         */
            function () {
                /** @type {?} */
                var analyticsBean = this.analyticsService.setAnalyticsData(this.data, this.eventDetails, this.eventLabels.MOUSE_MOVE, '');
                this.dataStorage.appendToAnalyticsArray(analyticsBean);
            };
        PointerService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        PointerService.ctorParameters = function () {
            return [
                { type: DataStorageService },
                { type: AnalyticsService }
            ];
        };
        PointerService.propDecorators = {
            data: [{ type: i0.Input, args: ['track-pointer',] }]
        };
        /** @nocollapse */ PointerService.ngInjectableDef = i0.defineInjectable({ factory: function PointerService_Factory() { return new PointerService(i0.inject(DataStorageService), i0.inject(AnalyticsService)); }, token: PointerService, providedIn: "root" });
        return PointerService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var GlobalErrorHandler = /** @class */ (function () {
        function GlobalErrorHandler(injector) {
            this.injector = injector;
            this.eventLabels = EventLabels;
        }
        /**
         * @return {?}
         */
        GlobalErrorHandler.prototype.trackConsoleErrors = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var analyticsService = this.injector.get(AnalyticsService);
                /** @type {?} */
                var dataStorageService = this.injector.get(DataStorageService);
                if (window.console && console.error) {
                    /** @type {?} */
                    var consoleErrorFnObject_1 = console.error;
                    /** @type {?} */
                    var _self_1 = this;
                    console.error = ( /**
                     * @param {...?} error
                     * @return {?}
                     */function () {
                        var error = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            error[_i] = arguments[_i];
                        }
                        /** @type {?} */
                        var processedError = error.map(( /**
                         * @param {?} e
                         * @return {?}
                         */function (e) {
                            if (typeof (e) === 'object') {
                                return JSON.stringify(e);
                            }
                            else {
                                return e;
                            }
                        }));
                        // tslint:disable-next-line: max-line-length
                        /** @type {?} */
                        var analyticsBean = analyticsService.setAnalyticsData('', {}, _self_1.eventLabels.CONSOLE_ERROR, '', { consoleErrors: JSON.stringify(processedError) });
                        dataStorageService.appendToAnalyticsArray(analyticsBean);
                        consoleErrorFnObject_1.call(console, error);
                    });
                }
            };
        GlobalErrorHandler.decorators = [
            { type: i0.Injectable },
        ];
        GlobalErrorHandler.ctorParameters = function () {
            return [
                { type: i0.Injector }
            ];
        };
        return GlobalErrorHandler;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // tslint:disable-next-line: directive-selector
    var KeyStrokeDirective = /** @class */ (function () {
        /**
         * Dependencies
         * @param dataStorage
         * @param analyticsService
         * @param el - Element Reference
         * @param renderer - Renderer
         */
        function KeyStrokeDirective(dataStorage, analyticsService, el, renderer) {
            this.dataStorage = dataStorage;
            this.analyticsService = analyticsService;
            this.el = el;
            this.renderer = renderer;
            /** Event Labels Constants */
            this.eventLabels = EventLabels;
            /**
             * if Id doesn't belongs to the element, which is being tracked,
             * Adding a dynamic Id
             */
            if (!this.el.nativeElement.id) {
                /** @type {?} */
                var dynamicId = "key_stroke_element_" + uuid.v4();
                this.renderer.setAttribute(this.el.nativeElement, 'id', dynamicId);
            }
        }
        /**
         * Tracking Key press events using host listener
         * Generating a data bean in a specified format
         * @param $event - KeyPress Event
         */
        /**
         * Tracking Key press events using host listener
         * Generating a data bean in a specified format
         * @param {?} $event - KeyPress Event
         * @return {?}
         */
        KeyStrokeDirective.prototype.onKeyStroke = /**
         * Tracking Key press events using host listener
         * Generating a data bean in a specified format
         * @param {?} $event - KeyPress Event
         * @return {?}
         */
            function ($event) {
                /** @type {?} */
                var keyStroke = new KeyStrokeEventType();
                if ($event.target.type !== 'password' && this.checkClassNames($event.target.classList)) {
                    keyStroke.elementId = $event.target.id;
                    keyStroke.key = $event.key;
                    keyStroke.code = $event.code;
                    keyStroke.keyCode = $event.keyCode.toString();
                    keyStroke.isForm = $event.target.form !== undefined;
                    keyStroke.form = $event.target.form !== undefined ? JSON.stringify($event.target.form.elements) : '';
                    keyStroke.tagName = $event.target.tagName;
                    keyStroke.htmlElementType = $event.target.type;
                    keyStroke.value = $event.target.value;
                    this.sendData(keyStroke, $event);
                }
            };
        /**
         * @param {?} classList
         * @return {?}
         */
        KeyStrokeDirective.prototype.checkClassNames = /**
         * @param {?} classList
         * @return {?}
         */
            function (classList) {
                /** @type {?} */
                var classNames = __spread(classList).concat(environment.ignoreCssRules);
                return Array.from(new Set(classNames)).length === classNames.length;
            };
        /**
         * Sending data
         * @param keyStroke - Captured KeyStroke data
         * @param eventDetails - Key Press event details
         */
        /**
         * Sending data
         * @private
         * @param {?} keyStroke - Captured KeyStroke data
         * @param {?} eventDetails - Key Press event details
         * @return {?}
         */
        KeyStrokeDirective.prototype.sendData = /**
         * Sending data
         * @private
         * @param {?} keyStroke - Captured KeyStroke data
         * @param {?} eventDetails - Key Press event details
         * @return {?}
         */
            function (keyStroke, eventDetails) {
                /** @type {?} */
                var analyticsBean = this.analyticsService.setAnalyticsData({}, eventDetails, this.eventLabels.KEY_STROKE, '', { keyStrokeData: keyStroke });
                this.dataStorage.appendToAnalyticsArray(analyticsBean);
            };
        KeyStrokeDirective.decorators = [
            { type: i0.Directive, args: [{ selector: '[track-keyStroke]' },] },
        ];
        KeyStrokeDirective.ctorParameters = function () {
            return [
                { type: DataStorageService },
                { type: AnalyticsService },
                { type: i0.ElementRef },
                { type: i0.Renderer2 }
            ];
        };
        KeyStrokeDirective.propDecorators = {
            onKeyStroke: [{ type: i0.HostListener, args: ['keypress', ['$event'],] }]
        };
        return KeyStrokeDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgS3AnalyticsModule = /** @class */ (function () {
        function NgS3AnalyticsModule(routerService, dataStorage, pointerService, errorhandler) {
            var _this = this;
            this.routerService = routerService;
            this.dataStorage = dataStorage;
            this.pointerService = pointerService;
            this.errorhandler = errorhandler;
            window.addEventListener('beforeunload', ( /**
             * @param {?} e
             * @return {?}
             */function (e) {
                _this.dataStorage.pushDataArrayToS3();
            }));
            rxjs.interval(1000 * 2).subscribe(( /**
             * @param {?} x
             * @return {?}
             */function (x) {
                _this.dataStorage.pushDataArrayToS3();
            }));
            this.pointerService.trackMouseMoveEvent();
            this.routerService.trackRouterEvents();
            this.errorhandler.trackConsoleErrors();
        }
        // Configuring the initial setup for s3 bucket and page loading
        // Configuring the initial setup for s3 bucket and page loading
        /**
         * @param {?} configuration
         * @param {?=} isPageLoadingToBeDetected
         * @return {?}
         */
        NgS3AnalyticsModule.forRoot =
            // Configuring the initial setup for s3 bucket and page loading
            /**
             * @param {?} configuration
             * @param {?=} isPageLoadingToBeDetected
             * @return {?}
             */
            function (configuration, isPageLoadingToBeDetected) {
                if (isPageLoadingToBeDetected === void 0) {
                    isPageLoadingToBeDetected = false;
                }
                this.environmentService.setConfigurationToEnvironment(configuration, isPageLoadingToBeDetected);
                // Assigning the configuration to environment variables
            };
        NgS3AnalyticsModule.environmentService = new EnvironmentService();
        NgS3AnalyticsModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            i1.HttpClientModule
                        ],
                        declarations: [
                            NgS3AnalyticsComponent,
                            ButtonDirective,
                            ScrollDirective,
                            ButtonHoverDirective,
                            KeyStrokeDirective
                        ],
                        providers: [
                            DataStorageService,
                            EnvironmentService,
                            PointerService,
                            i2.CookieService,
                            GlobalErrorHandler
                        ],
                        exports: [
                            NgS3AnalyticsComponent,
                            ButtonDirective,
                            ScrollDirective,
                            ButtonHoverDirective,
                            KeyStrokeDirective
                        ]
                    },] },
        ];
        NgS3AnalyticsModule.ctorParameters = function () {
            return [
                { type: RouterService },
                { type: DataStorageService },
                { type: PointerService },
                { type: GlobalErrorHandler }
            ];
        };
        return NgS3AnalyticsModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CustomEventService = /** @class */ (function () {
        function CustomEventService(dataStorage, analyticsService) {
            this.dataStorage = dataStorage;
            this.analyticsService = analyticsService;
        }
        /**
         * This method is exposed to user to help pushing custom events
         *
         * @param customEventName - Any name that user can be configure
         * @param eventData - Any data, which user configured in additional info
         */
        /**
         * This method is exposed to user to help pushing custom events
         *
         * @param {?} customEventName - Any name that user can be configure
         * @param {?} eventData - Any data, which user configured in additional info
         * @return {?}
         */
        CustomEventService.prototype.pushEvent = /**
         * This method is exposed to user to help pushing custom events
         *
         * @param {?} customEventName - Any name that user can be configure
         * @param {?} eventData - Any data, which user configured in additional info
         * @return {?}
         */
            function (customEventName, eventData) {
                /** @type {?} */
                var analyticsBean = this.analyticsService.setAnalyticsData(eventData, '', customEventName, '');
                this.dataStorage.appendToAnalyticsArray(analyticsBean);
            };
        CustomEventService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        CustomEventService.ctorParameters = function () {
            return [
                { type: DataStorageService },
                { type: AnalyticsService }
            ];
        };
        /** @nocollapse */ CustomEventService.ngInjectableDef = i0.defineInjectable({ factory: function CustomEventService_Factory() { return new CustomEventService(i0.inject(DataStorageService), i0.inject(AnalyticsService)); }, token: CustomEventService, providedIn: "root" });
        return CustomEventService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.NgS3AnalyticsService = NgS3AnalyticsService;
    exports.NgS3AnalyticsComponent = NgS3AnalyticsComponent;
    exports.NgS3AnalyticsModule = NgS3AnalyticsModule;
    exports.EnvironmentService = EnvironmentService;
    exports.DataStorageService = DataStorageService;
    exports.CustomEventService = CustomEventService;
    exports.ɵe = ButtonHoverDirective;
    exports.ɵa = ButtonDirective;
    exports.ɵf = KeyStrokeDirective;
    exports.ɵd = ScrollDirective;
    exports.ɵb = AnalyticsService;
    exports.ɵc = PluginConfigService;
    exports.ɵh = GlobalErrorHandler;
    exports.ɵg = PointerService;
    exports.ɵi = RouterService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kYWdsb2JhbC1uZy1zMy1hbmFseXRpY3MudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL25nLXMzLWFuYWx5dGljcy5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL25nLXMzLWFuYWx5dGljcy5jb21wb25lbnQudHMiLG51bGwsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudC50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi90eXBlcy9ldmVudC50eXBlcy50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9zZXJ2aWNlcy9lbnZpcm9ubWVudC9lbnZpcm9ubWVudC5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3NlcnZpY2VzL2FuYWx5dGljcy9oYW5kbGVDb25maWcudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvc2VydmljZXMvYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3NlcnZpY2VzL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZS50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9kaXJlY3RpdmVzL2J1dHRvbi9idXR0b24uZGlyZWN0aXZlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL2RpcmVjdGl2ZXMvc2Nyb2xsL3Njcm9sbC5kaXJlY3RpdmUudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvZGlyZWN0aXZlcy9idXR0b24taG92ZXIvYnV0dG9uLWhvdmVyLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9zZXJ2aWNlcy9yb3V0ZXIvcm91dGVyLnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvc2VydmljZXMvcG9pbnRlci9wb2ludGVyLnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvc2VydmljZXMvZXJyb3ItaGFuZGxlci9lcnJvckhhbmRsZXIuc2VydmljZS50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9kaXJlY3RpdmVzL2tleS1zdHJva2Uva2V5LXN0cm9rZS5kaXJlY3RpdmUudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvbmctczMtYW5hbHl0aWNzLm1vZHVsZS50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9zZXJ2aWNlcy9jdXN0b20tZXZlbnQvY3VzdG9tLWV2ZW50LnNlcnZpY2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOZ1MzQW5hbHl0aWNzU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1uZy1zMy1hbmFseXRpY3MnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxwPlxuICAgICAgbmctczMtYW5hbHl0aWNzIHdvcmtzIVxuICAgIDwvcD5cbiAgYCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBOZ1MzQW5hbHl0aWNzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHByaXZhdGVNYXApIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBnZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJpdmF0ZU1hcC5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgcHJpdmF0ZU1hcCwgdmFsdWUpIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBzZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlTWFwLnNldChyZWNlaXZlciwgdmFsdWUpO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbiIsImV4cG9ydCBsZXQgZW52aXJvbm1lbnQgPSB7XG4gICAgZGF0YUNvbGxlY3Rpb25BcGk6ICcnLFxuICAgIGlzUGFnZUxvYWRpbmdUb0JlRGV0ZWN0ZWQ6IHRydWUsXG4gICAgcmVtb3RlQ29uZmlnQXBpOiAnJyxcbiAgICBpZ25vcmVVcmxzOiBbXSxcbiAgICBpZ25vcmVDc3NSdWxlczogW10sXG4gICAgc2hvd0NvbnNlbnQ6IGZhbHNlLFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbWF4LWxpbmUtbGVuZ3RoXG4gICAgY29uc2VudENvbnRlbnQ6ICdXZSB1c2UgY29va2llcyB0byBlbnN1cmUgdGhhdCB3ZSBwcm92aWRlIHlvdSB3aXRoIHRoZSBiZXN0IHBvc3NpYmxlIGV4cGVyaWVuY2Ugb24gb3VyIHdlYnNpdGUuSWYgeW91IGNvbnRpbnVlIHRvIHVzZSBvdXIgc2l0ZSwgd2UgYXNzdW1lIHlvdSBhY2NlcHQgb3VyIHVzZSBvZiBjb29raWVzLiBQcml2YWN5IFBvbGljeScsXG4gICAgZGlzYWJsZVRyYWNraW5nOiBmYWxzZSxcbiAgICBpZ25vcmVJUFJhbmdlczogJycsXG4gICAgaWdub3JlRG9tYWluczogW10sXG4gICAgZGlzYWJsZURlbW9ncmFwaGljSW5mbzogZmFsc2UsXG4gICAgdHJhY2s6IHsgbW91c2U6IHRydWUsIHNjcm9sbDogdHJ1ZSB9XG59O1xuXG5cbiIsImV4cG9ydCBlbnVtIEV2ZW50TGFiZWxzIHtcbiAgICBQQUdFX0xPQUQgPSAnUEFHRV9MT0FEJyxcbiAgICBNT1VTRV9IT1ZFUiA9ICdNT1VTRV9IT1ZFUicsXG4gICAgQlVUVE9OX0NMSUNLID0gJ0JVVFRPTl9DTElDSycsXG4gICAgTU9VU0VfTU9WRSA9ICdNT1VTRV9NT1ZFJyxcbiAgICBTQ1JPTEwgPSAnU0NST0xMJyxcbiAgICBDT05TT0xFX0VSUk9SID0gJ0NPTlNPTEVfRVJST1InLFxuICAgIEtFWV9TVFJPS0UgPSAnS0VZX1NUUk9LRSdcbn1cblxuZXhwb3J0IGVudW0gQ29uc3RhbnRzIHtcbiAgICBERU1PR1JBUEhJQ19JTkZPID0gJ2RlbW9ncmFwaGljLWluZm8nLFxuICAgIFNFU1NJT05fSUQgPSAnbmdTM0FuYWx5dGljc1Nlc3Npb25JZCcsXG4gICAgREVNT0dSQVBISUNfQVBJX1VSTCA9ICdodHRwczovL2lwYXBpLmNvL2pzb24vJ1xufVxuXG5cbmV4cG9ydCBjbGFzcyBLZXlTdHJva2VFdmVudFR5cGUge1xuICAgIGtleTogc3RyaW5nOyAvLyBwcmVzc2VkIEtleVxuICAgIGtleUNvZGU6IHN0cmluZzsgLy8gcHJlc3NlZCBLZXkgQ29kZVxuICAgIGVsZW1lbnRJZDogc3RyaW5nOyAvLyBJZCBvZiBlbGVtZW50XG4gICAgaXNGb3JtOiBib29sZWFuOyAvLyBpcyBpdCBhIGZvcm1cbiAgICBmb3JtOiBzdHJpbmc7XG4gICAgdGFnTmFtZTogc3RyaW5nOyAvLyB0YWdOYW1lIG9mIGVsZW1lbnRcbiAgICBodG1sRWxlbWVudFR5cGU6IHN0cmluZzsgLy8gdHlwZSBvZiBlbGVtZW50XG4gICAgdmFsdWU6IHN0cmluZzsgLy8gcHJldmlvdXMgdmFsdWUgb2YgdGhlIGVsZW1lbnRcbiAgICBjb2RlOiBzdHJpbmc7IC8vIFByZXNzZWQga2V5IGxhYmVsXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5rZXkgPSAnJztcbiAgICAgICAgdGhpcy5rZXlDb2RlID0gJyc7XG4gICAgICAgIHRoaXMuZWxlbWVudElkID0gJyc7XG4gICAgICAgIHRoaXMuaXNGb3JtID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZm9ybSA9ICcnO1xuICAgICAgICB0aGlzLnRhZ05hbWUgPSAnJztcbiAgICAgICAgdGhpcy5odG1sRWxlbWVudFR5cGUgPSAnJztcbiAgICAgICAgdGhpcy52YWx1ZSA9ICcnO1xuICAgICAgICB0aGlzLmNvZGUgPSAnJztcbiAgICB9XG59XG4iLCJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vZW52aXJvbm1lbnQvZW52aXJvbm1lbnQnO1xuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiwgUGx1Z2luQ29uZmlnLCBVc2VyQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5cbmV4cG9ydCBjbGFzcyBFbnZpcm9ubWVudFNlcnZpY2Uge1xuICBlbnZDb25maWc6IGFueSA9IG5ldyBTdWJqZWN0PFBsdWdpbkNvbmZpZz4oKTtcbiAgdXNlck9iamVjdDogU3ViamVjdDxVc2VyQmVhbj4gPSBuZXcgU3ViamVjdDxVc2VyQmVhbj4oKTtcblxuICAvLyBTZXR0aW5nIENvbmZpZ3VyYXRpb24gb24gZW52aXJvbm1lbnRcbiAgc2V0Q29uZmlndXJhdGlvblRvRW52aXJvbm1lbnQoY29uZmlndXJhdGlvbjogQ29uZmlndXJhdGlvbiwgaXNQYWdlTG9hZGluZ1RvQmVEZXRlY3RlZDogYm9vbGVhbikge1xuICAgIGVudmlyb25tZW50LmRhdGFDb2xsZWN0aW9uQXBpID0gY29uZmlndXJhdGlvbi5kYXRhQ29sbGVjdGlvbkFwaTtcbiAgICBlbnZpcm9ubWVudC5pc1BhZ2VMb2FkaW5nVG9CZURldGVjdGVkID0gaXNQYWdlTG9hZGluZ1RvQmVEZXRlY3RlZDtcbiAgICBlbnZpcm9ubWVudC5yZW1vdGVDb25maWdBcGkgPSBjb25maWd1cmF0aW9uLnJlbW90ZUNvbmZpZ0FwaTtcbiAgICB0aGlzLmVudkNvbmZpZy5uZXh0KGVudmlyb25tZW50KTtcbiAgICB0aGlzLmVudkNvbmZpZy5jb21wbGV0ZSgpO1xuICAgIHRoaXMudXNlck9iamVjdC5uZXh0KHsgdXNlckVtYWlsOiAnJywgdXNlclByb2ZpbGVJbWFnZTogJycsIHVzZXJOYW1lOiAnJywgdXNlclBob25lTnVtYmVyOiAnJywgdXNlcklkOiAnJywgb3RoZXJJbmZvOiAnJyB9KTtcblxuICAgIGVudmlyb25tZW50LnRyYWNrID0geyBtb3VzZTogdHJ1ZSwgc2Nyb2xsOiB0cnVlIH07XG4gICAgaWYgKGNvbmZpZ3VyYXRpb24udHJhY2sgJiYgY29uZmlndXJhdGlvbi50cmFjay5tb3VzZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBlbnZpcm9ubWVudC50cmFjay5tb3VzZSA9IGNvbmZpZ3VyYXRpb24udHJhY2subW91c2U7XG4gICAgfVxuICAgIGlmIChjb25maWd1cmF0aW9uLnRyYWNrICYmIGNvbmZpZ3VyYXRpb24udHJhY2suc2Nyb2xsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGVudmlyb25tZW50LnRyYWNrLnNjcm9sbCA9IGNvbmZpZ3VyYXRpb24udHJhY2suc2Nyb2xsO1xuICAgIH1cbiAgfVxuXG4gIGdldEVudk9ic2VydmFibGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZW52Q29uZmlnO1xuICB9XG5cbiAgc2V0VXNlckluZm8odXNlck9iamVjdDogVXNlckJlYW4pIHtcbiAgICB0aGlzLnVzZXJPYmplY3QubmV4dCh1c2VyT2JqZWN0KTtcbiAgfVxuXG4gIGdldFVzZXJJbmZvKCk6IE9ic2VydmFibGU8VXNlckJlYW4+IHtcbiAgICByZXR1cm4gdGhpcy51c2VyT2JqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vZW52aXJvbm1lbnQvZW52aXJvbm1lbnQnO1xuaW1wb3J0IHsgUGx1Z2luQ29uZmlnLCBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgRW52aXJvbm1lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vZW52aXJvbm1lbnQvZW52aXJvbm1lbnQuc2VydmljZSc7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnbmd4LWNvb2tpZS1zZXJ2aWNlJztcblxuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFBsdWdpbkNvbmZpZ1NlcnZpY2Uge1xuICAgIHJlbW90ZVBsdWdpbkNvbmZpZzogUGx1Z2luQ29uZmlnO1xuICAgIGRlbW9ncmFwaGljSW5mbzogYW55O1xuICAgIC8qKiBDb25zdGFudHMgKi9cbiAgICBjb25zdGFudHMgPSBDb25zdGFudHM7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgaHR0cENsaWVudDogSHR0cENsaWVudCxcbiAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgIHByaXZhdGUgY29va2llU2VydmljZTogQ29va2llU2VydmljZSkge1xuXG4gICAgfVxuXG4gICAgZ2V0RW52aXJvbm1lbnRDb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGVudiA9IHRoaXMuaW5qZWN0b3IuZ2V0KEVudmlyb25tZW50U2VydmljZSk7XG4gICAgICAgIGVudi5nZXRFbnZPYnNlcnZhYmxlKCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5mZXRjaFJlbW90ZUNvbmZpZygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnI6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbWF4LWxpbmUtbGVuZ3RoXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcigndW5hYmxlIHRvIGZldGNoIHhBbmFseXRpY3MgcmVtb3RlIGNvbmZpZ3VyYXRpb24uIFBsZWFzZSBtYWtlIHN1cmUgeW91IGhhdmUgY29uZmlndXJlZCB0aGUgY29ycmVjdCBVUkwsIGlmIHRoZSBpc3N1ZSBwZXJzaXN0IHBsZWFzZSBjaGVjayB0aGUgZGFzaGJvYXJkIGZvciBtb3JlIGluZm8gb3IgY29udGFjdCB4QSBUZWFtLiAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcHVibGljIGZldGNoUmVtb3RlQ29uZmlnKCkge1xuICAgICAgICB0aGlzLmh0dHBDbGllbnQuZ2V0KGVudmlyb25tZW50LnJlbW90ZUNvbmZpZ0FwaSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgcmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdGVQbHVnaW5Db25maWcgPSByZXNbJ2JvZHknXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnLnNob3dDb25zZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5yZW1vdGVQbHVnaW5Db25maWcuY29uc2VudENvbnRlbnQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnLmNvbnNlbnRDb250ZW50IDogZW52aXJvbm1lbnQuY29uc2VudENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrU2hvd0NvbnNlbnQoY29udGVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2NvbGxlY3Rpb24gZXJyb3InLCBlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ29uZmlndXJhdGlvbihhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoZWNrRGlzYWJsZVRyYWNraW5nKCkgJiZcbiAgICAgICAgICAgIHRoaXMuY2hlY2tEb21haW4oYW5hbHl0aWNzQmVhbi5mdWxsVVJMKSAmJlxuICAgICAgICAgICAgdGhpcy5jaGVja0lwUmFuZ2UoYW5hbHl0aWNzQmVhbi5kZW1vZ3JhcGhpY0luZm9bJ2lwJ10pO1xuXG4gICAgfVxuXG4gICAgY2hlY2tEaXNhYmxlVHJhY2tpbmcoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZykge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZy5kaXNhYmxlVHJhY2tpbmc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoZWNrRG9tYWluKGZ1bGxVcmw6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5yZW1vdGVQbHVnaW5Db25maWcgJiYgdGhpcy5yZW1vdGVQbHVnaW5Db25maWcuaWdub3JlRG9tYWlucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gISh0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZy5pZ25vcmVEb21haW5zLmZpbHRlcihkb21haW4gPT4gZnVsbFVybC5pbmRleE9mKGRvbWFpbikgPj0gMCkubGVuZ3RoID4gMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW1vdmVDaGVja1VybHModHJhY2tlZE9iamVjdHM6IEFycmF5PEFuYWx5dGljc0JlYW4+KTogQXJyYXk8QW5hbHl0aWNzQmVhbj4ge1xuICAgICAgICBpZiAodHJhY2tlZE9iamVjdHMgJiYgdHJhY2tlZE9iamVjdHMubGVuZ3RoID4gMCAmJiB0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZykge1xuICAgICAgICAgICAgcmV0dXJuIHRyYWNrZWRPYmplY3RzLm1hcChhbmFseXRpY3MgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghKHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnLmlnbm9yZVVybHMuZmlsdGVyKHVybCA9PiBhbmFseXRpY3MuZXZlbnRDb21wb25lbnQuaW5kZXhPZih1cmwpID49IDApLmxlbmd0aCA+IDApKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhbmFseXRpY3M7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuZmlsdGVyKG9iamVjdCA9PiBvYmplY3QgIT09IHVuZGVmaW5lZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJhY2tlZE9iamVjdHM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICogSVAgcmFuZ2UgcmVzdHJpY3Rpb24gYWRkZWRcbiAgICogQHJlc3RyaWN0SVBSYW5nZSBpcyBhIHJlZ2V4XG4gICAqIGlmIEByZXN0cmljdElQUmFuZ2UgaXMgbWF0Y2ggd2l0aCBjdXJyZW50IElQLFxuICAgKiB0aGUgYW5hbHl0aWNzIGRhdGEgd2lsbCBiZSByZXN0cmljdGVkXG4gICAqL1xuICAgIHByaXZhdGUgY2hlY2tJcFJhbmdlKGlwOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGlwICYmIHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnICYmIHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnLmlnbm9yZUlQUmFuZ2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGlwUmFuZ2UgPSB0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZy5pZ25vcmVJUFJhbmdlcztcbiAgICAgICAgICAgIHJldHVybiBpcC5tYXRjaChpcFJhbmdlKSA/IGZhbHNlIDogdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICogU2V0IHVzZXIgZGVtb2dyYXBoaWMgaW5mb3JtYXRpb24gaW4gY29va2llc1xuICAqL1xuICAgIGFzeW5jIGdldElwKCkge1xuICAgICAgICB0aGlzLmRlbW9ncmFwaGljSW5mbyA9IGF3YWl0IHRoaXMuaHR0cENsaWVudC5nZXQodGhpcy5jb25zdGFudHMuREVNT0dSQVBISUNfQVBJX1VSTCkudG9Qcm9taXNlKCk7XG4gICAgICAgIHRoaXMuY29va2llU2VydmljZS5zZXQoXG4gICAgICAgICAgICB0aGlzLmNvbnN0YW50cy5ERU1PR1JBUEhJQ19JTkZPLFxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkodGhpcy5kZW1vZ3JhcGhpY0luZm8pLFxuICAgICAgICAgICAgbmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgKyAoMTAwMCAqIDYwICogNjAgKiAyNCkpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVtb2dyYXBoaWNJbmZvO1xuICAgIH1cblxuXG4gICAgc2V0RGVtb2dyYXBoaWNJbmZvKCkge1xuICAgICAgICBpZiAoIXRoaXMuY29va2llU2VydmljZS5jaGVjayh0aGlzLmNvbnN0YW50cy5ERU1PR1JBUEhJQ19JTkZPKSkge1xuICAgICAgICAgICAgdGhpcy5nZXRJcCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kZW1vZ3JhcGhpY0luZm8gPSBKU09OLnBhcnNlKHRoaXMuY29va2llU2VydmljZS5nZXQodGhpcy5jb25zdGFudHMuREVNT0dSQVBISUNfSU5GTykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmRlbW9ncmFwaGljSW5mbztcbiAgICB9XG5cbiAgICBnZXREZW1vZ3JhcGhpY0luZm8oKSB7XG4gICAgICAgIGlmICh0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZyAmJiB0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZy5kaXNhYmxlRGVtb2dyYXBoaWNJbmZvKSB7XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXREZW1vZ3JhcGhpY0luZm8oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoZWNrU2hvd0NvbnNlbnQoY29udGVudDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGRpdkVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRpdkVsLmNsYXNzTGlzdC5hZGQoJ2NvbnNlbnQtd3JhcHBlcicpO1xuICAgICAgICBkaXZFbC5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG4gICAgICAgIGRpdkVsLnN0eWxlLmJvdHRvbSA9ICcwJztcbiAgICAgICAgZGl2RWwuc3R5bGUubGVmdCA9ICcwJztcbiAgICAgICAgZGl2RWwuc3R5bGUucmlnaHQgPSAnMCc7XG4gICAgICAgIGRpdkVsLnN0eWxlLnBhZGRpbmcgPSAnMTVweCc7XG4gICAgICAgIGRpdkVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjMzM2NmZmJztcbiAgICAgICAgZGl2RWwuc3R5bGUuY29sb3IgPSAnI2ZmZic7XG4gICAgICAgIGRpdkVsLnN0eWxlLmZvbnRTaXplID0gJzEycHgnO1xuICAgICAgICBkaXZFbC5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgY29uc3QgdGV4dEVsID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY29udGVudCk7XG4gICAgICAgIGRpdkVsLmFwcGVuZENoaWxkKHRleHRFbCk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2RWwpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vZW52aXJvbm1lbnQvZW52aXJvbm1lbnQnO1xuaW1wb3J0ICogYXMgdXVpZCBmcm9tICd1dWlkJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4sIFBlcmZvcm1hbmNlQmVhbiwgVXNlckJlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEV2ZW50TGFiZWxzLCBLZXlTdHJva2VFdmVudFR5cGUsIENvbnN0YW50cyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcbmltcG9ydCB7IFBsdWdpbkNvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2hhbmRsZUNvbmZpZyc7XG5pbXBvcnQgeyBFbnZpcm9ubWVudFNlcnZpY2UgfSBmcm9tICcuLi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudC5zZXJ2aWNlJztcbi8qKlxuICogQW5hbHl0aWNzIFNlcnZpY2VcbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQW5hbHl0aWNzU2VydmljZSB7XG5cbiAgLyoqIFNlc3Npb25JZCBvZiBwbHVnaW4gKi9cbiAgc2Vzc2lvbklkOiBzdHJpbmc7XG4gIC8qKiBEZW1vZ3JhcGhpYyBpbmZvICovXG4gIGRlbW9ncmFwaGljSW5mbzogYW55ID0ge307XG4gIC8qKiBFdmVudCBsYWJlbCBjb25zdGFudHMgKi9cbiAgZXZlbnRMYWJlbHMgPSBFdmVudExhYmVscztcbiAgLyoqIENvbnN0YW50cyAqL1xuICBjb25zdGFudHMgPSBDb25zdGFudHM7XG5cbiAgdXNlckluZm86IFVzZXJCZWFuO1xuXG4gIC8qKlxuICAgKiBBbmFseXRpY3MgU2VydmljZSBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gcGx1Z2luQ29uZmlnXG4gICAqIEBwYXJhbSBodHRwU2VydmljZVxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBodHRwU2VydmljZTogSHR0cENsaWVudCxcbiAgICBwcml2YXRlIHBsdWdpbkNvbmZpZzogUGx1Z2luQ29uZmlnU2VydmljZSxcbiAgICBwcml2YXRlIGVudmlyb25tZW50U2VydmljZTogRW52aXJvbm1lbnRTZXJ2aWNlKSB7XG4gICAgdGhpcy5wbHVnaW5Db25maWcuZ2V0RW52aXJvbm1lbnRDb25maWcoKTtcbiAgICB0aGlzLmdldFVzZXJJbmZvKCk7XG4gICAgdGhpcy5zZXRTZXNzaW9uSWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja2luZyB3aGV0aGVyIHNlc3Npb25JZCBwcmVzZW50IGluIGNvb2tpZSBvciBub3RcbiAgICogaWYgbm8gc2Vzc2lvbiBpZCBjb29raWUgcHJlc2VudCwgYWRkaW5nIG5ldyBzZXNzaW9uIGlkIG90aGVyd2lzZSByZXVzaW5nIHRoZSBzZXNzaW9uIGlkIHZhbHVlXG4gICAqL1xuICBwcml2YXRlIHNldFNlc3Npb25JZCgpOiB2b2lkIHtcbiAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmNvbnN0YW50cy5TRVNTSU9OX0lEKSkge1xuICAgICAgdGhpcy5zZXNzaW9uSWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKHRoaXMuY29uc3RhbnRzLlNFU1NJT05fSUQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlc3Npb25JZCA9IHV1aWQudjQoKTtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0odGhpcy5jb25zdGFudHMuU0VTU0lPTl9JRCwgdGhpcy5zZXNzaW9uSWQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja2luZyB0aGUgSVAgcmFuZ2UgdG8gYmUgcmVzdHJpY3RcbiAgICogQHBhcmFtIGRhdGEgLSBkYXRhIHRvIGJlIHB1c2hlZFxuICAgKi9cbiAgcHVibGljIHB1c2hEYXRhKGRhdGE6IGFueSk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBsdWdpbkNvbmZpZy5oYW5kbGVDb25maWd1cmF0aW9uKGRhdGEuZXZlbnRWYWx1ZXNbMF0pKSB7XG4gICAgICBjb25zdCBhbmFseXRpY3NPYmplY3RMaXN0ID0gdGhpcy5wbHVnaW5Db25maWcucmVtb3ZlQ2hlY2tVcmxzKGRhdGEuZXZlbnRWYWx1ZXMpO1xuICAgICAgaWYgKGFuYWx5dGljc09iamVjdExpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLnB1Ymxpc2hUT0F1dGhTMyhhbmFseXRpY3NPYmplY3RMaXN0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIENvbnZlcnRpbmcgSlNPTiBBcnJheSB0byBzdHJpbmdcbiAgICogQHBhcmFtIGRhdGFcbiAgICovXG4gIHByaXZhdGUgcHJvY2Vzc0ZvckF0aGVuYShkYXRhOiBBcnJheTxBbmFseXRpY3NCZWFuPik6IHN0cmluZyB7XG4gICAgaWYgKGRhdGEgJiYgZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gZGF0YS5tYXAoKG9iamVjdDogYW55KSA9PiB7XG4gICAgICAgIG9iamVjdFsnc2Vzc2lvbklkJ10gPSB0aGlzLnNlc3Npb25JZDtcbiAgICAgICAgb2JqZWN0WydldmVudElkJ10gPSBgJHt0aGlzLnNlc3Npb25JZH1UJHtuZXcgRGF0ZShvYmplY3QuZXZlbnRUaW1lKS5nZXRUaW1lKCl9YDtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iamVjdCk7XG4gICAgICB9KS5qb2luKCdcXG4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgICogUHJlcGFyaW5nIGRhdGEgdG8gYmUgcHVzaGVkIHRvIERhdGFTdG9yYWdlXG4gICAgKiBAcGFyYW0gZGF0YSAgZGF0YSB0byBiZSBwdXNoZWRcbiAgICAqL1xuICBwcml2YXRlIHB1Ymxpc2hUT0F1dGhTMyhkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBmaWxlbmFtZSA9IGAke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdfV8ke3RoaXMuc2Vzc2lvbklkfV8ke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKX0uanNvbmA7XG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG4gICAgdGhpcy5wdXNoRGF0YVRvUzMoZmlsZW5hbWUsIHRoaXMucHJvY2Vzc0ZvckF0aGVuYShkYXRhKSwgaGVhZGVycyk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBQdXNoaW5nIGRhdGEgdG8gY29ycmVzcG9uZGluZyBidWNrZXQgdXNpbmcgZGF0YSBjb2xsZWN0aW9uIGFwaVxuICAgKiBAcGFyYW0gcGF0aCAtIHNlcnZpY2UgcGF0aFxuICAgKiBAcGFyYW0gZGF0YSAtIGRhdGEgdG8gYmUgcHVzaGVkXG4gICAqL1xuICBwcml2YXRlIHB1c2hEYXRhVG9TMyhwYXRoOiBzdHJpbmcsIGRhdGE6IGFueSwgaGVhZGVyczogSHR0cEhlYWRlcnMpOiB2b2lkIHtcbiAgICBjb25zdCB1cmwgPSBgJHtlbnZpcm9ubWVudC5kYXRhQ29sbGVjdGlvbkFwaX0ke3BhdGh9YDtcbiAgICB0aGlzLmh0dHBTZXJ2aWNlLnB1dCh1cmwsIGRhdGEsIHsgaGVhZGVyczogaGVhZGVycyB9KS5zdWJzY3JpYmUocmVzID0+IHsgfSwgZXJyID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2F2ZSB0aGUgY2FwdHVyZWQgSFRNTCB0byB0aGUgZGF0YSBjb2xsZWN0aW9uXG4gICAqIEBwYXJhbSBodG1sVGVtcGxhdGUgLSBET00gQ29udGVudFxuICAgKiBAcGFyYW0gc2NyZWVuc2hvdE5hbWUgLSBmaWxlbmFtZSB0byBiZSBzYXZlZFxuICAgKi9cbiAgcHVibGljIHNhdmVTY3JlZW5zaG90c0luUzMoaHRtbFRlbXBsYXRlOiBzdHJpbmcsIHNjcmVlbnNob3ROYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wbHVnaW5Db25maWcuY2hlY2tEaXNhYmxlVHJhY2tpbmcoKSkge1xuICAgICAgY29uc3QgZmlsZW5hbWUgPSBgYXNzZXRzLyR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF19LyR7dGhpcy5zZXNzaW9uSWR9LyR7c2NyZWVuc2hvdE5hbWV9Lmh0bWxgO1xuICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAndGV4dC9odG1sJyB9KTtcbiAgICAgIHRoaXMucHVzaERhdGFUb1MzKGZpbGVuYW1lLCBodG1sVGVtcGxhdGUsIGhlYWRlcnMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQdXNoaW5nIGNvbnNvbGUgZXJyb3JzIHRvIFMzIGJ1Y2tldFxuICAgKiBAcGFyYW0gZGF0YSBcbiAgICovXG4gIHB1YmxpYyBwdWJsaXNoQ29uc29sZUVycm9ycyhkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wbHVnaW5Db25maWcuY2hlY2tEaXNhYmxlVHJhY2tpbmcoKSkge1xuICAgICAgZGF0YVsnc2Vzc2lvbklkJ10gPSB0aGlzLnNlc3Npb25JZDtcbiAgICAgIGRhdGFbJ2V2ZW50SWQnXSA9IGAke3RoaXMuc2Vzc2lvbklkfVQke25ldyBEYXRlKGRhdGEuZXZlbnRUaW1lKS5nZXRUaW1lKCl9X0NPTlNPTEVfRVJST1JgO1xuICAgICAgY29uc3QgZmlsZW5hbWUgPSBgJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXX1fJHt0aGlzLnNlc3Npb25JZH1fY29uc29sZV9lcnJvcnNfJHtuZXcgRGF0ZSgpLmdldFRpbWUoKX0uanNvbmA7XG4gICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcbiAgICAgIHRoaXMucHVzaERhdGFUb1MzKGZpbGVuYW1lLCBkYXRhLCBoZWFkZXJzKTtcbiAgICB9XG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIFNldHRpbmcgYW5hbHl0aWNzIG9iamVjdCB0byBiZSBzYXZlZCBpbiBTMyBidWNrZXRcbiAgICogQHBhcmFtIHVzZXJEYXRhIC0gRGF0YSB0cmFuc2ZlcnJlZCB0byBFdmVudCBEaXJlY3RpdmVcbiAgICogQHBhcmFtIGV2ZW50RGV0YWlscyAtIFBvc2l0aW9uIG9mIGV2ZW50c1xuICAgKiBAcGFyYW0gZXZlbnROYW1lICAtIFR5cGUgb2YgZXZlbnRcbiAgICogQHBhcmFtIHNjcmVlbnNob3ROYW1lICAtIGZpbGUgbmFtZSBvZiBzYXZlZCBzY3JlZW5zaG90IGlmIHRoZSBldmVudCBpcyBQYWdlTG9hZGVkXG4gICAqL1xuICBwdWJsaWMgc2V0QW5hbHl0aWNzRGF0YShcbiAgICB1c2VyRGF0YTogYW55ID0ge30sXG4gICAgZXZlbnREZXRhaWxzOiBhbnksXG4gICAgZXZlbnROYW1lOiBzdHJpbmcsXG4gICAgc2NyZWVuc2hvdE5hbWU6IHN0cmluZyxcbiAgICBvcHRpb25hbD86IHtcbiAgICAgIGV2ZW50Q29tcG9uZW50Pzogc3RyaW5nLFxuICAgICAga2V5U3Ryb2tlRGF0YT86IEtleVN0cm9rZUV2ZW50VHlwZSxcbiAgICAgIGNvbnNvbGVFcnJvcnM/OiBzdHJpbmdcbiAgICB9KTogQW5hbHl0aWNzQmVhbiB7XG4gICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9IHtcbiAgICAgIGV2ZW50TGFiZWw6IGV2ZW50TmFtZSxcbiAgICAgIGV2ZW50Q29tcG9uZW50OiBvcHRpb25hbCAmJiBvcHRpb25hbC5ldmVudENvbXBvbmVudCA/IG9wdGlvbmFsLmV2ZW50Q29tcG9uZW50IDogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCc/JylbMF0sXG4gICAgICBicm93c2VyOiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCxcbiAgICAgIGZ1bGxVUkw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxuICAgICAgb3JpZ2luOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luLFxuICAgICAgcmVzb2x1dGlvbjogYCR7d2luZG93LmlubmVyV2lkdGh9eCR7d2luZG93LmlubmVySGVpZ2h0fWAsXG4gICAgICB4Q29vcmQ6IHRoaXMuZ2V0RXZlbnREZXRhaWxzKGV2ZW50RGV0YWlsc1snY2xpZW50WCddKSxcbiAgICAgIHlDb29yZDogdGhpcy5nZXRFdmVudERldGFpbHMoZXZlbnREZXRhaWxzWydjbGllbnRZJ10pLFxuICAgICAgcGFnZVhDb29yZDogd2luZG93LnBhZ2VYT2Zmc2V0LnRvU3RyaW5nKCkgfHwgJzAnLFxuICAgICAgcGFnZVlDb29yZDogd2luZG93LnBhZ2VZT2Zmc2V0LnRvU3RyaW5nKCkgfHwgJzAnLFxuICAgICAgZXZlbnRUaW1lOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICBzY3JlZW5zaG90OiBzY3JlZW5zaG90TmFtZSxcbiAgICAgIGFkZGl0aW9uYWxJbmZvOiB1c2VyRGF0YSxcbiAgICAgIGVycm9yczogKG9wdGlvbmFsICYmIG9wdGlvbmFsLmNvbnNvbGVFcnJvcnMpID8gb3B0aW9uYWwuY29uc29sZUVycm9ycyA6ICcnLFxuICAgICAgdXRtOiB0aGlzLmdldFVUTVBhcmFtZXRlcnMod2luZG93LmxvY2F0aW9uLmhyZWYpLFxuICAgICAgZGVtb2dyYXBoaWNJbmZvOiB0aGlzLnBsdWdpbkNvbmZpZy5nZXREZW1vZ3JhcGhpY0luZm8oKSxcbiAgICAgIGtleVN0cm9rZURhdGE6IChvcHRpb25hbCAmJiBvcHRpb25hbC5rZXlTdHJva2VEYXRhKSA/IG9wdGlvbmFsLmtleVN0cm9rZURhdGEgOiB0aGlzLmdldEVtcHR5S2V5U3Ryb2tlRGF0YSgpLFxuICAgICAgaHRtbEVsZW1lbnQ6IHRoaXMuZ2V0SHRtbEVsZW1lbnQoZXZlbnREZXRhaWxzWyd0YXJnZXQnXSwgZXZlbnROYW1lKSxcbiAgICAgIHBlcmZvcm1hbmNlOiB0aGlzLmdldFBlcmZvcm1hbmNlRGV0YWlscygpLFxuICAgICAgdXNlckluZm86IHRoaXMudXNlckluZm9cbiAgICB9O1xuICAgIHJldHVybiBhbmFseXRpY3NCZWFuO1xuICB9XG5cbiAgLyoqXG4gICAqIEV2ZW50IGRldGFpbHNcbiAgICogQHBhcmFtIHZhbHVlIFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRFdmVudERldGFpbHModmFsdWU6IGFueSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZS50b1N0cmluZygpIDogJzAnO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBIVE1MIENvbnRlbnRcbiAgICogQHBhcmFtIHRhcmdldEVsZW1lbnQgLSB0YXJnZXQgZWxlbWVudFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRIdG1sRWxlbWVudCh0YXJnZXRFbGVtZW50OiBhbnksIGV2ZW50TmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAoZXZlbnROYW1lICE9PSB0aGlzLmV2ZW50TGFiZWxzLk1PVVNFX01PVkUgJiYgZXZlbnROYW1lICE9PSB0aGlzLmV2ZW50TGFiZWxzLlNDUk9MTCkge1xuICAgICAgcmV0dXJuIHRhcmdldEVsZW1lbnQgIT09IHVuZGVmaW5lZCA/IHRhcmdldEVsZW1lbnRbJ2lubmVySFRNTCddIDogJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1cblxuXG4gIHByaXZhdGUgZ2V0RW1wdHlLZXlTdHJva2VEYXRhKCk6IEtleVN0cm9rZUV2ZW50VHlwZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGtleTogJycsXG4gICAgICBrZXlDb2RlOiAnJyxcbiAgICAgIGNvZGU6ICcnLFxuICAgICAgZWxlbWVudElkOiAnJyxcbiAgICAgIGZvcm06ICcnLFxuICAgICAgaHRtbEVsZW1lbnRUeXBlOiAnJyxcbiAgICAgIGlzRm9ybTogZmFsc2UsXG4gICAgICB0YWdOYW1lOiAnJyxcbiAgICAgIHZhbHVlOiAnJ1xuICAgIH07XG4gIH1cblxuXG4gIC8qKlxuICAgKiBQZXJmb3JtYW5jZSBkZXRhaWxzXG4gICAqL1xuICBwcml2YXRlIGdldFBlcmZvcm1hbmNlRGV0YWlscygpOiBQZXJmb3JtYW5jZUJlYW4ge1xuICAgIGNvbnN0IHBlcmZvcm1hbmNlID0gd2luZG93LnBlcmZvcm1hbmNlO1xuICAgIHJldHVybiB7XG4gICAgICBuYXZpZ2F0aW9uOiBwZXJmb3JtYW5jZS5uYXZpZ2F0aW9uLFxuICAgICAgdGltZU9yaWdpbjogcGVyZm9ybWFuY2UudGltZU9yaWdpbixcbiAgICAgIHRpbWluZzogcGVyZm9ybWFuY2UudGltaW5nXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZW1vcnkgdXNhZ2Ugb2YgdGhlIGFwcGxpY2F0aW9uIGlzIHByb3ZpZGVkIGJ5IEdvb2dsZSBDaHJvbWVcbiAgICogQHBhcmFtIHVzZXJBZ2VudCAtIFVzZXIgYWdlbnQgdG8gY2hlY2sgdGhlIGJyb3dzZXJcbiAgICovXG4gIHByaXZhdGUgZ2VNZW1vcnlVc2FnZUluZm8odXNlckFnZW50OiBhbnkpIHtcbiAgICBjb25zdCBpc0Nocm9tZSA9IHVzZXJBZ2VudC5zcGxpdCgnY2hyb21lJykubGVuZ3RoID4gMTtcbiAgICBjb25zdCBtZW1vcnkgPSBpc0Nocm9tZSA/IHdpbmRvdy5wZXJmb3JtYW5jZVsnbWVtb3J5J10gOiAnJztcbiAgICByZXR1cm4gbWVtb3J5O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHRpbmcgVVRNIFBhcmFtZXRlcnMgYnkgcHJvY2Vzc2luZyBjdXJyZW50IHBhZ2VVUkxcbiAgICogQHBhcmFtIHVybCAtIFBhZ2UgVVJMXG4gICAqL1xuICBwcml2YXRlIGdldFVUTVBhcmFtZXRlcnModXJsOiBzdHJpbmcpOiBhbnkge1xuICAgIGNvbnN0IHV0bU9iamVjdCA9IHt9O1xuICAgIGlmICh1cmwuaW5jbHVkZXMoJ3V0bScpKSB7XG4gICAgICBjb25zdCB1dG1QYXJhbXMgPSB1cmwuc3BsaXQoJz8nKVsxXS5zcGxpdCgnJicpO1xuICAgICAgdXRtUGFyYW1zLm1hcChwYXJhbSA9PiB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHBhcmFtLnNwbGl0KCc9Jyk7XG4gICAgICAgIHV0bU9iamVjdFtwYXJhbXNbMF1dID0gcGFyYW1zWzFdO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB1dG1PYmplY3Q7XG4gIH1cblxuICAvKipcbiAgICogR2V0dGluZyB1c2VyIGluZm9cbiAgICovXG4gIHByaXZhdGUgZ2V0VXNlckluZm8oKSB7XG4gICAgdGhpcy5lbnZpcm9ubWVudFNlcnZpY2UuZ2V0VXNlckluZm8oKS5zdWJzY3JpYmUoXG4gICAgICAocmVzOiBVc2VyQmVhbikgPT4ge1xuICAgICAgICB0aGlzLnVzZXJJbmZvID0gcmVzO1xuICAgICAgICBjb25zb2xlLmxvZygncmVjZWl2ZSB1c2VyIGJlYW4nLCB0aGlzLnVzZXJJbmZvKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBpbnRlcnZhbCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5pbXBvcnQgKiBhcyB1dWlkIGZyb20gJ3V1aWQnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBEYXRhU3RvcmFnZVNlcnZpY2Uge1xuXG4gIGNvbnN0YW50cyA9IENvbnN0YW50cztcbiAgYWxsRGF0YUFuYWx5dGljc0FycmF5OiBBcnJheTxhbnk+ID0gW107XG4gIGFsbERhdGFBbmFseXRpY3M6IHtcbiAgICBwYWdlVXJsOiBzdHJpbmcsXG4gICAgZXZlbnRWYWx1ZXM6IEFycmF5PGFueT5cbiAgfTtcbiAgcHJldmlvdXNVcmw6IHN0cmluZztcbiAga2V5czogQXJyYXk8YW55PiA9IFtdO1xuICBpZGxlVGltZXJTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgZXZlbnRDb2xsZWN0b3IgPSBuZXcgTWFwKCk7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYW5hbHl0aWNhbFNlcnZpY2U6IEFuYWx5dGljc1NlcnZpY2UsIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkgeyB9XG4gIHByaXZhdGUgcm91dGVEZXRhaWxzOiBhbnkgPSBbXTtcbiAgY291bnQgPSAwO1xuICBzZXRVcmxLZXkoZGF0YTogc3RyaW5nKSB7XG4gICAgbGV0IGZsYWcgPSAwO1xuICAgIGlmICh0aGlzLnByZXZpb3VzVXJsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuZXZlbnRDb2xsZWN0b3Iuc2V0KGRhdGEsIFtdKTtcbiAgICAgIHRoaXMucHJldmlvdXNVcmwgPSBkYXRhIHx8ICcvJztcbiAgICB9IGVsc2UgaWYgKCEoZGF0YSA9PT0gdGhpcy5wcmV2aW91c1VybCkpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIEFycmF5LmZyb20odGhpcy5ldmVudENvbGxlY3Rvci5rZXlzKCkpKSB7XG4gICAgICAgIGlmIChrZXkgPT09IGRhdGEpIHtcbiAgICAgICAgICBmbGFnID0gMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGZsYWcgPT09IDApIHtcbiAgICAgICAgdGhpcy5ldmVudENvbGxlY3Rvci5zZXQoZGF0YSwgW10pO1xuICAgICAgfVxuICAgICAgdGhpcy5wcmV2aW91c1VybCA9IGRhdGE7XG4gICAgfVxuICB9XG4gIGFwcGVuZFRvQW5hbHl0aWNzQXJyYXkoZGF0YTogQW5hbHl0aWNzQmVhbikge1xuICAgIGlmICh0aGlzLnByZXZpb3VzVXJsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuc2V0VXJsS2V5KGRhdGEuZXZlbnRDb21wb25lbnQpO1xuICAgIH1cbiAgICB0aGlzLmV2ZW50Q29sbGVjdG9yLmdldCh0aGlzLnByZXZpb3VzVXJsKS5wdXNoKGRhdGEpO1xuICB9XG5cbiAgcHVzaERhdGFBcnJheVRvUzMoKSB7XG4gICAgdGhpcy5jb3VudCsrO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIEFycmF5LmZyb20odGhpcy5ldmVudENvbGxlY3Rvci5rZXlzKCkpKSB7XG4gICAgICB0aGlzLmFsbERhdGFBbmFseXRpY3MgPSB7XG4gICAgICAgIHBhZ2VVcmw6IGtleSxcbiAgICAgICAgZXZlbnRWYWx1ZXM6IEFycmF5LmZyb20odGhpcy5ldmVudENvbGxlY3Rvci5nZXQoa2V5KS52YWx1ZXMoKSlcbiAgICAgIH07XG4gICAgICB0aGlzLmtleXMucHVzaChrZXkpO1xuICAgICAgaWYgKHRoaXMuYWxsRGF0YUFuYWx5dGljcy5ldmVudFZhbHVlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuc3RvcElkbGVUaW1lcigpO1xuICAgICAgICB0aGlzLmFuYWx5dGljYWxTZXJ2aWNlLnB1c2hEYXRhKHRoaXMuYWxsRGF0YUFuYWx5dGljcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0YXJ0Q2FsY3VsYXRlSWRsZVRpbWUoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5ldmVudENvbGxlY3Rvci5jbGVhcigpO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIHRoaXMua2V5cykge1xuICAgICAgdGhpcy5ldmVudENvbGxlY3Rvci5zZXQoa2V5LCBbXSk7XG4gICAgfVxuICB9XG5cbiAgc2V0Um91dGVEZXRhaWxzKHJvdXRlRGV0YWlsczogYW55KSB7XG4gICAgdGhpcy5yb3V0ZURldGFpbHMgPSByb3V0ZURldGFpbHM7XG4gIH1cblxuICBnZXRSb3V0ZURldGFpbHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucm91dGVEZXRhaWxzO1xuICB9XG5cbiAgLyoqXG4gICAqIElmIHRoZSBzZXNzaW9uIGlzIGlkbGUgZm9yIDMwIG1pbiwgdGhlIHNlc3Npb24gd2lsbCBiZSBjbGVhcmVkXG4gICAqL1xuICBzdGFydENhbGN1bGF0ZUlkbGVUaW1lKCkge1xuICAgIGlmICghdGhpcy5pZGxlVGltZXJTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuaWRsZVRpbWVyU3Vic2NyaXB0aW9uID0gaW50ZXJ2YWwoMTAwMCAqIDYwICogMzApLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgICAgY29uc3Qgc2Vzc2lvbklkID0gdXVpZC52NCgpO1xuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKHRoaXMuY29uc3RhbnRzLlNFU1NJT05fSUQsIHNlc3Npb25JZCk7XG4gICAgICAgIHRoaXMuc3RvcElkbGVUaW1lcigpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGlmIHRoZSBpZGxlIHRpbWVyIGlzIHJ1bm5pbmcsIHJlc2V0dGluZyB0aGUgdGltZXJcbiAgICovXG4gIHN0b3BJZGxlVGltZXIoKSB7XG4gICAgaWYgKHRoaXMuaWRsZVRpbWVyU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmlkbGVUaW1lclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5pZGxlVGltZXJTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLnN0YXJ0Q2FsY3VsYXRlSWRsZVRpbWUoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBFdmVudExhYmVscyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcblxuLyoqXG4gKiBCdXR0b24gRGlyZWN0aXZlIHRvIHRyYWNrIGNsaWNrIGV2ZW50XG4gKiBTZWxlY3RvciBjYW4gYmUgYWRkZWQgdG8gYW55IEhUTUwgRWxlbWVudFxuICovXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdbdHJhY2stYnRuXSdcbn0pXG5leHBvcnQgY2xhc3MgQnV0dG9uRGlyZWN0aXZlIHtcblxuICAvLyBHZXRzIGltcG9ydGFudCBkYXRhIGFib3V0IHRoZSBidXR0b24gZXhwbGljaXRseSBmcm9tIHRoZSBhcHBsaWNhdGlvblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWlucHV0LXJlbmFtZVxuICBASW5wdXQoJ3RyYWNrLWJ0bicpIGRhdGE6IGFueSA9IHt9O1xuICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuICBldmVudERldGFpbHM6IGFueTtcblxuICAvKipcbiAgICogQnV0dG9uIFRyYWNraW5nIC0gQ29uc3RydWN0b3JcbiAgICogQHBhcmFtIGRhdGFTdG9yYWdlIC0gRGF0YVN0b3JhZ2VTZXJ2aWNlXG4gICAqIEBwYXJhbSBhbmFseXRpY3NTZXJ2aWNlXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFTdG9yYWdlOiBEYXRhU3RvcmFnZVNlcnZpY2UsIHByaXZhdGUgYW5hbHl0aWNzU2VydmljZTogQW5hbHl0aWNzU2VydmljZSkgeyB9XG5cblxuICAvKipcbiAgICogIExpc3RlbiB0byBidXR0b24gY2xpY2sgYWN0aW9uc1xuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKSBvbkNsaWNrKCRldmVudDogYW55KSB7XG4gICAgdGhpcy5ldmVudERldGFpbHMgPSAkZXZlbnQ7XG4gICAgdGhpcy5zZW5kRGF0YSgpO1xuICB9XG5cbiAgLyoqIFNlbmRpbmcgZGF0YSBvbiBidXR0b24gY2xpY2sgKi9cbiAgcHVibGljIHNlbmREYXRhKCk6IHZvaWQge1xuICAgIGNvbnN0IGFuYWx5dGljc0JlYW46IEFuYWx5dGljc0JlYW4gPVxuICAgICAgdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnNldEFuYWx5dGljc0RhdGEodGhpcy5kYXRhLCB0aGlzLmV2ZW50RGV0YWlscywgdGhpcy5ldmVudExhYmVscy5CVVRUT05fQ0xJQ0ssICcnKTtcbiAgICB0aGlzLmRhdGFTdG9yYWdlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkoYW5hbHl0aWNzQmVhbik7XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgT25DaGFuZ2VzLCBIb3N0TGlzdGVuZXIsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgRXZlbnRMYWJlbHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5pbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gJy4uLy4uL2Vudmlyb25tZW50L2Vudmlyb25tZW50JztcblxuQERpcmVjdGl2ZSh7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkaXJlY3RpdmUtc2VsZWN0b3JcbiAgICBzZWxlY3RvcjogJ1t0cmFjay1zY3JvbGxdJ1xufSlcbmV4cG9ydCBjbGFzcyBTY3JvbGxEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gICAgLy8gR2V0cyBpbXBvcnRhbnQgZGF0YSBhYm91dCB0aGUgY29tcG9uZW50IGV4cGxpY2l0bHkgZnJvbSB0aGUgYXBwbGljYXRpb25cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWlucHV0LXJlbmFtZVxuICAgIEBJbnB1dCgndHJhY2stc2Nyb2xsJykgZGF0YTogYW55ID0ge307XG4gICAgZXZlbnRMYWJlbHMgPSBFdmVudExhYmVscztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGFuYWx5dGljc1NlcnZpY2U6IEFuYWx5dGljc1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZVxuICAgICkgeyB9XG5cbiAgICAvLyBDYXB0dXJlIHRoZSBjaGFuZ2UgaW4gZGF0YVxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge1xuICAgICAgICB0aGlzLmRhdGEgPSBjaGFuZ2VzLmRhdGEuY3VycmVudFZhbHVlO1xuICAgIH1cblxuICAgIC8vIFRyaWdnZXJlZCB3aGVuIGFueSBzY3JvbGwgZXZlbnQgb2NjdXJzXG4gICAgQEhvc3RMaXN0ZW5lcignd2luZG93OnNjcm9sbCcsIFsnJGV2ZW50J10pIG9uU2Nyb2xsRXZlbnQoJGV2ZW50OiBhbnkpIHtcbiAgICAgICAgaWYgKGVudmlyb25tZW50LnRyYWNrLnNjcm9sbCkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kRGF0YSgkZXZlbnQpO1xuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcHVibGljIHNlbmREYXRhKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9XG4gICAgICAgICAgICB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YSh0aGlzLmRhdGEsIGV2ZW50LCB0aGlzLmV2ZW50TGFiZWxzLlNDUk9MTCwgJycpO1xuICAgICAgICB0aGlzLmRhdGFTdG9yYWdlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkoYW5hbHl0aWNzQmVhbik7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBFdmVudExhYmVscyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcblxuQERpcmVjdGl2ZSh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGlyZWN0aXZlLXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnW3RyYWNrLWJ1dHRvbkhvdmVyXSdcbn0pXG5leHBvcnQgY2xhc3MgQnV0dG9uSG92ZXJEaXJlY3RpdmUge1xuICAvKiogKi9cbiAgZXZlbnREZXRhaWxzOiBhbnk7XG4gIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG4gIC8vIEdldHMgaW1wb3J0YW50IGRhdGEgYWJvdXQgdGhlIGJ1dHRvbiBleHBsaWNpdGx5IGZyb20gdGhlIGFwcGxpY2F0aW9uXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgndHJhY2stYnV0dG9uSG92ZXInKSBkYXRhOiBhbnkgPSB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFTdG9yYWdlOiBEYXRhU3RvcmFnZVNlcnZpY2UsIHByaXZhdGUgYW5hbHl0aWNzU2VydmljZTogQW5hbHl0aWNzU2VydmljZSkgeyB9XG5cbiAgLy8gTGlzdGVuIHRvIGJ1dHRvbiBob3ZlciBhY3Rpb25zXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlb3ZlcicsIFsnJGV2ZW50J10pIG9uTW91c2VPdmVyKCRldmVudDogYW55KSB7XG4gICAgdGhpcy5ldmVudERldGFpbHMgPSAkZXZlbnQ7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnNlbmREYXRhKCk7XG4gICAgfSwgMTApO1xuICB9XG5cbiAgLy8gU2VuZGluZyBkYXRhIG9uIGJ1dHRvbiBob3ZlclxuICBwdWJsaWMgc2VuZERhdGEoKTogdm9pZCB7XG4gICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9XG4gICAgICB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YSh0aGlzLmRhdGEsIHRoaXMuZXZlbnREZXRhaWxzLCB0aGlzLmV2ZW50TGFiZWxzLk1PVVNFX0hPVkVSLCAnJyk7XG4gICAgdGhpcy5kYXRhU3RvcmFnZS5hcHBlbmRUb0FuYWx5dGljc0FycmF5KGFuYWx5dGljc0JlYW4pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FbmQsIE5hdmlnYXRpb25FcnJvciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnLi4vYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgRXZlbnRMYWJlbHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5kZWNsYXJlIGxldCBuZ1MzQW5hbHl0aWNzSlM6IGFueTtcbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFJvdXRlclNlcnZpY2Uge1xuICBhbmFseXRpY3NEYXRhOiBBbmFseXRpY3NCZWFuO1xuICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuICBuYXZpZ2F0ZU9uID0gJyc7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVzOiBSb3V0ZXIsIHByaXZhdGUgYW5hbHl0aWNzU2VydmljZTogQW5hbHl0aWNzU2VydmljZSwgcHJpdmF0ZSBkYXRhU3RvcmFnZTogRGF0YVN0b3JhZ2VTZXJ2aWNlKSB7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFja2luZyByb3V0ZXIgZXZlbnRzXG4gICAqL1xuICBwdWJsaWMgdHJhY2tSb3V0ZXJFdmVudHMoKTogdm9pZCB7XG4gICAgLyoqIFRyaWdnZXJlZCB3aGVuIGN1cnJlbnQgcGFnZSBpcyBsb2FkZWQgKi9cbiAgICB0aGlzLnJvdXRlcy5ldmVudHMuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgLyoqIFRyaWdnZXJlZCB3aGVuIE5hdmlnYXRpb25FbmQgZXZlbnQgb2NjdXJzICovXG4gICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSB7XG4gICAgICAgIGlmICh0aGlzLm5hdmlnYXRlT24gIT09IGV2ZW50LnVybCkge1xuICAgICAgICAgIHRoaXMuYW5hbHl0aWNzUHVzaERhdGEoZXZlbnQpO1xuICAgICAgICAgIHRoaXMubmF2aWdhdGVPbiA9IGV2ZW50LnVybDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FcnJvcikge1xuICAgICAgICAvKiogVHJpZ2dlcmVkIHdoZW4gTmF2aWdhdGlvbkVycm9yIGV2ZW50IG9jY3VycyAqL1xuICAgICAgICB0aGlzLmFuYWx5dGljc1B1c2hEYXRhKGV2ZW50KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQdXNoaW5nIGFuYWx5dGljcyBkYXRhXG4gICAqIEBwYXJhbSBldmVudCAtIFJvdXRlciBFdmVudFxuICAgKi9cbiAgcHVibGljIGFuYWx5dGljc1B1c2hEYXRhKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBzY3JlZW5zaG90TmFtZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpLnRvU3RyaW5nKCk7XG4gICAgdGhpcy5hbmFseXRpY3NEYXRhID0gdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnNldEFuYWx5dGljc0RhdGEoe30sIHt9LCB0aGlzLmV2ZW50TGFiZWxzLlBBR0VfTE9BRCwgYCR7c2NyZWVuc2hvdE5hbWV9Lmh0bWxgLFxuICAgICAgeyBldmVudENvbXBvbmVudDogZXZlbnQudXJsIH0pO1xuICAgIHRoaXMud2FpdFRpbGxQYWdlTG9hZChzY3JlZW5zaG90TmFtZSk7XG4gICAgLy8gRGF0YSBpcyBzZW5kIG9ubHkgd2hlbiB1c2VyIGNvbmZpZ3VyZSB0aGUgcGFnZSBsb2FkaW5nIHRvIGJlIHRydWVcbiAgICB0aGlzLmRhdGFTdG9yYWdlLnNldFVybEtleSh0aGlzLmFuYWx5dGljc0RhdGEuZXZlbnRDb21wb25lbnQpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5kYXRhU3RvcmFnZS5hcHBlbmRUb0FuYWx5dGljc0FycmF5KHRoaXMuYW5hbHl0aWNzRGF0YSk7XG4gICAgfSwgMCk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBXYWl0aW5nIGZvciBwYWdlIHRvIGxvYWQgY29tcGxldGVseVxuICAgKiBAcGFyYW0gZXZlbnQgXG4gICAqL1xuICB3YWl0VGlsbFBhZ2VMb2FkKHNjcmVlbnNob3ROYW1lOiBzdHJpbmcpIHtcbiAgICBjb25zdCBfc2VsZiA9IHRoaXM7XG4gICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgX3NlbGYuY2FwdHVyZVRlbXBsYXRlKHNjcmVlbnNob3ROYW1lKTtcbiAgICAgIH1cbiAgICB9LCAxMDAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYXB0dXJlIHRlbXBsYXRlIG9mIGxvYWRlZCB2aWV3XG4gICAqIEBwYXJhbSBzY3JlZW5zaG90TmFtZSAtIFNjcmVlbnNob3QgaW1hZ2VcbiAgICovXG4gIGNhcHR1cmVUZW1wbGF0ZShzY3JlZW5zaG90TmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgZnVsbFBhZ2VIVE1MID0gbmdTM0FuYWx5dGljc0pTLmNvbnN0cnVjdEhUTUxQYWdlKFxuICAgICAgdGhpcy5wcm9jZXNzUmVnZXhPcGVyYXRpb25zKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWQnKS5pbm5lckhUTUwpLFxuICAgICAgdGhpcy5wcm9jZXNzUmVnZXhPcGVyYXRpb25zKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5pbm5lckhUTUwpXG4gICAgKTtcbiAgICB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2F2ZVNjcmVlbnNob3RzSW5TMyhmdWxsUGFnZUhUTUwsIHNjcmVlbnNob3ROYW1lKTtcbiAgfVxuXG5cbiAgcHJvY2Vzc1JlZ2V4T3BlcmF0aW9ucyh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBuZ1MzQW5hbHl0aWNzSlMuZG9SZWdleCh0ZXh0LCB3aW5kb3cubG9jYXRpb24ub3JpZ2luKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5wdXQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRXZlbnRMYWJlbHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5pbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gJy4uLy4uL2Vudmlyb25tZW50L2Vudmlyb25tZW50JztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUG9pbnRlclNlcnZpY2Uge1xuXG4gIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG4gIGV2ZW50RGV0YWlsczogYW55O1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWlucHV0LXJlbmFtZVxuICBASW5wdXQoJ3RyYWNrLXBvaW50ZXInKSBkYXRhOiBhbnkgPSB7fTtcbiAgdHJhY2tpbmdTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFTdG9yYWdlOiBEYXRhU3RvcmFnZVNlcnZpY2UsIHByaXZhdGUgYW5hbHl0aWNzU2VydmljZTogQW5hbHl0aWNzU2VydmljZSkgeyB9XG5cbiAgLyoqXG4gICAqIFRyYWNrIE1vdXNlIE1vdmVtZW50XG4gICAqL1xuICB0cmFja01vdXNlTW92ZUV2ZW50KCkge1xuICAgIHRoaXMudHJhY2tpbmdTdWJzY3JpcHRpb24uYWRkKGZyb21FdmVudCh3aW5kb3csICdtb3VzZW1vdmUnKVxuICAgICAgLnN1YnNjcmliZSgoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAvKipcbiAgICAgICAgKiBDaGVja2luZyB3aGV0aGVyIHVzZXIgb3B0IHRvIGRpc2FibGUgdHJhY2tpbmcgbW91c2VcbiAgICAgICAgKi9cbiAgICAgICAgaWYgKGVudmlyb25tZW50LnRyYWNrLm1vdXNlKSB7XG4gICAgICAgICAgdGhpcy5ldmVudERldGFpbHMgPSBlO1xuICAgICAgICAgIHRoaXMuc2VuZERhdGEoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnRyYWNraW5nU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQdXNoaW5nIE1vdXNlIE1vdmUgZGV0YWlsc1xuICAgKi9cbiAgcHVibGljIHNlbmREYXRhKCk6IHZvaWQge1xuICAgIGNvbnN0IGFuYWx5dGljc0JlYW46IEFuYWx5dGljc0JlYW4gPVxuICAgICAgdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnNldEFuYWx5dGljc0RhdGEodGhpcy5kYXRhLCB0aGlzLmV2ZW50RGV0YWlscywgdGhpcy5ldmVudExhYmVscy5NT1VTRV9NT1ZFLCAnJyk7XG4gICAgdGhpcy5kYXRhU3RvcmFnZS5hcHBlbmRUb0FuYWx5dGljc0FycmF5KGFuYWx5dGljc0JlYW4pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IEVycm9ySGFuZGxlciwgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IEV2ZW50TGFiZWxzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHbG9iYWxFcnJvckhhbmRsZXIge1xuICAgIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICB9XG5cbiAgICB0cmFja0NvbnNvbGVFcnJvcnMoKSB7XG5cbiAgICAgICAgY29uc3QgYW5hbHl0aWNzU2VydmljZSA9IHRoaXMuaW5qZWN0b3IuZ2V0KEFuYWx5dGljc1NlcnZpY2UpO1xuICAgICAgICBjb25zdCBkYXRhU3RvcmFnZVNlcnZpY2UgPSB0aGlzLmluamVjdG9yLmdldChEYXRhU3RvcmFnZVNlcnZpY2UpO1xuICAgICAgICBpZiAod2luZG93LmNvbnNvbGUgJiYgY29uc29sZS5lcnJvcikge1xuICAgICAgICAgICAgY29uc3QgY29uc29sZUVycm9yRm5PYmplY3QgPSBjb25zb2xlLmVycm9yO1xuICAgICAgICAgICAgY29uc3QgX3NlbGYgPSB0aGlzO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvciA9IGZ1bmN0aW9uICguLi5lcnJvcjogYW55W10pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9jZXNzZWRFcnJvciA9IGVycm9yLm1hcChlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoZSkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbWF4LWxpbmUtbGVuZ3RoXG4gICAgICAgICAgICAgICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9IGFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YVxuICAgICAgICAgICAgICAgICAgICAoJycsIHt9LCBfc2VsZi5ldmVudExhYmVscy5DT05TT0xFX0VSUk9SLCAnJywgeyBjb25zb2xlRXJyb3JzOiBKU09OLnN0cmluZ2lmeShwcm9jZXNzZWRFcnJvcikgfSk7XG4gICAgICAgICAgICAgICAgZGF0YVN0b3JhZ2VTZXJ2aWNlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkoYW5hbHl0aWNzQmVhbik7XG4gICAgICAgICAgICAgICAgY29uc29sZUVycm9yRm5PYmplY3QuY2FsbChjb25zb2xlLCBlcnJvcik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIEVsZW1lbnRSZWYsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9kYXRhLXN0b3JhZ2UvZGF0YS1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgS2V5U3Ryb2tlRXZlbnRUeXBlLCBFdmVudExhYmVscyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgKiBhcyB1dWlkIGZyb20gJ3V1aWQnO1xuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudCc7XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGlyZWN0aXZlLXNlbGVjdG9yXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbdHJhY2sta2V5U3Ryb2tlXScgfSlcbmV4cG9ydCBjbGFzcyBLZXlTdHJva2VEaXJlY3RpdmUge1xuXG4gICAgLyoqIEV2ZW50IExhYmVscyBDb25zdGFudHMgKi9cbiAgICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuXG4gICAgLyoqXG4gICAgICogRGVwZW5kZW5jaWVzXG4gICAgICogQHBhcmFtIGRhdGFTdG9yYWdlXG4gICAgICogQHBhcmFtIGFuYWx5dGljc1NlcnZpY2VcbiAgICAgKiBAcGFyYW0gZWwgLSBFbGVtZW50IFJlZmVyZW5jZVxuICAgICAqIEBwYXJhbSByZW5kZXJlciAtIFJlbmRlcmVyXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBhbmFseXRpY3NTZXJ2aWNlOiBBbmFseXRpY3NTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaWYgSWQgZG9lc24ndCBiZWxvbmdzIHRvIHRoZSBlbGVtZW50LCB3aGljaCBpcyBiZWluZyB0cmFja2VkLFxuICAgICAgICAgKiBBZGRpbmcgYSBkeW5hbWljIElkXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoIXRoaXMuZWwubmF0aXZlRWxlbWVudC5pZCkge1xuICAgICAgICAgICAgY29uc3QgZHluYW1pY0lkID0gYGtleV9zdHJva2VfZWxlbWVudF8ke3V1aWQudjQoKX1gO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaWQnLCBkeW5hbWljSWQpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmFja2luZyBLZXkgcHJlc3MgZXZlbnRzIHVzaW5nIGhvc3QgbGlzdGVuZXJcbiAgICAgKiBHZW5lcmF0aW5nIGEgZGF0YSBiZWFuIGluIGEgc3BlY2lmaWVkIGZvcm1hdFxuICAgICAqIEBwYXJhbSAkZXZlbnQgLSBLZXlQcmVzcyBFdmVudFxuICAgICAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ2tleXByZXNzJywgWyckZXZlbnQnXSkgb25LZXlTdHJva2UoJGV2ZW50OiBhbnkpIHtcbiAgICAgICAgY29uc3Qga2V5U3Ryb2tlOiBLZXlTdHJva2VFdmVudFR5cGUgPSBuZXcgS2V5U3Ryb2tlRXZlbnRUeXBlKCk7XG4gICAgICAgIGlmICgkZXZlbnQudGFyZ2V0LnR5cGUgIT09ICdwYXNzd29yZCcgJiYgdGhpcy5jaGVja0NsYXNzTmFtZXMoJGV2ZW50LnRhcmdldC5jbGFzc0xpc3QpKSB7XG4gICAgICAgICAgICBrZXlTdHJva2UuZWxlbWVudElkID0gJGV2ZW50LnRhcmdldC5pZDtcbiAgICAgICAgICAgIGtleVN0cm9rZS5rZXkgPSAkZXZlbnQua2V5O1xuICAgICAgICAgICAga2V5U3Ryb2tlLmNvZGUgPSAkZXZlbnQuY29kZTtcbiAgICAgICAgICAgIGtleVN0cm9rZS5rZXlDb2RlID0gJGV2ZW50LmtleUNvZGUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGtleVN0cm9rZS5pc0Zvcm0gPSAkZXZlbnQudGFyZ2V0LmZvcm0gIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGtleVN0cm9rZS5mb3JtID0gJGV2ZW50LnRhcmdldC5mb3JtICE9PSB1bmRlZmluZWQgPyBKU09OLnN0cmluZ2lmeSgkZXZlbnQudGFyZ2V0LmZvcm0uZWxlbWVudHMpIDogJyc7XG4gICAgICAgICAgICBrZXlTdHJva2UudGFnTmFtZSA9ICRldmVudC50YXJnZXQudGFnTmFtZTtcbiAgICAgICAgICAgIGtleVN0cm9rZS5odG1sRWxlbWVudFR5cGUgPSAkZXZlbnQudGFyZ2V0LnR5cGU7XG4gICAgICAgICAgICBrZXlTdHJva2UudmFsdWUgPSAkZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgdGhpcy5zZW5kRGF0YShrZXlTdHJva2UsICRldmVudCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGNoZWNrQ2xhc3NOYW1lcyhjbGFzc0xpc3Q6IEFycmF5PHN0cmluZz4pIHtcbiAgICAgICAgY29uc3QgY2xhc3NOYW1lczogYW55ID0gWy4uLmNsYXNzTGlzdF0uY29uY2F0KGVudmlyb25tZW50Lmlnbm9yZUNzc1J1bGVzKTtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20obmV3IFNldChjbGFzc05hbWVzKSkubGVuZ3RoID09PSBjbGFzc05hbWVzLmxlbmd0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kaW5nIGRhdGFcbiAgICAgKiBAcGFyYW0ga2V5U3Ryb2tlIC0gQ2FwdHVyZWQgS2V5U3Ryb2tlIGRhdGFcbiAgICAgKiBAcGFyYW0gZXZlbnREZXRhaWxzIC0gS2V5IFByZXNzIGV2ZW50IGRldGFpbHNcbiAgICAgKi9cbiAgICBwcml2YXRlIHNlbmREYXRhKGtleVN0cm9rZTogS2V5U3Ryb2tlRXZlbnRUeXBlLCBldmVudERldGFpbHM6IGFueSk6IHZvaWQge1xuICAgICAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID1cbiAgICAgICAgICAgIHRoaXMuYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKHt9LFxuICAgICAgICAgICAgICAgIGV2ZW50RGV0YWlscyxcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50TGFiZWxzLktFWV9TVFJPS0UsICcnLFxuICAgICAgICAgICAgICAgIHsga2V5U3Ryb2tlRGF0YToga2V5U3Ryb2tlIH0pO1xuICAgICAgICB0aGlzLmRhdGFTdG9yYWdlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkoYW5hbHl0aWNzQmVhbik7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUzNBbmFseXRpY3NDb21wb25lbnQgfSBmcm9tICcuL25nLXMzLWFuYWx5dGljcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiB9IGZyb20gJy4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgQnV0dG9uRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2J1dHRvbi9idXR0b24uZGlyZWN0aXZlJztcbmltcG9ydCB7IFNjcm9sbERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9zY3JvbGwvc2Nyb2xsLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBCdXR0b25Ib3ZlckRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9idXR0b24taG92ZXIvYnV0dG9uLWhvdmVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBFbnZpcm9ubWVudFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2Vudmlyb25tZW50L2Vudmlyb25tZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgUm91dGVyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvcm91dGVyL3JvdXRlci5zZXJ2aWNlJztcbmltcG9ydCB7IGludGVydmFsIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9saWIvc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IFBvaW50ZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9wb2ludGVyL3BvaW50ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEdsb2JhbEVycm9ySGFuZGxlciB9IGZyb20gJy4vc2VydmljZXMvZXJyb3ItaGFuZGxlci9lcnJvckhhbmRsZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnbmd4LWNvb2tpZS1zZXJ2aWNlJztcbmltcG9ydCB7IEtleVN0cm9rZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9rZXktc3Ryb2tlL2tleS1zdHJva2UuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5nUzNBbmFseXRpY3NDb21wb25lbnQsXG4gICAgQnV0dG9uRGlyZWN0aXZlLFxuICAgIFNjcm9sbERpcmVjdGl2ZSxcbiAgICBCdXR0b25Ib3ZlckRpcmVjdGl2ZSxcbiAgICBLZXlTdHJva2VEaXJlY3RpdmVcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRGF0YVN0b3JhZ2VTZXJ2aWNlLFxuICAgIEVudmlyb25tZW50U2VydmljZSxcbiAgICBQb2ludGVyU2VydmljZSxcbiAgICBDb29raWVTZXJ2aWNlLFxuICAgIEdsb2JhbEVycm9ySGFuZGxlclxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTmdTM0FuYWx5dGljc0NvbXBvbmVudCxcbiAgICBCdXR0b25EaXJlY3RpdmUsXG4gICAgU2Nyb2xsRGlyZWN0aXZlLFxuICAgIEJ1dHRvbkhvdmVyRGlyZWN0aXZlLFxuICAgIEtleVN0cm9rZURpcmVjdGl2ZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5nUzNBbmFseXRpY3NNb2R1bGUge1xuXG4gIHByaXZhdGUgc3RhdGljIGVudmlyb25tZW50U2VydmljZSA9IG5ldyBFbnZpcm9ubWVudFNlcnZpY2UoKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlclNlcnZpY2U6IFJvdXRlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBkYXRhU3RvcmFnZTogRGF0YVN0b3JhZ2VTZXJ2aWNlLFxuICAgIHByaXZhdGUgcG9pbnRlclNlcnZpY2U6IFBvaW50ZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgZXJyb3JoYW5kbGVyOiBHbG9iYWxFcnJvckhhbmRsZXIpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgKGUpID0+IHtcbiAgICAgIHRoaXMuZGF0YVN0b3JhZ2UucHVzaERhdGFBcnJheVRvUzMoKTtcbiAgICB9KTtcbiAgICBpbnRlcnZhbCgxMDAwICogMikuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgdGhpcy5kYXRhU3RvcmFnZS5wdXNoRGF0YUFycmF5VG9TMygpO1xuICAgIH0pO1xuICAgIHRoaXMucG9pbnRlclNlcnZpY2UudHJhY2tNb3VzZU1vdmVFdmVudCgpO1xuICAgIHRoaXMucm91dGVyU2VydmljZS50cmFja1JvdXRlckV2ZW50cygpO1xuICAgIHRoaXMuZXJyb3JoYW5kbGVyLnRyYWNrQ29uc29sZUVycm9ycygpO1xuICB9XG4gIC8vIENvbmZpZ3VyaW5nIHRoZSBpbml0aWFsIHNldHVwIGZvciBzMyBidWNrZXQgYW5kIHBhZ2UgbG9hZGluZ1xuICBzdGF0aWMgZm9yUm9vdChjb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uLCBpc1BhZ2VMb2FkaW5nVG9CZURldGVjdGVkOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICB0aGlzLmVudmlyb25tZW50U2VydmljZS5zZXRDb25maWd1cmF0aW9uVG9FbnZpcm9ubWVudChjb25maWd1cmF0aW9uLCBpc1BhZ2VMb2FkaW5nVG9CZURldGVjdGVkKTtcbiAgICAvLyBBc3NpZ25pbmcgdGhlIGNvbmZpZ3VyYXRpb24gdG8gZW52aXJvbm1lbnQgdmFyaWFibGVzXG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnLi4vYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEN1c3RvbUV2ZW50U2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU3RvcmFnZTogRGF0YVN0b3JhZ2VTZXJ2aWNlLCBwcml2YXRlIGFuYWx5dGljc1NlcnZpY2U6IEFuYWx5dGljc1NlcnZpY2UpIHsgfVxuICAvKipcbiAgICogVGhpcyBtZXRob2QgaXMgZXhwb3NlZCB0byB1c2VyIHRvIGhlbHAgcHVzaGluZyBjdXN0b20gZXZlbnRzXG4gICAqIFxuICAgKiBAcGFyYW0gY3VzdG9tRXZlbnROYW1lIC0gQW55IG5hbWUgdGhhdCB1c2VyIGNhbiBiZSBjb25maWd1cmVcbiAgICogQHBhcmFtIGV2ZW50RGF0YSAtIEFueSBkYXRhLCB3aGljaCB1c2VyIGNvbmZpZ3VyZWQgaW4gYWRkaXRpb25hbCBpbmZvXG4gICAqL1xuICBwdWJsaWMgcHVzaEV2ZW50KGN1c3RvbUV2ZW50TmFtZTogc3RyaW5nLCBldmVudERhdGE6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGFuYWx5dGljc0JlYW46IEFuYWx5dGljc0JlYW4gPVxuICAgICAgdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnNldEFuYWx5dGljc0RhdGEoZXZlbnREYXRhLCAnJywgY3VzdG9tRXZlbnROYW1lLCAnJyk7XG4gICAgdGhpcy5kYXRhU3RvcmFnZS5hcHBlbmRUb0FuYWx5dGljc0FycmF5KGFuYWx5dGljc0JlYW4pO1xuICB9XG59XG4iXSwibmFtZXMiOlsiSW5qZWN0YWJsZSIsIkNvbXBvbmVudCIsIlN1YmplY3QiLCJIdHRwQ2xpZW50IiwiSW5qZWN0b3IiLCJDb29raWVTZXJ2aWNlIiwidXVpZC52NCIsIkh0dHBIZWFkZXJzIiwidHNsaWJfMS5fX3ZhbHVlcyIsImludGVydmFsIiwiRGlyZWN0aXZlIiwiSW5wdXQiLCJIb3N0TGlzdGVuZXIiLCJOYXZpZ2F0aW9uRW5kIiwiTmF2aWdhdGlvbkVycm9yIiwiUm91dGVyIiwiU3Vic2NyaXB0aW9uIiwiZnJvbUV2ZW50IiwidHNsaWJfMS5fX3NwcmVhZCIsIkVsZW1lbnRSZWYiLCJSZW5kZXJlcjIiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIs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LEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFBQyxTQUFTO3dCQUNqRCxLQUFLLENBQUM7NEJBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7NEJBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzs0QkFBQyxTQUFTO3dCQUNqRDs0QkFDSSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0NBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FBQyxTQUFTOzZCQUFFOzRCQUM1RyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQ0FBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FBQyxNQUFNOzZCQUFFOzRCQUN0RixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0NBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQ0FBQyxNQUFNOzZCQUFFOzRCQUNyRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFD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