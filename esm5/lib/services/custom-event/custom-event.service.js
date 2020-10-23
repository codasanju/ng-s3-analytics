/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { DataStorageService } from '../data-storage/data-storage.service';
import { AnalyticsService } from '../analytics/analytics.service';
import * as i0 from "@angular/core";
import * as i1 from "../data-storage/data-storage.service";
import * as i2 from "../analytics/analytics.service";
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
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    CustomEventService.ctorParameters = function () { return [
        { type: DataStorageService },
        { type: AnalyticsService }
    ]; };
    /** @nocollapse */ CustomEventService.ngInjectableDef = i0.defineInjectable({ factory: function CustomEventService_Factory() { return new CustomEventService(i0.inject(i1.DataStorageService), i0.inject(i2.AnalyticsService)); }, token: CustomEventService, providedIn: "root" });
    return CustomEventService;
}());
export { CustomEventService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    CustomEventService.prototype.dataStorage;
    /**
     * @type {?}
     * @private
     */
    CustomEventService.prototype.analyticsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWV2ZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvY3VzdG9tLWV2ZW50L2N1c3RvbS1ldmVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOzs7O0FBR2xFO0lBS0UsNEJBQW9CLFdBQStCLEVBQVUsZ0JBQWtDO1FBQTNFLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7SUFBSSxDQUFDO0lBQ3BHOzs7OztPQUtHOzs7Ozs7OztJQUNJLHNDQUFTOzs7Ozs7O0lBQWhCLFVBQWlCLGVBQXVCLEVBQUUsU0FBYzs7WUFDaEQsYUFBYSxHQUNqQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxlQUFlLEVBQUUsRUFBRSxDQUFDO1FBQzVFLElBQUksQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDekQsQ0FBQzs7Z0JBaEJGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OztnQkFOUSxrQkFBa0I7Z0JBQ2xCLGdCQUFnQjs7OzZCQUZ6QjtDQXNCQyxBQWpCRCxJQWlCQztTQWRZLGtCQUFrQjs7Ozs7O0lBRWpCLHlDQUF1Qzs7Ozs7SUFBRSw4Q0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9kYXRhLXN0b3JhZ2UvZGF0YS1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBDdXN0b21FdmVudFNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZSwgcHJpdmF0ZSBhbmFseXRpY3NTZXJ2aWNlOiBBbmFseXRpY3NTZXJ2aWNlKSB7IH1cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGlzIGV4cG9zZWQgdG8gdXNlciB0byBoZWxwIHB1c2hpbmcgY3VzdG9tIGV2ZW50c1xuICAgKiBcbiAgICogQHBhcmFtIGN1c3RvbUV2ZW50TmFtZSAtIEFueSBuYW1lIHRoYXQgdXNlciBjYW4gYmUgY29uZmlndXJlXG4gICAqIEBwYXJhbSBldmVudERhdGEgLSBBbnkgZGF0YSwgd2hpY2ggdXNlciBjb25maWd1cmVkIGluIGFkZGl0aW9uYWwgaW5mb1xuICAgKi9cbiAgcHVibGljIHB1c2hFdmVudChjdXN0b21FdmVudE5hbWU6IHN0cmluZywgZXZlbnREYXRhOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID1cbiAgICAgIHRoaXMuYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKGV2ZW50RGF0YSwgJycsIGN1c3RvbUV2ZW50TmFtZSwgJycpO1xuICAgIHRoaXMuZGF0YVN0b3JhZ2UuYXBwZW5kVG9BbmFseXRpY3NBcnJheShhbmFseXRpY3NCZWFuKTtcbiAgfVxufVxuIl19