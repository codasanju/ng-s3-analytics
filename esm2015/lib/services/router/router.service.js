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
export class RouterService {
    /**
     * @param {?} routes
     * @param {?} analyticsService
     * @param {?} dataStorage
     * @param {?} document
     */
    constructor(routes, analyticsService, dataStorage, document) {
        this.routes = routes;
        this.analyticsService = analyticsService;
        this.dataStorage = dataStorage;
        this.document = document;
        this.eventLabels = EventLabels;
        this.navigateOn = '';
    }
    /**
     * Tracking router events
     * @return {?}
     */
    trackRouterEvents() {
        /** Triggered when current page is loaded */
        this.routes.events.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            /** Triggered when NavigationEnd event occurs */
            if (event instanceof NavigationEnd) {
                if (this.navigateOn !== event.url) {
                    this.analyticsPushData(event);
                    this.navigateOn = event.url;
                }
            }
            else if (event instanceof NavigationError) {
                /** Triggered when NavigationError event occurs */
                this.analyticsPushData(event);
            }
        }));
    }
    /**
     * Pushing analytics data
     * @param {?} event - Router Event
     * @return {?}
     */
    analyticsPushData(event) {
        /** @type {?} */
        const screenshotName = new Date().getTime().toString();
        this.analyticsData = this.analyticsService.setAnalyticsData({}, {}, this.eventLabels.PAGE_LOAD, `${screenshotName}.html`, event.url);
        this.waitTillPageLoad(screenshotName);
        // Data is send only when user configure the page loading to be true
        this.dataStorage.setUrlKey(this.analyticsData.eventComponent);
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.dataStorage.appendToAnalyticsArray(this.analyticsData);
        }), 0);
    }
    /**
     * Waiting for page to load completely
     * @param {?} screenshotName
     * @return {?}
     */
    waitTillPageLoad(screenshotName) {
        /** @type {?} */
        const _self = this;
        /** @type {?} */
        const interval = setInterval((/**
         * @return {?}
         */
        function () {
            if (this.document.readyState === 'complete') {
                clearInterval(interval);
                _self.captureTemplate(screenshotName);
            }
        }), 2000);
    }
    /**
     * Capture template of loaded view
     * @param {?} screenshotName - Screenshot image
     * @return {?}
     */
    captureTemplate(screenshotName) {
        /** @type {?} */
        const fullPageHTML = `<html>
      <head>
        ${this.processRegexOperations(this.document.head.innerHTML)}
        <style>body {scroll-behavior: smooth;}</style>
      </head>
      <body>
        ${this.processRegexOperations(this.document.body.innerHTML)}
        <script>
          window.addEventListener("message", (e) => {
            try{
              if(e.customData) {
              var data = JSON.parse(e.customData);
              if (data.scroll) {
                window.scroll(0, data.value);
              };
            }
          }catch(e) {console.error(e);}
          });
        </script>
      </body>
    </html>`;
        this.analyticsService.saveScreenshotsInS3(fullPageHTML, screenshotName);
    }
    /**
     * @param {?} text
     * @return {?}
     */
    processRegexOperations(text) {
        return text.replace(/src=\"\//g, `src="${window.location.origin}/`)
            .replace(/url\(\"\//g, `url("${window.location.origin}/`)
            .replace(/href="\//g, `href="${window.location.origin}/`)
            .replace(/src=\'\//g, `src='${window.location.origin}/`)
            .replace(/url\(\'\//g, `url('${window.location.origin}/`)
            .replace(/href=\'\//g, `href='${window.location.origin}/`)
            .replace(/<script.*<\/script>/g, '')
            .replace(/href="(?!http)/g, `href="${window.location.origin}/`);
    }
}
RouterService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
RouterService.ctorParameters = () => [
    { type: Router },
    { type: AnalyticsService },
    { type: DataStorageService },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
/** @nocollapse */ RouterService.ngInjectableDef = i0.defineInjectable({ factory: function RouterService_Factory() { return new RouterService(i0.inject(i1.Router), i0.inject(i2.AnalyticsService), i0.inject(i3.DataStorageService), i0.inject(i4.DOCUMENT)); }, token: RouterService, providedIn: "root" });
if (false) {
    /** @type {?} */
    RouterService.prototype.analyticsData;
    /** @type {?} */
    RouterService.prototype.eventLabels;
    /** @type {?} */
    RouterService.prototype.navigateOn;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvcm91dGVyL3JvdXRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUUxRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7Ozs7QUFJdEQsTUFBTTs7Ozs7OztJQUlKLFlBQW9CLE1BQWMsRUFBVSxnQkFBa0MsRUFBVSxXQUErQixFQUUzRixRQUFhO1FBRnJCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBRTNGLGFBQVEsR0FBUixRQUFRLENBQUs7UUFKekMsZ0JBQVcsR0FBRyxXQUFXLENBQUM7UUFDMUIsZUFBVSxHQUFHLEVBQUUsQ0FBQztJQUtoQixDQUFDOzs7OztJQUtNLGlCQUFpQjtRQUN0Qiw0Q0FBNEM7UUFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUzs7OztRQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDckMsZ0RBQWdEO1lBQ2hELElBQUksS0FBSyxZQUFZLGFBQWEsRUFBRTtnQkFDbEMsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLEtBQUssQ0FBQyxHQUFHLEVBQUU7b0JB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LENBQUM7OztZQXRHRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7OztZQVJRLE1BQU07WUFDTixnQkFBZ0I7WUFDaEIsa0JBQWtCOzRDQWF0QixNQUFNLFNBQUMsUUFBUTs7Ozs7SUFMbEIsc0NBQTZCOztJQUM3QixvQ0FBMEI7O0lBQzFCLG1DQUFnQjs7Ozs7SUFDSiwrQkFBc0I7Ozs7O0lBQUUseUNBQTBDOzs7OztJQUFFLG9DQUF1Qzs7Ozs7SUFFckgsaUNBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FbmQsIE5hdmlnYXRpb25FcnJvciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnLi4vYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IEV2ZW50TGFiZWxzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUm91dGVyU2VydmljZSB7XG4gIGFuYWx5dGljc0RhdGE6IEFuYWx5dGljc0JlYW47XG4gIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG4gIG5hdmlnYXRlT24gPSAnJztcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXM6IFJvdXRlciwgcHJpdmF0ZSBhbmFseXRpY3NTZXJ2aWNlOiBBbmFseXRpY3NTZXJ2aWNlLCBwcml2YXRlIGRhdGFTdG9yYWdlOiBEYXRhU3RvcmFnZVNlcnZpY2UsXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSkge1xuXG4gIH1cblxuICAvKipcbiAgICogVHJhY2tpbmcgcm91dGVyIGV2ZW50c1xuICAgKi9cbiAgcHVibGljIHRyYWNrUm91dGVyRXZlbnRzKCk6IHZvaWQge1xuICAgIC8qKiBUcmlnZ2VyZWQgd2hlbiBjdXJyZW50IHBhZ2UgaXMgbG9hZGVkICovXG4gICAgdGhpcy5yb3V0ZXMuZXZlbnRzLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgIC8qKiBUcmlnZ2VyZWQgd2hlbiBOYXZpZ2F0aW9uRW5kIGV2ZW50IG9jY3VycyAqL1xuICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkge1xuICAgICAgICBpZiAodGhpcy5uYXZpZ2F0ZU9uICE9PSBldmVudC51cmwpIHtcbiAgICAgICAgICB0aGlzLmFuYWx5dGljc1B1c2hEYXRhKGV2ZW50KTtcbiAgICAgICAgICB0aGlzLm5hdmlnYXRlT24gPSBldmVudC51cmw7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRXJyb3IpIHtcbiAgICAgICAgLyoqIFRyaWdnZXJlZCB3aGVuIE5hdmlnYXRpb25FcnJvciBldmVudCBvY2N1cnMgKi9cbiAgICAgICAgdGhpcy5hbmFseXRpY3NQdXNoRGF0YShldmVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUHVzaGluZyBhbmFseXRpY3MgZGF0YVxuICAgKiBAcGFyYW0gZXZlbnQgLSBSb3V0ZXIgRXZlbnRcbiAgICovXG4gIHB1YmxpYyBhbmFseXRpY3NQdXNoRGF0YShldmVudDogYW55KTogdm9pZCB7XG4gICAgY29uc3Qgc2NyZWVuc2hvdE5hbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKS50b1N0cmluZygpO1xuICAgIHRoaXMuYW5hbHl0aWNzRGF0YSA9IHRoaXMuYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKHt9LCB7fSwgdGhpcy5ldmVudExhYmVscy5QQUdFX0xPQUQsIGAke3NjcmVlbnNob3ROYW1lfS5odG1sYCwgZXZlbnQudXJsKTtcbiAgICB0aGlzLndhaXRUaWxsUGFnZUxvYWQoc2NyZWVuc2hvdE5hbWUpO1xuICAgIC8vIERhdGEgaXMgc2VuZCBvbmx5IHdoZW4gdXNlciBjb25maWd1cmUgdGhlIHBhZ2UgbG9hZGluZyB0byBiZSB0cnVlXG4gICAgdGhpcy5kYXRhU3RvcmFnZS5zZXRVcmxLZXkodGhpcy5hbmFseXRpY3NEYXRhLmV2ZW50Q29tcG9uZW50KTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZGF0YVN0b3JhZ2UuYXBwZW5kVG9BbmFseXRpY3NBcnJheSh0aGlzLmFuYWx5dGljc0RhdGEpO1xuICAgIH0sIDApO1xuICB9XG5cblxuICAvKipcbiAgICogV2FpdGluZyBmb3IgcGFnZSB0byBsb2FkIGNvbXBsZXRlbHlcbiAgICogQHBhcmFtIGV2ZW50IFxuICAgKi9cbiAgd2FpdFRpbGxQYWdlTG9hZChzY3JlZW5zaG90TmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3QgX3NlbGYgPSB0aGlzO1xuICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMuZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgX3NlbGYuY2FwdHVyZVRlbXBsYXRlKHNjcmVlbnNob3ROYW1lKTtcbiAgICAgIH1cbiAgICB9LCAyMDAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYXB0dXJlIHRlbXBsYXRlIG9mIGxvYWRlZCB2aWV3XG4gICAqIEBwYXJhbSBzY3JlZW5zaG90TmFtZSAtIFNjcmVlbnNob3QgaW1hZ2VcbiAgICovXG4gIGNhcHR1cmVUZW1wbGF0ZShzY3JlZW5zaG90TmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgZnVsbFBhZ2VIVE1MID0gYDxodG1sPlxuICAgICAgPGhlYWQ+XG4gICAgICAgICR7dGhpcy5wcm9jZXNzUmVnZXhPcGVyYXRpb25zKHRoaXMuZG9jdW1lbnQuaGVhZC5pbm5lckhUTUwpfVxuICAgICAgICA8c3R5bGU+Ym9keSB7c2Nyb2xsLWJlaGF2aW9yOiBzbW9vdGg7fTwvc3R5bGU+XG4gICAgICA8L2hlYWQ+XG4gICAgICA8Ym9keT5cbiAgICAgICAgJHt0aGlzLnByb2Nlc3NSZWdleE9wZXJhdGlvbnModGhpcy5kb2N1bWVudC5ib2R5LmlubmVySFRNTCl9XG4gICAgICAgIDxzY3JpcHQ+XG4gICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIChlKSA9PiB7XG4gICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgIGlmKGUuY3VzdG9tRGF0YSkge1xuICAgICAgICAgICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UoZS5jdXN0b21EYXRhKTtcbiAgICAgICAgICAgICAgaWYgKGRhdGEuc2Nyb2xsKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbCgwLCBkYXRhLnZhbHVlKTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9Y2F0Y2goZSkge2NvbnNvbGUuZXJyb3IoZSk7fVxuICAgICAgICAgIH0pO1xuICAgICAgICA8L3NjcmlwdD5cbiAgICAgIDwvYm9keT5cbiAgICA8L2h0bWw+YDtcblxuICAgIHRoaXMuYW5hbHl0aWNzU2VydmljZS5zYXZlU2NyZWVuc2hvdHNJblMzKGZ1bGxQYWdlSFRNTCwgc2NyZWVuc2hvdE5hbWUpO1xuICB9XG5cblxuICBwcm9jZXNzUmVnZXhPcGVyYXRpb25zKHRleHQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRleHQucmVwbGFjZSgvc3JjPVxcXCJcXC8vZywgYHNyYz1cIiR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vYClcbiAgICAgIC5yZXBsYWNlKC91cmxcXChcXFwiXFwvL2csIGB1cmwoXCIke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2ApXG4gICAgICAucmVwbGFjZSgvaHJlZj1cIlxcLy9nLCBgaHJlZj1cIiR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vYClcbiAgICAgIC5yZXBsYWNlKC9zcmM9XFwnXFwvL2csIGBzcmM9JyR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vYClcbiAgICAgIC5yZXBsYWNlKC91cmxcXChcXCdcXC8vZywgYHVybCgnJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufS9gKVxuICAgICAgLnJlcGxhY2UoL2hyZWY9XFwnXFwvL2csIGBocmVmPScke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2ApXG4gICAgICAucmVwbGFjZSgvPHNjcmlwdC4qPFxcL3NjcmlwdD4vZywgJycpXG4gICAgICAucmVwbGFjZSgvaHJlZj1cIig/IWh0dHApL2csIGBocmVmPVwiJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufS9gKTtcbiAgfVxufVxuIl19