import { Injectable, Directive, HostListener, Input, Injector, Component, NgModule, defineInjectable, inject, ElementRef, Renderer2, INJECTOR } from '@angular/core';
import { Subject, fromEvent, interval } from 'rxjs';
import { __spread, __awaiter, __generator, __values } from 'tslib';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { v4 } from 'uuid';
import { Router, NavigationEnd, NavigationError } from '@angular/router';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgS3AnalyticsService = /** @class */ (function () {
    function NgS3AnalyticsService() {
    }
    NgS3AnalyticsService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    NgS3AnalyticsService.ctorParameters = function () { return []; };
    /** @nocollapse */ NgS3AnalyticsService.ngInjectableDef = defineInjectable({ factory: function NgS3AnalyticsService_Factory() { return new NgS3AnalyticsService(); }, token: NgS3AnalyticsService, providedIn: "root" });
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
        { type: Component, args: [{
                    selector: 'lib-ng-s3-analytics',
                    template: "\n    <p>\n      ng-s3-analytics works!\n    </p>\n  ",
                    styles: []
                },] },
    ];
    NgS3AnalyticsComponent.ctorParameters = function () { return []; };
    return NgS3AnalyticsComponent;
}());

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
        this.envConfig = new Subject();
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
        return this.envConfig;
    };
    EnvironmentService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */ EnvironmentService.ngInjectableDef = defineInjectable({ factory: function EnvironmentService_Factory() { return new EnvironmentService(); }, token: EnvironmentService, providedIn: "root" });
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
        { type: Injectable, args: [{ providedIn: 'root' },] },
    ];
    PluginConfigService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: Injector },
        { type: CookieService }
    ]; };
    /** @nocollapse */ PluginConfigService.ngInjectableDef = defineInjectable({ factory: function PluginConfigService_Factory() { return new PluginConfigService(inject(HttpClient), inject(INJECTOR), inject(CookieService)); }, token: PluginConfigService, providedIn: "root" });
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
    function AnalyticsService(httpService, pluginConfig) {
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
        if (sessionStorage.getItem(this.constants.SESSION_ID)) {
            this.sessionId = sessionStorage.getItem(this.constants.SESSION_ID);
        }
        else {
            this.sessionId = v4();
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
    AnalyticsService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    AnalyticsService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: PluginConfigService }
    ]; };
    /** @nocollapse */ AnalyticsService.ngInjectableDef = defineInjectable({ factory: function AnalyticsService_Factory() { return new AnalyticsService(inject(HttpClient), inject(PluginConfigService)); }, token: AnalyticsService, providedIn: "root" });
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
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
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
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_2) throw e_2.error; }
        }
        this.eventCollector.clear();
        try {
            for (var _e = __values(this.keys), _f = _e.next(); !_f.done; _f = _e.next()) {
                var key = _f.value;
                this.eventCollector.set(key, []);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_3) throw e_3.error; }
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
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    DataStorageService.ctorParameters = function () { return [
        { type: AnalyticsService },
        { type: HttpClient }
    ]; };
    /** @nocollapse */ DataStorageService.ngInjectableDef = defineInjectable({ factory: function DataStorageService_Factory() { return new DataStorageService(inject(AnalyticsService), inject(HttpClient)); }, token: DataStorageService, providedIn: "root" });
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
        { type: Directive, args: [{
                    // tslint:disable-next-line: directive-selector
                    selector: '[track-btn]'
                },] },
    ];
    ButtonDirective.ctorParameters = function () { return [
        { type: DataStorageService },
        { type: AnalyticsService }
    ]; };
    ButtonDirective.propDecorators = {
        data: [{ type: Input, args: ['track-btn',] }],
        onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
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
        setTimeout((/**
         * @return {?}
         */
        function () {
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
        { type: Directive, args: [{
                    // tslint:disable-next-line: directive-selector
                    selector: '[track-scroll]'
                },] },
    ];
    ScrollDirective.ctorParameters = function () { return [
        { type: AnalyticsService },
        { type: DataStorageService }
    ]; };
    ScrollDirective.propDecorators = {
        data: [{ type: Input, args: ['track-scroll',] }],
        onScrollEvent: [{ type: HostListener, args: ['window:scroll', ['$event'],] }]
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
        setTimeout((/**
         * @return {?}
         */
        function () {
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
        { type: Directive, args: [{
                    // tslint:disable-next-line: directive-selector
                    selector: '[track-buttonHover]'
                },] },
    ];
    ButtonHoverDirective.ctorParameters = function () { return [
        { type: DataStorageService },
        { type: AnalyticsService }
    ]; };
    ButtonHoverDirective.propDecorators = {
        data: [{ type: Input, args: ['track-buttonHover',] }],
        onMouseOver: [{ type: HostListener, args: ['mouseover', ['$event'],] }]
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
        this.routes.events.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** Triggered when NavigationEnd event occurs */
            if (event instanceof NavigationEnd) {
                if (_this.navigateOn !== event.url) {
                    _this.analyticsPushData(event);
                    _this.navigateOn = event.url;
                }
            }
            else if (event instanceof NavigationError) {
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
        setTimeout((/**
         * @return {?}
         */
        function () {
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
        var interval$$1 = setInterval((/**
         * @return {?}
         */
        function () {
            if (document.readyState === 'complete') {
                clearInterval(interval$$1);
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
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    RouterService.ctorParameters = function () { return [
        { type: Router },
        { type: AnalyticsService },
        { type: DataStorageService }
    ]; };
    /** @nocollapse */ RouterService.ngInjectableDef = defineInjectable({ factory: function RouterService_Factory() { return new RouterService(inject(Router), inject(AnalyticsService), inject(DataStorageService)); }, token: RouterService, providedIn: "root" });
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
        fromEvent(window, 'mousemove')
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
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
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    PointerService.ctorParameters = function () { return [
        { type: DataStorageService },
        { type: AnalyticsService }
    ]; };
    PointerService.propDecorators = {
        data: [{ type: Input, args: ['track-pointer',] }]
    };
    /** @nocollapse */ PointerService.ngInjectableDef = defineInjectable({ factory: function PointerService_Factory() { return new PointerService(inject(DataStorageService), inject(AnalyticsService)); }, token: PointerService, providedIn: "root" });
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
            console.error = (/**
             * @param {...?} error
             * @return {?}
             */
            function () {
                var error = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    error[_i] = arguments[_i];
                }
                /** @type {?} */
                var processedError = error.map((/**
                 * @param {?} e
                 * @return {?}
                 */
                function (e) {
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
        { type: Injectable },
    ];
    GlobalErrorHandler.ctorParameters = function () { return [
        { type: Injector }
    ]; };
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
            var dynamicId = "key_stroke_element_" + v4();
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
        { type: Directive, args: [{ selector: '[track-keyStroke]' },] },
    ];
    KeyStrokeDirective.ctorParameters = function () { return [
        { type: DataStorageService },
        { type: AnalyticsService },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    KeyStrokeDirective.propDecorators = {
        onKeyStroke: [{ type: HostListener, args: ['keypress', ['$event'],] }]
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
        window.addEventListener('beforeunload', (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.dataStorage.pushDataArrayToS3();
        }));
        interval(1000 * 2).subscribe((/**
         * @param {?} x
         * @return {?}
         */
        function (x) {
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
        if (isPageLoadingToBeDetected === void 0) { isPageLoadingToBeDetected = false; }
        this.environmentService.setConfigurationToEnvironment(configuration, isPageLoadingToBeDetected);
        // Assigning the configuration to environment variables
    };
    NgS3AnalyticsModule.environmentService = new EnvironmentService();
    NgS3AnalyticsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        HttpClientModule
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
                        CookieService,
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
    NgS3AnalyticsModule.ctorParameters = function () { return [
        { type: RouterService },
        { type: DataStorageService },
        { type: PointerService },
        { type: GlobalErrorHandler }
    ]; };
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

export { NgS3AnalyticsService, NgS3AnalyticsComponent, NgS3AnalyticsModule, EnvironmentService, DataStorageService, ButtonHoverDirective as ɵe, ButtonDirective as ɵa, KeyStrokeDirective as ɵf, ScrollDirective as ɵd, AnalyticsService as ɵb, PluginConfigService as ɵc, GlobalErrorHandler as ɵh, PointerService as ɵg, RouterService as ɵi };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kYWdsb2JhbC1uZy1zMy1hbmFseXRpY3MuanMubWFwIiwic291cmNlcyI6WyJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvbmctczMtYW5hbHl0aWNzLnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvbmctczMtYW5hbHl0aWNzLmNvbXBvbmVudC50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudC50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi90eXBlcy9ldmVudC50eXBlcy50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9zZXJ2aWNlcy9lbnZpcm9ubWVudC9lbnZpcm9ubWVudC5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3NlcnZpY2VzL2FuYWx5dGljcy9oYW5kbGVDb25maWcudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvc2VydmljZXMvYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL3NlcnZpY2VzL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZS50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9kaXJlY3RpdmVzL2J1dHRvbi9idXR0b24uZGlyZWN0aXZlLnRzIiwibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvbGliL2RpcmVjdGl2ZXMvc2Nyb2xsL3Njcm9sbC5kaXJlY3RpdmUudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvZGlyZWN0aXZlcy9idXR0b24taG92ZXIvYnV0dG9uLWhvdmVyLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9zZXJ2aWNlcy9yb3V0ZXIvcm91dGVyLnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvc2VydmljZXMvcG9pbnRlci9wb2ludGVyLnNlcnZpY2UudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvc2VydmljZXMvZXJyb3ItaGFuZGxlci9lcnJvckhhbmRsZXIuc2VydmljZS50cyIsIm5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzL2xpYi9kaXJlY3RpdmVzL2tleS1zdHJva2Uva2V5LXN0cm9rZS5kaXJlY3RpdmUudHMiLCJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy9saWIvbmctczMtYW5hbHl0aWNzLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5nUzNBbmFseXRpY3NTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLW5nLXMzLWFuYWx5dGljcycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHA+XG4gICAgICBuZy1zMy1hbmFseXRpY3Mgd29ya3MhXG4gICAgPC9wPlxuICBgLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIE5nUzNBbmFseXRpY3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiZXhwb3J0IGxldCBlbnZpcm9ubWVudCA9IHtcbiAgICBkYXRhQ29sbGVjdGlvbkFwaTogJ2h0dHBzOi8vMXhnZjVhMmJxMi5leGVjdXRlLWFwaS5hcC1zb3V0aC0xLmFtYXpvbmF3cy5jb20vZGV2LycsXG4gICAgaXNQYWdlTG9hZGluZ1RvQmVEZXRlY3RlZDogdHJ1ZSxcbiAgICByZW1vdGVDb25maWdBcGk6ICcnLFxuICAgIGlnbm9yZVVybHM6IFtdLFxuICAgIGlnbm9yZUNzc1J1bGVzOiBbXSxcbiAgICBzaG93Q29uc2VudDogZmFsc2UsXG4gICAgY29uc2VudENvbnRlbnQ6ICdXZSB1c2UgY29va2llcyB0byBlbnN1cmUgdGhhdCB3ZSBwcm92aWRlIHlvdSB3aXRoIHRoZSBiZXN0IHBvc3NpYmxlIGV4cGVyaWVuY2Ugb24gb3VyIHdlYnNpdGUuSWYgeW91IGNvbnRpbnVlIHRvIHVzZSBvdXIgc2l0ZSwgd2UgYXNzdW1lIHlvdSBhY2NlcHQgb3VyIHVzZSBvZiBjb29raWVzLiBQcml2YWN5IFBvbGljeScsXG4gICAgZGlzYWJsZVRyYWNraW5nOiBmYWxzZSxcbiAgICBpZ25vcmVJUFJhbmdlczogJycsXG4gICAgaWdub3JlRG9tYWluczogW10sXG4gICAgZGlzYWJsZURlbW9ncmFwaGljSW5mbzogZmFsc2Vcbn07XG5cblxuIiwiZXhwb3J0IGVudW0gRXZlbnRMYWJlbHMge1xuICAgIFBBR0VfTE9BRCA9ICdQQUdFX0xPQUQnLFxuICAgIE1PVVNFX0hPVkVSID0gJ01PVVNFX0hPVkVSJyxcbiAgICBCVVRUT05fQ0xJQ0sgPSAnQlVUVE9OX0NMSUNLJyxcbiAgICBNT1VTRV9NT1ZFID0gJ01PVVNFX01PVkUnLFxuICAgIFNDUk9MTCA9ICdTQ1JPTEwnLFxuICAgIENPTlNPTEVfRVJST1IgPSAnQ09OU09MRV9FUlJPUicsXG4gICAgS0VZX1NUUk9LRSA9ICdLRVlfU1RST0tFJ1xufVxuXG5leHBvcnQgZW51bSBDb25zdGFudHMge1xuICAgIERFTU9HUkFQSElDX0lORk8gPSAnZGVtb2dyYXBoaWMtaW5mbycsXG4gICAgU0VTU0lPTl9JRCA9ICduZ1MzQW5hbHl0aWNzU2Vzc2lvbklkJyxcbiAgICBERU1PR1JBUEhJQ19BUElfVVJMID0gJ2h0dHBzOi8vaXBhcGkuY28vanNvbi8nXG59XG5cblxuZXhwb3J0IGNsYXNzIEtleVN0cm9rZUV2ZW50VHlwZSB7XG4gICAga2V5OiBzdHJpbmc7IC8vIHByZXNzZWQgS2V5XG4gICAga2V5Q29kZTogc3RyaW5nOyAvLyBwcmVzc2VkIEtleSBDb2RlXG4gICAgZWxlbWVudElkOiBzdHJpbmc7IC8vIElkIG9mIGVsZW1lbnRcbiAgICBpc0Zvcm06IGJvb2xlYW47IC8vIGlzIGl0IGEgZm9ybVxuICAgIGZvcm06IHN0cmluZztcbiAgICB0YWdOYW1lOiBzdHJpbmc7IC8vIHRhZ05hbWUgb2YgZWxlbWVudFxuICAgIGh0bWxFbGVtZW50VHlwZTogc3RyaW5nOyAvLyB0eXBlIG9mIGVsZW1lbnRcbiAgICB2YWx1ZTogc3RyaW5nOyAvLyBwcmV2aW91cyB2YWx1ZSBvZiB0aGUgZWxlbWVudFxuICAgIGNvZGU6IHN0cmluZzsgLy8gUHJlc3NlZCBrZXkgbGFiZWxcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmtleSA9ICcnO1xuICAgICAgICB0aGlzLmtleUNvZGUgPSAnJztcbiAgICAgICAgdGhpcy5lbGVtZW50SWQgPSAnJztcbiAgICAgICAgdGhpcy5pc0Zvcm0gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mb3JtID0gJyc7XG4gICAgICAgIHRoaXMudGFnTmFtZSA9ICcnO1xuICAgICAgICB0aGlzLmh0bWxFbGVtZW50VHlwZSA9ICcnO1xuICAgICAgICB0aGlzLnZhbHVlID0gJyc7XG4gICAgICAgIHRoaXMuY29kZSA9ICcnO1xuICAgIH1cbn1cbiIsIlxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudCc7XG5pbXBvcnQgeyBDb25maWd1cmF0aW9uLCBQbHVnaW5Db25maWcgfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuXG5leHBvcnQgY2xhc3MgRW52aXJvbm1lbnRTZXJ2aWNlIHtcbiAgZW52Q29uZmlnOiBhbnkgPSBuZXcgU3ViamVjdDxQbHVnaW5Db25maWc+KCk7XG5cbiAgLy8gU2V0dGluZyBDb25maWd1cmF0aW9uIG9uIGVudmlyb25tZW50XG4gIHNldENvbmZpZ3VyYXRpb25Ub0Vudmlyb25tZW50KGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb24sIGlzUGFnZUxvYWRpbmdUb0JlRGV0ZWN0ZWQ6IGJvb2xlYW4pIHtcbiAgICBlbnZpcm9ubWVudC5kYXRhQ29sbGVjdGlvbkFwaSA9IGNvbmZpZ3VyYXRpb24uZGF0YUNvbGxlY3Rpb25BcGk7XG4gICAgZW52aXJvbm1lbnQuaXNQYWdlTG9hZGluZ1RvQmVEZXRlY3RlZCA9IGlzUGFnZUxvYWRpbmdUb0JlRGV0ZWN0ZWQ7XG4gICAgZW52aXJvbm1lbnQucmVtb3RlQ29uZmlnQXBpID0gY29uZmlndXJhdGlvbi5yZW1vdGVDb25maWdBcGk7XG4gICAgdGhpcy5lbnZDb25maWcubmV4dChlbnZpcm9ubWVudCk7XG4gICAgdGhpcy5lbnZDb25maWcuY29tcGxldGUoKTtcbiAgfVxuXG4gIGdldEVudk9ic2VydmFibGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZW52Q29uZmlnO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vZW52aXJvbm1lbnQvZW52aXJvbm1lbnQnO1xuaW1wb3J0IHsgUGx1Z2luQ29uZmlnLCBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgRW52aXJvbm1lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vZW52aXJvbm1lbnQvZW52aXJvbm1lbnQuc2VydmljZSc7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnbmd4LWNvb2tpZS1zZXJ2aWNlJztcblxuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFBsdWdpbkNvbmZpZ1NlcnZpY2Uge1xuICAgIHJlbW90ZVBsdWdpbkNvbmZpZzogUGx1Z2luQ29uZmlnO1xuICAgIGRlbW9ncmFwaGljSW5mbzogYW55O1xuICAgIC8qKiBDb25zdGFudHMgKi9cbiAgICBjb25zdGFudHMgPSBDb25zdGFudHM7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgaHR0cENsaWVudDogSHR0cENsaWVudCxcbiAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgIHByaXZhdGUgY29va2llU2VydmljZTogQ29va2llU2VydmljZSkge1xuXG4gICAgfVxuXG4gICAgZ2V0RW52aXJvbm1lbnRDb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGVudiA9IHRoaXMuaW5qZWN0b3IuZ2V0KEVudmlyb25tZW50U2VydmljZSk7XG4gICAgICAgIGVudi5nZXRFbnZPYnNlcnZhYmxlKCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5mZXRjaFJlbW90ZUNvbmZpZygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnI6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbWF4LWxpbmUtbGVuZ3RoXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcigndW5hYmxlIHRvIGZldGNoIHhBbmFseXRpY3MgcmVtb3RlIGNvbmZpZ3VyYXRpb24uIFBsZWFzZSBtYWtlIHN1cmUgeW91IGhhdmUgY29uZmlndXJlZCB0aGUgY29ycmVjdCBVUkwsIGlmIHRoZSBpc3N1ZSBwZXJzaXN0IHBsZWFzZSBjaGVjayB0aGUgZGFzaGJvYXJkIGZvciBtb3JlIGluZm8gb3IgY29udGFjdCB4QSBUZWFtLiAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcHVibGljIGZldGNoUmVtb3RlQ29uZmlnKCkge1xuICAgICAgICB0aGlzLmh0dHBDbGllbnQuZ2V0KGVudmlyb25tZW50LnJlbW90ZUNvbmZpZ0FwaSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgcmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdGVQbHVnaW5Db25maWcgPSByZXNbJ2JvZHknXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnLnNob3dDb25zZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5yZW1vdGVQbHVnaW5Db25maWcuY29uc2VudENvbnRlbnQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnLmNvbnNlbnRDb250ZW50IDogZW52aXJvbm1lbnQuY29uc2VudENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrU2hvd0NvbnNlbnQoY29udGVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2NvbGxlY3Rpb24gZXJyb3InLCBlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ29uZmlndXJhdGlvbihhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoZWNrRGlzYWJsZVRyYWNraW5nKCkgJiZcbiAgICAgICAgICAgIHRoaXMuY2hlY2tEb21haW4oYW5hbHl0aWNzQmVhbi5mdWxsVVJMKSAmJlxuICAgICAgICAgICAgdGhpcy5jaGVja0lwUmFuZ2UoYW5hbHl0aWNzQmVhbi5kZW1vZ3JhcGhpY0luZm9bJ2lwJ10pO1xuXG4gICAgfVxuXG4gICAgY2hlY2tEaXNhYmxlVHJhY2tpbmcoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZykge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZy5kaXNhYmxlVHJhY2tpbmc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoZWNrRG9tYWluKGZ1bGxVcmw6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5yZW1vdGVQbHVnaW5Db25maWcgJiYgdGhpcy5yZW1vdGVQbHVnaW5Db25maWcuaWdub3JlRG9tYWlucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gISh0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZy5pZ25vcmVEb21haW5zLmZpbHRlcihkb21haW4gPT4gZnVsbFVybC5pbmRleE9mKGRvbWFpbikgPj0gMCkubGVuZ3RoID4gMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW1vdmVDaGVja1VybHModHJhY2tlZE9iamVjdHM6IEFycmF5PEFuYWx5dGljc0JlYW4+KTogQXJyYXk8QW5hbHl0aWNzQmVhbj4ge1xuICAgICAgICBpZiAodHJhY2tlZE9iamVjdHMgJiYgdHJhY2tlZE9iamVjdHMubGVuZ3RoID4gMCAmJiB0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZykge1xuICAgICAgICAgICAgcmV0dXJuIHRyYWNrZWRPYmplY3RzLm1hcChhbmFseXRpY3MgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghKHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnLmlnbm9yZVVybHMuZmlsdGVyKHVybCA9PiBhbmFseXRpY3MuZXZlbnRDb21wb25lbnQuaW5kZXhPZih1cmwpID49IDApLmxlbmd0aCA+IDApKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhbmFseXRpY3M7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuZmlsdGVyKG9iamVjdCA9PiBvYmplY3QgIT09IHVuZGVmaW5lZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJhY2tlZE9iamVjdHM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICogSVAgcmFuZ2UgcmVzdHJpY3Rpb24gYWRkZWRcbiAgICogQHJlc3RyaWN0SVBSYW5nZSBpcyBhIHJlZ2V4XG4gICAqIGlmIEByZXN0cmljdElQUmFuZ2UgaXMgbWF0Y2ggd2l0aCBjdXJyZW50IElQLFxuICAgKiB0aGUgYW5hbHl0aWNzIGRhdGEgd2lsbCBiZSByZXN0cmljdGVkXG4gICAqL1xuICAgIHByaXZhdGUgY2hlY2tJcFJhbmdlKGlwOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGlwICYmIHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnICYmIHRoaXMucmVtb3RlUGx1Z2luQ29uZmlnLmlnbm9yZUlQUmFuZ2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGlwUmFuZ2UgPSB0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZy5pZ25vcmVJUFJhbmdlcztcbiAgICAgICAgICAgIHJldHVybiBpcC5tYXRjaChpcFJhbmdlKSA/IGZhbHNlIDogdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICogU2V0IHVzZXIgZGVtb2dyYXBoaWMgaW5mb3JtYXRpb24gaW4gY29va2llc1xuICAqL1xuICAgIGFzeW5jIGdldElwKCkge1xuICAgICAgICB0aGlzLmRlbW9ncmFwaGljSW5mbyA9IGF3YWl0IHRoaXMuaHR0cENsaWVudC5nZXQodGhpcy5jb25zdGFudHMuREVNT0dSQVBISUNfQVBJX1VSTCkudG9Qcm9taXNlKCk7XG4gICAgICAgIHRoaXMuY29va2llU2VydmljZS5zZXQoXG4gICAgICAgICAgICB0aGlzLmNvbnN0YW50cy5ERU1PR1JBUEhJQ19JTkZPLFxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkodGhpcy5kZW1vZ3JhcGhpY0luZm8pLFxuICAgICAgICAgICAgbmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgKyAoMTAwMCAqIDYwICogNjAgKiAyNCkpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVtb2dyYXBoaWNJbmZvO1xuICAgIH1cblxuXG4gICAgc2V0RGVtb2dyYXBoaWNJbmZvKCkge1xuICAgICAgICBpZiAoIXRoaXMuY29va2llU2VydmljZS5jaGVjayh0aGlzLmNvbnN0YW50cy5ERU1PR1JBUEhJQ19JTkZPKSkge1xuICAgICAgICAgICAgdGhpcy5nZXRJcCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kZW1vZ3JhcGhpY0luZm8gPSBKU09OLnBhcnNlKHRoaXMuY29va2llU2VydmljZS5nZXQodGhpcy5jb25zdGFudHMuREVNT0dSQVBISUNfSU5GTykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmRlbW9ncmFwaGljSW5mbztcbiAgICB9XG5cbiAgICBnZXREZW1vZ3JhcGhpY0luZm8oKSB7XG4gICAgICAgIGlmICh0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZyAmJiB0aGlzLnJlbW90ZVBsdWdpbkNvbmZpZy5kaXNhYmxlRGVtb2dyYXBoaWNJbmZvKSB7XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXREZW1vZ3JhcGhpY0luZm8oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoZWNrU2hvd0NvbnNlbnQoY29udGVudDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGRpdkVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRpdkVsLmNsYXNzTGlzdC5hZGQoJ2NvbnNlbnQtd3JhcHBlcicpO1xuICAgICAgICBkaXZFbC5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG4gICAgICAgIGRpdkVsLnN0eWxlLmJvdHRvbSA9ICcwJztcbiAgICAgICAgZGl2RWwuc3R5bGUubGVmdCA9ICcwJztcbiAgICAgICAgZGl2RWwuc3R5bGUucmlnaHQgPSAnMCc7XG4gICAgICAgIGRpdkVsLnN0eWxlLnBhZGRpbmcgPSAnMTVweCc7XG4gICAgICAgIGRpdkVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjMzM2NmZmJztcbiAgICAgICAgZGl2RWwuc3R5bGUuY29sb3IgPSAnI2ZmZic7XG4gICAgICAgIGRpdkVsLnN0eWxlLmZvbnRTaXplID0gJzEycHgnO1xuICAgICAgICBkaXZFbC5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgY29uc3QgdGV4dEVsID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY29udGVudCk7XG4gICAgICAgIGRpdkVsLmFwcGVuZENoaWxkKHRleHRFbCk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2RWwpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vZW52aXJvbm1lbnQvZW52aXJvbm1lbnQnO1xuaW1wb3J0ICogYXMgdXVpZCBmcm9tICd1dWlkJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4sIFBlcmZvcm1hbmNlQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgRXZlbnRMYWJlbHMsIEtleVN0cm9rZUV2ZW50VHlwZSwgQ29uc3RhbnRzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuaW1wb3J0IHsgUGx1Z2luQ29uZmlnU2VydmljZSB9IGZyb20gJy4vaGFuZGxlQ29uZmlnJztcbi8qKlxuICogQW5hbHl0aWNzIFNlcnZpY2VcbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQW5hbHl0aWNzU2VydmljZSB7XG5cbiAgLyoqIFNlc3Npb25JZCBvZiBwbHVnaW4gKi9cbiAgc2Vzc2lvbklkOiBzdHJpbmc7XG4gIC8qKiBEZW1vZ3JhcGhpYyBpbmZvICovXG4gIGRlbW9ncmFwaGljSW5mbzogYW55ID0ge307XG4gIC8qKiBFdmVudCBsYWJlbCBjb25zdGFudHMgKi9cbiAgZXZlbnRMYWJlbHMgPSBFdmVudExhYmVscztcbiAgLyoqIENvbnN0YW50cyAqL1xuICBjb25zdGFudHMgPSBDb25zdGFudHM7XG5cbiAgLyoqXG4gICAqIEFuYWx5dGljcyBTZXJ2aWNlIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBwbHVnaW5Db25maWdcbiAgICogQHBhcmFtIGh0dHBTZXJ2aWNlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGh0dHBTZXJ2aWNlOiBIdHRwQ2xpZW50LFxuICAgIHByaXZhdGUgcGx1Z2luQ29uZmlnOiBQbHVnaW5Db25maWdTZXJ2aWNlKSB7XG4gICAgdGhpcy5wbHVnaW5Db25maWcuZ2V0RW52aXJvbm1lbnRDb25maWcoKTtcbiAgICB0aGlzLnNldFNlc3Npb25JZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNraW5nIHdoZXRoZXIgc2Vzc2lvbklkIHByZXNlbnQgaW4gY29va2llIG9yIG5vdFxuICAgKiBpZiBubyBzZXNzaW9uIGlkIGNvb2tpZSBwcmVzZW50LCBhZGRpbmcgbmV3IHNlc3Npb24gaWQgb3RoZXJ3aXNlIHJldXNpbmcgdGhlIHNlc3Npb24gaWQgdmFsdWVcbiAgICovXG4gIHByaXZhdGUgc2V0U2Vzc2lvbklkKCk6IHZvaWQge1xuICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKHRoaXMuY29uc3RhbnRzLlNFU1NJT05fSUQpKSB7XG4gICAgICB0aGlzLnNlc3Npb25JZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0odGhpcy5jb25zdGFudHMuU0VTU0lPTl9JRCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2Vzc2lvbklkID0gdXVpZC52NCgpO1xuICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSh0aGlzLmNvbnN0YW50cy5TRVNTSU9OX0lELCB0aGlzLnNlc3Npb25JZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNraW5nIHRoZSBJUCByYW5nZSB0byBiZSByZXN0cmljdFxuICAgKiBAcGFyYW0gZGF0YSAtIGRhdGEgdG8gYmUgcHVzaGVkXG4gICAqL1xuICBwdWJsaWMgcHVzaERhdGEoZGF0YTogYW55KTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGx1Z2luQ29uZmlnLmhhbmRsZUNvbmZpZ3VyYXRpb24oZGF0YS5ldmVudFZhbHVlc1swXSkpIHtcbiAgICAgIGNvbnN0IGFuYWx5dGljc09iamVjdExpc3QgPSB0aGlzLnBsdWdpbkNvbmZpZy5yZW1vdmVDaGVja1VybHMoZGF0YS5ldmVudFZhbHVlcyk7XG4gICAgICBpZiAoYW5hbHl0aWNzT2JqZWN0TGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMucHVibGlzaFRPQXV0aFMzKGFuYWx5dGljc09iamVjdExpc3QpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cblxuICAvKipcbiAgICogQ29udmVydGluZyBKU09OIEFycmF5IHRvIHN0cmluZ1xuICAgKiBAcGFyYW0gZGF0YVxuICAgKi9cbiAgcHJpdmF0ZSBwcm9jZXNzRm9yQXRoZW5hKGRhdGE6IEFycmF5PEFuYWx5dGljc0JlYW4+KTogc3RyaW5nIHtcbiAgICBpZiAoZGF0YSAmJiBkYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBkYXRhLm1hcCgob2JqZWN0OiBhbnkpID0+IHtcbiAgICAgICAgb2JqZWN0WydzZXNzaW9uSWQnXSA9IHRoaXMuc2Vzc2lvbklkO1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqZWN0KTtcbiAgICAgIH0pLmpvaW4oJ1xcbicpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAgKiBQcmVwYXJpbmcgZGF0YSB0byBiZSBwdXNoZWQgdG8gRGF0YVN0b3JhZ2VcbiAgICAqIEBwYXJhbSBkYXRhICBkYXRhIHRvIGJlIHB1c2hlZFxuICAgICovXG4gIHByaXZhdGUgcHVibGlzaFRPQXV0aFMzKGRhdGE6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gYCR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF19XyR7dGhpcy5zZXNzaW9uSWR9XyR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpfS5qc29uYDtcbiAgICBjb25zdCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcbiAgICB0aGlzLnB1c2hEYXRhVG9TMyhmaWxlbmFtZSwgdGhpcy5wcm9jZXNzRm9yQXRoZW5hKGRhdGEpLCBoZWFkZXJzKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFB1c2hpbmcgZGF0YSB0byBjb3JyZXNwb25kaW5nIGJ1Y2tldCB1c2luZyBkYXRhIGNvbGxlY3Rpb24gYXBpXG4gICAqIEBwYXJhbSBwYXRoIC0gc2VydmljZSBwYXRoXG4gICAqIEBwYXJhbSBkYXRhIC0gZGF0YSB0byBiZSBwdXNoZWRcbiAgICovXG4gIHByaXZhdGUgcHVzaERhdGFUb1MzKHBhdGg6IHN0cmluZywgZGF0YTogYW55LCBoZWFkZXJzOiBIdHRwSGVhZGVycyk6IHZvaWQge1xuICAgIGNvbnN0IHVybCA9IGAke2Vudmlyb25tZW50LmRhdGFDb2xsZWN0aW9uQXBpfSR7cGF0aH1gO1xuICAgIHRoaXMuaHR0cFNlcnZpY2UucHV0KHVybCwgZGF0YSwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pLnN1YnNjcmliZShyZXMgPT4geyB9LCBlcnIgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYXZlIHRoZSBjYXB0dXJlZCBIVE1MIHRvIHRoZSBkYXRhIGNvbGxlY3Rpb25cbiAgICogQHBhcmFtIGh0bWxUZW1wbGF0ZSAtIERPTSBDb250ZW50XG4gICAqIEBwYXJhbSBzY3JlZW5zaG90TmFtZSAtIGZpbGVuYW1lIHRvIGJlIHNhdmVkXG4gICAqL1xuICBwdWJsaWMgc2F2ZVNjcmVlbnNob3RzSW5TMyhodG1sVGVtcGxhdGU6IHN0cmluZywgc2NyZWVuc2hvdE5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBsdWdpbkNvbmZpZy5jaGVja0Rpc2FibGVUcmFja2luZygpKSB7XG4gICAgICBjb25zdCBmaWxlbmFtZSA9IGBhc3NldHMvJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXX0vJHt0aGlzLnNlc3Npb25JZH0vJHtzY3JlZW5zaG90TmFtZX0uaHRtbGA7XG4gICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICd0ZXh0L2h0bWwnIH0pO1xuICAgICAgdGhpcy5wdXNoRGF0YVRvUzMoZmlsZW5hbWUsIGh0bWxUZW1wbGF0ZSwgaGVhZGVycyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFB1c2hpbmcgY29uc29sZSBlcnJvcnMgdG8gUzMgYnVja2V0XG4gICAqIEBwYXJhbSBkYXRhIFxuICAgKi9cbiAgcHVibGljIHB1Ymxpc2hDb25zb2xlRXJyb3JzKGRhdGE6IGFueSk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBsdWdpbkNvbmZpZy5jaGVja0Rpc2FibGVUcmFja2luZygpKSB7XG4gICAgICBkYXRhWydzZXNzaW9uSWQnXSA9IHRoaXMuc2Vzc2lvbklkO1xuICAgICAgY29uc3QgZmlsZW5hbWUgPSBgJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXX1fJHt0aGlzLnNlc3Npb25JZH1fY29uc29sZV9lcnJvcnNfJHtuZXcgRGF0ZSgpLmdldFRpbWUoKX0uanNvbmA7XG4gICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcbiAgICAgIHRoaXMucHVzaERhdGFUb1MzKGZpbGVuYW1lLCBkYXRhLCBoZWFkZXJzKTtcbiAgICB9XG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIFNldHRpbmcgYW5hbHl0aWNzIG9iamVjdCB0byBiZSBzYXZlZCBpbiBTMyBidWNrZXRcbiAgICogQHBhcmFtIHVzZXJEYXRhIC0gRGF0YSB0cmFuc2ZlcnJlZCB0byBFdmVudCBEaXJlY3RpdmVcbiAgICogQHBhcmFtIGV2ZW50RGV0YWlscyAtIFBvc2l0aW9uIG9mIGV2ZW50c1xuICAgKiBAcGFyYW0gZXZlbnROYW1lICAtIFR5cGUgb2YgZXZlbnRcbiAgICogQHBhcmFtIHNjcmVlbnNob3ROYW1lICAtIGZpbGUgbmFtZSBvZiBzYXZlZCBzY3JlZW5zaG90IGlmIHRoZSBldmVudCBpcyBQYWdlTG9hZGVkXG4gICAqL1xuICBwdWJsaWMgc2V0QW5hbHl0aWNzRGF0YShcbiAgICB1c2VyRGF0YTogYW55ID0ge30sXG4gICAgZXZlbnREZXRhaWxzOiBhbnksXG4gICAgZXZlbnROYW1lOiBzdHJpbmcsXG4gICAgc2NyZWVuc2hvdE5hbWU6IHN0cmluZyxcbiAgICBvcHRpb25hbD86IHtcbiAgICAgIGV2ZW50Q29tcG9uZW50Pzogc3RyaW5nLFxuICAgICAga2V5U3Ryb2tlRGF0YT86IEtleVN0cm9rZUV2ZW50VHlwZSxcbiAgICAgIGNvbnNvbGVFcnJvcnM/OiBzdHJpbmdcbiAgICB9KTogQW5hbHl0aWNzQmVhbiB7XG4gICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9IHtcbiAgICAgIGV2ZW50TGFiZWw6IGV2ZW50TmFtZSxcbiAgICAgIGV2ZW50Q29tcG9uZW50OiBvcHRpb25hbCAmJiBvcHRpb25hbC5ldmVudENvbXBvbmVudCA/IG9wdGlvbmFsLmV2ZW50Q29tcG9uZW50IDogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCc/JylbMF0sXG4gICAgICBicm93c2VyOiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCxcbiAgICAgIGZ1bGxVUkw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxuICAgICAgb3JpZ2luOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luLFxuICAgICAgcmVzb2x1dGlvbjogYCR7d2luZG93LmlubmVyV2lkdGh9eCR7d2luZG93LmlubmVySGVpZ2h0fWAsXG4gICAgICB4Q29vcmQ6IHRoaXMuZ2V0RXZlbnREZXRhaWxzKGV2ZW50RGV0YWlsc1snY2xpZW50WCddKSxcbiAgICAgIHlDb29yZDogdGhpcy5nZXRFdmVudERldGFpbHMoZXZlbnREZXRhaWxzWydjbGllbnRZJ10pLFxuICAgICAgcGFnZVhDb29yZDogd2luZG93LnBhZ2VYT2Zmc2V0LnRvU3RyaW5nKCkgfHwgJzAnLFxuICAgICAgcGFnZVlDb29yZDogd2luZG93LnBhZ2VZT2Zmc2V0LnRvU3RyaW5nKCkgfHwgJzAnLFxuICAgICAgZXZlbnRUaW1lOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICBzY3JlZW5zaG90OiBzY3JlZW5zaG90TmFtZSxcbiAgICAgIGFkZGl0aW9uYWxJbmZvOiB1c2VyRGF0YSxcbiAgICAgIGVycm9yczogKG9wdGlvbmFsICYmIG9wdGlvbmFsLmNvbnNvbGVFcnJvcnMpID8gb3B0aW9uYWwuY29uc29sZUVycm9ycyA6ICcnLFxuICAgICAgdXRtOiB0aGlzLmdldFVUTVBhcmFtZXRlcnMod2luZG93LmxvY2F0aW9uLmhyZWYpLFxuICAgICAgZGVtb2dyYXBoaWNJbmZvOiB0aGlzLnBsdWdpbkNvbmZpZy5nZXREZW1vZ3JhcGhpY0luZm8oKSxcbiAgICAgIGtleVN0cm9rZURhdGE6IChvcHRpb25hbCAmJiBvcHRpb25hbC5rZXlTdHJva2VEYXRhKSA/IG9wdGlvbmFsLmtleVN0cm9rZURhdGEgOiB0aGlzLmdldEVtcHR5S2V5U3Ryb2tlRGF0YSgpLFxuICAgICAgaHRtbEVsZW1lbnQ6IHRoaXMuZ2V0SHRtbEVsZW1lbnQoZXZlbnREZXRhaWxzWyd0YXJnZXQnXSwgZXZlbnROYW1lKSxcbiAgICAgIHBlcmZvcm1hbmNlOiB0aGlzLmdldFBlcmZvcm1hbmNlRGV0YWlscygpLFxuICAgIH07XG4gICAgcmV0dXJuIGFuYWx5dGljc0JlYW47XG4gIH1cblxuICAvKipcbiAgICogRXZlbnQgZGV0YWlsc1xuICAgKiBAcGFyYW0gdmFsdWUgXG4gICAqL1xuICBwcml2YXRlIGdldEV2ZW50RGV0YWlscyh2YWx1ZTogYW55KTogc3RyaW5nIHtcbiAgICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlLnRvU3RyaW5nKCkgOiAnMCc7XG4gIH1cblxuICAvKipcbiAgICogR2V0IEhUTUwgQ29udGVudFxuICAgKiBAcGFyYW0gdGFyZ2V0RWxlbWVudCAtIHRhcmdldCBlbGVtZW50XG4gICAqL1xuICBwcml2YXRlIGdldEh0bWxFbGVtZW50KHRhcmdldEVsZW1lbnQ6IGFueSwgZXZlbnROYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmIChldmVudE5hbWUgIT09IHRoaXMuZXZlbnRMYWJlbHMuTU9VU0VfTU9WRSAmJiBldmVudE5hbWUgIT09IHRoaXMuZXZlbnRMYWJlbHMuU0NST0xMKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0RWxlbWVudCAhPT0gdW5kZWZpbmVkID8gdGFyZ2V0RWxlbWVudFsnaW5uZXJIVE1MJ10gOiAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfVxuXG5cbiAgcHJpdmF0ZSBnZXRFbXB0eUtleVN0cm9rZURhdGEoKTogS2V5U3Ryb2tlRXZlbnRUeXBlIHtcbiAgICByZXR1cm4ge1xuICAgICAga2V5OiAnJyxcbiAgICAgIGtleUNvZGU6ICcnLFxuICAgICAgY29kZTogJycsXG4gICAgICBlbGVtZW50SWQ6ICcnLFxuICAgICAgZm9ybTogJycsXG4gICAgICBodG1sRWxlbWVudFR5cGU6ICcnLFxuICAgICAgaXNGb3JtOiBmYWxzZSxcbiAgICAgIHRhZ05hbWU6ICcnLFxuICAgICAgdmFsdWU6ICcnXG4gICAgfTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFBlcmZvcm1hbmNlIGRldGFpbHNcbiAgICovXG4gIHByaXZhdGUgZ2V0UGVyZm9ybWFuY2VEZXRhaWxzKCk6IFBlcmZvcm1hbmNlQmVhbiB7XG4gICAgY29uc3QgcGVyZm9ybWFuY2UgPSB3aW5kb3cucGVyZm9ybWFuY2U7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hdmlnYXRpb246IHBlcmZvcm1hbmNlLm5hdmlnYXRpb24sXG4gICAgICB0aW1lT3JpZ2luOiBwZXJmb3JtYW5jZS50aW1lT3JpZ2luLFxuICAgICAgdGltaW5nOiBwZXJmb3JtYW5jZS50aW1pbmdcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIE1lbW9yeSB1c2FnZSBvZiB0aGUgYXBwbGljYXRpb24gaXMgcHJvdmlkZWQgYnkgR29vZ2xlIENocm9tZVxuICAgKiBAcGFyYW0gdXNlckFnZW50IC0gVXNlciBhZ2VudCB0byBjaGVjayB0aGUgYnJvd3NlclxuICAgKi9cbiAgcHJpdmF0ZSBnZU1lbW9yeVVzYWdlSW5mbyh1c2VyQWdlbnQ6IGFueSkge1xuICAgIGNvbnN0IGlzQ2hyb21lID0gdXNlckFnZW50LnNwbGl0KCdjaHJvbWUnKS5sZW5ndGggPiAxO1xuICAgIGNvbnN0IG1lbW9yeSA9IGlzQ2hyb21lID8gd2luZG93LnBlcmZvcm1hbmNlWydtZW1vcnknXSA6ICcnO1xuICAgIHJldHVybiBtZW1vcnk7XG4gIH1cblxuICAvKipcbiAgICogR2V0dGluZyBVVE0gUGFyYW1ldGVycyBieSBwcm9jZXNzaW5nIGN1cnJlbnQgcGFnZVVSTFxuICAgKiBAcGFyYW0gdXJsIC0gUGFnZSBVUkxcbiAgICovXG4gIHByaXZhdGUgZ2V0VVRNUGFyYW1ldGVycyh1cmw6IHN0cmluZyk6IGFueSB7XG4gICAgY29uc3QgdXRtT2JqZWN0ID0ge307XG4gICAgaWYgKHVybC5pbmNsdWRlcygndXRtJykpIHtcbiAgICAgIGNvbnN0IHV0bVBhcmFtcyA9IHVybC5zcGxpdCgnPycpWzFdLnNwbGl0KCcmJyk7XG4gICAgICB1dG1QYXJhbXMubWFwKHBhcmFtID0+IHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gcGFyYW0uc3BsaXQoJz0nKTtcbiAgICAgICAgdXRtT2JqZWN0W3BhcmFtc1swXV0gPSBwYXJhbXNbMV07XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHV0bU9iamVjdDtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnLi4vYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBEYXRhU3RvcmFnZVNlcnZpY2Uge1xuXG4gIGFsbERhdGFBbmFseXRpY3NBcnJheTogQXJyYXk8YW55PiA9IFtdO1xuICBhbGxEYXRhQW5hbHl0aWNzOiB7XG4gICAgcGFnZVVybDogc3RyaW5nLFxuICAgIGV2ZW50VmFsdWVzOiBBcnJheTxhbnk+XG4gIH07XG4gIHByZXZpb3VzVXJsOiBzdHJpbmc7XG4gIGtleXM6IEFycmF5PGFueT4gPSBbXTtcbiAgZXZlbnRDb2xsZWN0b3IgPSBuZXcgTWFwKCk7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYW5hbHl0aWNhbFNlcnZpY2U6IEFuYWx5dGljc1NlcnZpY2UsIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkgeyB9XG4gIHByaXZhdGUgcm91dGVEZXRhaWxzOiBhbnkgPSBbXTtcbiAgY291bnQgPSAwO1xuICBzZXRVcmxLZXkoZGF0YTogc3RyaW5nKSB7XG4gICAgbGV0IGZsYWcgPSAwO1xuICAgIGlmICh0aGlzLnByZXZpb3VzVXJsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuZXZlbnRDb2xsZWN0b3Iuc2V0KGRhdGEsIFtdKTtcbiAgICAgIHRoaXMucHJldmlvdXNVcmwgPSBkYXRhIHx8ICcvJztcbiAgICB9IGVsc2UgaWYgKCEoZGF0YSA9PT0gdGhpcy5wcmV2aW91c1VybCkpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIEFycmF5LmZyb20odGhpcy5ldmVudENvbGxlY3Rvci5rZXlzKCkpKSB7XG4gICAgICAgIGlmIChrZXkgPT09IGRhdGEpIHtcbiAgICAgICAgICBmbGFnID0gMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGZsYWcgPT09IDApIHtcbiAgICAgICAgdGhpcy5ldmVudENvbGxlY3Rvci5zZXQoZGF0YSwgW10pO1xuICAgICAgfVxuICAgICAgdGhpcy5wcmV2aW91c1VybCA9IGRhdGE7XG4gICAgfVxuICB9XG4gIGFwcGVuZFRvQW5hbHl0aWNzQXJyYXkoZGF0YTogQW5hbHl0aWNzQmVhbikge1xuICAgIGlmICh0aGlzLnByZXZpb3VzVXJsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuc2V0VXJsS2V5KGRhdGEuZXZlbnRDb21wb25lbnQpO1xuICAgIH1cbiAgICB0aGlzLmV2ZW50Q29sbGVjdG9yLmdldCh0aGlzLnByZXZpb3VzVXJsKS5wdXNoKGRhdGEpO1xuICB9XG5cbiAgcHVzaERhdGFBcnJheVRvUzMoKSB7XG4gICAgdGhpcy5jb3VudCsrO1xuICAgIC8vIHRoaXMuYWxsRGF0YUFuYWx5dGljc01hcCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoQXJyYXkuZnJvbSh0aGlzLmV2ZW50Q29sbGVjdG9yLmtleXMoKSkpKTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBBcnJheS5mcm9tKHRoaXMuZXZlbnRDb2xsZWN0b3Iua2V5cygpKSkge1xuICAgICAgdGhpcy5hbGxEYXRhQW5hbHl0aWNzID0ge1xuICAgICAgICBwYWdlVXJsOiBrZXksXG4gICAgICAgIGV2ZW50VmFsdWVzOiBBcnJheS5mcm9tKHRoaXMuZXZlbnRDb2xsZWN0b3IuZ2V0KGtleSkudmFsdWVzKCkpXG4gICAgICB9O1xuICAgICAgdGhpcy5rZXlzLnB1c2goa2V5KTtcbiAgICAgIGlmICh0aGlzLmFsbERhdGFBbmFseXRpY3MuZXZlbnRWYWx1ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmFuYWx5dGljYWxTZXJ2aWNlLnB1c2hEYXRhKHRoaXMuYWxsRGF0YUFuYWx5dGljcyk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuZXZlbnRDb2xsZWN0b3IuY2xlYXIoKTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiB0aGlzLmtleXMpIHtcbiAgICAgIHRoaXMuZXZlbnRDb2xsZWN0b3Iuc2V0KGtleSwgW10pO1xuICAgIH1cbiAgfVxuXG4gIHNldFJvdXRlRGV0YWlscyhyb3V0ZURldGFpbHM6IGFueSkge1xuICAgIHRoaXMucm91dGVEZXRhaWxzID0gcm91dGVEZXRhaWxzO1xuICB9XG5cbiAgZ2V0Um91dGVEZXRhaWxzKCkge1xuICAgIHJldHVybiB0aGlzLnJvdXRlRGV0YWlscztcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBFdmVudExhYmVscyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcblxuLyoqXG4gKiBCdXR0b24gRGlyZWN0aXZlIHRvIHRyYWNrIGNsaWNrIGV2ZW50XG4gKiBTZWxlY3RvciBjYW4gYmUgYWRkZWQgdG8gYW55IEhUTUwgRWxlbWVudFxuICovXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdbdHJhY2stYnRuXSdcbn0pXG5leHBvcnQgY2xhc3MgQnV0dG9uRGlyZWN0aXZlIHtcblxuICAvLyBHZXRzIGltcG9ydGFudCBkYXRhIGFib3V0IHRoZSBidXR0b24gZXhwbGljaXRseSBmcm9tIHRoZSBhcHBsaWNhdGlvblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWlucHV0LXJlbmFtZVxuICBASW5wdXQoJ3RyYWNrLWJ0bicpIGRhdGE6IGFueSA9IHt9O1xuICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuICBldmVudERldGFpbHM6IGFueTtcblxuICAvKipcbiAgICogQnV0dG9uIFRyYWNraW5nIC0gQ29uc3RydWN0b3JcbiAgICogQHBhcmFtIGRhdGFTdG9yYWdlIC0gRGF0YVN0b3JhZ2VTZXJ2aWNlXG4gICAqIEBwYXJhbSBhbmFseXRpY3NTZXJ2aWNlXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFTdG9yYWdlOiBEYXRhU3RvcmFnZVNlcnZpY2UsIHByaXZhdGUgYW5hbHl0aWNzU2VydmljZTogQW5hbHl0aWNzU2VydmljZSkgeyB9XG5cblxuICAvKipcbiAgICogIExpc3RlbiB0byBidXR0b24gY2xpY2sgYWN0aW9uc1xuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKSBvbkNsaWNrKCRldmVudDogYW55KSB7XG4gICAgdGhpcy5ldmVudERldGFpbHMgPSAkZXZlbnQ7XG4gICAgdGhpcy5zZW5kRGF0YSgpO1xuICB9XG5cbiAgLyoqIFNlbmRpbmcgZGF0YSBvbiBidXR0b24gY2xpY2sgKi9cbiAgcHVibGljIHNlbmREYXRhKCk6IHZvaWQge1xuICAgIGNvbnN0IGFuYWx5dGljc0JlYW46IEFuYWx5dGljc0JlYW4gPVxuICAgICAgdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnNldEFuYWx5dGljc0RhdGEodGhpcy5kYXRhLCB0aGlzLmV2ZW50RGV0YWlscywgdGhpcy5ldmVudExhYmVscy5CVVRUT05fQ0xJQ0ssICcnKTtcbiAgICB0aGlzLmRhdGFTdG9yYWdlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkoYW5hbHl0aWNzQmVhbik7XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgT25DaGFuZ2VzLCBIb3N0TGlzdGVuZXIsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgRXZlbnRMYWJlbHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGlyZWN0aXZlLXNlbGVjdG9yXG4gICAgc2VsZWN0b3I6ICdbdHJhY2stc2Nyb2xsXSdcbn0pXG5leHBvcnQgY2xhc3MgU2Nyb2xsRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICAgIC8vIEdldHMgaW1wb3J0YW50IGRhdGEgYWJvdXQgdGhlIGNvbXBvbmVudCBleHBsaWNpdGx5IGZyb20gdGhlIGFwcGxpY2F0aW9uXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1pbnB1dC1yZW5hbWVcbiAgICBASW5wdXQoJ3RyYWNrLXNjcm9sbCcpIGRhdGE6IGFueSA9IHt9O1xuICAgIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBhbmFseXRpY3NTZXJ2aWNlOiBBbmFseXRpY3NTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGRhdGFTdG9yYWdlOiBEYXRhU3RvcmFnZVNlcnZpY2VcbiAgICApIHsgfVxuXG4gICAgLy8gQ2FwdHVyZSB0aGUgY2hhbmdlIGluIGRhdGFcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpIHtcbiAgICAgICAgdGhpcy5kYXRhID0gY2hhbmdlcy5kYXRhLmN1cnJlbnRWYWx1ZTtcbiAgICB9XG5cbiAgICAvLyBUcmlnZ2VyZWQgd2hlbiBhbnkgc2Nyb2xsIGV2ZW50IG9jY3Vyc1xuICAgIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpzY3JvbGwnLCBbJyRldmVudCddKSBvblNjcm9sbEV2ZW50KCRldmVudDogYW55KSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZW5kRGF0YSgkZXZlbnQpO1xuICAgICAgICB9LCAxMDApO1xuICAgIH1cblxuXG4gICAgcHVibGljIHNlbmREYXRhKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9XG4gICAgICAgICAgICB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YSh0aGlzLmRhdGEsIGV2ZW50LCB0aGlzLmV2ZW50TGFiZWxzLlNDUk9MTCwgJycpO1xuICAgICAgICB0aGlzLmRhdGFTdG9yYWdlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkoYW5hbHl0aWNzQmVhbik7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBFdmVudExhYmVscyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcblxuQERpcmVjdGl2ZSh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGlyZWN0aXZlLXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnW3RyYWNrLWJ1dHRvbkhvdmVyXSdcbn0pXG5leHBvcnQgY2xhc3MgQnV0dG9uSG92ZXJEaXJlY3RpdmUge1xuICAvKiogKi9cbiAgZXZlbnREZXRhaWxzOiBhbnk7XG4gIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG4gIC8vIEdldHMgaW1wb3J0YW50IGRhdGEgYWJvdXQgdGhlIGJ1dHRvbiBleHBsaWNpdGx5IGZyb20gdGhlIGFwcGxpY2F0aW9uXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgndHJhY2stYnV0dG9uSG92ZXInKSBkYXRhOiBhbnkgPSB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFTdG9yYWdlOiBEYXRhU3RvcmFnZVNlcnZpY2UsIHByaXZhdGUgYW5hbHl0aWNzU2VydmljZTogQW5hbHl0aWNzU2VydmljZSkgeyB9XG5cbiAgLy8gTGlzdGVuIHRvIGJ1dHRvbiBob3ZlciBhY3Rpb25zXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlb3ZlcicsIFsnJGV2ZW50J10pIG9uTW91c2VPdmVyKCRldmVudDogYW55KSB7XG4gICAgdGhpcy5ldmVudERldGFpbHMgPSAkZXZlbnQ7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnNlbmREYXRhKCk7XG4gICAgfSwgMTApO1xuICB9XG5cbiAgLy8gU2VuZGluZyBkYXRhIG9uIGJ1dHRvbiBob3ZlclxuICBwdWJsaWMgc2VuZERhdGEoKTogdm9pZCB7XG4gICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9XG4gICAgICB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YSh0aGlzLmRhdGEsIHRoaXMuZXZlbnREZXRhaWxzLCB0aGlzLmV2ZW50TGFiZWxzLk1PVVNFX0hPVkVSLCAnJyk7XG4gICAgdGhpcy5kYXRhU3RvcmFnZS5hcHBlbmRUb0FuYWx5dGljc0FycmF5KGFuYWx5dGljc0JlYW4pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FbmQsIE5hdmlnYXRpb25FcnJvciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnLi4vYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgRXZlbnRMYWJlbHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5kZWNsYXJlIGxldCBuZ1MzQW5hbHl0aWNzSlM6IGFueTtcbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFJvdXRlclNlcnZpY2Uge1xuICBhbmFseXRpY3NEYXRhOiBBbmFseXRpY3NCZWFuO1xuICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuICBuYXZpZ2F0ZU9uID0gJyc7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVzOiBSb3V0ZXIsIHByaXZhdGUgYW5hbHl0aWNzU2VydmljZTogQW5hbHl0aWNzU2VydmljZSwgcHJpdmF0ZSBkYXRhU3RvcmFnZTogRGF0YVN0b3JhZ2VTZXJ2aWNlKSB7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFja2luZyByb3V0ZXIgZXZlbnRzXG4gICAqL1xuICBwdWJsaWMgdHJhY2tSb3V0ZXJFdmVudHMoKTogdm9pZCB7XG4gICAgLyoqIFRyaWdnZXJlZCB3aGVuIGN1cnJlbnQgcGFnZSBpcyBsb2FkZWQgKi9cbiAgICB0aGlzLnJvdXRlcy5ldmVudHMuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgLyoqIFRyaWdnZXJlZCB3aGVuIE5hdmlnYXRpb25FbmQgZXZlbnQgb2NjdXJzICovXG4gICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSB7XG4gICAgICAgIGlmICh0aGlzLm5hdmlnYXRlT24gIT09IGV2ZW50LnVybCkge1xuICAgICAgICAgIHRoaXMuYW5hbHl0aWNzUHVzaERhdGEoZXZlbnQpO1xuICAgICAgICAgIHRoaXMubmF2aWdhdGVPbiA9IGV2ZW50LnVybDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FcnJvcikge1xuICAgICAgICAvKiogVHJpZ2dlcmVkIHdoZW4gTmF2aWdhdGlvbkVycm9yIGV2ZW50IG9jY3VycyAqL1xuICAgICAgICB0aGlzLmFuYWx5dGljc1B1c2hEYXRhKGV2ZW50KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQdXNoaW5nIGFuYWx5dGljcyBkYXRhXG4gICAqIEBwYXJhbSBldmVudCAtIFJvdXRlciBFdmVudFxuICAgKi9cbiAgcHVibGljIGFuYWx5dGljc1B1c2hEYXRhKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBzY3JlZW5zaG90TmFtZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpLnRvU3RyaW5nKCk7XG4gICAgdGhpcy5hbmFseXRpY3NEYXRhID0gdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnNldEFuYWx5dGljc0RhdGEoe30sIHt9LCB0aGlzLmV2ZW50TGFiZWxzLlBBR0VfTE9BRCwgYCR7c2NyZWVuc2hvdE5hbWV9Lmh0bWxgLFxuICAgICAgeyBldmVudENvbXBvbmVudDogZXZlbnQudXJsIH0pO1xuICAgIHRoaXMud2FpdFRpbGxQYWdlTG9hZChzY3JlZW5zaG90TmFtZSk7XG4gICAgLy8gRGF0YSBpcyBzZW5kIG9ubHkgd2hlbiB1c2VyIGNvbmZpZ3VyZSB0aGUgcGFnZSBsb2FkaW5nIHRvIGJlIHRydWVcbiAgICB0aGlzLmRhdGFTdG9yYWdlLnNldFVybEtleSh0aGlzLmFuYWx5dGljc0RhdGEuZXZlbnRDb21wb25lbnQpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5kYXRhU3RvcmFnZS5hcHBlbmRUb0FuYWx5dGljc0FycmF5KHRoaXMuYW5hbHl0aWNzRGF0YSk7XG4gICAgfSwgMCk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBXYWl0aW5nIGZvciBwYWdlIHRvIGxvYWQgY29tcGxldGVseVxuICAgKiBAcGFyYW0gZXZlbnQgXG4gICAqL1xuICB3YWl0VGlsbFBhZ2VMb2FkKHNjcmVlbnNob3ROYW1lOiBzdHJpbmcpIHtcbiAgICBjb25zdCBfc2VsZiA9IHRoaXM7XG4gICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgX3NlbGYuY2FwdHVyZVRlbXBsYXRlKHNjcmVlbnNob3ROYW1lKTtcbiAgICAgIH1cbiAgICB9LCAxMDAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYXB0dXJlIHRlbXBsYXRlIG9mIGxvYWRlZCB2aWV3XG4gICAqIEBwYXJhbSBzY3JlZW5zaG90TmFtZSAtIFNjcmVlbnNob3QgaW1hZ2VcbiAgICovXG4gIGNhcHR1cmVUZW1wbGF0ZShzY3JlZW5zaG90TmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgZnVsbFBhZ2VIVE1MID0gbmdTM0FuYWx5dGljc0pTLmNvbnN0cnVjdEhUTUxQYWdlKFxuICAgICAgdGhpcy5wcm9jZXNzUmVnZXhPcGVyYXRpb25zKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWQnKS5pbm5lckhUTUwpLFxuICAgICAgdGhpcy5wcm9jZXNzUmVnZXhPcGVyYXRpb25zKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5pbm5lckhUTUwpXG4gICAgKTtcbiAgICB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2F2ZVNjcmVlbnNob3RzSW5TMyhmdWxsUGFnZUhUTUwsIHNjcmVlbnNob3ROYW1lKTtcbiAgfVxuXG5cbiAgcHJvY2Vzc1JlZ2V4T3BlcmF0aW9ucyh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBuZ1MzQW5hbHl0aWNzSlMuZG9SZWdleCh0ZXh0LCB3aW5kb3cubG9jYXRpb24ub3JpZ2luKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5wdXQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnLi4vYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlJztcbmltcG9ydCB7IEV2ZW50TGFiZWxzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBQb2ludGVyU2VydmljZSB7XG5cbiAgZXZlbnRMYWJlbHMgPSBFdmVudExhYmVscztcbiAgZXZlbnREZXRhaWxzOiBhbnk7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgndHJhY2stcG9pbnRlcicpIGRhdGE6IGFueSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZSwgcHJpdmF0ZSBhbmFseXRpY3NTZXJ2aWNlOiBBbmFseXRpY3NTZXJ2aWNlKSB7IH1cblxuICAvKipcbiAgICogVHJhY2sgTW91c2UgTW92ZW1lbnRcbiAgICovXG4gIHRyYWNrTW91c2VNb3ZlRXZlbnQoKSB7XG4gICAgZnJvbUV2ZW50KHdpbmRvdywgJ21vdXNlbW92ZScpXG4gICAgICAuc3Vic2NyaWJlKChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuZXZlbnREZXRhaWxzID0gZTtcbiAgICAgICAgdGhpcy5zZW5kRGF0YSgpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUHVzaGluZyBNb3VzZSBNb3ZlIGRldGFpbHNcbiAgICovXG4gIHB1YmxpYyBzZW5kRGF0YSgpOiB2b2lkIHtcbiAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID1cbiAgICAgIHRoaXMuYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKHRoaXMuZGF0YSwgdGhpcy5ldmVudERldGFpbHMsIHRoaXMuZXZlbnRMYWJlbHMuTU9VU0VfTU9WRSwgJycpO1xuICAgIHRoaXMuZGF0YVN0b3JhZ2UuYXBwZW5kVG9BbmFseXRpY3NBcnJheShhbmFseXRpY3NCZWFuKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBFcnJvckhhbmRsZXIsIEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnLi4vYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBFdmVudExhYmVscyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcbmltcG9ydCB7IERhdGFTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZSc7XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgR2xvYmFsRXJyb3JIYW5kbGVyIHtcbiAgICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgfVxuXG4gICAgdHJhY2tDb25zb2xlRXJyb3JzKCkge1xuXG4gICAgICAgIGNvbnN0IGFuYWx5dGljc1NlcnZpY2UgPSB0aGlzLmluamVjdG9yLmdldChBbmFseXRpY3NTZXJ2aWNlKTtcbiAgICAgICAgY29uc3QgZGF0YVN0b3JhZ2VTZXJ2aWNlID0gdGhpcy5pbmplY3Rvci5nZXQoRGF0YVN0b3JhZ2VTZXJ2aWNlKTtcbiAgICAgICAgaWYgKHdpbmRvdy5jb25zb2xlICYmIGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnNvbGVFcnJvckZuT2JqZWN0ID0gY29uc29sZS5lcnJvcjtcbiAgICAgICAgICAgIGNvbnN0IF9zZWxmID0gdGhpcztcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IgPSBmdW5jdGlvbiAoLi4uZXJyb3I6IGFueVtdKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvY2Vzc2VkRXJyb3IgPSBlcnJvci5tYXAoZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKGUpID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG1heC1saW5lLWxlbmd0aFxuICAgICAgICAgICAgICAgIGNvbnN0IGFuYWx5dGljc0JlYW46IEFuYWx5dGljc0JlYW4gPSBhbmFseXRpY3NTZXJ2aWNlLnNldEFuYWx5dGljc0RhdGFcbiAgICAgICAgICAgICAgICAgICAgKCcnLCB7fSwgX3NlbGYuZXZlbnRMYWJlbHMuQ09OU09MRV9FUlJPUiwgJycsIHsgY29uc29sZUVycm9yczogSlNPTi5zdHJpbmdpZnkocHJvY2Vzc2VkRXJyb3IpIH0pO1xuICAgICAgICAgICAgICAgIGRhdGFTdG9yYWdlU2VydmljZS5hcHBlbmRUb0FuYWx5dGljc0FycmF5KGFuYWx5dGljc0JlYW4pO1xuICAgICAgICAgICAgICAgIGNvbnNvbGVFcnJvckZuT2JqZWN0LmNhbGwoY29uc29sZSwgZXJyb3IpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBFbGVtZW50UmVmLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEtleVN0cm9rZUV2ZW50VHlwZSwgRXZlbnRMYWJlbHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0ICogYXMgdXVpZCBmcm9tICd1dWlkJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vZW52aXJvbm1lbnQvZW52aXJvbm1lbnQnO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRpcmVjdGl2ZS1zZWxlY3RvclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3RyYWNrLWtleVN0cm9rZV0nIH0pXG5leHBvcnQgY2xhc3MgS2V5U3Ryb2tlRGlyZWN0aXZlIHtcblxuICAgIC8qKiBFdmVudCBMYWJlbHMgQ29uc3RhbnRzICovXG4gICAgZXZlbnRMYWJlbHMgPSBFdmVudExhYmVscztcblxuICAgIC8qKlxuICAgICAqIERlcGVuZGVuY2llc1xuICAgICAqIEBwYXJhbSBkYXRhU3RvcmFnZVxuICAgICAqIEBwYXJhbSBhbmFseXRpY3NTZXJ2aWNlXG4gICAgICogQHBhcmFtIGVsIC0gRWxlbWVudCBSZWZlcmVuY2VcbiAgICAgKiBAcGFyYW0gcmVuZGVyZXIgLSBSZW5kZXJlclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGRhdGFTdG9yYWdlOiBEYXRhU3RvcmFnZVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgYW5hbHl0aWNzU2VydmljZTogQW5hbHl0aWNzU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGlmIElkIGRvZXNuJ3QgYmVsb25ncyB0byB0aGUgZWxlbWVudCwgd2hpY2ggaXMgYmVpbmcgdHJhY2tlZCxcbiAgICAgICAgICogQWRkaW5nIGEgZHluYW1pYyBJZFxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKCF0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuaWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGR5bmFtaWNJZCA9IGBrZXlfc3Ryb2tlX2VsZW1lbnRfJHt1dWlkLnY0KCl9YDtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2lkJywgZHluYW1pY0lkKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJhY2tpbmcgS2V5IHByZXNzIGV2ZW50cyB1c2luZyBob3N0IGxpc3RlbmVyXG4gICAgICogR2VuZXJhdGluZyBhIGRhdGEgYmVhbiBpbiBhIHNwZWNpZmllZCBmb3JtYXRcbiAgICAgKiBAcGFyYW0gJGV2ZW50IC0gS2V5UHJlc3MgRXZlbnRcbiAgICAgKi9cbiAgICBASG9zdExpc3RlbmVyKCdrZXlwcmVzcycsIFsnJGV2ZW50J10pIG9uS2V5U3Ryb2tlKCRldmVudDogYW55KSB7XG4gICAgICAgIGNvbnN0IGtleVN0cm9rZTogS2V5U3Ryb2tlRXZlbnRUeXBlID0gbmV3IEtleVN0cm9rZUV2ZW50VHlwZSgpO1xuICAgICAgICBpZiAoJGV2ZW50LnRhcmdldC50eXBlICE9PSAncGFzc3dvcmQnICYmIHRoaXMuY2hlY2tDbGFzc05hbWVzKCRldmVudC50YXJnZXQuY2xhc3NMaXN0KSkge1xuICAgICAgICAgICAga2V5U3Ryb2tlLmVsZW1lbnRJZCA9ICRldmVudC50YXJnZXQuaWQ7XG4gICAgICAgICAgICBrZXlTdHJva2Uua2V5ID0gJGV2ZW50LmtleTtcbiAgICAgICAgICAgIGtleVN0cm9rZS5jb2RlID0gJGV2ZW50LmNvZGU7XG4gICAgICAgICAgICBrZXlTdHJva2Uua2V5Q29kZSA9ICRldmVudC5rZXlDb2RlLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBrZXlTdHJva2UuaXNGb3JtID0gJGV2ZW50LnRhcmdldC5mb3JtICE9PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBrZXlTdHJva2UuZm9ybSA9ICRldmVudC50YXJnZXQuZm9ybSAhPT0gdW5kZWZpbmVkID8gSlNPTi5zdHJpbmdpZnkoJGV2ZW50LnRhcmdldC5mb3JtLmVsZW1lbnRzKSA6ICcnO1xuICAgICAgICAgICAga2V5U3Ryb2tlLnRhZ05hbWUgPSAkZXZlbnQudGFyZ2V0LnRhZ05hbWU7XG4gICAgICAgICAgICBrZXlTdHJva2UuaHRtbEVsZW1lbnRUeXBlID0gJGV2ZW50LnRhcmdldC50eXBlO1xuICAgICAgICAgICAga2V5U3Ryb2tlLnZhbHVlID0gJGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuc2VuZERhdGEoa2V5U3Ryb2tlLCAkZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBjaGVja0NsYXNzTmFtZXMoY2xhc3NMaXN0OiBBcnJheTxzdHJpbmc+KSB7XG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZXM6IGFueSA9IFsuLi5jbGFzc0xpc3RdLmNvbmNhdChlbnZpcm9ubWVudC5pZ25vcmVDc3NSdWxlcyk7XG4gICAgICAgIHJldHVybiBbLi4ubmV3IFNldChjbGFzc05hbWVzKV0ubGVuZ3RoID09PSBjbGFzc05hbWVzLmxlbmd0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kaW5nIGRhdGFcbiAgICAgKiBAcGFyYW0ga2V5U3Ryb2tlIC0gQ2FwdHVyZWQgS2V5U3Ryb2tlIGRhdGFcbiAgICAgKiBAcGFyYW0gZXZlbnREZXRhaWxzIC0gS2V5IFByZXNzIGV2ZW50IGRldGFpbHNcbiAgICAgKi9cbiAgICBwcml2YXRlIHNlbmREYXRhKGtleVN0cm9rZTogS2V5U3Ryb2tlRXZlbnRUeXBlLCBldmVudERldGFpbHM6IGFueSk6IHZvaWQge1xuICAgICAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID1cbiAgICAgICAgICAgIHRoaXMuYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKHt9LFxuICAgICAgICAgICAgICAgIGV2ZW50RGV0YWlscyxcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50TGFiZWxzLktFWV9TVFJPS0UsICcnLFxuICAgICAgICAgICAgICAgIHsga2V5U3Ryb2tlRGF0YToga2V5U3Ryb2tlIH0pO1xuICAgICAgICB0aGlzLmRhdGFTdG9yYWdlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkoYW5hbHl0aWNzQmVhbik7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUzNBbmFseXRpY3NDb21wb25lbnQgfSBmcm9tICcuL25nLXMzLWFuYWx5dGljcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiB9IGZyb20gJy4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgQnV0dG9uRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2J1dHRvbi9idXR0b24uZGlyZWN0aXZlJztcbmltcG9ydCB7IFNjcm9sbERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9zY3JvbGwvc2Nyb2xsLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBCdXR0b25Ib3ZlckRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9idXR0b24taG92ZXIvYnV0dG9uLWhvdmVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBFbnZpcm9ubWVudFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2Vudmlyb25tZW50L2Vudmlyb25tZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgUm91dGVyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvcm91dGVyL3JvdXRlci5zZXJ2aWNlJztcbmltcG9ydCB7IGludGVydmFsIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9saWIvc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IFBvaW50ZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9wb2ludGVyL3BvaW50ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEdsb2JhbEVycm9ySGFuZGxlciB9IGZyb20gJy4vc2VydmljZXMvZXJyb3ItaGFuZGxlci9lcnJvckhhbmRsZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnbmd4LWNvb2tpZS1zZXJ2aWNlJztcbmltcG9ydCB7IEtleVN0cm9rZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9rZXktc3Ryb2tlL2tleS1zdHJva2UuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5nUzNBbmFseXRpY3NDb21wb25lbnQsXG4gICAgQnV0dG9uRGlyZWN0aXZlLFxuICAgIFNjcm9sbERpcmVjdGl2ZSxcbiAgICBCdXR0b25Ib3ZlckRpcmVjdGl2ZSxcbiAgICBLZXlTdHJva2VEaXJlY3RpdmVcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRGF0YVN0b3JhZ2VTZXJ2aWNlLFxuICAgIEVudmlyb25tZW50U2VydmljZSxcbiAgICBQb2ludGVyU2VydmljZSxcbiAgICBDb29raWVTZXJ2aWNlLFxuICAgIEdsb2JhbEVycm9ySGFuZGxlclxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTmdTM0FuYWx5dGljc0NvbXBvbmVudCxcbiAgICBCdXR0b25EaXJlY3RpdmUsXG4gICAgU2Nyb2xsRGlyZWN0aXZlLFxuICAgIEJ1dHRvbkhvdmVyRGlyZWN0aXZlLFxuICAgIEtleVN0cm9rZURpcmVjdGl2ZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5nUzNBbmFseXRpY3NNb2R1bGUge1xuXG4gIHByaXZhdGUgc3RhdGljIGVudmlyb25tZW50U2VydmljZSA9IG5ldyBFbnZpcm9ubWVudFNlcnZpY2UoKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlclNlcnZpY2U6IFJvdXRlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBkYXRhU3RvcmFnZTogRGF0YVN0b3JhZ2VTZXJ2aWNlLFxuICAgIHByaXZhdGUgcG9pbnRlclNlcnZpY2U6IFBvaW50ZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgZXJyb3JoYW5kbGVyOiBHbG9iYWxFcnJvckhhbmRsZXIpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgKGUpID0+IHtcbiAgICAgIHRoaXMuZGF0YVN0b3JhZ2UucHVzaERhdGFBcnJheVRvUzMoKTtcbiAgICB9KTtcbiAgICBpbnRlcnZhbCgxMDAwICogMikuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgdGhpcy5kYXRhU3RvcmFnZS5wdXNoRGF0YUFycmF5VG9TMygpO1xuICAgIH0pO1xuICAgIHRoaXMucG9pbnRlclNlcnZpY2UudHJhY2tNb3VzZU1vdmVFdmVudCgpO1xuICAgIHRoaXMucm91dGVyU2VydmljZS50cmFja1JvdXRlckV2ZW50cygpO1xuICAgIHRoaXMuZXJyb3JoYW5kbGVyLnRyYWNrQ29uc29sZUVycm9ycygpO1xuICB9XG4gIC8vIENvbmZpZ3VyaW5nIHRoZSBpbml0aWFsIHNldHVwIGZvciBzMyBidWNrZXQgYW5kIHBhZ2UgbG9hZGluZ1xuICBzdGF0aWMgZm9yUm9vdChjb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uLCBpc1BhZ2VMb2FkaW5nVG9CZURldGVjdGVkOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICB0aGlzLmVudmlyb25tZW50U2VydmljZS5zZXRDb25maWd1cmF0aW9uVG9FbnZpcm9ubWVudChjb25maWd1cmF0aW9uLCBpc1BhZ2VMb2FkaW5nVG9CZURldGVjdGVkKTtcbiAgICAvLyBBc3NpZ25pbmcgdGhlIGNvbmZpZ3VyYXRpb24gdG8gZW52aXJvbm1lbnQgdmFyaWFibGVzXG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJ1dWlkLnY0IiwidHNsaWJfMS5fX3ZhbHVlcyIsImludGVydmFsIiwidHNsaWJfMS5fX3NwcmVhZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0lBT0U7S0FBaUI7O2dCQUxsQixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7OytCQUpEO0NBUUM7Ozs7OztBQ1JEO0lBYUU7S0FBaUI7Ozs7SUFFakIseUNBQVE7OztJQUFSO0tBQ0M7O2dCQWRGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixRQUFRLEVBQUUsdURBSVQ7b0JBQ0QsTUFBTSxFQUFFLEVBQUU7aUJBQ1g7OztJQVFELDZCQUFDO0NBQUE7Ozs7Ozs7QUNsQkQsSUFBVyxXQUFXLEdBQUc7SUFDckIsaUJBQWlCLEVBQUUsOERBQThEO0lBQ2pGLHlC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