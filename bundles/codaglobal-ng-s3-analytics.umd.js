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
        track: { mouse: true, scroll: true },
        origin: ''
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
         * @param {?=} origin
         * @return {?}
         */
        EnvironmentService.prototype.setConfigurationToEnvironment =
            // Setting Configuration on environment
            /**
             * @param {?} configuration
             * @param {?} isPageLoadingToBeDetected
             * @param {?=} origin
             * @return {?}
             */
            function (configuration, isPageLoadingToBeDetected, origin) {
                environment.dataCollectionApi = configuration.dataCollectionApi;
                environment.isPageLoadingToBeDetected = isPageLoadingToBeDetected;
                environment.remoteConfigApi = configuration.remoteConfigApi;
                environment.origin = origin || '';
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
                if (!this.cookieService.check(this.constants.DEMOGRAPHIC_INFO) && (this.remotePluginConfig && !this.remotePluginConfig.disableDemographicInfo)) {
                    this.getIp();
                }
                else {
                    try {
                        this.demographicInfo = JSON.parse(this.cookieService.get(this.constants.DEMOGRAPHIC_INFO));
                    }
                    catch (e) {
                        this.demographicInfo = {};
                    }
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
                if (this.remotePluginConfig) {
                    if (this.remotePluginConfig.disableDemographicInfo) {
                        return {};
                    }
                    else {
                        return this.setDemographicInfo();
                    }
                }
                else {
                    return {};
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
                 */function (err) { }));
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
                    origin: this.getOrigin(),
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
         * @private
         * @return {?}
         */
        AnalyticsService.prototype.getOrigin = /**
         * @private
         * @return {?}
         */
            function () {
                /** @type {?} */
                var origin = window.location.origin;
                try {
                    if (environment.origin && environment.origin !== '') {
                        origin = environment.origin;
                    }
                }
                catch (e) {
                }
                return origin;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kYWdsb2JhbC1uZy1zMy1hbmFseXRpY3MudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL25nLXMzLWFuYWx5dGljcy5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL25nLXMzLWFuYWx5dGljcy5jb21wb25lbnQudHMiLG51bGwsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudC50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi90eXBlcy9ldmVudC50eXBlcy50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9zZXJ2aWNlcy9lbnZpcm9ubWVudC9lbnZpcm9ubWVudC5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3NlcnZpY2VzL2FuYWx5dGljcy9oYW5kbGVDb25maWcudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvc2VydmljZXMvYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3NlcnZpY2VzL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZS50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9kaXJlY3RpdmVzL2J1dHRvbi9idXR0b24uZGlyZWN0aXZlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL2RpcmVjdGl2ZXMvc2Nyb2xsL3Njcm9sbC5kaXJlY3RpdmUudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvZGlyZWN0aXZlcy9idXR0b24taG92ZXIvYnV0dG9uLWhvdmVyLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9zZXJ2aWNlcy9yb3V0ZXIvcm91dGVyLnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvc2VydmljZXMvcG9pbnRlci9wb2ludGVyLnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvc2VydmljZXMvZXJyb3ItaGFuZGxlci9lcnJvckhhbmRsZXIuc2VydmljZS50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9kaXJlY3RpdmVzL2tleS1zdHJva2Uva2V5LXN0cm9rZS5kaXJlY3RpdmUudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvbmctczMtYW5hbHl0aWNzLm1vZHVsZS50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9zZXJ2aWNlcy9jdXN0b20tZXZlbnQvY3VzdG9tLWV2ZW50LnNlcnZpY2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOZ1MzQW5hbHl0aWNzU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1uZy1zMy1hbmFseXRpY3MnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxwPlxuICAgICAgbmctczMtYW5hbHl0aWNzIHdvcmtzIVxuICAgIDwvcD5cbiAgYCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBOZ1MzQW5hbHl0aWNzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHByaXZhdGVNYXApIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBnZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJpdmF0ZU1hcC5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgcHJpdmF0ZU1hcCwgdmFsdWUpIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBzZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlTWFwLnNldChyZWNlaXZlciwgdmFsdWUpO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbiIsImV4cG9ydCBsZXQgZW52aXJvbm1lbnQgPSB7XG4gICAgZGF0YUNvbGxlY3Rpb25BcGk6ICcnLFxuICAgIGlzUGFnZUxvYWRpbmdUb0JlRGV0ZWN0ZWQ6IHRydWUsXG4gICAgcmVtb3RlQ29uZmlnQXBpOiAnJyxcbiAgICBpZ25vcmVVcmxzOiBbXSxcbiAgICBpZ25vcmVDc3NSdWxlczogW10sXG4gICAgc2hvd0NvbnNlbnQ6IGZhbHNlLFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbWF4LWxpbmUtbGVuZ3RoXG4gICAgY29uc2VudENvbnRlbnQ6ICdXZSB1c2UgY29va2llcyB0byBlbnN1cmUgdGhhdCB3ZSBwcm92aWRlIHlvdSB3aXRoIHRoZSBiZXN0IHBvc3NpYmxlIGV4cGVyaWVuY2Ugb24gb3VyIHdlYnNpdGUuSWYgeW91IGNvbnRpbnVlIHRvIHVzZSBvdXIgc2l0ZSwgd2UgYXNzdW1lIHlvdSBhY2NlcHQgb3VyIHVzZSBvZiBjb29raWVzLiBQcml2YWN5IFBvbGljeScsXG4gICAgZGlzYWJsZVRyYWNraW5nOiBmYWxzZSxcbiAgICBpZ25vcmVJUFJhbmdlczogJycsXG4gICAgaWdub3JlRG9tYWluczogW10sXG4gICAgZGlzYWJsZURlbW9ncmFwaGljSW5mbzogZmFsc2UsXG4gICAgdHJhY2s6IHsgbW91c2U6IHRydWUsIHNjcm9sbDogdHJ1ZSB9LFxuICAgIG9yaWdpbjogJydcbn07XG5cblxuIiwiZXhwb3J0IGVudW0gRXZlbnRMYWJlbHMge1xuICAgIFBBR0VfTE9BRCA9ICdQQUdFX0xPQUQnLFxuICAgIE1PVVNFX0hPVkVSID0gJ01PVVNFX0hPVkVSJyxcbiAgICBCVVRUT05fQ0xJQ0sgPSAnQlVUVE9OX0NMSUNLJyxcbiAgICBNT1VTRV9NT1ZFID0gJ01PVVNFX01PVkUnLFxuICAgIFNDUk9MTCA9ICdTQ1JPTEwnLFxuICAgIENPTlNPTEVfRVJST1IgPSAnQ09OU09MRV9FUlJPUicsXG4gICAgS0VZX1NUUk9LRSA9ICdLRVlfU1RST0tFJ1xufVxuXG5leHBvcnQgZW51bSBDb25zdGFudHMge1xuICAgIERFTU9HUkFQSElDX0lORk8gPSAnZGVtb2dyYXBoaWMtaW5mbycsXG4gICAgU0VTU0lPTl9JRCA9ICduZ1MzQW5hbHl0aWNzU2Vzc2lvbklkJyxcbiAgICBERU1PR1JBUEhJQ19BUElfVVJMID0gJ2h0dHBzOi8vaXBhcGkuY28vanNvbi8nXG59XG5cblxuZXhwb3J0IGNsYXNzIEtleVN0cm9rZUV2ZW50VHlwZSB7XG4gICAga2V5OiBzdHJpbmc7IC8vIHByZXNzZWQgS2V5XG4gICAga2V5Q29kZTogc3RyaW5nOyAvLyBwcmVzc2VkIEtleSBDb2RlXG4gICAgZWxlbWVudElkOiBzdHJpbmc7IC8vIElkIG9mIGVsZW1lbnRcbiAgICBpc0Zvcm06IGJvb2xlYW47IC8vIGlzIGl0IGEgZm9ybVxuICAgIGZvcm06IHN0cmluZztcbiAgICB0YWdOYW1lOiBzdHJpbmc7IC8vIHRhZ05hbWUgb2YgZWxlbWVudFxuICAgIGh0bWxFbGVtZW50VHlwZTogc3RyaW5nOyAvLyB0eXBlIG9mIGVsZW1lbnRcbiAgICB2YWx1ZTogc3RyaW5nOyAvLyBwcmV2aW91cyB2YWx1ZSBvZiB0aGUgZWxlbWVudFxuICAgIGNvZGU6IHN0cmluZzsgLy8gUHJlc3NlZCBrZXkgbGFiZWxcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmtleSA9ICcnO1xuICAgICAgICB0aGlzLmtleUNvZGUgPSAnJztcbiAgICAgICAgdGhpcy5lbGVtZW50SWQgPSAnJztcbiAgICAgICAgdGhpcy5pc0Zvcm0gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mb3JtID0gJyc7XG4gICAgICAgIHRoaXMudGFnTmFtZSA9ICcnO1xuICAgICAgICB0aGlzLmh0bWxFbGVtZW50VHlwZSA9ICcnO1xuICAgICAgICB0aGlzLnZhbHVlID0gJyc7XG4gICAgICAgIHRoaXMuY29kZSA9ICcnO1xuICAgIH1cbn1cbiIsIlxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudCc7XG5pbXBvcnQgeyBDb25maWd1cmF0aW9uLCBQbHVnaW5Db25maWcsIFVzZXJCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcblxuZXhwb3J0IGNsYXNzIEVudmlyb25tZW50U2VydmljZSB7XG4gIGVudkNvbmZpZzogYW55ID0gbmV3IFN1YmplY3Q8UGx1Z2luQ29uZmlnPigpO1xuICB1c2VyT2JqZWN0OiBTdWJqZWN0PFVzZXJCZWFuPiA9IG5ldyBTdWJqZWN0PFVzZXJCZWFuPigpO1xuXG4gIC8vIFNldHRpbmcgQ29uZmlndXJhdGlvbiBvbiBlbnZpcm9ubWVudFxuICBzZXRDb25maWd1cmF0aW9uVG9FbnZpcm9ubWVudChjb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uLCBpc1BhZ2VMb2FkaW5nVG9CZURldGVjdGVkOiBib29sZWFuLCBvcmlnaW4/OiBzdHJpbmcpIHtcbiAgICBlbnZpcm9ubWVudC5kYXRhQ29sbGVjdGlvbkFwaSA9IGNvbmZpZ3VyYXRpb24uZGF0YUNvbGxlY3Rpb25BcGk7XG4gICAgZW52aXJvbm1lbnQuaXNQYWdlTG9hZGluZ1RvQmVEZXRlY3RlZCA9IGlzUGFnZUxvYWRpbmdUb0JlRGV0ZWN0ZWQ7XG4gICAgZW52aXJvbm1lbnQucmVtb3RlQ29uZmlnQXBpID0gY29uZmlndXJhdGlvbi5yZW1vdGVDb25maWdBcGk7XG4gICAgZW52aXJvbm1lbnQub3JpZ2luID0gb3JpZ2luIHx8ICcnO1xuICAgIHRoaXMuZW52Q29uZmlnLm5leHQoZW52aXJvbm1lbnQpO1xuICAgIHRoaXMuZW52Q29uZmlnLmNvbXBsZXRlKCk7XG4gICAgdGhpcy51c2VyT2JqZWN0Lm5leHQoeyB1c2VyRW1haWw6ICcnLCB1c2VyUHJvZmlsZUltYWdlOiAnJywgdXNlck5hbWU6ICcnLCB1c2VyUGhvbmVOdW1iZXI6ICcnLCB1c2VySWQ6ICcnLCBvdGhlckluZm86ICcnIH0pO1xuXG4gICAgZW52aXJvbm1lbnQudHJhY2sgPSB7IG1vdXNlOiB0cnVlLCBzY3JvbGw6IHRydWUgfTtcbiAgICBpZiAoY29uZmlndXJhdGlvbi50cmFjayAmJiBjb25maWd1cmF0aW9uLnRyYWNrLm1vdXNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGVudmlyb25tZW50LnRyYWNrLm1vdXNlID0gY29uZmlndXJhdGlvbi50cmFjay5tb3VzZTtcbiAgICB9XG4gICAgaWYgKGNvbmZpZ3VyYXRpb24udHJhY2sgJiYgY29uZmlndXJhdGlvbi50cmFjay5zY3JvbGwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZW52aXJvbm1lbnQudHJhY2suc2Nyb2xsID0gY29uZmlndXJhdGlvbi50cmFjay5zY3JvbGw7XG4gICAgfVxuICB9XG5cbiAgZ2V0RW52T2JzZXJ2YWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5lbnZDb25maWc7XG4gIH1cblxuICBzZXRVc2VySW5mbyh1c2VyT2JqZWN0OiBVc2VyQmVhbikge1xuICAgIHRoaXMudXNlck9iamVjdC5uZXh0KHVzZXJPYmplY3QpO1xuICB9XG5cbiAgZ2V0VXNlckluZm8oKTogT2JzZXJ2YWJsZTxVc2VyQmVhbj4ge1xuICAgIHJldHVybiB0aGlzLnVzZXJPYmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudCc7XG5pbXBvcnQgeyBQbHVnaW5Db25maWcsIEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBFbnZpcm9ubWVudFNlcnZpY2UgfSBmcm9tICcuLi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcbmltcG9ydCB7IENvb2tpZVNlcnZpY2UgfSBmcm9tICduZ3gtY29va2llLXNlcnZpY2UnO1xuXG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgUGx1Z2luQ29uZmlnU2VydmljZSB7XG4gICAgcmVtb3RlUGx1Z2luQ29uZmlnOiBQbHVnaW5Db25maWc7XG4gICAgZGVtb2dyYXBoaWNJbmZvOiBhbnk7XG4gICAgLyoqIENvbnN0YW50cyAqL1xuICAgIGNvbnN0YW50cyA9IENvbnN0YW50cztcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBodHRwQ2xpZW50OiBIdHRwQ2xpZW50LFxuICAgICAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgcHJpdmF0ZSBjb29raWVTZXJ2aWNlOiBDb29raWVTZXJ2aWNlKSB7XG5cbiAgICB9XG5cbiAgICBnZXRFbnZpcm9ubWVudENvbmZpZygpIHtcbiAgICAgICAgY29uc3QgZW52ID0gdGhpcy5pbmplY3Rvci5nZXQoRW52aXJvbm1lbnRTZXJ2aWNlKTtcbiAgICAgICAgZW52LmdldEVudk9ic2VydmFibGUoKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZldGNoUmVtb3RlQ29uZmlnKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBtYXgtbGluZS1sZW5ndGhcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCd1bmFibGUgdG8gZmV0Y2ggeEFuYWx5dGljcyByZW1vdGUgY29uZmlndXJhdGlvbi4gUGxlYXNlIG1ha2Ugc3VyZSB5b3UgaGF2ZSBjb25maWd1cmVkIHRoZSBjb3JyZWN0IFVSTCwgaWYgdGhlIGlzc3VlIHBlcnNpc3QgcGxlYXNlIGNoZWNrIHRoZSBkYXNoYm9hcmQgZm9yIG1vcmUgaW5mbyBvciBjb250YWN0IHhBIFRlYW0uICcpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cbiAgICBwdWJsaWMgZmV0Y2hSZW1vdGVDb25maWcoKSB7XG4gICAgICAgIHRoaXMuaHR0cENsaWVudC5nZXQoZW52aXJvbm1lbnQucmVtb3RlQ29uZmlnQXBpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICByZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZyA9IHJlc1snYm9keSddO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yZW1vdGVQbHVnaW5Db25maWcuc2hvd0NvbnNlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZy5jb25zZW50Q29udGVudCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdGVQbHVnaW5Db25maWcuY29uc2VudENvbnRlbnQgOiBlbnZpcm9ubWVudC5jb25zZW50Q29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tTaG93Q29uc2VudChjb250ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignY29sbGVjdGlvbiBlcnJvcicsIGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBoYW5kbGVDb25maWd1cmF0aW9uKGFuYWx5dGljc0JlYW46IEFuYWx5dGljc0JlYW4pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tEaXNhYmxlVHJhY2tpbmcoKSAmJlxuICAgICAgICAgICAgdGhpcy5jaGVja0RvbWFpbihhbmFseXRpY3NCZWFuLmZ1bGxVUkwpICYmXG4gICAgICAgICAgICB0aGlzLmNoZWNrSXBSYW5nZShhbmFseXRpY3NCZWFuLmRlbW9ncmFwaGljSW5mb1snaXAnXSk7XG5cbiAgICB9XG5cbiAgICBjaGVja0Rpc2FibGVUcmFja2luZygpIHtcbiAgICAgICAgaWYgKHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnKSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMucmVtb3RlUGx1Z2luQ29uZmlnLmRpc2FibGVUcmFja2luZztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hlY2tEb21haW4oZnVsbFVybDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZyAmJiB0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZy5pZ25vcmVEb21haW5zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiAhKHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnLmlnbm9yZURvbWFpbnMuZmlsdGVyKGRvbWFpbiA9PiBmdWxsVXJsLmluZGV4T2YoZG9tYWluKSA+PSAwKS5sZW5ndGggPiAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbW92ZUNoZWNrVXJscyh0cmFja2VkT2JqZWN0czogQXJyYXk8QW5hbHl0aWNzQmVhbj4pOiBBcnJheTxBbmFseXRpY3NCZWFuPiB7XG4gICAgICAgIGlmICh0cmFja2VkT2JqZWN0cyAmJiB0cmFja2VkT2JqZWN0cy5sZW5ndGggPiAwICYmIHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJhY2tlZE9iamVjdHMubWFwKGFuYWx5dGljcyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCEodGhpcy5yZW1vdGVQbHVnaW5Db25maWcuaWdub3JlVXJscy5maWx0ZXIodXJsID0+IGFuYWx5dGljcy5ldmVudENvbXBvbmVudC5pbmRleE9mKHVybCkgPj0gMCkubGVuZ3RoID4gMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFuYWx5dGljcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5maWx0ZXIob2JqZWN0ID0+IG9iamVjdCAhPT0gdW5kZWZpbmVkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cmFja2VkT2JqZWN0cztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgKiBJUCByYW5nZSByZXN0cmljdGlvbiBhZGRlZFxuICAgKiBAcmVzdHJpY3RJUFJhbmdlIGlzIGEgcmVnZXhcbiAgICogaWYgQHJlc3RyaWN0SVBSYW5nZSBpcyBtYXRjaCB3aXRoIGN1cnJlbnQgSVAsXG4gICAqIHRoZSBhbmFseXRpY3MgZGF0YSB3aWxsIGJlIHJlc3RyaWN0ZWRcbiAgICovXG4gICAgcHJpdmF0ZSBjaGVja0lwUmFuZ2UoaXA6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoaXAgJiYgdGhpcy5yZW1vdGVQbHVnaW5Db25maWcgJiYgdGhpcy5yZW1vdGVQbHVnaW5Db25maWcuaWdub3JlSVBSYW5nZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgaXBSYW5nZSA9IHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnLmlnbm9yZUlQUmFuZ2VzO1xuICAgICAgICAgICAgcmV0dXJuIGlwLm1hdGNoKGlwUmFuZ2UpID8gZmFsc2UgOiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgKiBTZXQgdXNlciBkZW1vZ3JhcGhpYyBpbmZvcm1hdGlvbiBpbiBjb29raWVzXG4gICovXG4gICAgYXN5bmMgZ2V0SXAoKSB7XG4gICAgICAgIHRoaXMuZGVtb2dyYXBoaWNJbmZvID0gYXdhaXQgdGhpcy5odHRwQ2xpZW50LmdldCh0aGlzLmNvbnN0YW50cy5ERU1PR1JBUEhJQ19BUElfVVJMKS50b1Byb21pc2UoKTtcbiAgICAgICAgdGhpcy5jb29raWVTZXJ2aWNlLnNldChcbiAgICAgICAgICAgIHRoaXMuY29uc3RhbnRzLkRFTU9HUkFQSElDX0lORk8sXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh0aGlzLmRlbW9ncmFwaGljSW5mbyksXG4gICAgICAgICAgICBuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSArICgxMDAwICogNjAgKiA2MCAqIDI0KSkpO1xuICAgICAgICByZXR1cm4gdGhpcy5kZW1vZ3JhcGhpY0luZm87XG4gICAgfVxuXG5cbiAgICBzZXREZW1vZ3JhcGhpY0luZm8oKSB7XG4gICAgICAgIGlmICghdGhpcy5jb29raWVTZXJ2aWNlLmNoZWNrKHRoaXMuY29uc3RhbnRzLkRFTU9HUkFQSElDX0lORk8pICYmICh0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZyAmJiAhdGhpcy5yZW1vdGVQbHVnaW5Db25maWcuZGlzYWJsZURlbW9ncmFwaGljSW5mbykpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0SXAoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZW1vZ3JhcGhpY0luZm8gPSBKU09OLnBhcnNlKHRoaXMuY29va2llU2VydmljZS5nZXQodGhpcy5jb25zdGFudHMuREVNT0dSQVBISUNfSU5GTykpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVtb2dyYXBoaWNJbmZvID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZGVtb2dyYXBoaWNJbmZvO1xuICAgIH1cblxuICAgIGdldERlbW9ncmFwaGljSW5mbygpIHtcbiAgICAgICAgaWYgKHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5yZW1vdGVQbHVnaW5Db25maWcuZGlzYWJsZURlbW9ncmFwaGljSW5mbykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0RGVtb2dyYXBoaWNJbmZvKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja1Nob3dDb25zZW50KGNvbnRlbnQ6IHN0cmluZykge1xuICAgICAgICBjb25zdCBkaXZFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkaXZFbC5jbGFzc0xpc3QuYWRkKCdjb25zZW50LXdyYXBwZXInKTtcbiAgICAgICAgZGl2RWwuc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xuICAgICAgICBkaXZFbC5zdHlsZS5ib3R0b20gPSAnMCc7XG4gICAgICAgIGRpdkVsLnN0eWxlLmxlZnQgPSAnMCc7XG4gICAgICAgIGRpdkVsLnN0eWxlLnJpZ2h0ID0gJzAnO1xuICAgICAgICBkaXZFbC5zdHlsZS5wYWRkaW5nID0gJzE1cHgnO1xuICAgICAgICBkaXZFbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzMzNjZmZic7XG4gICAgICAgIGRpdkVsLnN0eWxlLmNvbG9yID0gJyNmZmYnO1xuICAgICAgICBkaXZFbC5zdHlsZS5mb250U2l6ZSA9ICcxMnB4JztcbiAgICAgICAgZGl2RWwuc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgIGNvbnN0IHRleHRFbCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNvbnRlbnQpO1xuICAgICAgICBkaXZFbC5hcHBlbmRDaGlsZCh0ZXh0RWwpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdkVsKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gJy4uLy4uL2Vudmlyb25tZW50L2Vudmlyb25tZW50JztcbmltcG9ydCAqIGFzIHV1aWQgZnJvbSAndXVpZCc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuLCBQZXJmb3JtYW5jZUJlYW4sIFVzZXJCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBFdmVudExhYmVscywgS2V5U3Ryb2tlRXZlbnRUeXBlLCBDb25zdGFudHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5pbXBvcnQgeyBQbHVnaW5Db25maWdTZXJ2aWNlIH0gZnJvbSAnLi9oYW5kbGVDb25maWcnO1xuaW1wb3J0IHsgRW52aXJvbm1lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vZW52aXJvbm1lbnQvZW52aXJvbm1lbnQuc2VydmljZSc7XG4vKipcbiAqIEFuYWx5dGljcyBTZXJ2aWNlXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEFuYWx5dGljc1NlcnZpY2Uge1xuXG4gIC8qKiBTZXNzaW9uSWQgb2YgcGx1Z2luICovXG4gIHNlc3Npb25JZDogc3RyaW5nO1xuICAvKiogRGVtb2dyYXBoaWMgaW5mbyAqL1xuICBkZW1vZ3JhcGhpY0luZm86IGFueSA9IHt9O1xuICAvKiogRXZlbnQgbGFiZWwgY29uc3RhbnRzICovXG4gIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG4gIC8qKiBDb25zdGFudHMgKi9cbiAgY29uc3RhbnRzID0gQ29uc3RhbnRzO1xuXG4gIHVzZXJJbmZvOiBVc2VyQmVhbjtcblxuICAvKipcbiAgICogQW5hbHl0aWNzIFNlcnZpY2UgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHBsdWdpbkNvbmZpZ1xuICAgKiBAcGFyYW0gaHR0cFNlcnZpY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaHR0cFNlcnZpY2U6IEh0dHBDbGllbnQsXG4gICAgcHJpdmF0ZSBwbHVnaW5Db25maWc6IFBsdWdpbkNvbmZpZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBlbnZpcm9ubWVudFNlcnZpY2U6IEVudmlyb25tZW50U2VydmljZSkge1xuICAgIHRoaXMucGx1Z2luQ29uZmlnLmdldEVudmlyb25tZW50Q29uZmlnKCk7XG4gICAgdGhpcy5nZXRVc2VySW5mbygpO1xuICAgIHRoaXMuc2V0U2Vzc2lvbklkKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tpbmcgd2hldGhlciBzZXNzaW9uSWQgcHJlc2VudCBpbiBjb29raWUgb3Igbm90XG4gICAqIGlmIG5vIHNlc3Npb24gaWQgY29va2llIHByZXNlbnQsIGFkZGluZyBuZXcgc2Vzc2lvbiBpZCBvdGhlcndpc2UgcmV1c2luZyB0aGUgc2Vzc2lvbiBpZCB2YWx1ZVxuICAgKi9cbiAgcHJpdmF0ZSBzZXRTZXNzaW9uSWQoKTogdm9pZCB7XG4gICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0odGhpcy5jb25zdGFudHMuU0VTU0lPTl9JRCkpIHtcbiAgICAgIHRoaXMuc2Vzc2lvbklkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmNvbnN0YW50cy5TRVNTSU9OX0lEKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXNzaW9uSWQgPSB1dWlkLnY0KCk7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKHRoaXMuY29uc3RhbnRzLlNFU1NJT05fSUQsIHRoaXMuc2Vzc2lvbklkKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tpbmcgdGhlIElQIHJhbmdlIHRvIGJlIHJlc3RyaWN0XG4gICAqIEBwYXJhbSBkYXRhIC0gZGF0YSB0byBiZSBwdXNoZWRcbiAgICovXG4gIHB1YmxpYyBwdXNoRGF0YShkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wbHVnaW5Db25maWcuaGFuZGxlQ29uZmlndXJhdGlvbihkYXRhLmV2ZW50VmFsdWVzWzBdKSkge1xuICAgICAgY29uc3QgYW5hbHl0aWNzT2JqZWN0TGlzdCA9IHRoaXMucGx1Z2luQ29uZmlnLnJlbW92ZUNoZWNrVXJscyhkYXRhLmV2ZW50VmFsdWVzKTtcbiAgICAgIGlmIChhbmFseXRpY3NPYmplY3RMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5wdWJsaXNoVE9BdXRoUzMoYW5hbHl0aWNzT2JqZWN0TGlzdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuXG4gIC8qKlxuICAgKiBDb252ZXJ0aW5nIEpTT04gQXJyYXkgdG8gc3RyaW5nXG4gICAqIEBwYXJhbSBkYXRhXG4gICAqL1xuICBwcml2YXRlIHByb2Nlc3NGb3JBdGhlbmEoZGF0YTogQXJyYXk8QW5hbHl0aWNzQmVhbj4pOiBzdHJpbmcge1xuICAgIGlmIChkYXRhICYmIGRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIGRhdGEubWFwKChvYmplY3Q6IGFueSkgPT4ge1xuICAgICAgICBvYmplY3RbJ3Nlc3Npb25JZCddID0gdGhpcy5zZXNzaW9uSWQ7XG4gICAgICAgIG9iamVjdFsnZXZlbnRJZCddID0gYCR7dGhpcy5zZXNzaW9uSWR9VCR7bmV3IERhdGUob2JqZWN0LmV2ZW50VGltZSkuZ2V0VGltZSgpfWA7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmplY3QpO1xuICAgICAgfSkuam9pbignXFxuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICAqIFByZXBhcmluZyBkYXRhIHRvIGJlIHB1c2hlZCB0byBEYXRhU3RvcmFnZVxuICAgICogQHBhcmFtIGRhdGEgIGRhdGEgdG8gYmUgcHVzaGVkXG4gICAgKi9cbiAgcHJpdmF0ZSBwdWJsaXNoVE9BdXRoUzMoZGF0YTogYW55KTogdm9pZCB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBgJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXX1fJHt0aGlzLnNlc3Npb25JZH1fJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCl9Lmpzb25gO1xuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xuICAgIHRoaXMucHVzaERhdGFUb1MzKGZpbGVuYW1lLCB0aGlzLnByb2Nlc3NGb3JBdGhlbmEoZGF0YSksIGhlYWRlcnMpO1xuICB9XG5cblxuICAvKipcbiAgICogUHVzaGluZyBkYXRhIHRvIGNvcnJlc3BvbmRpbmcgYnVja2V0IHVzaW5nIGRhdGEgY29sbGVjdGlvbiBhcGlcbiAgICogQHBhcmFtIHBhdGggLSBzZXJ2aWNlIHBhdGhcbiAgICogQHBhcmFtIGRhdGEgLSBkYXRhIHRvIGJlIHB1c2hlZFxuICAgKi9cbiAgcHJpdmF0ZSBwdXNoRGF0YVRvUzMocGF0aDogc3RyaW5nLCBkYXRhOiBhbnksIGhlYWRlcnM6IEh0dHBIZWFkZXJzKTogdm9pZCB7XG4gICAgY29uc3QgdXJsID0gYCR7ZW52aXJvbm1lbnQuZGF0YUNvbGxlY3Rpb25BcGl9JHtwYXRofWA7XG4gICAgdGhpcy5odHRwU2VydmljZS5wdXQodXJsLCBkYXRhLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSkuc3Vic2NyaWJlKHJlcyA9PiB7IH0sIGVyciA9PiB7IH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhdmUgdGhlIGNhcHR1cmVkIEhUTUwgdG8gdGhlIGRhdGEgY29sbGVjdGlvblxuICAgKiBAcGFyYW0gaHRtbFRlbXBsYXRlIC0gRE9NIENvbnRlbnRcbiAgICogQHBhcmFtIHNjcmVlbnNob3ROYW1lIC0gZmlsZW5hbWUgdG8gYmUgc2F2ZWRcbiAgICovXG4gIHB1YmxpYyBzYXZlU2NyZWVuc2hvdHNJblMzKGh0bWxUZW1wbGF0ZTogc3RyaW5nLCBzY3JlZW5zaG90TmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGx1Z2luQ29uZmlnLmNoZWNrRGlzYWJsZVRyYWNraW5nKCkpIHtcbiAgICAgIGNvbnN0IGZpbGVuYW1lID0gYGFzc2V0cy8ke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdfS8ke3RoaXMuc2Vzc2lvbklkfS8ke3NjcmVlbnNob3ROYW1lfS5odG1sYDtcbiAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ3RleHQvaHRtbCcgfSk7XG4gICAgICB0aGlzLnB1c2hEYXRhVG9TMyhmaWxlbmFtZSwgaHRtbFRlbXBsYXRlLCBoZWFkZXJzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHVzaGluZyBjb25zb2xlIGVycm9ycyB0byBTMyBidWNrZXRcbiAgICogQHBhcmFtIGRhdGEgXG4gICAqL1xuICBwdWJsaWMgcHVibGlzaENvbnNvbGVFcnJvcnMoZGF0YTogYW55KTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGx1Z2luQ29uZmlnLmNoZWNrRGlzYWJsZVRyYWNraW5nKCkpIHtcbiAgICAgIGRhdGFbJ3Nlc3Npb25JZCddID0gdGhpcy5zZXNzaW9uSWQ7XG4gICAgICBkYXRhWydldmVudElkJ10gPSBgJHt0aGlzLnNlc3Npb25JZH1UJHtuZXcgRGF0ZShkYXRhLmV2ZW50VGltZSkuZ2V0VGltZSgpfV9DT05TT0xFX0VSUk9SYDtcbiAgICAgIGNvbnN0IGZpbGVuYW1lID0gYCR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF19XyR7dGhpcy5zZXNzaW9uSWR9X2NvbnNvbGVfZXJyb3JzXyR7bmV3IERhdGUoKS5nZXRUaW1lKCl9Lmpzb25gO1xuICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG4gICAgICB0aGlzLnB1c2hEYXRhVG9TMyhmaWxlbmFtZSwgZGF0YSwgaGVhZGVycyk7XG4gICAgfVxuICB9XG5cblxuXG4gIC8qKlxuICAgKiBTZXR0aW5nIGFuYWx5dGljcyBvYmplY3QgdG8gYmUgc2F2ZWQgaW4gUzMgYnVja2V0XG4gICAqIEBwYXJhbSB1c2VyRGF0YSAtIERhdGEgdHJhbnNmZXJyZWQgdG8gRXZlbnQgRGlyZWN0aXZlXG4gICAqIEBwYXJhbSBldmVudERldGFpbHMgLSBQb3NpdGlvbiBvZiBldmVudHNcbiAgICogQHBhcmFtIGV2ZW50TmFtZSAgLSBUeXBlIG9mIGV2ZW50XG4gICAqIEBwYXJhbSBzY3JlZW5zaG90TmFtZSAgLSBmaWxlIG5hbWUgb2Ygc2F2ZWQgc2NyZWVuc2hvdCBpZiB0aGUgZXZlbnQgaXMgUGFnZUxvYWRlZFxuICAgKi9cbiAgcHVibGljIHNldEFuYWx5dGljc0RhdGEoXG4gICAgdXNlckRhdGE6IGFueSA9IHt9LFxuICAgIGV2ZW50RGV0YWlsczogYW55LFxuICAgIGV2ZW50TmFtZTogc3RyaW5nLFxuICAgIHNjcmVlbnNob3ROYW1lOiBzdHJpbmcsXG4gICAgb3B0aW9uYWw/OiB7XG4gICAgICBldmVudENvbXBvbmVudD86IHN0cmluZyxcbiAgICAgIGtleVN0cm9rZURhdGE/OiBLZXlTdHJva2VFdmVudFR5cGUsXG4gICAgICBjb25zb2xlRXJyb3JzPzogc3RyaW5nXG4gICAgfSk6IEFuYWx5dGljc0JlYW4ge1xuICAgIGNvbnN0IGFuYWx5dGljc0JlYW46IEFuYWx5dGljc0JlYW4gPSB7XG4gICAgICBldmVudExhYmVsOiBldmVudE5hbWUsXG4gICAgICBldmVudENvbXBvbmVudDogb3B0aW9uYWwgJiYgb3B0aW9uYWwuZXZlbnRDb21wb25lbnQgPyBvcHRpb25hbC5ldmVudENvbXBvbmVudCA6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnPycpWzBdLFxuICAgICAgYnJvd3Nlcjogd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQsXG4gICAgICBmdWxsVVJMOiB3aW5kb3cubG9jYXRpb24uaHJlZixcbiAgICAgIG9yaWdpbjogdGhpcy5nZXRPcmlnaW4oKSxcbiAgICAgIHJlc29sdXRpb246IGAke3dpbmRvdy5pbm5lcldpZHRofXgke3dpbmRvdy5pbm5lckhlaWdodH1gLFxuICAgICAgeENvb3JkOiB0aGlzLmdldEV2ZW50RGV0YWlscyhldmVudERldGFpbHNbJ2NsaWVudFgnXSksXG4gICAgICB5Q29vcmQ6IHRoaXMuZ2V0RXZlbnREZXRhaWxzKGV2ZW50RGV0YWlsc1snY2xpZW50WSddKSxcbiAgICAgIHBhZ2VYQ29vcmQ6IHdpbmRvdy5wYWdlWE9mZnNldC50b1N0cmluZygpIHx8ICcwJyxcbiAgICAgIHBhZ2VZQ29vcmQ6IHdpbmRvdy5wYWdlWU9mZnNldC50b1N0cmluZygpIHx8ICcwJyxcbiAgICAgIGV2ZW50VGltZTogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgc2NyZWVuc2hvdDogc2NyZWVuc2hvdE5hbWUsXG4gICAgICBhZGRpdGlvbmFsSW5mbzogdXNlckRhdGEsXG4gICAgICBlcnJvcnM6IChvcHRpb25hbCAmJiBvcHRpb25hbC5jb25zb2xlRXJyb3JzKSA/IG9wdGlvbmFsLmNvbnNvbGVFcnJvcnMgOiAnJyxcbiAgICAgIHV0bTogdGhpcy5nZXRVVE1QYXJhbWV0ZXJzKHdpbmRvdy5sb2NhdGlvbi5ocmVmKSxcbiAgICAgIGRlbW9ncmFwaGljSW5mbzogdGhpcy5wbHVnaW5Db25maWcuZ2V0RGVtb2dyYXBoaWNJbmZvKCksXG4gICAgICBrZXlTdHJva2VEYXRhOiAob3B0aW9uYWwgJiYgb3B0aW9uYWwua2V5U3Ryb2tlRGF0YSkgPyBvcHRpb25hbC5rZXlTdHJva2VEYXRhIDogdGhpcy5nZXRFbXB0eUtleVN0cm9rZURhdGEoKSxcbiAgICAgIGh0bWxFbGVtZW50OiB0aGlzLmdldEh0bWxFbGVtZW50KGV2ZW50RGV0YWlsc1sndGFyZ2V0J10sIGV2ZW50TmFtZSksXG4gICAgICBwZXJmb3JtYW5jZTogdGhpcy5nZXRQZXJmb3JtYW5jZURldGFpbHMoKSxcbiAgICAgIHVzZXJJbmZvOiB0aGlzLnVzZXJJbmZvXG4gICAgfTtcbiAgICByZXR1cm4gYW5hbHl0aWNzQmVhbjtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0T3JpZ2luKCk6IHN0cmluZyB7XG4gICAgbGV0IG9yaWdpbiA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW47XG4gICAgdHJ5IHtcbiAgICAgIGlmIChlbnZpcm9ubWVudC5vcmlnaW4gJiYgZW52aXJvbm1lbnQub3JpZ2luICE9PSAnJykge1xuICAgICAgICBvcmlnaW4gPSBlbnZpcm9ubWVudC5vcmlnaW47XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgIH1cbiAgICByZXR1cm4gb3JpZ2luO1xuICB9XG5cbiAgLyoqXG4gICAqIEV2ZW50IGRldGFpbHNcbiAgICogQHBhcmFtIHZhbHVlIFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRFdmVudERldGFpbHModmFsdWU6IGFueSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZS50b1N0cmluZygpIDogJzAnO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBIVE1MIENvbnRlbnRcbiAgICogQHBhcmFtIHRhcmdldEVsZW1lbnQgLSB0YXJnZXQgZWxlbWVudFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRIdG1sRWxlbWVudCh0YXJnZXRFbGVtZW50OiBhbnksIGV2ZW50TmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAoZXZlbnROYW1lICE9PSB0aGlzLmV2ZW50TGFiZWxzLk1PVVNFX01PVkUgJiYgZXZlbnROYW1lICE9PSB0aGlzLmV2ZW50TGFiZWxzLlNDUk9MTCkge1xuICAgICAgcmV0dXJuIHRhcmdldEVsZW1lbnQgIT09IHVuZGVmaW5lZCA/IHRhcmdldEVsZW1lbnRbJ2lubmVySFRNTCddIDogJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1cblxuXG4gIHByaXZhdGUgZ2V0RW1wdHlLZXlTdHJva2VEYXRhKCk6IEtleVN0cm9rZUV2ZW50VHlwZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGtleTogJycsXG4gICAgICBrZXlDb2RlOiAnJyxcbiAgICAgIGNvZGU6ICcnLFxuICAgICAgZWxlbWVudElkOiAnJyxcbiAgICAgIGZvcm06ICcnLFxuICAgICAgaHRtbEVsZW1lbnRUeXBlOiAnJyxcbiAgICAgIGlzRm9ybTogZmFsc2UsXG4gICAgICB0YWdOYW1lOiAnJyxcbiAgICAgIHZhbHVlOiAnJ1xuICAgIH07XG4gIH1cblxuXG4gIC8qKlxuICAgKiBQZXJmb3JtYW5jZSBkZXRhaWxzXG4gICAqL1xuICBwcml2YXRlIGdldFBlcmZvcm1hbmNlRGV0YWlscygpOiBQZXJmb3JtYW5jZUJlYW4ge1xuICAgIGNvbnN0IHBlcmZvcm1hbmNlID0gd2luZG93LnBlcmZvcm1hbmNlO1xuICAgIHJldHVybiB7XG4gICAgICBuYXZpZ2F0aW9uOiBwZXJmb3JtYW5jZS5uYXZpZ2F0aW9uLFxuICAgICAgdGltZU9yaWdpbjogcGVyZm9ybWFuY2UudGltZU9yaWdpbixcbiAgICAgIHRpbWluZzogcGVyZm9ybWFuY2UudGltaW5nXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZW1vcnkgdXNhZ2Ugb2YgdGhlIGFwcGxpY2F0aW9uIGlzIHByb3ZpZGVkIGJ5IEdvb2dsZSBDaHJvbWVcbiAgICogQHBhcmFtIHVzZXJBZ2VudCAtIFVzZXIgYWdlbnQgdG8gY2hlY2sgdGhlIGJyb3dzZXJcbiAgICovXG4gIHByaXZhdGUgZ2VNZW1vcnlVc2FnZUluZm8odXNlckFnZW50OiBhbnkpIHtcbiAgICBjb25zdCBpc0Nocm9tZSA9IHVzZXJBZ2VudC5zcGxpdCgnY2hyb21lJykubGVuZ3RoID4gMTtcbiAgICBjb25zdCBtZW1vcnkgPSBpc0Nocm9tZSA/IHdpbmRvdy5wZXJmb3JtYW5jZVsnbWVtb3J5J10gOiAnJztcbiAgICByZXR1cm4gbWVtb3J5O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHRpbmcgVVRNIFBhcmFtZXRlcnMgYnkgcHJvY2Vzc2luZyBjdXJyZW50IHBhZ2VVUkxcbiAgICogQHBhcmFtIHVybCAtIFBhZ2UgVVJMXG4gICAqL1xuICBwcml2YXRlIGdldFVUTVBhcmFtZXRlcnModXJsOiBzdHJpbmcpOiBhbnkge1xuICAgIGNvbnN0IHV0bU9iamVjdCA9IHt9O1xuICAgIGlmICh1cmwuaW5jbHVkZXMoJ3V0bScpKSB7XG4gICAgICBjb25zdCB1dG1QYXJhbXMgPSB1cmwuc3BsaXQoJz8nKVsxXS5zcGxpdCgnJicpO1xuICAgICAgdXRtUGFyYW1zLm1hcChwYXJhbSA9PiB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHBhcmFtLnNwbGl0KCc9Jyk7XG4gICAgICAgIHV0bU9iamVjdFtwYXJhbXNbMF1dID0gcGFyYW1zWzFdO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB1dG1PYmplY3Q7XG4gIH1cblxuICAvKipcbiAgICogR2V0dGluZyB1c2VyIGluZm9cbiAgICovXG4gIHByaXZhdGUgZ2V0VXNlckluZm8oKSB7XG4gICAgdGhpcy5lbnZpcm9ubWVudFNlcnZpY2UuZ2V0VXNlckluZm8oKS5zdWJzY3JpYmUoXG4gICAgICAocmVzOiBVc2VyQmVhbikgPT4ge1xuICAgICAgICB0aGlzLnVzZXJJbmZvID0gcmVzO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IGludGVydmFsLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcbmltcG9ydCAqIGFzIHV1aWQgZnJvbSAndXVpZCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIERhdGFTdG9yYWdlU2VydmljZSB7XG5cbiAgY29uc3RhbnRzID0gQ29uc3RhbnRzO1xuICBhbGxEYXRhQW5hbHl0aWNzQXJyYXk6IEFycmF5PGFueT4gPSBbXTtcbiAgYWxsRGF0YUFuYWx5dGljczoge1xuICAgIHBhZ2VVcmw6IHN0cmluZyxcbiAgICBldmVudFZhbHVlczogQXJyYXk8YW55PlxuICB9O1xuICBwcmV2aW91c1VybDogc3RyaW5nO1xuICBrZXlzOiBBcnJheTxhbnk+ID0gW107XG4gIGlkbGVUaW1lclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBldmVudENvbGxlY3RvciA9IG5ldyBNYXAoKTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhbmFseXRpY2FsU2VydmljZTogQW5hbHl0aWNzU2VydmljZSwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7IH1cbiAgcHJpdmF0ZSByb3V0ZURldGFpbHM6IGFueSA9IFtdO1xuICBjb3VudCA9IDA7XG4gIHNldFVybEtleShkYXRhOiBzdHJpbmcpIHtcbiAgICBsZXQgZmxhZyA9IDA7XG4gICAgaWYgKHRoaXMucHJldmlvdXNVcmwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5ldmVudENvbGxlY3Rvci5zZXQoZGF0YSwgW10pO1xuICAgICAgdGhpcy5wcmV2aW91c1VybCA9IGRhdGEgfHwgJy8nO1xuICAgIH0gZWxzZSBpZiAoIShkYXRhID09PSB0aGlzLnByZXZpb3VzVXJsKSkge1xuICAgICAgZm9yIChjb25zdCBrZXkgb2YgQXJyYXkuZnJvbSh0aGlzLmV2ZW50Q29sbGVjdG9yLmtleXMoKSkpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gZGF0YSkge1xuICAgICAgICAgIGZsYWcgPSAxO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZmxhZyA9PT0gMCkge1xuICAgICAgICB0aGlzLmV2ZW50Q29sbGVjdG9yLnNldChkYXRhLCBbXSk7XG4gICAgICB9XG4gICAgICB0aGlzLnByZXZpb3VzVXJsID0gZGF0YTtcbiAgICB9XG4gIH1cbiAgYXBwZW5kVG9BbmFseXRpY3NBcnJheShkYXRhOiBBbmFseXRpY3NCZWFuKSB7XG4gICAgaWYgKHRoaXMucHJldmlvdXNVcmwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5zZXRVcmxLZXkoZGF0YS5ldmVudENvbXBvbmVudCk7XG4gICAgfVxuICAgIHRoaXMuZXZlbnRDb2xsZWN0b3IuZ2V0KHRoaXMucHJldmlvdXNVcmwpLnB1c2goZGF0YSk7XG4gIH1cblxuICBwdXNoRGF0YUFycmF5VG9TMygpIHtcbiAgICB0aGlzLmNvdW50Kys7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgQXJyYXkuZnJvbSh0aGlzLmV2ZW50Q29sbGVjdG9yLmtleXMoKSkpIHtcbiAgICAgIHRoaXMuYWxsRGF0YUFuYWx5dGljcyA9IHtcbiAgICAgICAgcGFnZVVybDoga2V5LFxuICAgICAgICBldmVudFZhbHVlczogQXJyYXkuZnJvbSh0aGlzLmV2ZW50Q29sbGVjdG9yLmdldChrZXkpLnZhbHVlcygpKVxuICAgICAgfTtcbiAgICAgIHRoaXMua2V5cy5wdXNoKGtleSk7XG4gICAgICBpZiAodGhpcy5hbGxEYXRhQW5hbHl0aWNzLmV2ZW50VmFsdWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5zdG9wSWRsZVRpbWVyKCk7XG4gICAgICAgIHRoaXMuYW5hbHl0aWNhbFNlcnZpY2UucHVzaERhdGEodGhpcy5hbGxEYXRhQW5hbHl0aWNzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RhcnRDYWxjdWxhdGVJZGxlVGltZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmV2ZW50Q29sbGVjdG9yLmNsZWFyKCk7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgdGhpcy5rZXlzKSB7XG4gICAgICB0aGlzLmV2ZW50Q29sbGVjdG9yLnNldChrZXksIFtdKTtcbiAgICB9XG4gIH1cblxuICBzZXRSb3V0ZURldGFpbHMocm91dGVEZXRhaWxzOiBhbnkpIHtcbiAgICB0aGlzLnJvdXRlRGV0YWlscyA9IHJvdXRlRGV0YWlscztcbiAgfVxuXG4gIGdldFJvdXRlRGV0YWlscygpIHtcbiAgICByZXR1cm4gdGhpcy5yb3V0ZURldGFpbHM7XG4gIH1cblxuICAvKipcbiAgICogSWYgdGhlIHNlc3Npb24gaXMgaWRsZSBmb3IgMzAgbWluLCB0aGUgc2Vzc2lvbiB3aWxsIGJlIGNsZWFyZWRcbiAgICovXG4gIHN0YXJ0Q2FsY3VsYXRlSWRsZVRpbWUoKSB7XG4gICAgaWYgKCF0aGlzLmlkbGVUaW1lclN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5pZGxlVGltZXJTdWJzY3JpcHRpb24gPSBpbnRlcnZhbCgxMDAwICogNjAgKiAzMCkuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgICBjb25zdCBzZXNzaW9uSWQgPSB1dWlkLnY0KCk7XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0odGhpcy5jb25zdGFudHMuU0VTU0lPTl9JRCwgc2Vzc2lvbklkKTtcbiAgICAgICAgdGhpcy5zdG9wSWRsZVRpbWVyKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogaWYgdGhlIGlkbGUgdGltZXIgaXMgcnVubmluZywgcmVzZXR0aW5nIHRoZSB0aW1lclxuICAgKi9cbiAgc3RvcElkbGVUaW1lcigpIHtcbiAgICBpZiAodGhpcy5pZGxlVGltZXJTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuaWRsZVRpbWVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLmlkbGVUaW1lclN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMuc3RhcnRDYWxjdWxhdGVJZGxlVGltZSgpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlJztcbmltcG9ydCB7IEV2ZW50TGFiZWxzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuXG4vKipcbiAqIEJ1dHRvbiBEaXJlY3RpdmUgdG8gdHJhY2sgY2xpY2sgZXZlbnRcbiAqIFNlbGVjdG9yIGNhbiBiZSBhZGRlZCB0byBhbnkgSFRNTCBFbGVtZW50XG4gKi9cbkBEaXJlY3RpdmUoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRpcmVjdGl2ZS1zZWxlY3RvclxuICBzZWxlY3RvcjogJ1t0cmFjay1idG5dJ1xufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25EaXJlY3RpdmUge1xuXG4gIC8vIEdldHMgaW1wb3J0YW50IGRhdGEgYWJvdXQgdGhlIGJ1dHRvbiBleHBsaWNpdGx5IGZyb20gdGhlIGFwcGxpY2F0aW9uXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgndHJhY2stYnRuJykgZGF0YTogYW55ID0ge307XG4gIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG4gIGV2ZW50RGV0YWlsczogYW55O1xuXG4gIC8qKlxuICAgKiBCdXR0b24gVHJhY2tpbmcgLSBDb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gZGF0YVN0b3JhZ2UgLSBEYXRhU3RvcmFnZVNlcnZpY2VcbiAgICogQHBhcmFtIGFuYWx5dGljc1NlcnZpY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZSwgcHJpdmF0ZSBhbmFseXRpY3NTZXJ2aWNlOiBBbmFseXRpY3NTZXJ2aWNlKSB7IH1cblxuXG4gIC8qKlxuICAgKiAgTGlzdGVuIHRvIGJ1dHRvbiBjbGljayBhY3Rpb25zXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pIG9uQ2xpY2soJGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmV2ZW50RGV0YWlscyA9ICRldmVudDtcbiAgICB0aGlzLnNlbmREYXRhKCk7XG4gIH1cblxuICAvKiogU2VuZGluZyBkYXRhIG9uIGJ1dHRvbiBjbGljayAqL1xuICBwdWJsaWMgc2VuZERhdGEoKTogdm9pZCB7XG4gICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9XG4gICAgICB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YSh0aGlzLmRhdGEsIHRoaXMuZXZlbnREZXRhaWxzLCB0aGlzLmV2ZW50TGFiZWxzLkJVVFRPTl9DTElDSywgJycpO1xuICAgIHRoaXMuZGF0YVN0b3JhZ2UuYXBwZW5kVG9BbmFseXRpY3NBcnJheShhbmFseXRpY3NCZWFuKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkNoYW5nZXMsIEhvc3RMaXN0ZW5lciwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBFdmVudExhYmVscyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vZW52aXJvbm1lbnQvZW52aXJvbm1lbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRpcmVjdGl2ZS1zZWxlY3RvclxuICAgIHNlbGVjdG9yOiAnW3RyYWNrLXNjcm9sbF0nXG59KVxuZXhwb3J0IGNsYXNzIFNjcm9sbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgICAvLyBHZXRzIGltcG9ydGFudCBkYXRhIGFib3V0IHRoZSBjb21wb25lbnQgZXhwbGljaXRseSBmcm9tIHRoZSBhcHBsaWNhdGlvblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8taW5wdXQtcmVuYW1lXG4gICAgQElucHV0KCd0cmFjay1zY3JvbGwnKSBkYXRhOiBhbnkgPSB7fTtcbiAgICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgYW5hbHl0aWNzU2VydmljZTogQW5hbHl0aWNzU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBkYXRhU3RvcmFnZTogRGF0YVN0b3JhZ2VTZXJ2aWNlXG4gICAgKSB7IH1cblxuICAgIC8vIENhcHR1cmUgdGhlIGNoYW5nZSBpbiBkYXRhXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IGNoYW5nZXMuZGF0YS5jdXJyZW50VmFsdWU7XG4gICAgfVxuXG4gICAgLy8gVHJpZ2dlcmVkIHdoZW4gYW55IHNjcm9sbCBldmVudCBvY2N1cnNcbiAgICBASG9zdExpc3RlbmVyKCd3aW5kb3c6c2Nyb2xsJywgWyckZXZlbnQnXSkgb25TY3JvbGxFdmVudCgkZXZlbnQ6IGFueSkge1xuICAgICAgICBpZiAoZW52aXJvbm1lbnQudHJhY2suc2Nyb2xsKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmREYXRhKCRldmVudCk7XG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgc2VuZERhdGEoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgICAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID1cbiAgICAgICAgICAgIHRoaXMuYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKHRoaXMuZGF0YSwgZXZlbnQsIHRoaXMuZXZlbnRMYWJlbHMuU0NST0xMLCAnJyk7XG4gICAgICAgIHRoaXMuZGF0YVN0b3JhZ2UuYXBwZW5kVG9BbmFseXRpY3NBcnJheShhbmFseXRpY3NCZWFuKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9kYXRhLXN0b3JhZ2UvZGF0YS1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IEV2ZW50TGFiZWxzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdbdHJhY2stYnV0dG9uSG92ZXJdJ1xufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25Ib3ZlckRpcmVjdGl2ZSB7XG4gIC8qKiAqL1xuICBldmVudERldGFpbHM6IGFueTtcbiAgZXZlbnRMYWJlbHMgPSBFdmVudExhYmVscztcbiAgLy8gR2V0cyBpbXBvcnRhbnQgZGF0YSBhYm91dCB0aGUgYnV0dG9uIGV4cGxpY2l0bHkgZnJvbSB0aGUgYXBwbGljYXRpb25cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KCd0cmFjay1idXR0b25Ib3ZlcicpIGRhdGE6IGFueSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZSwgcHJpdmF0ZSBhbmFseXRpY3NTZXJ2aWNlOiBBbmFseXRpY3NTZXJ2aWNlKSB7IH1cblxuICAvLyBMaXN0ZW4gdG8gYnV0dG9uIGhvdmVyIGFjdGlvbnNcbiAgQEhvc3RMaXN0ZW5lcignbW91c2VvdmVyJywgWyckZXZlbnQnXSkgb25Nb3VzZU92ZXIoJGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmV2ZW50RGV0YWlscyA9ICRldmVudDtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2VuZERhdGEoKTtcbiAgICB9LCAxMCk7XG4gIH1cblxuICAvLyBTZW5kaW5nIGRhdGEgb24gYnV0dG9uIGhvdmVyXG4gIHB1YmxpYyBzZW5kRGF0YSgpOiB2b2lkIHtcbiAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID1cbiAgICAgIHRoaXMuYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKHRoaXMuZGF0YSwgdGhpcy5ldmVudERldGFpbHMsIHRoaXMuZXZlbnRMYWJlbHMuTU9VU0VfSE9WRVIsICcnKTtcbiAgICB0aGlzLmRhdGFTdG9yYWdlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkoYW5hbHl0aWNzQmVhbik7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkVuZCwgTmF2aWdhdGlvbkVycm9yIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBFdmVudExhYmVscyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcbmRlY2xhcmUgbGV0IG5nUzNBbmFseXRpY3NKUzogYW55O1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUm91dGVyU2VydmljZSB7XG4gIGFuYWx5dGljc0RhdGE6IEFuYWx5dGljc0JlYW47XG4gIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG4gIG5hdmlnYXRlT24gPSAnJztcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXM6IFJvdXRlciwgcHJpdmF0ZSBhbmFseXRpY3NTZXJ2aWNlOiBBbmFseXRpY3NTZXJ2aWNlLCBwcml2YXRlIGRhdGFTdG9yYWdlOiBEYXRhU3RvcmFnZVNlcnZpY2UpIHtcblxuICB9XG5cbiAgLyoqXG4gICAqIFRyYWNraW5nIHJvdXRlciBldmVudHNcbiAgICovXG4gIHB1YmxpYyB0cmFja1JvdXRlckV2ZW50cygpOiB2b2lkIHtcbiAgICAvKiogVHJpZ2dlcmVkIHdoZW4gY3VycmVudCBwYWdlIGlzIGxvYWRlZCAqL1xuICAgIHRoaXMucm91dGVzLmV2ZW50cy5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAvKiogVHJpZ2dlcmVkIHdoZW4gTmF2aWdhdGlvbkVuZCBldmVudCBvY2N1cnMgKi9cbiAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcbiAgICAgICAgaWYgKHRoaXMubmF2aWdhdGVPbiAhPT0gZXZlbnQudXJsKSB7XG4gICAgICAgICAgdGhpcy5hbmFseXRpY3NQdXNoRGF0YShldmVudCk7XG4gICAgICAgICAgdGhpcy5uYXZpZ2F0ZU9uID0gZXZlbnQudXJsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVycm9yKSB7XG4gICAgICAgIC8qKiBUcmlnZ2VyZWQgd2hlbiBOYXZpZ2F0aW9uRXJyb3IgZXZlbnQgb2NjdXJzICovXG4gICAgICAgIHRoaXMuYW5hbHl0aWNzUHVzaERhdGEoZXZlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFB1c2hpbmcgYW5hbHl0aWNzIGRhdGFcbiAgICogQHBhcmFtIGV2ZW50IC0gUm91dGVyIEV2ZW50XG4gICAqL1xuICBwdWJsaWMgYW5hbHl0aWNzUHVzaERhdGEoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHNjcmVlbnNob3ROYW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkudG9TdHJpbmcoKTtcbiAgICB0aGlzLmFuYWx5dGljc0RhdGEgPSB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YSh7fSwge30sIHRoaXMuZXZlbnRMYWJlbHMuUEFHRV9MT0FELCBgJHtzY3JlZW5zaG90TmFtZX0uaHRtbGAsXG4gICAgICB7IGV2ZW50Q29tcG9uZW50OiBldmVudC51cmwgfSk7XG4gICAgdGhpcy53YWl0VGlsbFBhZ2VMb2FkKHNjcmVlbnNob3ROYW1lKTtcbiAgICAvLyBEYXRhIGlzIHNlbmQgb25seSB3aGVuIHVzZXIgY29uZmlndXJlIHRoZSBwYWdlIGxvYWRpbmcgdG8gYmUgdHJ1ZVxuICAgIHRoaXMuZGF0YVN0b3JhZ2Uuc2V0VXJsS2V5KHRoaXMuYW5hbHl0aWNzRGF0YS5ldmVudENvbXBvbmVudCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmRhdGFTdG9yYWdlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkodGhpcy5hbmFseXRpY3NEYXRhKTtcbiAgICB9LCAwKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFdhaXRpbmcgZm9yIHBhZ2UgdG8gbG9hZCBjb21wbGV0ZWx5XG4gICAqIEBwYXJhbSBldmVudCBcbiAgICovXG4gIHdhaXRUaWxsUGFnZUxvYWQoc2NyZWVuc2hvdE5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IF9zZWxmID0gdGhpcztcbiAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICBfc2VsZi5jYXB0dXJlVGVtcGxhdGUoc2NyZWVuc2hvdE5hbWUpO1xuICAgICAgfVxuICAgIH0sIDEwMDApO1xuICB9XG5cbiAgLyoqXG4gICAqIENhcHR1cmUgdGVtcGxhdGUgb2YgbG9hZGVkIHZpZXdcbiAgICogQHBhcmFtIHNjcmVlbnNob3ROYW1lIC0gU2NyZWVuc2hvdCBpbWFnZVxuICAgKi9cbiAgY2FwdHVyZVRlbXBsYXRlKHNjcmVlbnNob3ROYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBmdWxsUGFnZUhUTUwgPSBuZ1MzQW5hbHl0aWNzSlMuY29uc3RydWN0SFRNTFBhZ2UoXG4gICAgICB0aGlzLnByb2Nlc3NSZWdleE9wZXJhdGlvbnMoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZCcpLmlubmVySFRNTCksXG4gICAgICB0aGlzLnByb2Nlc3NSZWdleE9wZXJhdGlvbnMoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmlubmVySFRNTClcbiAgICApO1xuICAgIHRoaXMuYW5hbHl0aWNzU2VydmljZS5zYXZlU2NyZWVuc2hvdHNJblMzKGZ1bGxQYWdlSFRNTCwgc2NyZWVuc2hvdE5hbWUpO1xuICB9XG5cblxuICBwcm9jZXNzUmVnZXhPcGVyYXRpb25zKHRleHQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG5nUzNBbmFseXRpY3NKUy5kb1JlZ2V4KHRleHQsIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbnB1dCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBFdmVudExhYmVscyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vZW52aXJvbm1lbnQvZW52aXJvbm1lbnQnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBQb2ludGVyU2VydmljZSB7XG5cbiAgZXZlbnRMYWJlbHMgPSBFdmVudExhYmVscztcbiAgZXZlbnREZXRhaWxzOiBhbnk7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgndHJhY2stcG9pbnRlcicpIGRhdGE6IGFueSA9IHt9O1xuICB0cmFja2luZ1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZSwgcHJpdmF0ZSBhbmFseXRpY3NTZXJ2aWNlOiBBbmFseXRpY3NTZXJ2aWNlKSB7IH1cblxuICAvKipcbiAgICogVHJhY2sgTW91c2UgTW92ZW1lbnRcbiAgICovXG4gIHRyYWNrTW91c2VNb3ZlRXZlbnQoKSB7XG4gICAgdGhpcy50cmFja2luZ1N1YnNjcmlwdGlvbi5hZGQoZnJvbUV2ZW50KHdpbmRvdywgJ21vdXNlbW92ZScpXG4gICAgICAuc3Vic2NyaWJlKChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIC8qKlxuICAgICAgICAqIENoZWNraW5nIHdoZXRoZXIgdXNlciBvcHQgdG8gZGlzYWJsZSB0cmFja2luZyBtb3VzZVxuICAgICAgICAqL1xuICAgICAgICBpZiAoZW52aXJvbm1lbnQudHJhY2subW91c2UpIHtcbiAgICAgICAgICB0aGlzLmV2ZW50RGV0YWlscyA9IGU7XG4gICAgICAgICAgdGhpcy5zZW5kRGF0YSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMudHJhY2tpbmdTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFB1c2hpbmcgTW91c2UgTW92ZSBkZXRhaWxzXG4gICAqL1xuICBwdWJsaWMgc2VuZERhdGEoKTogdm9pZCB7XG4gICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9XG4gICAgICB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YSh0aGlzLmRhdGEsIHRoaXMuZXZlbnREZXRhaWxzLCB0aGlzLmV2ZW50TGFiZWxzLk1PVVNFX01PVkUsICcnKTtcbiAgICB0aGlzLmRhdGFTdG9yYWdlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkoYW5hbHl0aWNzQmVhbik7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRXJyb3JIYW5kbGVyLCBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgRXZlbnRMYWJlbHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9kYXRhLXN0b3JhZ2UvZGF0YS1zdG9yYWdlLnNlcnZpY2UnO1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdsb2JhbEVycm9ySGFuZGxlciB7XG4gICAgZXZlbnRMYWJlbHMgPSBFdmVudExhYmVscztcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgIH1cblxuICAgIHRyYWNrQ29uc29sZUVycm9ycygpIHtcblxuICAgICAgICBjb25zdCBhbmFseXRpY3NTZXJ2aWNlID0gdGhpcy5pbmplY3Rvci5nZXQoQW5hbHl0aWNzU2VydmljZSk7XG4gICAgICAgIGNvbnN0IGRhdGFTdG9yYWdlU2VydmljZSA9IHRoaXMuaW5qZWN0b3IuZ2V0KERhdGFTdG9yYWdlU2VydmljZSk7XG4gICAgICAgIGlmICh3aW5kb3cuY29uc29sZSAmJiBjb25zb2xlLmVycm9yKSB7XG4gICAgICAgICAgICBjb25zdCBjb25zb2xlRXJyb3JGbk9iamVjdCA9IGNvbnNvbGUuZXJyb3I7XG4gICAgICAgICAgICBjb25zdCBfc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yID0gZnVuY3Rpb24gKC4uLmVycm9yOiBhbnlbXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2Nlc3NlZEVycm9yID0gZXJyb3IubWFwKGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChlKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBtYXgtbGluZS1sZW5ndGhcbiAgICAgICAgICAgICAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID0gYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhXG4gICAgICAgICAgICAgICAgICAgICgnJywge30sIF9zZWxmLmV2ZW50TGFiZWxzLkNPTlNPTEVfRVJST1IsICcnLCB7IGNvbnNvbGVFcnJvcnM6IEpTT04uc3RyaW5naWZ5KHByb2Nlc3NlZEVycm9yKSB9KTtcbiAgICAgICAgICAgICAgICBkYXRhU3RvcmFnZVNlcnZpY2UuYXBwZW5kVG9BbmFseXRpY3NBcnJheShhbmFseXRpY3NCZWFuKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlRXJyb3JGbk9iamVjdC5jYWxsKGNvbnNvbGUsIGVycm9yKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgRWxlbWVudFJlZiwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBLZXlTdHJva2VFdmVudFR5cGUsIEV2ZW50TGFiZWxzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCAqIGFzIHV1aWQgZnJvbSAndXVpZCc7XG5pbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gJy4uLy4uL2Vudmlyb25tZW50L2Vudmlyb25tZW50JztcblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkaXJlY3RpdmUtc2VsZWN0b3JcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1t0cmFjay1rZXlTdHJva2VdJyB9KVxuZXhwb3J0IGNsYXNzIEtleVN0cm9rZURpcmVjdGl2ZSB7XG5cbiAgICAvKiogRXZlbnQgTGFiZWxzIENvbnN0YW50cyAqL1xuICAgIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG5cbiAgICAvKipcbiAgICAgKiBEZXBlbmRlbmNpZXNcbiAgICAgKiBAcGFyYW0gZGF0YVN0b3JhZ2VcbiAgICAgKiBAcGFyYW0gYW5hbHl0aWNzU2VydmljZVxuICAgICAqIEBwYXJhbSBlbCAtIEVsZW1lbnQgUmVmZXJlbmNlXG4gICAgICogQHBhcmFtIHJlbmRlcmVyIC0gUmVuZGVyZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBkYXRhU3RvcmFnZTogRGF0YVN0b3JhZ2VTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGFuYWx5dGljc1NlcnZpY2U6IEFuYWx5dGljc1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpZiBJZCBkb2Vzbid0IGJlbG9uZ3MgdG8gdGhlIGVsZW1lbnQsIHdoaWNoIGlzIGJlaW5nIHRyYWNrZWQsXG4gICAgICAgICAqIEFkZGluZyBhIGR5bmFtaWMgSWRcbiAgICAgICAgICovXG4gICAgICAgIGlmICghdGhpcy5lbC5uYXRpdmVFbGVtZW50LmlkKSB7XG4gICAgICAgICAgICBjb25zdCBkeW5hbWljSWQgPSBga2V5X3N0cm9rZV9lbGVtZW50XyR7dXVpZC52NCgpfWA7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdpZCcsIGR5bmFtaWNJZCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyYWNraW5nIEtleSBwcmVzcyBldmVudHMgdXNpbmcgaG9zdCBsaXN0ZW5lclxuICAgICAqIEdlbmVyYXRpbmcgYSBkYXRhIGJlYW4gaW4gYSBzcGVjaWZpZWQgZm9ybWF0XG4gICAgICogQHBhcmFtICRldmVudCAtIEtleVByZXNzIEV2ZW50XG4gICAgICovXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5cHJlc3MnLCBbJyRldmVudCddKSBvbktleVN0cm9rZSgkZXZlbnQ6IGFueSkge1xuICAgICAgICBjb25zdCBrZXlTdHJva2U6IEtleVN0cm9rZUV2ZW50VHlwZSA9IG5ldyBLZXlTdHJva2VFdmVudFR5cGUoKTtcbiAgICAgICAgaWYgKCRldmVudC50YXJnZXQudHlwZSAhPT0gJ3Bhc3N3b3JkJyAmJiB0aGlzLmNoZWNrQ2xhc3NOYW1lcygkZXZlbnQudGFyZ2V0LmNsYXNzTGlzdCkpIHtcbiAgICAgICAgICAgIGtleVN0cm9rZS5lbGVtZW50SWQgPSAkZXZlbnQudGFyZ2V0LmlkO1xuICAgICAgICAgICAga2V5U3Ryb2tlLmtleSA9ICRldmVudC5rZXk7XG4gICAgICAgICAgICBrZXlTdHJva2UuY29kZSA9ICRldmVudC5jb2RlO1xuICAgICAgICAgICAga2V5U3Ryb2tlLmtleUNvZGUgPSAkZXZlbnQua2V5Q29kZS50b1N0cmluZygpO1xuICAgICAgICAgICAga2V5U3Ryb2tlLmlzRm9ybSA9ICRldmVudC50YXJnZXQuZm9ybSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAga2V5U3Ryb2tlLmZvcm0gPSAkZXZlbnQudGFyZ2V0LmZvcm0gIT09IHVuZGVmaW5lZCA/IEpTT04uc3RyaW5naWZ5KCRldmVudC50YXJnZXQuZm9ybS5lbGVtZW50cykgOiAnJztcbiAgICAgICAgICAgIGtleVN0cm9rZS50YWdOYW1lID0gJGV2ZW50LnRhcmdldC50YWdOYW1lO1xuICAgICAgICAgICAga2V5U3Ryb2tlLmh0bWxFbGVtZW50VHlwZSA9ICRldmVudC50YXJnZXQudHlwZTtcbiAgICAgICAgICAgIGtleVN0cm9rZS52YWx1ZSA9ICRldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICB0aGlzLnNlbmREYXRhKGtleVN0cm9rZSwgJGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgY2hlY2tDbGFzc05hbWVzKGNsYXNzTGlzdDogQXJyYXk8c3RyaW5nPikge1xuICAgICAgICBjb25zdCBjbGFzc05hbWVzOiBhbnkgPSBbLi4uY2xhc3NMaXN0XS5jb25jYXQoZW52aXJvbm1lbnQuaWdub3JlQ3NzUnVsZXMpO1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShuZXcgU2V0KGNsYXNzTmFtZXMpKS5sZW5ndGggPT09IGNsYXNzTmFtZXMubGVuZ3RoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmRpbmcgZGF0YVxuICAgICAqIEBwYXJhbSBrZXlTdHJva2UgLSBDYXB0dXJlZCBLZXlTdHJva2UgZGF0YVxuICAgICAqIEBwYXJhbSBldmVudERldGFpbHMgLSBLZXkgUHJlc3MgZXZlbnQgZGV0YWlsc1xuICAgICAqL1xuICAgIHByaXZhdGUgc2VuZERhdGEoa2V5U3Ryb2tlOiBLZXlTdHJva2VFdmVudFR5cGUsIGV2ZW50RGV0YWlsczogYW55KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGFuYWx5dGljc0JlYW46IEFuYWx5dGljc0JlYW4gPVxuICAgICAgICAgICAgdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnNldEFuYWx5dGljc0RhdGEoe30sXG4gICAgICAgICAgICAgICAgZXZlbnREZXRhaWxzLFxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRMYWJlbHMuS0VZX1NUUk9LRSwgJycsXG4gICAgICAgICAgICAgICAgeyBrZXlTdHJva2VEYXRhOiBrZXlTdHJva2UgfSk7XG4gICAgICAgIHRoaXMuZGF0YVN0b3JhZ2UuYXBwZW5kVG9BbmFseXRpY3NBcnJheShhbmFseXRpY3NCZWFuKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdTM0FuYWx5dGljc0NvbXBvbmVudCB9IGZyb20gJy4vbmctczMtYW5hbHl0aWNzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb25maWd1cmF0aW9uIH0gZnJvbSAnLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBCdXR0b25EaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvYnV0dG9uL2J1dHRvbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU2Nyb2xsRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3Njcm9sbC9zY3JvbGwuZGlyZWN0aXZlJztcbmltcG9ydCB7IEJ1dHRvbkhvdmVyRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2J1dHRvbi1ob3Zlci9idXR0b24taG92ZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IEVudmlyb25tZW50U2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZW52aXJvbm1lbnQvZW52aXJvbm1lbnQuc2VydmljZSc7XG5pbXBvcnQgeyBSb3V0ZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9yb3V0ZXIvcm91dGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgaW50ZXJ2YWwgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERhdGFTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uL2xpYi9zZXJ2aWNlcy9kYXRhLXN0b3JhZ2UvZGF0YS1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUG9pbnRlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3BvaW50ZXIvcG9pbnRlci5zZXJ2aWNlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgR2xvYmFsRXJyb3JIYW5kbGVyIH0gZnJvbSAnLi9zZXJ2aWNlcy9lcnJvci1oYW5kbGVyL2Vycm9ySGFuZGxlci5zZXJ2aWNlJztcbmltcG9ydCB7IENvb2tpZVNlcnZpY2UgfSBmcm9tICduZ3gtY29va2llLXNlcnZpY2UnO1xuaW1wb3J0IHsgS2V5U3Ryb2tlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2tleS1zdHJva2Uva2V5LXN0cm9rZS5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTmdTM0FuYWx5dGljc0NvbXBvbmVudCxcbiAgICBCdXR0b25EaXJlY3RpdmUsXG4gICAgU2Nyb2xsRGlyZWN0aXZlLFxuICAgIEJ1dHRvbkhvdmVyRGlyZWN0aXZlLFxuICAgIEtleVN0cm9rZURpcmVjdGl2ZVxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBEYXRhU3RvcmFnZVNlcnZpY2UsXG4gICAgRW52aXJvbm1lbnRTZXJ2aWNlLFxuICAgIFBvaW50ZXJTZXJ2aWNlLFxuICAgIENvb2tpZVNlcnZpY2UsXG4gICAgR2xvYmFsRXJyb3JIYW5kbGVyXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBOZ1MzQW5hbHl0aWNzQ29tcG9uZW50LFxuICAgIEJ1dHRvbkRpcmVjdGl2ZSxcbiAgICBTY3JvbGxEaXJlY3RpdmUsXG4gICAgQnV0dG9uSG92ZXJEaXJlY3RpdmUsXG4gICAgS2V5U3Ryb2tlRGlyZWN0aXZlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmdTM0FuYWx5dGljc01vZHVsZSB7XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZW52aXJvbm1lbnRTZXJ2aWNlID0gbmV3IEVudmlyb25tZW50U2VydmljZSgpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyU2VydmljZTogUm91dGVyU2VydmljZSxcbiAgICBwcml2YXRlIGRhdGFTdG9yYWdlOiBEYXRhU3RvcmFnZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBwb2ludGVyU2VydmljZTogUG9pbnRlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBlcnJvcmhhbmRsZXI6IEdsb2JhbEVycm9ySGFuZGxlcikge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCAoZSkgPT4ge1xuICAgICAgdGhpcy5kYXRhU3RvcmFnZS5wdXNoRGF0YUFycmF5VG9TMygpO1xuICAgIH0pO1xuICAgIGludGVydmFsKDEwMDAgKiAyKS5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICB0aGlzLmRhdGFTdG9yYWdlLnB1c2hEYXRhQXJyYXlUb1MzKCk7XG4gICAgfSk7XG4gICAgdGhpcy5wb2ludGVyU2VydmljZS50cmFja01vdXNlTW92ZUV2ZW50KCk7XG4gICAgdGhpcy5yb3V0ZXJTZXJ2aWNlLnRyYWNrUm91dGVyRXZlbnRzKCk7XG4gICAgdGhpcy5lcnJvcmhhbmRsZXIudHJhY2tDb25zb2xlRXJyb3JzKCk7XG4gIH1cbiAgLy8gQ29uZmlndXJpbmcgdGhlIGluaXRpYWwgc2V0dXAgZm9yIHMzIGJ1Y2tldCBhbmQgcGFnZSBsb2FkaW5nXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb24sIGlzUGFnZUxvYWRpbmdUb0JlRGV0ZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIHRoaXMuZW52aXJvbm1lbnRTZXJ2aWNlLnNldENvbmZpZ3VyYXRpb25Ub0Vudmlyb25tZW50KGNvbmZpZ3VyYXRpb24sIGlzUGFnZUxvYWRpbmdUb0JlRGV0ZWN0ZWQpO1xuICAgIC8vIEFzc2lnbmluZyB0aGUgY29uZmlndXJhdGlvbiB0byBlbnZpcm9ubWVudCB2YXJpYWJsZXNcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQ3VzdG9tRXZlbnRTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFTdG9yYWdlOiBEYXRhU3RvcmFnZVNlcnZpY2UsIHByaXZhdGUgYW5hbHl0aWNzU2VydmljZTogQW5hbHl0aWNzU2VydmljZSkgeyB9XG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBleHBvc2VkIHRvIHVzZXIgdG8gaGVscCBwdXNoaW5nIGN1c3RvbSBldmVudHNcbiAgICogXG4gICAqIEBwYXJhbSBjdXN0b21FdmVudE5hbWUgLSBBbnkgbmFtZSB0aGF0IHVzZXIgY2FuIGJlIGNvbmZpZ3VyZVxuICAgKiBAcGFyYW0gZXZlbnREYXRhIC0gQW55IGRhdGEsIHdoaWNoIHVzZXIgY29uZmlndXJlZCBpbiBhZGRpdGlvbmFsIGluZm9cbiAgICovXG4gIHB1YmxpYyBwdXNoRXZlbnQoY3VzdG9tRXZlbnROYW1lOiBzdHJpbmcsIGV2ZW50RGF0YTogYW55KTogdm9pZCB7XG4gICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9XG4gICAgICB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YShldmVudERhdGEsICcnLCBjdXN0b21FdmVudE5hbWUsICcnKTtcbiAgICB0aGlzLmRhdGFTdG9yYWdlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkoYW5hbHl0aWNzQmVhbik7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJJbmplY3RhYmxlIiwiQ29tcG9uZW50IiwiU3ViamVjdCIsIkh0dHBDbGllbnQiLCJJbmplY3RvciIsIkNvb2tpZVNlcnZpY2UiLCJ1dWlkLnY0IiwiSHR0cEhlYWRlcnMiLCJ0c2xpYl8xLl9fdmFsdWVzIiwiaW50ZXJ2YWwiLCJEaXJlY3RpdmUiLCJJbnB1dCIsIkhvc3RMaXN0ZW5lciIsIk5hdmlnYXRpb25FbmQiLCJOYXZpZ2F0aW9uRXJyb3IiLCJSb3V0ZXIiLCJTdWJzY3JpcHRpb24iLCJmcm9tRXZlbnQiLCJ0c2xpYl8xLl9fc3ByZWFkIiwiRWxlbWVudFJlZiIsIlJlbmRlcmVyMiIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiSHR0cENsaWVudE1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO1FBT0U7U0FBaUI7O29CQUxsQkEsYUFBVSxTQUFDO3dCQUNWLFVBQVUsRUFBRSxNQUFNO3FCQUNuQjs7OzttQ0FKRDtLQVFDOzs7Ozs7QUNSRDtRQWFFO1NBQWlCOzs7O1FBRWpCLHlDQUFROzs7WUFBUjthQUNDOztvQkFkRkMsWUFBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSxxQkFBcUI7d0JBQy9CLFFBQVEsRUFBRSx1REFJVDt3QkFDRCxNQUFNLEVBQUUsRUFBRTtxQkFDWDs7O1FBUUQsNkJBQUM7S0FBQTs7SUNsQkQ7Ozs7Ozs7Ozs7Ozs7O0FBY0EsdUJBcUQwQixPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTO1FBQ3ZELGVBQWUsS0FBSyxJQUFJLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdB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