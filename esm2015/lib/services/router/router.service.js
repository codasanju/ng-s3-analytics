/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
import { Router, NavigationEnd, NavigationError } from '@angular/router';
import { AnalyticsService } from '../analytics/analytics.service';
import { DataStorageService } from '../data-storage/data-storage.service';
// import html2canvas from 'html2canvas';
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
                this.analyticsPushData(event);
            }
            /** Triggered when NavigationError event occurs */
            if (event instanceof NavigationError) {
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
        this.dataStorage.appendToAnalyticsArray(this.analyticsData);
    }
    /**
       * Capturing Screenshot of the page
       * @param screenshotName uploaded screenshot name
       *
      public captureScreenshot(screenshotName: string): void {
        console.log('called');
        html2canvas(document.body, {
          logging: true,
          allowTaint: true,
          width: document.body.clientWidth,
          height: document.body.scrollHeight || window.innerHeight
        }).then((canvas) => {
          // this.analyticsService.saveScreenshotsInS3(canvas.toDataURL(), screenshotName);
          console.log('image uploading...');
        }).catch(error => {
          console.log('error', error);
        });
      }
      */
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
          }catch(e) {console.log(e);}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvcm91dGVyL3JvdXRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQzs7QUFHMUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7O0FBSXRELE1BQU07Ozs7Ozs7SUFHSixZQUFvQixNQUFjLEVBQVUsZ0JBQWtDLEVBQVUsV0FBK0IsRUFFM0YsUUFBYTtRQUZyQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUUzRixhQUFRLEdBQVIsUUFBUSxDQUFLO1FBSHpDLGdCQUFXLEdBQUcsV0FBVyxDQUFDO0lBSzFCLENBQUM7Ozs7O0lBS00saUJBQWlCO1FBQ3RCLDRDQUE0QztRQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTOzs7O1FBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNyQyxnREFBZ0Q7WUFDaEQsSUFBSSxLQUFLLFlBQVksYUFBYSxFQUFFO2dCQUNsQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDL0I7WUFFRCxrREFBa0Q7WUFDbEQsSUFBSSxLQUFLLFlB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QTBDOzs7OztJQUFFLG9DQUF1Qzs7Ozs7SUFFckgsaUNBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FbmQsIE5hdmlnYXRpb25FcnJvciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnLi4vYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuLy8gaW1wb3J0IGh0bWwyY2FudmFzIGZyb20gJ2h0bWwyY2FudmFzJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBFdmVudExhYmVscyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFJvdXRlclNlcnZpY2Uge1xuICBhbmFseXRpY3NEYXRhOiBBbmFseXRpY3NCZWFuO1xuICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlczogUm91dGVyLCBwcml2YXRlIGFuYWx5dGljc1NlcnZpY2U6IEFuYWx5dGljc1NlcnZpY2UsIHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZSxcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55KSB7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFja2luZyByb3V0ZXIgZXZlbnRzXG4gICAqL1xuICBwdWJsaWMgdHJhY2tSb3V0ZXJFdmVudHMoKTogdm9pZCB7XG4gICAgLyoqIFRyaWdnZXJlZCB3aGVuIGN1cnJlbnQgcGFnZSBpcyBsb2FkZWQgKi9cbiAgICB0aGlzLnJvdXRlcy5ldmVudHMuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgLyoqIFRyaWdnZXJlZCB3aGVuIE5hdmlnYXRpb25FbmQgZXZlbnQgb2NjdXJzICovXG4gICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSB7XG4gICAgICAgIHRoaXMuYW5hbHl0aWNzUHVzaERhdGEoZXZlbnQpO1xuICAgICAgfVxuXG4gICAgICAvKiogVHJpZ2dlcmVkIHdoZW4gTmF2aWdhdGlvbkVycm9yIGV2ZW50IG9jY3VycyAqL1xuICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVycm9yKSB7XG4gICAgICAgIHRoaXMuYW5hbHl0aWNzUHVzaERhdGEoZXZlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFB1c2hpbmcgYW5hbHl0aWNzIGRhdGFcbiAgICogQHBhcmFtIGV2ZW50IC0gUm91dGVyIEV2ZW50XG4gICAqL1xuICBwdWJsaWMgYW5hbHl0aWNzUHVzaERhdGEoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHNjcmVlbnNob3ROYW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkudG9TdHJpbmcoKTtcbiAgICB0aGlzLmFuYWx5dGljc0RhdGEgPSB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YSh7fSwge30sIHRoaXMuZXZlbnRMYWJlbHMuUEFHRV9MT0FELCBgJHtzY3JlZW5zaG90TmFtZX0uaHRtbGAsIGV2ZW50LnVybCk7XG4gICAgdGhpcy53YWl0VGlsbFBhZ2VMb2FkKHNjcmVlbnNob3ROYW1lKTtcbiAgICAvLyBEYXRhIGlzIHNlbmQgb25seSB3aGVuIHVzZXIgY29uZmlndXJlIHRoZSBwYWdlIGxvYWRpbmcgdG8gYmUgdHJ1ZVxuICAgIHRoaXMuZGF0YVN0b3JhZ2Uuc2V0VXJsS2V5KHRoaXMuYW5hbHl0aWNzRGF0YS5ldmVudENvbXBvbmVudCk7XG4gICAgdGhpcy5kYXRhU3RvcmFnZS5hcHBlbmRUb0FuYWx5dGljc0FycmF5KHRoaXMuYW5hbHl0aWNzRGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogQ2FwdHVyaW5nIFNjcmVlbnNob3Qgb2YgdGhlIHBhZ2VcbiAgICogQHBhcmFtIHNjcmVlbnNob3ROYW1lIHVwbG9hZGVkIHNjcmVlbnNob3QgbmFtZVxuICAgKlxuICBwdWJsaWMgY2FwdHVyZVNjcmVlbnNob3Qoc2NyZWVuc2hvdE5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCdjYWxsZWQnKTtcbiAgICBodG1sMmNhbnZhcyhkb2N1bWVudC5ib2R5LCB7XG4gICAgICBsb2dnaW5nOiB0cnVlLFxuICAgICAgYWxsb3dUYWludDogdHJ1ZSxcbiAgICAgIHdpZHRoOiBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoLFxuICAgICAgaGVpZ2h0OiBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCB8fCB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICB9KS50aGVuKChjYW52YXMpID0+IHtcbiAgICAgIC8vIHRoaXMuYW5hbHl0aWNzU2VydmljZS5zYXZlU2NyZWVuc2hvdHNJblMzKGNhbnZhcy50b0RhdGFVUkwoKSwgc2NyZWVuc2hvdE5hbWUpO1xuICAgICAgY29uc29sZS5sb2coJ2ltYWdlIHVwbG9hZGluZy4uLicpO1xuICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicsIGVycm9yKTtcbiAgICB9KTtcbiAgfVxuICAqL1xuXG5cbiAgLyoqXG4gICAqIFdhaXRpbmcgZm9yIHBhZ2UgdG8gbG9hZCBjb21wbGV0ZWx5XG4gICAqIEBwYXJhbSBldmVudCBcbiAgICovXG4gIHdhaXRUaWxsUGFnZUxvYWQoc2NyZWVuc2hvdE5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IF9zZWxmID0gdGhpcztcbiAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLmRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgIF9zZWxmLmNhcHR1cmVUZW1wbGF0ZShzY3JlZW5zaG90TmFtZSk7XG4gICAgICB9XG4gICAgfSwgMjAwMCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FwdHVyZSB0ZW1wbGF0ZSBvZiBsb2FkZWQgdmlld1xuICAgKiBAcGFyYW0gc2NyZWVuc2hvdE5hbWUgLSBTY3JlZW5zaG90IGltYWdlXG4gICAqL1xuICBjYXB0dXJlVGVtcGxhdGUoc2NyZWVuc2hvdE5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGZ1bGxQYWdlSFRNTCA9IGA8aHRtbD5cbiAgICAgIDxoZWFkPlxuICAgICAgICAke3RoaXMucHJvY2Vzc1JlZ2V4T3BlcmF0aW9ucyh0aGlzLmRvY3VtZW50LmhlYWQuaW5uZXJIVE1MKX1cbiAgICAgICAgPHN0eWxlPmJvZHkge3Njcm9sbC1iZWhhdmlvcjogc21vb3RoO308L3N0eWxlPlxuICAgICAgPC9oZWFkPlxuICAgICAgPGJvZHk+XG4gICAgICAgICR7dGhpcy5wcm9jZXNzUmVnZXhPcGVyYXRpb25zKHRoaXMuZG9jdW1lbnQuYm9keS5pbm5lckhUTUwpfVxuICAgICAgICA8c2NyaXB0PlxuICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICBpZihlLmN1c3RvbURhdGEpIHtcbiAgICAgICAgICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKGUuY3VzdG9tRGF0YSk7XG4gICAgICAgICAgICAgIGlmIChkYXRhLnNjcm9sbCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGwoMCwgZGF0YS52YWx1ZSk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfWNhdGNoKGUpIHtjb25zb2xlLmxvZyhlKTt9XG4gICAgICAgICAgfSk7XG4gICAgICAgIDwvc2NyaXB0PlxuICAgICAgPC9ib2R5PlxuICAgIDwvaHRtbD5gO1xuXG4gICAgdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnNhdmVTY3JlZW5zaG90c0luUzMoZnVsbFBhZ2VIVE1MLCBzY3JlZW5zaG90TmFtZSk7XG4gIH1cblxuXG4gIHByb2Nlc3NSZWdleE9wZXJhdGlvbnModGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGV4dC5yZXBsYWNlKC9zcmM9XFxcIlxcLy9nLCBgc3JjPVwiJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufS9gKVxuICAgICAgLnJlcGxhY2UoL3VybFxcKFxcXCJcXC8vZywgYHVybChcIiR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vYClcbiAgICAgIC5yZXBsYWNlKC9ocmVmPVwiXFwvL2csIGBocmVmPVwiJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufS9gKVxuICAgICAgLnJlcGxhY2UoL3NyYz1cXCdcXC8vZywgYHNyYz0nJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufS9gKVxuICAgICAgLnJlcGxhY2UoL3VybFxcKFxcJ1xcLy9nLCBgdXJsKCcke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2ApXG4gICAgICAucmVwbGFjZSgvaHJlZj1cXCdcXC8vZywgYGhyZWY9JyR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vYClcbiAgICAgIC5yZXBsYWNlKC88c2NyaXB0Lio8XFwvc2NyaXB0Pi9nLCAnJylcbiAgICAgIC5yZXBsYWNlKC9ocmVmPVwiKD8haHR0cCkvZywgYGhyZWY9XCIke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2ApO1xuICB9XG59XG4iXX0=