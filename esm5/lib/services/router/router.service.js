/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
import { Router, NavigationEnd, NavigationError } from '@angular/router';
import { AnalyticsService } from '../analytics/analytics.service';
import { DataStorageService } from '../data-storage/data-storage.service';
import { DOCUMENT } from '@angular/platform-browser';
import { EventLabels } from '../../types/event.types';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../analytics/analytics.service";
import * as i3 from "../data-storage/data-storage.service";
import * as i4 from "@angular/platform-browser";
var RouterService = /** @class */ (function () {
    function RouterService(routes, analyticsService, dataStorage, document) {
        this.routes = routes;
        this.analyticsService = analyticsService;
        this.dataStorage = dataStorage;
        this.document = document;
        this.eventLabels = EventLabels;
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
                _this.analyticsPushData(event);
            }
            /** Triggered when NavigationError event occurs */
            if (event instanceof NavigationError) {
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
        this.analyticsData = this.analyticsService.setAnalyticsData({}, {}, this.eventLabels.PAGE_LOAD, screenshotName + ".html", event.url);
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
        var interval = setInterval((/**
         * @return {?}
         */
        function () {
            if (this.document.readyState === 'complete') {
                clearInterval(interval);
                _self.captureTemplate(screenshotName);
            }
        }), 2000);
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
        var fullPageHTML = "<html>\n      <head>\n        " + this.processRegexOperations(this.document.head.innerHTML) + "\n        <style>body {scroll-behavior: smooth;}</style>\n      </head>\n      <body>\n        " + this.processRegexOperations(this.document.body.innerHTML) + "\n        <script>\n          window.addEventListener(\"message\", (e) => {\n            try{\n              if(e.customData) {\n              var data = JSON.parse(e.customData);\n              if (data.scroll) {\n                window.scroll(0, data.value);\n              };\n            }\n          }catch(e) {console.log(e);}\n          });\n        </script>\n      </body>\n    </html>";
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
        return text.replace(/src=\"\//g, "src=\"" + window.location.origin + "/")
            .replace(/url\(\"\//g, "url(\"" + window.location.origin + "/")
            .replace(/href="\//g, "href=\"" + window.location.origin + "/")
            .replace(/src=\'\//g, "src='" + window.location.origin + "/")
            .replace(/url\(\'\//g, "url('" + window.location.origin + "/")
            .replace(/href=\'\//g, "href='" + window.location.origin + "/")
            .replace(/<script.*<\/script>/g, '')
            .replace(/href="(?!http)/g, "href=\"" + window.location.origin + "/");
    };
    RouterService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    RouterService.ctorParameters = function () { return [
        { type: Router },
        { type: AnalyticsService },
        { type: DataStorageService },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    /** @nocollapse */ RouterService.ngInjectableDef = i0.defineInjectable({ factory: function RouterService_Factory() { return new RouterService(i0.inject(i1.Router), i0.inject(i2.AnalyticsService), i0.inject(i3.DataStorageService), i0.inject(i4.DOCUMENT)); }, token: RouterService, providedIn: "root" });
    return RouterService;
}());
export { RouterService };
if (false) {
    /** @type {?} */
    RouterService.prototype.analyticsData;
    /** @type {?} */
    RouterService.prototype.eventLabels;
    /**
     * @type {?}
     * @private
     */
    RouterService.prototype.routes;
    /**
     * @type {?}
     * @private
     */
    RouterService.prototype.analyticsService;
    /**
     * @type {?}
     * @private
     */
    RouterService.prototype.dataStorage;
    /**
     * @type {?}
     * @private
     */
    RouterService.prototype.document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvcm91dGVyL3JvdXRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUUxRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7Ozs7QUFDdEQ7SUFNRSx1QkFBb0IsTUFBYyxFQUFVLGdCQUFrQyxFQUFVLFdBQStCLEVBRTNGLFFBQWE7UUFGckIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFFM0YsYUFBUSxHQUFSLFFBQVEsQ0FBSztRQUh6QyxnQkFBVyxHQUFHLFdBQVcsQ0FBQztJQUsxQixDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0kseUNBQWlCOzs7O0lBQXhCO1FBQUEsaUJBYUM7UUFaQyw0Q0FBNEM7UUFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUzs7OztRQUFDLFVBQUMsS0FBSztZQUNqQyxnREFBZ0Q7WUFDaEQsSUFBSSxLQUFLLFlBQVksYUFBYSxFQUFFO2dCQUNsQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDL0I7WUFFRCxrREFBa0Q7WUFDbEQsSUFBSSxLQUFLLFlBQVksZUFBZSxFQUFFO2dCQUNwQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDL0I7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7O09BR0c7Ozs7OztJQUNJLHlDQUFpQjs7Ozs7SUFBeEIsVUFBeUIsS0FBVTtRQUFuQyxpQkFTQzs7WUFSTyxjQUFjLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUU7UUFDdEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBSyxjQUFjLFVBQU8sRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckksSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3RDLG9FQUFvRTtRQUNwRSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzlELFVBQVU7OztRQUFDO1lBQ1QsS0FBSSxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDOUQsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQUdEOzs7T0FHRzs7Ozs7O0lBQ0gsd0NBQWdCOzs7OztJQUFoQixVQUFpQixjQUFzQjs7WUFDL0IsS0FBSyxHQUFHLElBQUk7O1lBQ1osUUFBUSxHQUFHLFdBQVc7OztRQUFDO1lBQzNCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEtBQUssVUFBVSxFQUFFO2dCQUMzQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3hCLEtBQUssQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDdkM7UUFDSCxDQUFDLEdBQUUsSUFBSSxDQUFDO0lBQ1YsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsdUNBQWU7Ozs7O0lBQWYsVUFBZ0IsY0FBc0I7O1lBQzlCLFlBQVksR0FBRyxtQ0FFZixJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLHVHQUl6RCxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLCtZQWN2RDtRQUVSLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDMUUsQ0FBQzs7Ozs7SUFHRCw4Q0FBc0I7Ozs7SUFBdEIsVUFBdUIsSUFBWTtRQUNqQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLFdBQVEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLE1BQUcsQ0FBQzthQUNoRSxPQUFPLENBQUMsWUFBWSxFQUFFLFdBQVEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLE1BQUcsQ0FBQzthQUN4RCxPQUFPLENBQUMsV0FBVyxFQUFFLFlBQVMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLE1BQUcsQ0FBQzthQUN4RCxPQUFPLENBQUMsV0FBVyxFQUFFLFVBQVEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLE1BQUcsQ0FBQzthQUN2RCxPQUFPLENBQUMsWUFBWSxFQUFFLFVBQVEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLE1BQUcsQ0FBQzthQUN4RCxPQUFPLENBQUMsWUFBWSxFQUFFLFdBQVMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLE1BQUcsQ0FBQzthQUN6RCxPQUFPLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxDQUFDO2FBQ25DLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxZQUFTLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxNQUFHLENBQUMsQ0FBQztJQUNwRSxDQUFDOztnQkFwR0YsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7O2dCQVJRLE1BQU07Z0JBQ04sZ0JBQWdCO2dCQUNoQixrQkFBa0I7Z0RBWXRCLE1BQU0sU0FBQyxRQUFROzs7d0JBZnBCO0NBNEdDLEFBckdELElBcUdDO1NBbEdZLGFBQWE7OztJQUN4QixzQ0FBNkI7O0lBQzdCLG9DQUEwQjs7Ozs7SUFDZCwrQkFBc0I7Ozs7O0lBQUUseUNBQTBDOzs7OztJQUFFLG9DQUF1Qzs7Ozs7SUFFckgsaUNBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FbmQsIE5hdmlnYXRpb25FcnJvciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnLi4vYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IEV2ZW50TGFiZWxzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUm91dGVyU2VydmljZSB7XG4gIGFuYWx5dGljc0RhdGE6IEFuYWx5dGljc0JlYW47XG4gIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVzOiBSb3V0ZXIsIHByaXZhdGUgYW5hbHl0aWNzU2VydmljZTogQW5hbHl0aWNzU2VydmljZSwgcHJpdmF0ZSBkYXRhU3RvcmFnZTogRGF0YVN0b3JhZ2VTZXJ2aWNlLFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnkpIHtcblxuICB9XG5cbiAgLyoqXG4gICAqIFRyYWNraW5nIHJvdXRlciBldmVudHNcbiAgICovXG4gIHB1YmxpYyB0cmFja1JvdXRlckV2ZW50cygpOiB2b2lkIHtcbiAgICAvKiogVHJpZ2dlcmVkIHdoZW4gY3VycmVudCBwYWdlIGlzIGxvYWRlZCAqL1xuICAgIHRoaXMucm91dGVzLmV2ZW50cy5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAvKiogVHJpZ2dlcmVkIHdoZW4gTmF2aWdhdGlvbkVuZCBldmVudCBvY2N1cnMgKi9cbiAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcbiAgICAgICAgdGhpcy5hbmFseXRpY3NQdXNoRGF0YShldmVudCk7XG4gICAgICB9XG5cbiAgICAgIC8qKiBUcmlnZ2VyZWQgd2hlbiBOYXZpZ2F0aW9uRXJyb3IgZXZlbnQgb2NjdXJzICovXG4gICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRXJyb3IpIHtcbiAgICAgICAgdGhpcy5hbmFseXRpY3NQdXNoRGF0YShldmVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUHVzaGluZyBhbmFseXRpY3MgZGF0YVxuICAgKiBAcGFyYW0gZXZlbnQgLSBSb3V0ZXIgRXZlbnRcbiAgICovXG4gIHB1YmxpYyBhbmFseXRpY3NQdXNoRGF0YShldmVudDogYW55KTogdm9pZCB7XG4gICAgY29uc3Qgc2NyZWVuc2hvdE5hbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKS50b1N0cmluZygpO1xuICAgIHRoaXMuYW5hbHl0aWNzRGF0YSA9IHRoaXMuYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKHt9LCB7fSwgdGhpcy5ldmVudExhYmVscy5QQUdFX0xPQUQsIGAke3NjcmVlbnNob3ROYW1lfS5odG1sYCwgZXZlbnQudXJsKTtcbiAgICB0aGlzLndhaXRUaWxsUGFnZUxvYWQoc2NyZWVuc2hvdE5hbWUpO1xuICAgIC8vIERhdGEgaXMgc2VuZCBvbmx5IHdoZW4gdXNlciBjb25maWd1cmUgdGhlIHBhZ2UgbG9hZGluZyB0byBiZSB0cnVlXG4gICAgdGhpcy5kYXRhU3RvcmFnZS5zZXRVcmxLZXkodGhpcy5hbmFseXRpY3NEYXRhLmV2ZW50Q29tcG9uZW50KTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZGF0YVN0b3JhZ2UuYXBwZW5kVG9BbmFseXRpY3NBcnJheSh0aGlzLmFuYWx5dGljc0RhdGEpO1xuICAgIH0sIDApO1xuICB9XG5cblxuICAvKipcbiAgICogV2FpdGluZyBmb3IgcGFnZSB0byBsb2FkIGNvbXBsZXRlbHlcbiAgICogQHBhcmFtIGV2ZW50IFxuICAgKi9cbiAgd2FpdFRpbGxQYWdlTG9hZChzY3JlZW5zaG90TmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3QgX3NlbGYgPSB0aGlzO1xuICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMuZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgX3NlbGYuY2FwdHVyZVRlbXBsYXRlKHNjcmVlbnNob3ROYW1lKTtcbiAgICAgIH1cbiAgICB9LCAyMDAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYXB0dXJlIHRlbXBsYXRlIG9mIGxvYWRlZCB2aWV3XG4gICAqIEBwYXJhbSBzY3JlZW5zaG90TmFtZSAtIFNjcmVlbnNob3QgaW1hZ2VcbiAgICovXG4gIGNhcHR1cmVUZW1wbGF0ZShzY3JlZW5zaG90TmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgZnVsbFBhZ2VIVE1MID0gYDxodG1sPlxuICAgICAgPGhlYWQ+XG4gICAgICAgICR7dGhpcy5wcm9jZXNzUmVnZXhPcGVyYXRpb25zKHRoaXMuZG9jdW1lbnQuaGVhZC5pbm5lckhUTUwpfVxuICAgICAgICA8c3R5bGU+Ym9keSB7c2Nyb2xsLWJlaGF2aW9yOiBzbW9vdGg7fTwvc3R5bGU+XG4gICAgICA8L2hlYWQ+XG4gICAgICA8Ym9keT5cbiAgICAgICAgJHt0aGlzLnByb2Nlc3NSZWdleE9wZXJhdGlvbnModGhpcy5kb2N1bWVudC5ib2R5LmlubmVySFRNTCl9XG4gICAgICAgIDxzY3JpcHQ+XG4gICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIChlKSA9PiB7XG4gICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgIGlmKGUuY3VzdG9tRGF0YSkge1xuICAgICAgICAgICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UoZS5jdXN0b21EYXRhKTtcbiAgICAgICAgICAgICAgaWYgKGRhdGEuc2Nyb2xsKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbCgwLCBkYXRhLnZhbHVlKTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9Y2F0Y2goZSkge2NvbnNvbGUubG9nKGUpO31cbiAgICAgICAgICB9KTtcbiAgICAgICAgPC9zY3JpcHQ+XG4gICAgICA8L2JvZHk+XG4gICAgPC9odG1sPmA7XG5cbiAgICB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2F2ZVNjcmVlbnNob3RzSW5TMyhmdWxsUGFnZUhUTUwsIHNjcmVlbnNob3ROYW1lKTtcbiAgfVxuXG5cbiAgcHJvY2Vzc1JlZ2V4T3BlcmF0aW9ucyh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoL3NyYz1cXFwiXFwvL2csIGBzcmM9XCIke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2ApXG4gICAgICAucmVwbGFjZSgvdXJsXFwoXFxcIlxcLy9nLCBgdXJsKFwiJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufS9gKVxuICAgICAgLnJlcGxhY2UoL2hyZWY9XCJcXC8vZywgYGhyZWY9XCIke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2ApXG4gICAgICAucmVwbGFjZSgvc3JjPVxcJ1xcLy9nLCBgc3JjPScke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2ApXG4gICAgICAucmVwbGFjZSgvdXJsXFwoXFwnXFwvL2csIGB1cmwoJyR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vYClcbiAgICAgIC5yZXBsYWNlKC9ocmVmPVxcJ1xcLy9nLCBgaHJlZj0nJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufS9gKVxuICAgICAgLnJlcGxhY2UoLzxzY3JpcHQuKjxcXC9zY3JpcHQ+L2csICcnKVxuICAgICAgLnJlcGxhY2UoL2hyZWY9XCIoPyFodHRwKS9nLCBgaHJlZj1cIiR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vYCk7XG4gIH1cbn1cbiJdfQ==