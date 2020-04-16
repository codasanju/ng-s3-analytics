(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/common/http'), require('rxjs/operators'), require('ngx-cookie-service'), require('uuid'), require('@angular/router'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@codaglobal/ng-s3-analytics', ['exports', '@angular/core', 'rxjs', '@angular/common/http', 'rxjs/operators', 'ngx-cookie-service', 'uuid', '@angular/router', '@angular/common'], factory) :
    (factory((global.codaglobal = global.codaglobal || {}, global.codaglobal['ng-s3-analytics'] = {}),global.ng.core,global.rxjs,global.ng.common.http,global.rxjs.operators,null,null,global.ng.router,global.ng.common));
}(this, (function (exports,i0,rxjs,i2,operators,i1,uuid,i1$1,common) { 'use strict';

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
        dataCollectionApi: 'https://1xgf5a2bq2.execute-api.ap-south-1.amazonaws.com/dev/',
        isPageLoadingToBeDetected: true,
        remoteConfigApi: '',
        ignoreUrls: [],
        ignoreCssRules: [],
        showConsent: false,
        consentContent: 'We use cookies to ensure that we provide you with the best possible experience on our website.If you continue to use our site, we assume you accept our use of cookies. Privacy Policy',
        disableTracking: false,
        ignoreIPRanges: '',
        ignoreDomains: [],
        disableDemographicInfo: false
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
            };
        /**
         * @return {?}
         */
        EnvironmentService.prototype.getEnvObservable = /**
         * @return {?}
         */
            function () {
                console.log('calling here', this.envConfig);
                return this.envConfig;
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
                console.log('fetch configuration called', environment, environment.remoteConfigApi);
                this.httpClient.get(environment.remoteConfigApi).pipe(operators.tap(( /**
                 * @param {?} data
                 * @return {?}
                 */function (data) { return console.log(data); }))).subscribe(( /**
                 * @param {?} res
                 * @return {?}
                 */function (res) {
                    _this.remotePluginConfig = res['body'];
                    console.log('getting configuration', res, _this.remotePluginConfig);
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
                console.log(analyticsBean);
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
                if (ip && this.remotePluginConfig) {
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
         * @private
         * @return {?}
         */
        PluginConfigService.prototype.getIp = /**
         * Set user demographic information in cookies
         * @private
         * @return {?}
         */
            function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = this;
                                return [4 /*yield*/, this.httpClient.get(this.constants.DEMOGRAPHIC_API_URL)];
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
                    console.log(this.demographicInfo);
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
                { type: i2.HttpClient },
                { type: i0.Injector },
                { type: i1.CookieService }
            ];
        };
        /** @nocollapse */ PluginConfigService.ngInjectableDef = i0.defineInjectable({ factory: function PluginConfigService_Factory() { return new PluginConfigService(i0.inject(i2.HttpClient), i0.inject(i0.INJECTOR), i0.inject(i1.CookieService)); }, token: PluginConfigService, providedIn: "root" });
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
         * @param cookieService
         * @param httpService
         */
        function AnalyticsService(cookieService, httpService, pluginConfig) {
            this.cookieService = cookieService;
            this.httpService = httpService;
            this.pluginConfig = pluginConfig;
            /** Demographic info */
            this.demographicInfo = {};
            /** Event label constants */
            this.eventLabels = EventLabels;
            /** Constants */
            this.constants = Constants;
            this.pluginConfig.getEnvironmentConfig();
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
                if (this.cookieService.get(this.constants.SESSION_ID)) {
                    this.sessionId = this.cookieService.get(this.constants.SESSION_ID);
                }
                else {
                    this.sessionId = uuid.v4();
                    this.cookieService.set(this.constants.SESSION_ID, this.sessionId);
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
                    this.publishTOAuthS3(analyticsObjectList);
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
                var headers = new i2.HttpHeaders({ 'Content-Type': 'application/json' });
                this.pushDataToS3(filename, this.processForAthena(data.eventValues), headers);
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
                    var headers = new i2.HttpHeaders({ 'Content-Type': 'text/html' });
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
                    var headers = new i2.HttpHeaders({ 'Content-Type': 'application/json' });
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
                    htmlElement: this.getHtmlElement(eventDetails['target']),
                    performance: this.getPerformanceDetails(),
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
         * @return {?}
         */
        AnalyticsService.prototype.getHtmlElement = /**
         * Get HTML Content
         * @private
         * @param {?} targetElement - target element
         * @return {?}
         */
            function (targetElement) {
                return targetElement !== undefined ? targetElement['innerHTML'] : '';
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
        AnalyticsService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        AnalyticsService.ctorParameters = function () {
            return [
                { type: i1.CookieService },
                { type: i2.HttpClient },
                { type: PluginConfigService }
            ];
        };
        /** @nocollapse */ AnalyticsService.ngInjectableDef = i0.defineInjectable({ factory: function AnalyticsService_Factory() { return new AnalyticsService(i0.inject(i1.CookieService), i0.inject(i2.HttpClient), i0.inject(PluginConfigService)); }, token: AnalyticsService, providedIn: "root" });
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
                    // this.allDataAnalyticsMap = JSON.parse(JSON.stringify(Array.from(this.eventCollector.keys())));
                    for (var _c = __values(Array.from(this.eventCollector.keys())), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var key = _d.value;
                        this.allDataAnalytics = {
                            pageUrl: key,
                            eventValues: Array.from(this.eventCollector.get(key).values())
                        };
                        this.keys.push(key);
                        if (this.allDataAnalytics.eventValues.length > 0) {
                            this.analyticalService.pushData(this.allDataAnalytics);
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
        DataStorageService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        DataStorageService.ctorParameters = function () {
            return [
                { type: AnalyticsService },
                { type: i2.HttpClient }
            ];
        };
        /** @nocollapse */ DataStorageService.ngInjectableDef = i0.defineInjectable({ factory: function DataStorageService_Factory() { return new DataStorageService(i0.inject(AnalyticsService), i0.inject(i2.HttpClient)); }, token: DataStorageService, providedIn: "root" });
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
                var _this = this;
                this.eventDetails = $event;
                setTimeout(( /**
                 * @return {?}
                 */function () {
                    _this.sendData();
                }), 10);
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
                setTimeout(( /**
                 * @return {?}
                 */function () {
                    _this.sendData($event);
                }), 100);
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
                rxjs.fromEvent(window, 'mousemove')
                    .subscribe(( /**
             * @param {?} e
             * @return {?}
             */function (e) {
                    _this.eventDetails = e;
                    _this.sendData();
                }));
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
                    console.log('keystroke', $event);
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
                return __spread(new Set(classNames)).length === classNames.length;
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
                            i2.HttpClientModule
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
                            i1.CookieService,
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.NgS3AnalyticsService = NgS3AnalyticsService;
    exports.NgS3AnalyticsComponent = NgS3AnalyticsComponent;
    exports.NgS3AnalyticsModule = NgS3AnalyticsModule;
    exports.EnvironmentService = EnvironmentService;
    exports.DataStorageService = DataStorageService;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kYWdsb2JhbC1uZy1zMy1hbmFseXRpY3MudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL25nLXMzLWFuYWx5dGljcy5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL25nLXMzLWFuYWx5dGljcy5jb21wb25lbnQudHMiLG51bGwsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudC50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi90eXBlcy9ldmVudC50eXBlcy50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9zZXJ2aWNlcy9lbnZpcm9ubWVudC9lbnZpcm9ubWVudC5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3NlcnZpY2VzL2FuYWx5dGljcy9oYW5kbGVDb25maWcudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvc2VydmljZXMvYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3NlcnZpY2VzL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZS50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9kaXJlY3RpdmVzL2J1dHRvbi9idXR0b24uZGlyZWN0aXZlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL2RpcmVjdGl2ZXMvc2Nyb2xsL3Njcm9sbC5kaXJlY3RpdmUudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvZGlyZWN0aXZlcy9idXR0b24taG92ZXIvYnV0dG9uLWhvdmVyLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9zZXJ2aWNlcy9yb3V0ZXIvcm91dGVyLnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvc2VydmljZXMvcG9pbnRlci9wb2ludGVyLnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvc2VydmljZXMvZXJyb3ItaGFuZGxlci9lcnJvckhhbmRsZXIuc2VydmljZS50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9kaXJlY3RpdmVzL2tleS1zdHJva2Uva2V5LXN0cm9rZS5kaXJlY3RpdmUudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvbmctczMtYW5hbHl0aWNzLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5nUzNBbmFseXRpY3NTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLW5nLXMzLWFuYWx5dGljcycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHA+XG4gICAgICBuZy1zMy1hbmFseXRpY3Mgd29ya3MhXG4gICAgPC9wPlxuICBgLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIE5nUzNBbmFseXRpY3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgcHJpdmF0ZU1hcCkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIGdldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcml2YXRlTWFwLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwLCB2YWx1ZSkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIHNldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHByaXZhdGVNYXAuc2V0KHJlY2VpdmVyLCB2YWx1ZSk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuIiwiZXhwb3J0IGxldCBlbnZpcm9ubWVudCA9IHtcbiAgICBkYXRhQ29sbGVjdGlvbkFwaTogJ2h0dHBzOi8vMXhnZjVhMmJxMi5leGVjdXRlLWFwaS5hcC1zb3V0aC0xLmFtYXpvbmF3cy5jb20vZGV2LycsXG4gICAgaXNQYWdlTG9hZGluZ1RvQmVEZXRlY3RlZDogdHJ1ZSxcbiAgICByZW1vdGVDb25maWdBcGk6ICcnLFxuICAgIGlnbm9yZVVybHM6IFtdLFxuICAgIGlnbm9yZUNzc1J1bGVzOiBbXSxcbiAgICBzaG93Q29uc2VudDogZmFsc2UsXG4gICAgY29uc2VudENvbnRlbnQ6ICdXZSB1c2UgY29va2llcyB0byBlbnN1cmUgdGhhdCB3ZSBwcm92aWRlIHlvdSB3aXRoIHRoZSBiZXN0IHBvc3NpYmxlIGV4cGVyaWVuY2Ugb24gb3VyIHdlYnNpdGUuSWYgeW91IGNvbnRpbnVlIHRvIHVzZSBvdXIgc2l0ZSwgd2UgYXNzdW1lIHlvdSBhY2NlcHQgb3VyIHVzZSBvZiBjb29raWVzLiBQcml2YWN5IFBvbGljeScsXG4gICAgZGlzYWJsZVRyYWNraW5nOiBmYWxzZSxcbiAgICBpZ25vcmVJUFJhbmdlczogJycsXG4gICAgaWdub3JlRG9tYWluczogW10sXG4gICAgZGlzYWJsZURlbW9ncmFwaGljSW5mbzogZmFsc2Vcbn07XG5cblxuIiwiZXhwb3J0IGVudW0gRXZlbnRMYWJlbHMge1xuICAgIFBBR0VfTE9BRCA9ICdQQUdFX0xPQUQnLFxuICAgIE1PVVNFX0hPVkVSID0gJ01PVVNFX0hPVkVSJyxcbiAgICBCVVRUT05fQ0xJQ0sgPSAnQlVUVE9OX0NMSUNLJyxcbiAgICBNT1VTRV9NT1ZFID0gJ01PVVNFX01PVkUnLFxuICAgIFNDUk9MTCA9ICdTQ1JPTEwnLFxuICAgIENPTlNPTEVfRVJST1IgPSAnQ09OU09MRV9FUlJPUicsXG4gICAgS0VZX1NUUk9LRSA9ICdLRVlfU1RST0tFJ1xufVxuXG5leHBvcnQgZW51bSBDb25zdGFudHMge1xuICAgIERFTU9HUkFQSElDX0lORk8gPSAnZGVtb2dyYXBoaWMtaW5mbycsXG4gICAgU0VTU0lPTl9JRCA9ICduZ1MzQW5hbHl0aWNzU2Vzc2lvbklkJyxcbiAgICBERU1PR1JBUEhJQ19BUElfVVJMID0gJ2h0dHBzOi8vaXBhcGkuY28vanNvbi8nXG59XG5cblxuZXhwb3J0IGNsYXNzIEtleVN0cm9rZUV2ZW50VHlwZSB7XG4gICAga2V5OiBzdHJpbmc7IC8vIHByZXNzZWQgS2V5XG4gICAga2V5Q29kZTogc3RyaW5nOyAvLyBwcmVzc2VkIEtleSBDb2RlXG4gICAgZWxlbWVudElkOiBzdHJpbmc7IC8vIElkIG9mIGVsZW1lbnRcbiAgICBpc0Zvcm06IGJvb2xlYW47IC8vIGlzIGl0IGEgZm9ybVxuICAgIGZvcm06IHN0cmluZztcbiAgICB0YWdOYW1lOiBzdHJpbmc7IC8vIHRhZ05hbWUgb2YgZWxlbWVudFxuICAgIGh0bWxFbGVtZW50VHlwZTogc3RyaW5nOyAvLyB0eXBlIG9mIGVsZW1lbnRcbiAgICB2YWx1ZTogc3RyaW5nOyAvLyBwcmV2aW91cyB2YWx1ZSBvZiB0aGUgZWxlbWVudFxuICAgIGNvZGU6IHN0cmluZzsgLy8gUHJlc3NlZCBrZXkgbGFiZWxcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmtleSA9ICcnO1xuICAgICAgICB0aGlzLmtleUNvZGUgPSAnJztcbiAgICAgICAgdGhpcy5lbGVtZW50SWQgPSAnJztcbiAgICAgICAgdGhpcy5pc0Zvcm0gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mb3JtID0gJyc7XG4gICAgICAgIHRoaXMudGFnTmFtZSA9ICcnO1xuICAgICAgICB0aGlzLmh0bWxFbGVtZW50VHlwZSA9ICcnO1xuICAgICAgICB0aGlzLnZhbHVlID0gJyc7XG4gICAgICAgIHRoaXMuY29kZSA9ICcnO1xuICAgIH1cbn1cbiIsIlxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudCc7XG5pbXBvcnQgeyBDb25maWd1cmF0aW9uLCBQbHVnaW5Db25maWcgfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuXG5leHBvcnQgY2xhc3MgRW52aXJvbm1lbnRTZXJ2aWNlIHtcbiAgZW52Q29uZmlnOiBhbnkgPSBuZXcgU3ViamVjdDxQbHVnaW5Db25maWc+KCk7XG5cbiAgLy8gU2V0dGluZyBDb25maWd1cmF0aW9uIG9uIGVudmlyb25tZW50XG4gIHNldENvbmZpZ3VyYXRpb25Ub0Vudmlyb25tZW50KGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb24sIGlzUGFnZUxvYWRpbmdUb0JlRGV0ZWN0ZWQ6IGJvb2xlYW4pIHtcbiAgICBlbnZpcm9ubWVudC5kYXRhQ29sbGVjdGlvbkFwaSA9IGNvbmZpZ3VyYXRpb24uZGF0YUNvbGxlY3Rpb25BcGk7XG4gICAgZW52aXJvbm1lbnQuaXNQYWdlTG9hZGluZ1RvQmVEZXRlY3RlZCA9IGlzUGFnZUxvYWRpbmdUb0JlRGV0ZWN0ZWQ7XG4gICAgZW52aXJvbm1lbnQucmVtb3RlQ29uZmlnQXBpID0gY29uZmlndXJhdGlvbi5yZW1vdGVDb25maWdBcGk7XG4gICAgdGhpcy5lbnZDb25maWcubmV4dChlbnZpcm9ubWVudCk7XG4gICAgdGhpcy5lbnZDb25maWcuY29tcGxldGUoKTtcbiAgfVxuXG4gIGdldEVudk9ic2VydmFibGUoKSB7XG4gICAgY29uc29sZS5sb2coJ2NhbGxpbmcgaGVyZScsIHRoaXMuZW52Q29uZmlnKTtcbiAgICByZXR1cm4gdGhpcy5lbnZDb25maWc7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudCc7XG5pbXBvcnQgeyBQbHVnaW5Db25maWcsIEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBFbnZpcm9ubWVudFNlcnZpY2UgfSBmcm9tICcuLi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcbmltcG9ydCB7IENvb2tpZVNlcnZpY2UgfSBmcm9tICduZ3gtY29va2llLXNlcnZpY2UnO1xuXG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgUGx1Z2luQ29uZmlnU2VydmljZSB7XG4gICAgcmVtb3RlUGx1Z2luQ29uZmlnOiBQbHVnaW5Db25maWc7XG4gICAgZGVtb2dyYXBoaWNJbmZvOiBhbnk7XG4gICAgLyoqIENvbnN0YW50cyAqL1xuICAgIGNvbnN0YW50cyA9IENvbnN0YW50cztcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBodHRwQ2xpZW50OiBIdHRwQ2xpZW50LFxuICAgICAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgcHJpdmF0ZSBjb29raWVTZXJ2aWNlOiBDb29raWVTZXJ2aWNlKSB7XG5cbiAgICB9XG5cbiAgICBnZXRFbnZpcm9ubWVudENvbmZpZygpIHtcbiAgICAgICAgY29uc3QgZW52ID0gdGhpcy5pbmplY3Rvci5nZXQoRW52aXJvbm1lbnRTZXJ2aWNlKTtcbiAgICAgICAgZW52LmdldEVudk9ic2VydmFibGUoKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZldGNoUmVtb3RlQ29uZmlnKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcHVibGljIGZldGNoUmVtb3RlQ29uZmlnKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnZmV0Y2ggY29uZmlndXJhdGlvbiBjYWxsZWQnLCBlbnZpcm9ubWVudCwgZW52aXJvbm1lbnQucmVtb3RlQ29uZmlnQXBpKTtcbiAgICAgICAgdGhpcy5odHRwQ2xpZW50LmdldChlbnZpcm9ubWVudC5yZW1vdGVDb25maWdBcGkpLnBpcGUoXG4gICAgICAgICAgICB0YXAoZGF0YSA9PiBjb25zb2xlLmxvZyhkYXRhKSlcbiAgICAgICAgKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICByZXMgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnID0gcmVzWydib2R5J107XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2dldHRpbmcgY29uZmlndXJhdGlvbicsIHJlcywgdGhpcy5yZW1vdGVQbHVnaW5Db25maWcpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZy5zaG93Q29uc2VudCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5yZW1vdGVQbHVnaW5Db25maWcuY29uc2VudENvbnRlbnQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdGVQbHVnaW5Db25maWcuY29uc2VudENvbnRlbnQgOiBlbnZpcm9ubWVudC5jb25zZW50Q29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja1Nob3dDb25zZW50KGNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2NvbGxlY3Rpb24gZXJyb3InLCBlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGhhbmRsZUNvbmZpZ3VyYXRpb24oYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbik6IGJvb2xlYW4ge1xuICAgICAgICBjb25zb2xlLmxvZyhhbmFseXRpY3NCZWFuKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tEaXNhYmxlVHJhY2tpbmcoKSAmJlxuICAgICAgICAgICAgdGhpcy5jaGVja0RvbWFpbihhbmFseXRpY3NCZWFuLmZ1bGxVUkwpICYmXG4gICAgICAgICAgICB0aGlzLmNoZWNrSXBSYW5nZShhbmFseXRpY3NCZWFuLmRlbW9ncmFwaGljSW5mb1snaXAnXSk7XG5cbiAgICB9XG5cbiAgICBjaGVja0Rpc2FibGVUcmFja2luZygpIHtcbiAgICAgICAgaWYgKHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnKSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMucmVtb3RlUGx1Z2luQ29uZmlnLmRpc2FibGVUcmFja2luZztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hlY2tEb21haW4oZnVsbFVybDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZyAmJiB0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZy5pZ25vcmVEb21haW5zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiAhKHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnLmlnbm9yZURvbWFpbnMuZmlsdGVyKGRvbWFpbiA9PiBmdWxsVXJsLmluZGV4T2YoZG9tYWluKSA+PSAwKS5sZW5ndGggPiAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbW92ZUNoZWNrVXJscyh0cmFja2VkT2JqZWN0czogQXJyYXk8QW5hbHl0aWNzQmVhbj4pOiBBcnJheTxBbmFseXRpY3NCZWFuPiB7XG4gICAgICAgIGlmICh0cmFja2VkT2JqZWN0cyAmJiB0cmFja2VkT2JqZWN0cy5sZW5ndGggPiAwICYmIHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJhY2tlZE9iamVjdHMubWFwKGFuYWx5dGljcyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCEodGhpcy5yZW1vdGVQbHVnaW5Db25maWcuaWdub3JlVXJscy5maWx0ZXIodXJsID0+IGFuYWx5dGljcy5ldmVudENvbXBvbmVudC5pbmRleE9mKHVybCkgPj0gMCkubGVuZ3RoID4gMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFuYWx5dGljcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5maWx0ZXIob2JqZWN0ID0+IG9iamVjdCAhPT0gdW5kZWZpbmVkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cmFja2VkT2JqZWN0cztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgKiBJUCByYW5nZSByZXN0cmljdGlvbiBhZGRlZFxuICAgKiBAcmVzdHJpY3RJUFJhbmdlIGlzIGEgcmVnZXhcbiAgICogaWYgQHJlc3RyaWN0SVBSYW5nZSBpcyBtYXRjaCB3aXRoIGN1cnJlbnQgSVAsXG4gICAqIHRoZSBhbmFseXRpY3MgZGF0YSB3aWxsIGJlIHJlc3RyaWN0ZWRcbiAgICovXG4gICAgcHJpdmF0ZSBjaGVja0lwUmFuZ2UoaXA6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoaXAgJiYgdGhpcy5yZW1vdGVQbHVnaW5Db25maWcpIHtcbiAgICAgICAgICAgIGNvbnN0IGlwUmFuZ2UgPSB0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZy5pZ25vcmVJUFJhbmdlcztcbiAgICAgICAgICAgIHJldHVybiBpcC5tYXRjaChpcFJhbmdlKSA/IGZhbHNlIDogdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICogU2V0IHVzZXIgZGVtb2dyYXBoaWMgaW5mb3JtYXRpb24gaW4gY29va2llc1xuICAqL1xuICAgIHByaXZhdGUgYXN5bmMgZ2V0SXAoKSB7XG4gICAgICAgIHRoaXMuZGVtb2dyYXBoaWNJbmZvID0gYXdhaXQgdGhpcy5odHRwQ2xpZW50LmdldCh0aGlzLmNvbnN0YW50cy5ERU1PR1JBUEhJQ19BUElfVVJMKTtcbiAgICAgICAgdGhpcy5jb29raWVTZXJ2aWNlLnNldChcbiAgICAgICAgICAgIHRoaXMuY29uc3RhbnRzLkRFTU9HUkFQSElDX0lORk8sXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh0aGlzLmRlbW9ncmFwaGljSW5mbyksXG4gICAgICAgICAgICBuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSArICgxMDAwICogNjAgKiA2MCAqIDI0KSkpO1xuICAgICAgICByZXR1cm4gdGhpcy5kZW1vZ3JhcGhpY0luZm87XG4gICAgfVxuXG5cbiAgICBzZXREZW1vZ3JhcGhpY0luZm8oKSB7XG4gICAgICAgIGlmICghdGhpcy5jb29raWVTZXJ2aWNlLmNoZWNrKHRoaXMuY29uc3RhbnRzLkRFTU9HUkFQSElDX0lORk8pKSB7XG4gICAgICAgICAgICB0aGlzLmdldElwKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRlbW9ncmFwaGljSW5mbyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRlbW9ncmFwaGljSW5mbyA9IEpTT04ucGFyc2UodGhpcy5jb29raWVTZXJ2aWNlLmdldCh0aGlzLmNvbnN0YW50cy5ERU1PR1JBUEhJQ19JTkZPKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZGVtb2dyYXBoaWNJbmZvO1xuICAgIH1cblxuICAgIGdldERlbW9ncmFwaGljSW5mbygpIHtcbiAgICAgICAgaWYgKHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnICYmIHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnLmRpc2FibGVEZW1vZ3JhcGhpY0luZm8pIHtcbiAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldERlbW9ncmFwaGljSW5mbygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hlY2tTaG93Q29uc2VudChjb250ZW50OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgZGl2RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGl2RWwuY2xhc3NMaXN0LmFkZCgnY29uc2VudC13cmFwcGVyJyk7XG4gICAgICAgIGRpdkVsLnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICAgICAgZGl2RWwuc3R5bGUuYm90dG9tID0gJzAnO1xuICAgICAgICBkaXZFbC5zdHlsZS5sZWZ0ID0gJzAnO1xuICAgICAgICBkaXZFbC5zdHlsZS5yaWdodCA9ICcwJztcbiAgICAgICAgZGl2RWwuc3R5bGUucGFkZGluZyA9ICcxNXB4JztcbiAgICAgICAgZGl2RWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyMzMzY2ZmYnO1xuICAgICAgICBkaXZFbC5zdHlsZS5jb2xvciA9ICcjZmZmJztcbiAgICAgICAgZGl2RWwuc3R5bGUuZm9udFNpemUgPSAnMTJweCc7XG4gICAgICAgIGRpdkVsLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICBjb25zdCB0ZXh0RWwgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjb250ZW50KTtcbiAgICAgICAgZGl2RWwuYXBwZW5kQ2hpbGQodGV4dEVsKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXZFbCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudCc7XG5pbXBvcnQgKiBhcyB1dWlkIGZyb20gJ3V1aWQnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiwgUGVyZm9ybWFuY2VCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgQ29va2llU2VydmljZSB9IGZyb20gJ25neC1jb29raWUtc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEV2ZW50TGFiZWxzLCBLZXlTdHJva2VFdmVudFR5cGUsIENvbnN0YW50cyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcbmltcG9ydCB7IFBsdWdpbkNvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2hhbmRsZUNvbmZpZyc7XG4vKipcbiAqIEFuYWx5dGljcyBTZXJ2aWNlXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEFuYWx5dGljc1NlcnZpY2Uge1xuXG4gIC8qKiBTZXNzaW9uSWQgb2YgcGx1Z2luICovXG4gIHNlc3Npb25JZDogc3RyaW5nO1xuICAvKiogRGVtb2dyYXBoaWMgaW5mbyAqL1xuICBkZW1vZ3JhcGhpY0luZm86IGFueSA9IHt9O1xuICAvKiogRXZlbnQgbGFiZWwgY29uc3RhbnRzICovXG4gIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG4gIC8qKiBDb25zdGFudHMgKi9cbiAgY29uc3RhbnRzID0gQ29uc3RhbnRzO1xuXG4gIC8qKlxuICAgKiBBbmFseXRpY3MgU2VydmljZSBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gY29va2llU2VydmljZVxuICAgKiBAcGFyYW0gaHR0cFNlcnZpY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29va2llU2VydmljZTogQ29va2llU2VydmljZSxcbiAgICBwcml2YXRlIGh0dHBTZXJ2aWNlOiBIdHRwQ2xpZW50LFxuICAgIHByaXZhdGUgcGx1Z2luQ29uZmlnOiBQbHVnaW5Db25maWdTZXJ2aWNlKSB7XG4gICAgdGhpcy5wbHVnaW5Db25maWcuZ2V0RW52aXJvbm1lbnRDb25maWcoKTtcbiAgICB0aGlzLnNldFNlc3Npb25JZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNraW5nIHdoZXRoZXIgc2Vzc2lvbklkIHByZXNlbnQgaW4gY29va2llIG9yIG5vdFxuICAgKiBpZiBubyBzZXNzaW9uIGlkIGNvb2tpZSBwcmVzZW50LCBhZGRpbmcgbmV3IHNlc3Npb24gaWQgb3RoZXJ3aXNlIHJldXNpbmcgdGhlIHNlc3Npb24gaWQgdmFsdWVcbiAgICovXG4gIHByaXZhdGUgc2V0U2Vzc2lvbklkKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvb2tpZVNlcnZpY2UuZ2V0KHRoaXMuY29uc3RhbnRzLlNFU1NJT05fSUQpKSB7XG4gICAgICB0aGlzLnNlc3Npb25JZCA9IHRoaXMuY29va2llU2VydmljZS5nZXQodGhpcy5jb25zdGFudHMuU0VTU0lPTl9JRCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2Vzc2lvbklkID0gdXVpZC52NCgpO1xuICAgICAgdGhpcy5jb29raWVTZXJ2aWNlLnNldCh0aGlzLmNvbnN0YW50cy5TRVNTSU9OX0lELCB0aGlzLnNlc3Npb25JZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNraW5nIHRoZSBJUCByYW5nZSB0byBiZSByZXN0cmljdFxuICAgKiBAcGFyYW0gZGF0YSAtIGRhdGEgdG8gYmUgcHVzaGVkXG4gICAqL1xuICBwdWJsaWMgcHVzaERhdGEoZGF0YTogYW55KTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGx1Z2luQ29uZmlnLmhhbmRsZUNvbmZpZ3VyYXRpb24oZGF0YS5ldmVudFZhbHVlc1swXSkpIHtcbiAgICAgIGNvbnN0IGFuYWx5dGljc09iamVjdExpc3QgPSB0aGlzLnBsdWdpbkNvbmZpZy5yZW1vdmVDaGVja1VybHMoZGF0YS5ldmVudFZhbHVlcyk7XG4gICAgICB0aGlzLnB1Ymxpc2hUT0F1dGhTMyhhbmFseXRpY3NPYmplY3RMaXN0KTtcbiAgICB9XG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIENvbnZlcnRpbmcgSlNPTiBBcnJheSB0byBzdHJpbmdcbiAgICogQHBhcmFtIGRhdGFcbiAgICovXG4gIHByaXZhdGUgcHJvY2Vzc0ZvckF0aGVuYShkYXRhOiBBcnJheTxBbmFseXRpY3NCZWFuPik6IHN0cmluZyB7XG4gICAgaWYgKGRhdGEgJiYgZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gZGF0YS5tYXAoKG9iamVjdDogYW55KSA9PiB7XG4gICAgICAgIG9iamVjdFsnc2Vzc2lvbklkJ10gPSB0aGlzLnNlc3Npb25JZDtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iamVjdCk7XG4gICAgICB9KS5qb2luKCdcXG4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgICogUHJlcGFyaW5nIGRhdGEgdG8gYmUgcHVzaGVkIHRvIERhdGFTdG9yYWdlXG4gICAgKiBAcGFyYW0gZGF0YSAgZGF0YSB0byBiZSBwdXNoZWRcbiAgICAqL1xuICBwcml2YXRlIHB1Ymxpc2hUT0F1dGhTMyhkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBmaWxlbmFtZSA9IGAke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdfV8ke3RoaXMuc2Vzc2lvbklkfV8ke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKX0uanNvbmA7XG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG4gICAgdGhpcy5wdXNoRGF0YVRvUzMoZmlsZW5hbWUsIHRoaXMucHJvY2Vzc0ZvckF0aGVuYShkYXRhLmV2ZW50VmFsdWVzKSwgaGVhZGVycyk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBQdXNoaW5nIGRhdGEgdG8gY29ycmVzcG9uZGluZyBidWNrZXQgdXNpbmcgZGF0YSBjb2xsZWN0aW9uIGFwaVxuICAgKiBAcGFyYW0gcGF0aCAtIHNlcnZpY2UgcGF0aFxuICAgKiBAcGFyYW0gZGF0YSAtIGRhdGEgdG8gYmUgcHVzaGVkXG4gICAqL1xuICBwcml2YXRlIHB1c2hEYXRhVG9TMyhwYXRoOiBzdHJpbmcsIGRhdGE6IGFueSwgaGVhZGVyczogSHR0cEhlYWRlcnMpOiB2b2lkIHtcbiAgICBjb25zdCB1cmwgPSBgJHtlbnZpcm9ubWVudC5kYXRhQ29sbGVjdGlvbkFwaX0ke3BhdGh9YDtcblxuICAgIHRoaXMuaHR0cFNlcnZpY2UucHV0KHVybCwgZGF0YSwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pLnN1YnNjcmliZShyZXMgPT4geyB9LCBlcnIgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYXZlIHRoZSBjYXB0dXJlZCBIVE1MIHRvIHRoZSBkYXRhIGNvbGxlY3Rpb25cbiAgICogQHBhcmFtIGh0bWxUZW1wbGF0ZSAtIERPTSBDb250ZW50XG4gICAqIEBwYXJhbSBzY3JlZW5zaG90TmFtZSAtIGZpbGVuYW1lIHRvIGJlIHNhdmVkXG4gICAqL1xuICBwdWJsaWMgc2F2ZVNjcmVlbnNob3RzSW5TMyhodG1sVGVtcGxhdGU6IHN0cmluZywgc2NyZWVuc2hvdE5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBsdWdpbkNvbmZpZy5jaGVja0Rpc2FibGVUcmFja2luZygpKSB7XG4gICAgICBjb25zdCBmaWxlbmFtZSA9IGBhc3NldHMvJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXX0vJHt0aGlzLnNlc3Npb25JZH0vJHtzY3JlZW5zaG90TmFtZX0uaHRtbGA7XG4gICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICd0ZXh0L2h0bWwnIH0pO1xuICAgICAgdGhpcy5wdXNoRGF0YVRvUzMoZmlsZW5hbWUsIGh0bWxUZW1wbGF0ZSwgaGVhZGVycyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFB1c2hpbmcgY29uc29sZSBlcnJvcnMgdG8gUzMgYnVja2V0XG4gICAqIEBwYXJhbSBkYXRhIFxuICAgKi9cbiAgcHVibGljIHB1Ymxpc2hDb25zb2xlRXJyb3JzKGRhdGE6IGFueSk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBsdWdpbkNvbmZpZy5jaGVja0Rpc2FibGVUcmFja2luZygpKSB7XG4gICAgICBkYXRhWydzZXNzaW9uSWQnXSA9IHRoaXMuc2Vzc2lvbklkO1xuICAgICAgY29uc3QgZmlsZW5hbWUgPSBgJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXX1fJHt0aGlzLnNlc3Npb25JZH1fY29uc29sZV9lcnJvcnNfJHtuZXcgRGF0ZSgpLmdldFRpbWUoKX0uanNvbmA7XG4gICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcbiAgICAgIHRoaXMucHVzaERhdGFUb1MzKGZpbGVuYW1lLCBkYXRhLCBoZWFkZXJzKTtcbiAgICB9XG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIFNldHRpbmcgYW5hbHl0aWNzIG9iamVjdCB0byBiZSBzYXZlZCBpbiBTMyBidWNrZXRcbiAgICogQHBhcmFtIHVzZXJEYXRhIC0gRGF0YSB0cmFuc2ZlcnJlZCB0byBFdmVudCBEaXJlY3RpdmVcbiAgICogQHBhcmFtIGV2ZW50RGV0YWlscyAtIFBvc2l0aW9uIG9mIGV2ZW50c1xuICAgKiBAcGFyYW0gZXZlbnROYW1lICAtIFR5cGUgb2YgZXZlbnRcbiAgICogQHBhcmFtIHNjcmVlbnNob3ROYW1lICAtIGZpbGUgbmFtZSBvZiBzYXZlZCBzY3JlZW5zaG90IGlmIHRoZSBldmVudCBpcyBQYWdlTG9hZGVkXG4gICAqL1xuICBwdWJsaWMgc2V0QW5hbHl0aWNzRGF0YShcbiAgICB1c2VyRGF0YTogYW55ID0ge30sXG4gICAgZXZlbnREZXRhaWxzOiBhbnksXG4gICAgZXZlbnROYW1lOiBzdHJpbmcsXG4gICAgc2NyZWVuc2hvdE5hbWU6IHN0cmluZyxcbiAgICBvcHRpb25hbD86IHtcbiAgICAgIGV2ZW50Q29tcG9uZW50Pzogc3RyaW5nLFxuICAgICAga2V5U3Ryb2tlRGF0YT86IEtleVN0cm9rZUV2ZW50VHlwZSxcbiAgICAgIGNvbnNvbGVFcnJvcnM/OiBzdHJpbmdcbiAgICB9KTogQW5hbHl0aWNzQmVhbiB7XG4gICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9IHtcbiAgICAgIGV2ZW50TGFiZWw6IGV2ZW50TmFtZSxcbiAgICAgIGV2ZW50Q29tcG9uZW50OiBvcHRpb25hbCAmJiBvcHRpb25hbC5ldmVudENvbXBvbmVudCA/IG9wdGlvbmFsLmV2ZW50Q29tcG9uZW50IDogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCc/JylbMF0sXG4gICAgICBicm93c2VyOiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCxcbiAgICAgIGZ1bGxVUkw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxuICAgICAgb3JpZ2luOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luLFxuICAgICAgcmVzb2x1dGlvbjogYCR7d2luZG93LmlubmVyV2lkdGh9eCR7d2luZG93LmlubmVySGVpZ2h0fWAsXG4gICAgICB4Q29vcmQ6IHRoaXMuZ2V0RXZlbnREZXRhaWxzKGV2ZW50RGV0YWlsc1snY2xpZW50WCddKSxcbiAgICAgIHlDb29yZDogdGhpcy5nZXRFdmVudERldGFpbHMoZXZlbnREZXRhaWxzWydjbGllbnRZJ10pLFxuICAgICAgcGFnZVhDb29yZDogd2luZG93LnBhZ2VYT2Zmc2V0LnRvU3RyaW5nKCkgfHwgJzAnLFxuICAgICAgcGFnZVlDb29yZDogd2luZG93LnBhZ2VZT2Zmc2V0LnRvU3RyaW5nKCkgfHwgJzAnLFxuICAgICAgZXZlbnRUaW1lOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICBzY3JlZW5zaG90OiBzY3JlZW5zaG90TmFtZSxcbiAgICAgIGFkZGl0aW9uYWxJbmZvOiB1c2VyRGF0YSxcbiAgICAgIGVycm9yczogKG9wdGlvbmFsICYmIG9wdGlvbmFsLmNvbnNvbGVFcnJvcnMpID8gb3B0aW9uYWwuY29uc29sZUVycm9ycyA6ICcnLFxuICAgICAgdXRtOiB0aGlzLmdldFVUTVBhcmFtZXRlcnMod2luZG93LmxvY2F0aW9uLmhyZWYpLFxuICAgICAgZGVtb2dyYXBoaWNJbmZvOiB0aGlzLnBsdWdpbkNvbmZpZy5nZXREZW1vZ3JhcGhpY0luZm8oKSxcbiAgICAgIGtleVN0cm9rZURhdGE6IChvcHRpb25hbCAmJiBvcHRpb25hbC5rZXlTdHJva2VEYXRhKSA/IG9wdGlvbmFsLmtleVN0cm9rZURhdGEgOiB0aGlzLmdldEVtcHR5S2V5U3Ryb2tlRGF0YSgpLFxuICAgICAgaHRtbEVsZW1lbnQ6IHRoaXMuZ2V0SHRtbEVsZW1lbnQoZXZlbnREZXRhaWxzWyd0YXJnZXQnXSksXG4gICAgICBwZXJmb3JtYW5jZTogdGhpcy5nZXRQZXJmb3JtYW5jZURldGFpbHMoKSxcbiAgICB9O1xuICAgIHJldHVybiBhbmFseXRpY3NCZWFuO1xuICB9XG5cbiAgLyoqXG4gICAqIEV2ZW50IGRldGFpbHNcbiAgICogQHBhcmFtIHZhbHVlIFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRFdmVudERldGFpbHModmFsdWU6IGFueSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZS50b1N0cmluZygpIDogJzAnO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBIVE1MIENvbnRlbnRcbiAgICogQHBhcmFtIHRhcmdldEVsZW1lbnQgLSB0YXJnZXQgZWxlbWVudFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRIdG1sRWxlbWVudCh0YXJnZXRFbGVtZW50OiBhbnkpOiBzdHJpbmcge1xuICAgIHJldHVybiB0YXJnZXRFbGVtZW50ICE9PSB1bmRlZmluZWQgPyB0YXJnZXRFbGVtZW50Wydpbm5lckhUTUwnXSA6ICcnO1xuICB9XG5cblxuICBwcml2YXRlIGdldEVtcHR5S2V5U3Ryb2tlRGF0YSgpOiBLZXlTdHJva2VFdmVudFR5cGUge1xuICAgIHJldHVybiB7XG4gICAgICBrZXk6ICcnLFxuICAgICAga2V5Q29kZTogJycsXG4gICAgICBjb2RlOiAnJyxcbiAgICAgIGVsZW1lbnRJZDogJycsXG4gICAgICBmb3JtOiAnJyxcbiAgICAgIGh0bWxFbGVtZW50VHlwZTogJycsXG4gICAgICBpc0Zvcm06IGZhbHNlLFxuICAgICAgdGFnTmFtZTogJycsXG4gICAgICB2YWx1ZTogJydcbiAgICB9O1xuICB9XG5cblxuICAvKipcbiAgICogUGVyZm9ybWFuY2UgZGV0YWlsc1xuICAgKi9cbiAgcHJpdmF0ZSBnZXRQZXJmb3JtYW5jZURldGFpbHMoKTogUGVyZm9ybWFuY2VCZWFuIHtcbiAgICBjb25zdCBwZXJmb3JtYW5jZSA9IHdpbmRvdy5wZXJmb3JtYW5jZTtcbiAgICByZXR1cm4ge1xuICAgICAgbmF2aWdhdGlvbjogcGVyZm9ybWFuY2UubmF2aWdhdGlvbixcbiAgICAgIHRpbWVPcmlnaW46IHBlcmZvcm1hbmNlLnRpbWVPcmlnaW4sXG4gICAgICB0aW1pbmc6IHBlcmZvcm1hbmNlLnRpbWluZ1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogTWVtb3J5IHVzYWdlIG9mIHRoZSBhcHBsaWNhdGlvbiBpcyBwcm92aWRlZCBieSBHb29nbGUgQ2hyb21lXG4gICAqIEBwYXJhbSB1c2VyQWdlbnQgLSBVc2VyIGFnZW50IHRvIGNoZWNrIHRoZSBicm93c2VyXG4gICAqL1xuICBwcml2YXRlIGdlTWVtb3J5VXNhZ2VJbmZvKHVzZXJBZ2VudDogYW55KSB7XG4gICAgY29uc3QgaXNDaHJvbWUgPSB1c2VyQWdlbnQuc3BsaXQoJ2Nocm9tZScpLmxlbmd0aCA+IDE7XG4gICAgY29uc3QgbWVtb3J5ID0gaXNDaHJvbWUgPyB3aW5kb3cucGVyZm9ybWFuY2VbJ21lbW9yeSddIDogJyc7XG4gICAgcmV0dXJuIG1lbW9yeTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXR0aW5nIFVUTSBQYXJhbWV0ZXJzIGJ5IHByb2Nlc3NpbmcgY3VycmVudCBwYWdlVVJMXG4gICAqIEBwYXJhbSB1cmwgLSBQYWdlIFVSTFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRVVE1QYXJhbWV0ZXJzKHVybDogc3RyaW5nKTogYW55IHtcbiAgICBjb25zdCB1dG1PYmplY3QgPSB7fTtcbiAgICBpZiAodXJsLmluY2x1ZGVzKCd1dG0nKSkge1xuICAgICAgY29uc3QgdXRtUGFyYW1zID0gdXJsLnNwbGl0KCc/JylbMV0uc3BsaXQoJyYnKTtcbiAgICAgIHV0bVBhcmFtcy5tYXAocGFyYW0gPT4ge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBwYXJhbS5zcGxpdCgnPScpO1xuICAgICAgICB1dG1PYmplY3RbcGFyYW1zWzBdXSA9IHBhcmFtc1sxXTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdXRtT2JqZWN0O1xuICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIERhdGFTdG9yYWdlU2VydmljZSB7XG5cbiAgYWxsRGF0YUFuYWx5dGljc0FycmF5OiBBcnJheTxhbnk+ID0gW107XG4gIGFsbERhdGFBbmFseXRpY3M6IHtcbiAgICBwYWdlVXJsOiBzdHJpbmcsXG4gICAgZXZlbnRWYWx1ZXM6IEFycmF5PGFueT5cbiAgfTtcbiAgcHJldmlvdXNVcmw6IHN0cmluZztcbiAga2V5czogQXJyYXk8YW55PiA9IFtdO1xuICBldmVudENvbGxlY3RvciA9IG5ldyBNYXAoKTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhbmFseXRpY2FsU2VydmljZTogQW5hbHl0aWNzU2VydmljZSwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7IH1cbiAgcHJpdmF0ZSByb3V0ZURldGFpbHM6IGFueSA9IFtdO1xuICBjb3VudCA9IDA7XG4gIHNldFVybEtleShkYXRhOiBzdHJpbmcpIHtcbiAgICBsZXQgZmxhZyA9IDA7XG4gICAgaWYgKHRoaXMucHJldmlvdXNVcmwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5ldmVudENvbGxlY3Rvci5zZXQoZGF0YSwgW10pO1xuICAgICAgdGhpcy5wcmV2aW91c1VybCA9IGRhdGEgfHwgJy8nO1xuICAgIH0gZWxzZSBpZiAoIShkYXRhID09PSB0aGlzLnByZXZpb3VzVXJsKSkge1xuICAgICAgZm9yIChjb25zdCBrZXkgb2YgQXJyYXkuZnJvbSh0aGlzLmV2ZW50Q29sbGVjdG9yLmtleXMoKSkpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gZGF0YSkge1xuICAgICAgICAgIGZsYWcgPSAxO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZmxhZyA9PT0gMCkge1xuICAgICAgICB0aGlzLmV2ZW50Q29sbGVjdG9yLnNldChkYXRhLCBbXSk7XG4gICAgICB9XG4gICAgICB0aGlzLnByZXZpb3VzVXJsID0gZGF0YTtcbiAgICB9XG4gIH1cbiAgYXBwZW5kVG9BbmFseXRpY3NBcnJheShkYXRhOiBBbmFseXRpY3NCZWFuKSB7XG4gICAgaWYgKHRoaXMucHJldmlvdXNVcmwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5zZXRVcmxLZXkoZGF0YS5ldmVudENvbXBvbmVudCk7XG4gICAgfVxuICAgIHRoaXMuZXZlbnRDb2xsZWN0b3IuZ2V0KHRoaXMucHJldmlvdXNVcmwpLnB1c2goZGF0YSk7XG4gIH1cblxuICBwdXNoRGF0YUFycmF5VG9TMygpIHtcbiAgICB0aGlzLmNvdW50Kys7XG4gICAgLy8gdGhpcy5hbGxEYXRhQW5hbHl0aWNzTWFwID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShBcnJheS5mcm9tKHRoaXMuZXZlbnRDb2xsZWN0b3Iua2V5cygpKSkpO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIEFycmF5LmZyb20odGhpcy5ldmVudENvbGxlY3Rvci5rZXlzKCkpKSB7XG4gICAgICB0aGlzLmFsbERhdGFBbmFseXRpY3MgPSB7XG4gICAgICAgIHBhZ2VVcmw6IGtleSxcbiAgICAgICAgZXZlbnRWYWx1ZXM6IEFycmF5LmZyb20odGhpcy5ldmVudENvbGxlY3Rvci5nZXQoa2V5KS52YWx1ZXMoKSlcbiAgICAgIH07XG4gICAgICB0aGlzLmtleXMucHVzaChrZXkpO1xuICAgICAgaWYgKHRoaXMuYWxsRGF0YUFuYWx5dGljcy5ldmVudFZhbHVlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuYW5hbHl0aWNhbFNlcnZpY2UucHVzaERhdGEodGhpcy5hbGxEYXRhQW5hbHl0aWNzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5ldmVudENvbGxlY3Rvci5jbGVhcigpO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIHRoaXMua2V5cykge1xuICAgICAgdGhpcy5ldmVudENvbGxlY3Rvci5zZXQoa2V5LCBbXSk7XG4gICAgfVxuICB9XG5cbiAgc2V0Um91dGVEZXRhaWxzKHJvdXRlRGV0YWlsczogYW55KSB7XG4gICAgdGhpcy5yb3V0ZURldGFpbHMgPSByb3V0ZURldGFpbHM7XG4gIH1cblxuICBnZXRSb3V0ZURldGFpbHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucm91dGVEZXRhaWxzO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlJztcbmltcG9ydCB7IEV2ZW50TGFiZWxzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuXG4vKipcbiAqIEJ1dHRvbiBEaXJlY3RpdmUgdG8gdHJhY2sgY2xpY2sgZXZlbnRcbiAqIFNlbGVjdG9yIGNhbiBiZSBhZGRlZCB0byBhbnkgSFRNTCBFbGVtZW50XG4gKi9cbkBEaXJlY3RpdmUoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRpcmVjdGl2ZS1zZWxlY3RvclxuICBzZWxlY3RvcjogJ1t0cmFjay1idG5dJ1xufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25EaXJlY3RpdmUge1xuXG4gIC8vIEdldHMgaW1wb3J0YW50IGRhdGEgYWJvdXQgdGhlIGJ1dHRvbiBleHBsaWNpdGx5IGZyb20gdGhlIGFwcGxpY2F0aW9uXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgndHJhY2stYnRuJykgZGF0YTogYW55ID0ge307XG4gIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG4gIGV2ZW50RGV0YWlsczogYW55O1xuXG4gIC8qKlxuICAgKiBCdXR0b24gVHJhY2tpbmcgLSBDb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gZGF0YVN0b3JhZ2UgLSBEYXRhU3RvcmFnZVNlcnZpY2VcbiAgICogQHBhcmFtIGFuYWx5dGljc1NlcnZpY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZSwgcHJpdmF0ZSBhbmFseXRpY3NTZXJ2aWNlOiBBbmFseXRpY3NTZXJ2aWNlKSB7IH1cblxuXG4gIC8qKlxuICAgKiAgTGlzdGVuIHRvIGJ1dHRvbiBjbGljayBhY3Rpb25zXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pIG9uQ2xpY2soJGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmV2ZW50RGV0YWlscyA9ICRldmVudDtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2VuZERhdGEoKTtcbiAgICB9LCAxMCk7XG4gIH1cblxuICAvKiogU2VuZGluZyBkYXRhIG9uIGJ1dHRvbiBjbGljayAqL1xuICBwdWJsaWMgc2VuZERhdGEoKTogdm9pZCB7XG4gICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9XG4gICAgICB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YSh0aGlzLmRhdGEsIHRoaXMuZXZlbnREZXRhaWxzLCB0aGlzLmV2ZW50TGFiZWxzLkJVVFRPTl9DTElDSywgJycpO1xuICAgIHRoaXMuZGF0YVN0b3JhZ2UuYXBwZW5kVG9BbmFseXRpY3NBcnJheShhbmFseXRpY3NCZWFuKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkNoYW5nZXMsIEhvc3RMaXN0ZW5lciwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBFdmVudExhYmVscyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcblxuQERpcmVjdGl2ZSh7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkaXJlY3RpdmUtc2VsZWN0b3JcbiAgICBzZWxlY3RvcjogJ1t0cmFjay1zY3JvbGxdJ1xufSlcbmV4cG9ydCBjbGFzcyBTY3JvbGxEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gICAgLy8gR2V0cyBpbXBvcnRhbnQgZGF0YSBhYm91dCB0aGUgY29tcG9uZW50IGV4cGxpY2l0bHkgZnJvbSB0aGUgYXBwbGljYXRpb25cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWlucHV0LXJlbmFtZVxuICAgIEBJbnB1dCgndHJhY2stc2Nyb2xsJykgZGF0YTogYW55ID0ge307XG4gICAgZXZlbnRMYWJlbHMgPSBFdmVudExhYmVscztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGFuYWx5dGljc1NlcnZpY2U6IEFuYWx5dGljc1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZVxuICAgICkgeyB9XG5cbiAgICAvLyBDYXB0dXJlIHRoZSBjaGFuZ2UgaW4gZGF0YVxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge1xuICAgICAgICB0aGlzLmRhdGEgPSBjaGFuZ2VzLmRhdGEuY3VycmVudFZhbHVlO1xuICAgIH1cblxuICAgIC8vIFRyaWdnZXJlZCB3aGVuIGFueSBzY3JvbGwgZXZlbnQgb2NjdXJzXG4gICAgQEhvc3RMaXN0ZW5lcignd2luZG93OnNjcm9sbCcsIFsnJGV2ZW50J10pIG9uU2Nyb2xsRXZlbnQoJGV2ZW50OiBhbnkpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlbmREYXRhKCRldmVudCk7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgc2VuZERhdGEoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgICAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID1cbiAgICAgICAgICAgIHRoaXMuYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKHRoaXMuZGF0YSwgZXZlbnQsIHRoaXMuZXZlbnRMYWJlbHMuU0NST0xMLCAnJyk7XG4gICAgICAgIHRoaXMuZGF0YVN0b3JhZ2UuYXBwZW5kVG9BbmFseXRpY3NBcnJheShhbmFseXRpY3NCZWFuKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9kYXRhLXN0b3JhZ2UvZGF0YS1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IEV2ZW50TGFiZWxzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdbdHJhY2stYnV0dG9uSG92ZXJdJ1xufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25Ib3ZlckRpcmVjdGl2ZSB7XG4gIC8qKiAqL1xuICBldmVudERldGFpbHM6IGFueTtcbiAgZXZlbnRMYWJlbHMgPSBFdmVudExhYmVscztcbiAgLy8gR2V0cyBpbXBvcnRhbnQgZGF0YSBhYm91dCB0aGUgYnV0dG9uIGV4cGxpY2l0bHkgZnJvbSB0aGUgYXBwbGljYXRpb25cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KCd0cmFjay1idXR0b25Ib3ZlcicpIGRhdGE6IGFueSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZSwgcHJpdmF0ZSBhbmFseXRpY3NTZXJ2aWNlOiBBbmFseXRpY3NTZXJ2aWNlKSB7IH1cblxuICAvLyBMaXN0ZW4gdG8gYnV0dG9uIGhvdmVyIGFjdGlvbnNcbiAgQEhvc3RMaXN0ZW5lcignbW91c2VvdmVyJywgWyckZXZlbnQnXSkgb25Nb3VzZU92ZXIoJGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmV2ZW50RGV0YWlscyA9ICRldmVudDtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2VuZERhdGEoKTtcbiAgICB9LCAxMCk7XG4gIH1cblxuICAvLyBTZW5kaW5nIGRhdGEgb24gYnV0dG9uIGhvdmVyXG4gIHB1YmxpYyBzZW5kRGF0YSgpOiB2b2lkIHtcbiAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID1cbiAgICAgIHRoaXMuYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKHRoaXMuZGF0YSwgdGhpcy5ldmVudERldGFpbHMsIHRoaXMuZXZlbnRMYWJlbHMuTU9VU0VfSE9WRVIsICcnKTtcbiAgICB0aGlzLmRhdGFTdG9yYWdlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkoYW5hbHl0aWNzQmVhbik7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkVuZCwgTmF2aWdhdGlvbkVycm9yIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBFdmVudExhYmVscyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcbmRlY2xhcmUgbGV0IG5nUzNBbmFseXRpY3NKUzogYW55O1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUm91dGVyU2VydmljZSB7XG4gIGFuYWx5dGljc0RhdGE6IEFuYWx5dGljc0JlYW47XG4gIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG4gIG5hdmlnYXRlT24gPSAnJztcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXM6IFJvdXRlciwgcHJpdmF0ZSBhbmFseXRpY3NTZXJ2aWNlOiBBbmFseXRpY3NTZXJ2aWNlLCBwcml2YXRlIGRhdGFTdG9yYWdlOiBEYXRhU3RvcmFnZVNlcnZpY2UpIHtcblxuICB9XG5cbiAgLyoqXG4gICAqIFRyYWNraW5nIHJvdXRlciBldmVudHNcbiAgICovXG4gIHB1YmxpYyB0cmFja1JvdXRlckV2ZW50cygpOiB2b2lkIHtcbiAgICAvKiogVHJpZ2dlcmVkIHdoZW4gY3VycmVudCBwYWdlIGlzIGxvYWRlZCAqL1xuICAgIHRoaXMucm91dGVzLmV2ZW50cy5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAvKiogVHJpZ2dlcmVkIHdoZW4gTmF2aWdhdGlvbkVuZCBldmVudCBvY2N1cnMgKi9cbiAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcbiAgICAgICAgaWYgKHRoaXMubmF2aWdhdGVPbiAhPT0gZXZlbnQudXJsKSB7XG4gICAgICAgICAgdGhpcy5hbmFseXRpY3NQdXNoRGF0YShldmVudCk7XG4gICAgICAgICAgdGhpcy5uYXZpZ2F0ZU9uID0gZXZlbnQudXJsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVycm9yKSB7XG4gICAgICAgIC8qKiBUcmlnZ2VyZWQgd2hlbiBOYXZpZ2F0aW9uRXJyb3IgZXZlbnQgb2NjdXJzICovXG4gICAgICAgIHRoaXMuYW5hbHl0aWNzUHVzaERhdGEoZXZlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFB1c2hpbmcgYW5hbHl0aWNzIGRhdGFcbiAgICogQHBhcmFtIGV2ZW50IC0gUm91dGVyIEV2ZW50XG4gICAqL1xuICBwdWJsaWMgYW5hbHl0aWNzUHVzaERhdGEoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHNjcmVlbnNob3ROYW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkudG9TdHJpbmcoKTtcbiAgICB0aGlzLmFuYWx5dGljc0RhdGEgPSB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YSh7fSwge30sIHRoaXMuZXZlbnRMYWJlbHMuUEFHRV9MT0FELCBgJHtzY3JlZW5zaG90TmFtZX0uaHRtbGAsXG4gICAgICB7IGV2ZW50Q29tcG9uZW50OiBldmVudC51cmwgfSk7XG4gICAgdGhpcy53YWl0VGlsbFBhZ2VMb2FkKHNjcmVlbnNob3ROYW1lKTtcbiAgICAvLyBEYXRhIGlzIHNlbmQgb25seSB3aGVuIHVzZXIgY29uZmlndXJlIHRoZSBwYWdlIGxvYWRpbmcgdG8gYmUgdHJ1ZVxuICAgIHRoaXMuZGF0YVN0b3JhZ2Uuc2V0VXJsS2V5KHRoaXMuYW5hbHl0aWNzRGF0YS5ldmVudENvbXBvbmVudCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmRhdGFTdG9yYWdlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkodGhpcy5hbmFseXRpY3NEYXRhKTtcbiAgICB9LCAwKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFdhaXRpbmcgZm9yIHBhZ2UgdG8gbG9hZCBjb21wbGV0ZWx5XG4gICAqIEBwYXJhbSBldmVudCBcbiAgICovXG4gIHdhaXRUaWxsUGFnZUxvYWQoc2NyZWVuc2hvdE5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IF9zZWxmID0gdGhpcztcbiAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICBfc2VsZi5jYXB0dXJlVGVtcGxhdGUoc2NyZWVuc2hvdE5hbWUpO1xuICAgICAgfVxuICAgIH0sIDEwMDApO1xuICB9XG5cbiAgLyoqXG4gICAqIENhcHR1cmUgdGVtcGxhdGUgb2YgbG9hZGVkIHZpZXdcbiAgICogQHBhcmFtIHNjcmVlbnNob3ROYW1lIC0gU2NyZWVuc2hvdCBpbWFnZVxuICAgKi9cbiAgY2FwdHVyZVRlbXBsYXRlKHNjcmVlbnNob3ROYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBmdWxsUGFnZUhUTUwgPSBuZ1MzQW5hbHl0aWNzSlMuY29uc3RydWN0SFRNTFBhZ2UoXG4gICAgICB0aGlzLnByb2Nlc3NSZWdleE9wZXJhdGlvbnMoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZCcpLmlubmVySFRNTCksXG4gICAgICB0aGlzLnByb2Nlc3NSZWdleE9wZXJhdGlvbnMoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmlubmVySFRNTClcbiAgICApO1xuICAgIHRoaXMuYW5hbHl0aWNzU2VydmljZS5zYXZlU2NyZWVuc2hvdHNJblMzKGZ1bGxQYWdlSFRNTCwgc2NyZWVuc2hvdE5hbWUpO1xuICB9XG5cblxuICBwcm9jZXNzUmVnZXhPcGVyYXRpb25zKHRleHQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG5nUzNBbmFseXRpY3NKUy5kb1JlZ2V4KHRleHQsIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbnB1dCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRXZlbnRMYWJlbHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFBvaW50ZXJTZXJ2aWNlIHtcblxuICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuICBldmVudERldGFpbHM6IGFueTtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KCd0cmFjay1wb2ludGVyJykgZGF0YTogYW55ID0ge307XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU3RvcmFnZTogRGF0YVN0b3JhZ2VTZXJ2aWNlLCBwcml2YXRlIGFuYWx5dGljc1NlcnZpY2U6IEFuYWx5dGljc1NlcnZpY2UpIHsgfVxuXG4gIC8qKlxuICAgKiBUcmFjayBNb3VzZSBNb3ZlbWVudFxuICAgKi9cbiAgdHJhY2tNb3VzZU1vdmVFdmVudCgpIHtcbiAgICBmcm9tRXZlbnQod2luZG93LCAnbW91c2Vtb3ZlJylcbiAgICAgIC5zdWJzY3JpYmUoKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5ldmVudERldGFpbHMgPSBlO1xuICAgICAgICB0aGlzLnNlbmREYXRhKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQdXNoaW5nIE1vdXNlIE1vdmUgZGV0YWlsc1xuICAgKi9cbiAgcHVibGljIHNlbmREYXRhKCk6IHZvaWQge1xuICAgIGNvbnN0IGFuYWx5dGljc0JlYW46IEFuYWx5dGljc0JlYW4gPVxuICAgICAgdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnNldEFuYWx5dGljc0RhdGEodGhpcy5kYXRhLCB0aGlzLmV2ZW50RGV0YWlscywgdGhpcy5ldmVudExhYmVscy5NT1VTRV9NT1ZFLCAnJyk7XG4gICAgdGhpcy5kYXRhU3RvcmFnZS5hcHBlbmRUb0FuYWx5dGljc0FycmF5KGFuYWx5dGljc0JlYW4pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IEVycm9ySGFuZGxlciwgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IEV2ZW50TGFiZWxzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHbG9iYWxFcnJvckhhbmRsZXIge1xuICAgIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICB9XG5cbiAgICB0cmFja0NvbnNvbGVFcnJvcnMoKSB7XG5cbiAgICAgICAgY29uc3QgYW5hbHl0aWNzU2VydmljZSA9IHRoaXMuaW5qZWN0b3IuZ2V0KEFuYWx5dGljc1NlcnZpY2UpO1xuICAgICAgICBjb25zdCBkYXRhU3RvcmFnZVNlcnZpY2UgPSB0aGlzLmluamVjdG9yLmdldChEYXRhU3RvcmFnZVNlcnZpY2UpO1xuICAgICAgICBpZiAod2luZG93LmNvbnNvbGUgJiYgY29uc29sZS5lcnJvcikge1xuICAgICAgICAgICAgY29uc3QgY29uc29sZUVycm9yRm5PYmplY3QgPSBjb25zb2xlLmVycm9yO1xuICAgICAgICAgICAgY29uc3QgX3NlbGYgPSB0aGlzO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvciA9IGZ1bmN0aW9uICguLi5lcnJvcjogYW55W10pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9jZXNzZWRFcnJvciA9IGVycm9yLm1hcChlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoZSkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbWF4LWxpbmUtbGVuZ3RoXG4gICAgICAgICAgICAgICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9IGFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YVxuICAgICAgICAgICAgICAgICAgICAoJycsIHt9LCBfc2VsZi5ldmVudExhYmVscy5DT05TT0xFX0VSUk9SLCAnJywgeyBjb25zb2xlRXJyb3JzOiBKU09OLnN0cmluZ2lmeShwcm9jZXNzZWRFcnJvcikgfSk7XG4gICAgICAgICAgICAgICAgZGF0YVN0b3JhZ2VTZXJ2aWNlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkoYW5hbHl0aWNzQmVhbik7XG4gICAgICAgICAgICAgICAgY29uc29sZUVycm9yRm5PYmplY3QuY2FsbChjb25zb2xlLCBlcnJvcik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIEVsZW1lbnRSZWYsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9kYXRhLXN0b3JhZ2UvZGF0YS1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgS2V5U3Ryb2tlRXZlbnRUeXBlLCBFdmVudExhYmVscyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgKiBhcyB1dWlkIGZyb20gJ3V1aWQnO1xuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudCc7XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGlyZWN0aXZlLXNlbGVjdG9yXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbdHJhY2sta2V5U3Ryb2tlXScgfSlcbmV4cG9ydCBjbGFzcyBLZXlTdHJva2VEaXJlY3RpdmUge1xuXG4gICAgLyoqIEV2ZW50IExhYmVscyBDb25zdGFudHMgKi9cbiAgICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuXG4gICAgLyoqXG4gICAgICogRGVwZW5kZW5jaWVzXG4gICAgICogQHBhcmFtIGRhdGFTdG9yYWdlXG4gICAgICogQHBhcmFtIGFuYWx5dGljc1NlcnZpY2VcbiAgICAgKiBAcGFyYW0gZWwgLSBFbGVtZW50IFJlZmVyZW5jZVxuICAgICAqIEBwYXJhbSByZW5kZXJlciAtIFJlbmRlcmVyXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBhbmFseXRpY3NTZXJ2aWNlOiBBbmFseXRpY3NTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaWYgSWQgZG9lc24ndCBiZWxvbmdzIHRvIHRoZSBlbGVtZW50LCB3aGljaCBpcyBiZWluZyB0cmFja2VkLFxuICAgICAgICAgKiBBZGRpbmcgYSBkeW5hbWljIElkXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoIXRoaXMuZWwubmF0aXZlRWxlbWVudC5pZCkge1xuICAgICAgICAgICAgY29uc3QgZHluYW1pY0lkID0gYGtleV9zdHJva2VfZWxlbWVudF8ke3V1aWQudjQoKX1gO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaWQnLCBkeW5hbWljSWQpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmFja2luZyBLZXkgcHJlc3MgZXZlbnRzIHVzaW5nIGhvc3QgbGlzdGVuZXJcbiAgICAgKiBHZW5lcmF0aW5nIGEgZGF0YSBiZWFuIGluIGEgc3BlY2lmaWVkIGZvcm1hdFxuICAgICAqIEBwYXJhbSAkZXZlbnQgLSBLZXlQcmVzcyBFdmVudFxuICAgICAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ2tleXByZXNzJywgWyckZXZlbnQnXSkgb25LZXlTdHJva2UoJGV2ZW50OiBhbnkpIHtcbiAgICAgICAgY29uc3Qga2V5U3Ryb2tlOiBLZXlTdHJva2VFdmVudFR5cGUgPSBuZXcgS2V5U3Ryb2tlRXZlbnRUeXBlKCk7XG4gICAgICAgIGlmICgkZXZlbnQudGFyZ2V0LnR5cGUgIT09ICdwYXNzd29yZCcgJiYgdGhpcy5jaGVja0NsYXNzTmFtZXMoJGV2ZW50LnRhcmdldC5jbGFzc0xpc3QpKSB7XG4gICAgICAgICAgICBrZXlTdHJva2UuZWxlbWVudElkID0gJGV2ZW50LnRhcmdldC5pZDtcbiAgICAgICAgICAgIGtleVN0cm9rZS5rZXkgPSAkZXZlbnQua2V5O1xuICAgICAgICAgICAga2V5U3Ryb2tlLmNvZGUgPSAkZXZlbnQuY29kZTtcbiAgICAgICAgICAgIGtleVN0cm9rZS5rZXlDb2RlID0gJGV2ZW50LmtleUNvZGUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGtleVN0cm9rZS5pc0Zvcm0gPSAkZXZlbnQudGFyZ2V0LmZvcm0gIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGtleVN0cm9rZS5mb3JtID0gJGV2ZW50LnRhcmdldC5mb3JtICE9PSB1bmRlZmluZWQgPyBKU09OLnN0cmluZ2lmeSgkZXZlbnQudGFyZ2V0LmZvcm0uZWxlbWVudHMpIDogJyc7XG4gICAgICAgICAgICBrZXlTdHJva2UudGFnTmFtZSA9ICRldmVudC50YXJnZXQudGFnTmFtZTtcbiAgICAgICAgICAgIGtleVN0cm9rZS5odG1sRWxlbWVudFR5cGUgPSAkZXZlbnQudGFyZ2V0LnR5cGU7XG4gICAgICAgICAgICBrZXlTdHJva2UudmFsdWUgPSAkZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgdGhpcy5zZW5kRGF0YShrZXlTdHJva2UsICRldmVudCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygna2V5c3Ryb2tlJywgJGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgY2hlY2tDbGFzc05hbWVzKGNsYXNzTGlzdDogQXJyYXk8c3RyaW5nPikge1xuICAgICAgICBjb25zdCBjbGFzc05hbWVzOiBBcnJheTxzdHJpbmc+ID0gWy4uLmNsYXNzTGlzdF0uY29uY2F0KGVudmlyb25tZW50Lmlnbm9yZUNzc1J1bGVzKTtcbiAgICAgICAgcmV0dXJuIFsuLi5uZXcgU2V0KGNsYXNzTmFtZXMpXS5sZW5ndGggPT09IGNsYXNzTmFtZXMubGVuZ3RoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmRpbmcgZGF0YVxuICAgICAqIEBwYXJhbSBrZXlTdHJva2UgLSBDYXB0dXJlZCBLZXlTdHJva2UgZGF0YVxuICAgICAqIEBwYXJhbSBldmVudERldGFpbHMgLSBLZXkgUHJlc3MgZXZlbnQgZGV0YWlsc1xuICAgICAqL1xuICAgIHByaXZhdGUgc2VuZERhdGEoa2V5U3Ryb2tlOiBLZXlTdHJva2VFdmVudFR5cGUsIGV2ZW50RGV0YWlsczogYW55KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGFuYWx5dGljc0JlYW46IEFuYWx5dGljc0JlYW4gPVxuICAgICAgICAgICAgdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnNldEFuYWx5dGljc0RhdGEoe30sXG4gICAgICAgICAgICAgICAgZXZlbnREZXRhaWxzLFxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRMYWJlbHMuS0VZX1NUUk9LRSwgJycsXG4gICAgICAgICAgICAgICAgeyBrZXlTdHJva2VEYXRhOiBrZXlTdHJva2UgfSk7XG4gICAgICAgIHRoaXMuZGF0YVN0b3JhZ2UuYXBwZW5kVG9BbmFseXRpY3NBcnJheShhbmFseXRpY3NCZWFuKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdTM0FuYWx5dGljc0NvbXBvbmVudCB9IGZyb20gJy4vbmctczMtYW5hbHl0aWNzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb25maWd1cmF0aW9uIH0gZnJvbSAnLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBCdXR0b25EaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvYnV0dG9uL2J1dHRvbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU2Nyb2xsRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3Njcm9sbC9zY3JvbGwuZGlyZWN0aXZlJztcbmltcG9ydCB7IEJ1dHRvbkhvdmVyRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2J1dHRvbi1ob3Zlci9idXR0b24taG92ZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IEVudmlyb25tZW50U2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZW52aXJvbm1lbnQvZW52aXJvbm1lbnQuc2VydmljZSc7XG5pbXBvcnQgeyBSb3V0ZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9yb3V0ZXIvcm91dGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgaW50ZXJ2YWwgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERhdGFTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uL2xpYi9zZXJ2aWNlcy9kYXRhLXN0b3JhZ2UvZGF0YS1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUG9pbnRlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3BvaW50ZXIvcG9pbnRlci5zZXJ2aWNlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgR2xvYmFsRXJyb3JIYW5kbGVyIH0gZnJvbSAnLi9zZXJ2aWNlcy9lcnJvci1oYW5kbGVyL2Vycm9ySGFuZGxlci5zZXJ2aWNlJztcbmltcG9ydCB7IENvb2tpZVNlcnZpY2UgfSBmcm9tICduZ3gtY29va2llLXNlcnZpY2UnO1xuaW1wb3J0IHsgS2V5U3Ryb2tlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2tleS1zdHJva2Uva2V5LXN0cm9rZS5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTmdTM0FuYWx5dGljc0NvbXBvbmVudCxcbiAgICBCdXR0b25EaXJlY3RpdmUsXG4gICAgU2Nyb2xsRGlyZWN0aXZlLFxuICAgIEJ1dHRvbkhvdmVyRGlyZWN0aXZlLFxuICAgIEtleVN0cm9rZURpcmVjdGl2ZVxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBEYXRhU3RvcmFnZVNlcnZpY2UsXG4gICAgRW52aXJvbm1lbnRTZXJ2aWNlLFxuICAgIFBvaW50ZXJTZXJ2aWNlLFxuICAgIENvb2tpZVNlcnZpY2UsXG4gICAgR2xvYmFsRXJyb3JIYW5kbGVyXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBOZ1MzQW5hbHl0aWNzQ29tcG9uZW50LFxuICAgIEJ1dHRvbkRpcmVjdGl2ZSxcbiAgICBTY3JvbGxEaXJlY3RpdmUsXG4gICAgQnV0dG9uSG92ZXJEaXJlY3RpdmUsXG4gICAgS2V5U3Ryb2tlRGlyZWN0aXZlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmdTM0FuYWx5dGljc01vZHVsZSB7XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZW52aXJvbm1lbnRTZXJ2aWNlID0gbmV3IEVudmlyb25tZW50U2VydmljZSgpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyU2VydmljZTogUm91dGVyU2VydmljZSxcbiAgICBwcml2YXRlIGRhdGFTdG9yYWdlOiBEYXRhU3RvcmFnZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBwb2ludGVyU2VydmljZTogUG9pbnRlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBlcnJvcmhhbmRsZXI6IEdsb2JhbEVycm9ySGFuZGxlcikge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCAoZSkgPT4ge1xuICAgICAgdGhpcy5kYXRhU3RvcmFnZS5wdXNoRGF0YUFycmF5VG9TMygpO1xuICAgIH0pO1xuICAgIGludGVydmFsKDEwMDAgKiAyKS5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICB0aGlzLmRhdGFTdG9yYWdlLnB1c2hEYXRhQXJyYXlUb1MzKCk7XG4gICAgfSk7XG4gICAgdGhpcy5wb2ludGVyU2VydmljZS50cmFja01vdXNlTW92ZUV2ZW50KCk7XG4gICAgdGhpcy5yb3V0ZXJTZXJ2aWNlLnRyYWNrUm91dGVyRXZlbnRzKCk7XG4gICAgdGhpcy5lcnJvcmhhbmRsZXIudHJhY2tDb25zb2xlRXJyb3JzKCk7XG4gIH1cbiAgLy8gQ29uZmlndXJpbmcgdGhlIGluaXRpYWwgc2V0dXAgZm9yIHMzIGJ1Y2tldCBhbmQgcGFnZSBsb2FkaW5nXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb24sIGlzUGFnZUxvYWRpbmdUb0JlRGV0ZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIHRoaXMuZW52aXJvbm1lbnRTZXJ2aWNlLnNldENvbmZpZ3VyYXRpb25Ub0Vudmlyb25tZW50KGNvbmZpZ3VyYXRpb24sIGlzUGFnZUxvYWRpbmdUb0JlRGV0ZWN0ZWQpO1xuICAgIC8vIEFzc2lnbmluZyB0aGUgY29uZmlndXJhdGlvbiB0byBlbnZpcm9ubWVudCB2YXJpYWJsZXNcbiAgfVxufVxuIl0sIm5hbWVzIjpbIkluamVjdGFibGUiLCJDb21wb25lbnQiLCJTdWJqZWN0IiwidGFwIiwiSHR0cENsaWVudCIsIkluamVjdG9yIiwiQ29va2llU2VydmljZSIsInV1aWQudjQiLCJIdHRwSGVhZGVycyIsInRzbGliXzEuX192YWx1ZXMiLCJEaXJlY3RpdmUiLCJJbnB1dCIsIkhvc3RMaXN0ZW5lciIsIk5hdmlnYXRpb25FbmQiLCJOYXZpZ2F0aW9uRXJyb3IiLCJSb3V0ZXIiLCJmcm9tRXZlbnQiLCJ0c2xpYl8xLl9fc3ByZWFkIiwiRWxlbWVudFJlZiIsIlJlbmRlcmVyMiIsImludGVydmFsIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJIdHRwQ2xpZW50TW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7UUFPRTtTQUFpQjs7b0JBTGxCQSxhQUFVLFNBQUM7d0JBQ1YsVUFBVSxFQUFFLE1BQU07cUJBQ25COzs7O21DQUpEO0tBUUM7Ozs7OztBQ1JEO1FBYUU7U0FBaUI7Ozs7UUFFakIseUNBQVE7OztZQUFSO2FBQ0M7O29CQWRGQyxZQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjt3QkFDL0IsUUFBUSxFQUFFLHVE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S0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJO3dCQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUM3SixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQzt3QkFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDeEMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUNULEtBQUssQ0FBQyxDQUFDO3dCQUFDLEtBQUssQ0FBQzs0QkFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDOzRCQUFDLE1BQU07d0JBQzlCLEtBQUssQ0FBQzs0QkFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7NEJBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO3dCQUN4RCxLQUFLLENBQUM7NEJBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDOzRCQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQUMsU0FBUzt3QkFDakQsS0FBSyxDQUFDOzRCQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDOzRCQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7NEJBQUMsU0FBUzt3QkFDakQ7NEJBQ0ksSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dDQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7Z0NBQUMsU0FBUzs2QkFBRTs0QkFDNUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0NBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQUMsTUFBTTs2QkFBRTs0QkFDdEYsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dDQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7Z0NBQUMsTUFBTTs2QkFBRTs0QkFDckUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0NBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0NBQUMsTUFBTTs2QkFBRTs0QkFDbkUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7NEJBQ3RCLENBQUMsQ0FBQyxJQUFJLENB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