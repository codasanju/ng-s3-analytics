/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Router, NavigationEnd, NavigationError } from '@angular/router';
import { AnalyticsService } from '../analytics/analytics.service';
import { DataStorageService } from '../data-storage/data-storage.service';
import { EventLabels } from '../../types/event.types';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../analytics/analytics.service";
import * as i3 from "../data-storage/data-storage.service";
export class RouterService {
    /**
     * @param {?} routes
     * @param {?} analyticsService
     * @param {?} dataStorage
     */
    constructor(routes, analyticsService, dataStorage) {
        this.routes = routes;
        this.analyticsService = analyticsService;
        this.dataStorage = dataStorage;
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
        this.analyticsData = this.analyticsService.setAnalyticsData({}, {}, this.eventLabels.PAGE_LOAD, `${screenshotName}.html`, { eventComponent: event.url });
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
            if (document.readyState === 'complete') {
                clearInterval(interval);
                _self.captureTemplate(screenshotName);
            }
        }), 1000);
    }
    /**
     * Capture template of loaded view
     * @param {?} screenshotName - Screenshot image
     * @return {?}
     */
    captureTemplate(screenshotName) {
        /** @type {?} */
        const fullPageHTML = ngS3AnalyticsJS.constructHTMLPage(this.processRegexOperations(document.querySelector('head').innerHTML), this.processRegexOperations(document.querySelector('body').innerHTML));
        this.analyticsService.saveScreenshotsInS3(fullPageHTML, screenshotName);
    }
    /**
     * @param {?} text
     * @return {?}
     */
    processRegexOperations(text) {
        return ngS3AnalyticsJS.doRegex(text, window.location.origin);
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
    { type: DataStorageService }
];
/** @nocollapse */ RouterService.ngInjectableDef = i0.defineInjectable({ factory: function RouterService_Factory() { return new RouterService(i0.inject(i1.Router), i0.inject(i2.AnalyticsService), i0.inject(i3.DataStorageService)); }, token: RouterService, providedIn: "root" });
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvcm91dGVyL3JvdXRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBRTFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7QUFLdEQsTUFBTTs7Ozs7O0lBSUosWUFBb0IsTUFBYyxFQUFVLGdCQUFrQyxFQUFVLFdBQStCO1FBQW5HLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBRnZILGdCQUFXLEdBQUcsV0FBVyxDQUFDO1FBQzFCLGVBQVUsR0FBRyxFQUFFLENBQUM7SUFHaEIsQ0FBQzs7Ozs7SUFLTSxpQkFBaUI7UUFDdEIsNENBQTRDO1FBQzVDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVM7Ozs7UUFBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3JDLGdEQUFnRDtZQUNoRCxJQUFJLEtBQUssWUFBWSxhQUFhLEVBQUU7Z0JBQ2xDLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxLQUFLLENBQUMsR0FBRyxFQUFFO29CQUNqQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztpQkFDN0I7YUFDRjtpQkFBTSxJQUFJLEtBQUssWUFBWSxlQUFlLEVBQUU7Z0JBQzNDLGtEQUFrRDtnQkFDbEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQy9CO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7SUFNTSxpQkFBaUIsQ0FBQyxLQUFVOztjQUMzQixjQUFjLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUU7UUFDdEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxHQUFHLGNBQWMsT0FBTyxFQUN0SCxFQUFFLGNBQWMsRUFBRSxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDdEMsb0VBQW9FO1FBQ3BFLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDOUQsVUFBVTs7O1FBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDOUQsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQzs7Ozs7O0lBT0QsZ0JBQWdCLENBQUMsY0FBc0I7O2NBQy9CLEtBQUssR0FBRyxJQUFJOztjQUNaLFFBQVEsR0FBRyxXQUFXOzs7UUFBQztZQUMzQixJQUFJLFFBQVEsQ0FBQyxVQUFVLEtBQUssVUFBVSxFQUFFO2dCQUN0QyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3hCLEtBQUssQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDdkM7UUFDSCxDQUFDLEdBQUUsSUFBSSxDQUFDO0lBQ1YsQ0FBQzs7Ozs7O0lBTUQsZUFBZSxDQUFDLGNBQXNCOztjQUM5QixZQUFZLEdBQUcsZUFBZSxDQUFDLGlCQUFpQixDQUNwRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFDckUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQ3RFO1FBQ0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDLFlBQVksRUFBRSxjQUFjLENBQUMsQ0FBQztJQUMxRSxDQUFDOzs7OztJQUdELHNCQUFzQixDQUFDLElBQVk7UUFDakMsT0FBTyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9ELENBQUM7OztZQTVFRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7OztZQVJRLE1BQU07WUFDTixnQkFBZ0I7WUFDaEIsa0JBQWtCOzs7OztJQVF6QixzQ0FBNkI7O0lBQzdCLG9DQUEwQjs7SUFDMUIsbUNBQWdCOzs7OztJQUNKLCtCQUFzQjs7Ozs7SUFBRSx5Q0FBMEM7Ozs7O0lBQUUsb0NBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRW5kLCBOYXZpZ2F0aW9uRXJyb3IgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9kYXRhLXN0b3JhZ2UvZGF0YS1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IEV2ZW50TGFiZWxzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuZGVjbGFyZSBsZXQgbmdTM0FuYWx5dGljc0pTOiBhbnk7XG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBSb3V0ZXJTZXJ2aWNlIHtcbiAgYW5hbHl0aWNzRGF0YTogQW5hbHl0aWNzQmVhbjtcbiAgZXZlbnRMYWJlbHMgPSBFdmVudExhYmVscztcbiAgbmF2aWdhdGVPbiA9ICcnO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlczogUm91dGVyLCBwcml2YXRlIGFuYWx5dGljc1NlcnZpY2U6IEFuYWx5dGljc1NlcnZpY2UsIHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZSkge1xuXG4gIH1cblxuICAvKipcbiAgICogVHJhY2tpbmcgcm91dGVyIGV2ZW50c1xuICAgKi9cbiAgcHVibGljIHRyYWNrUm91dGVyRXZlbnRzKCk6IHZvaWQge1xuICAgIC8qKiBUcmlnZ2VyZWQgd2hlbiBjdXJyZW50IHBhZ2UgaXMgbG9hZGVkICovXG4gICAgdGhpcy5yb3V0ZXMuZXZlbnRzLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgIC8qKiBUcmlnZ2VyZWQgd2hlbiBOYXZpZ2F0aW9uRW5kIGV2ZW50IG9jY3VycyAqL1xuICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkge1xuICAgICAgICBpZiAodGhpcy5uYXZpZ2F0ZU9uICE9PSBldmVudC51cmwpIHtcbiAgICAgICAgICB0aGlzLmFuYWx5dGljc1B1c2hEYXRhKGV2ZW50KTtcbiAgICAgICAgICB0aGlzLm5hdmlnYXRlT24gPSBldmVudC51cmw7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRXJyb3IpIHtcbiAgICAgICAgLyoqIFRyaWdnZXJlZCB3aGVuIE5hdmlnYXRpb25FcnJvciBldmVudCBvY2N1cnMgKi9cbiAgICAgICAgdGhpcy5hbmFseXRpY3NQdXNoRGF0YShldmVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUHVzaGluZyBhbmFseXRpY3MgZGF0YVxuICAgKiBAcGFyYW0gZXZlbnQgLSBSb3V0ZXIgRXZlbnRcbiAgICovXG4gIHB1YmxpYyBhbmFseXRpY3NQdXNoRGF0YShldmVudDogYW55KTogdm9pZCB7XG4gICAgY29uc3Qgc2NyZWVuc2hvdE5hbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKS50b1N0cmluZygpO1xuICAgIHRoaXMuYW5hbHl0aWNzRGF0YSA9IHRoaXMuYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKHt9LCB7fSwgdGhpcy5ldmVudExhYmVscy5QQUdFX0xPQUQsIGAke3NjcmVlbnNob3ROYW1lfS5odG1sYCxcbiAgICAgIHsgZXZlbnRDb21wb25lbnQ6IGV2ZW50LnVybCB9KTtcbiAgICB0aGlzLndhaXRUaWxsUGFnZUxvYWQoc2NyZWVuc2hvdE5hbWUpO1xuICAgIC8vIERhdGEgaXMgc2VuZCBvbmx5IHdoZW4gdXNlciBjb25maWd1cmUgdGhlIHBhZ2UgbG9hZGluZyB0byBiZSB0cnVlXG4gICAgdGhpcy5kYXRhU3RvcmFnZS5zZXRVcmxLZXkodGhpcy5hbmFseXRpY3NEYXRhLmV2ZW50Q29tcG9uZW50KTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZGF0YVN0b3JhZ2UuYXBwZW5kVG9BbmFseXRpY3NBcnJheSh0aGlzLmFuYWx5dGljc0RhdGEpO1xuICAgIH0sIDApO1xuICB9XG5cblxuICAvKipcbiAgICogV2FpdGluZyBmb3IgcGFnZSB0byBsb2FkIGNvbXBsZXRlbHlcbiAgICogQHBhcmFtIGV2ZW50IFxuICAgKi9cbiAgd2FpdFRpbGxQYWdlTG9hZChzY3JlZW5zaG90TmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3QgX3NlbGYgPSB0aGlzO1xuICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgIF9zZWxmLmNhcHR1cmVUZW1wbGF0ZShzY3JlZW5zaG90TmFtZSk7XG4gICAgICB9XG4gICAgfSwgMTAwMCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FwdHVyZSB0ZW1wbGF0ZSBvZiBsb2FkZWQgdmlld1xuICAgKiBAcGFyYW0gc2NyZWVuc2hvdE5hbWUgLSBTY3JlZW5zaG90IGltYWdlXG4gICAqL1xuICBjYXB0dXJlVGVtcGxhdGUoc2NyZWVuc2hvdE5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGZ1bGxQYWdlSFRNTCA9IG5nUzNBbmFseXRpY3NKUy5jb25zdHJ1Y3RIVE1MUGFnZShcbiAgICAgIHRoaXMucHJvY2Vzc1JlZ2V4T3BlcmF0aW9ucyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJykuaW5uZXJIVE1MKSxcbiAgICAgIHRoaXMucHJvY2Vzc1JlZ2V4T3BlcmF0aW9ucyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuaW5uZXJIVE1MKVxuICAgICk7XG4gICAgdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnNhdmVTY3JlZW5zaG90c0luUzMoZnVsbFBhZ2VIVE1MLCBzY3JlZW5zaG90TmFtZSk7XG4gIH1cblxuXG4gIHByb2Nlc3NSZWdleE9wZXJhdGlvbnModGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbmdTM0FuYWx5dGljc0pTLmRvUmVnZXgodGV4dCwgd2luZG93LmxvY2F0aW9uLm9yaWdpbik7XG4gIH1cbn1cbiJdfQ==