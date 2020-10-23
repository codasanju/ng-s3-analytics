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
export class CustomEventService {
    /**
     * @param {?} dataStorage
     * @param {?} analyticsService
     */
    constructor(dataStorage, analyticsService) {
        this.dataStorage = dataStorage;
        this.analyticsService = analyticsService;
    }
    /**
     * This method is exposed to user to help pushing custom events
     *
     * @param {?} customEventName - Any name that user can be configure
     * @param {?} eventData - Any data, which user configured in additional info
     * @return {?}
     */
    pushEvent(customEventName, eventData) {
        /** @type {?} */
        const analyticsBean = this.analyticsService.setAnalyticsData(eventData, '', customEventName, '');
        this.dataStorage.appendToAnalyticsArray(analyticsBean);
    }
}
CustomEventService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
CustomEventService.ctorParameters = () => [
    { type: DataStorageService },
    { type: AnalyticsService }
];
/** @nocollapse */ CustomEventService.ngInjectableDef = i0.defineInjectable({ factory: function CustomEventService_Factory() { return new CustomEventService(i0.inject(i1.DataStorageService), i0.inject(i2.AnalyticsService)); }, token: CustomEventService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWV2ZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvY3VzdG9tLWV2ZW50L2N1c3RvbS1ldmVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOzs7O0FBTWxFLE1BQU07Ozs7O0lBRUosWUFBb0IsV0FBK0IsRUFBVSxnQkFBa0M7UUFBM0UsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUFJLENBQUM7Ozs7Ozs7O0lBTzdGLFNBQVMsQ0FBQyxlQUF1QixFQUFFLFNBQWM7O2NBQ2hELGFBQWEsR0FDakIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxFQUFFLEVBQUUsZUFBZSxFQUFFLEVBQUUsQ0FBQztRQUM1RSxJQUFJLENBQUMsV0FBVyxDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3pELENBQUM7OztZQWhCRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7OztZQU5RLGtCQUFrQjtZQUNsQixnQkFBZ0I7Ozs7Ozs7O0lBUVgseUNBQXVDOzs7OztJQUFFLDhDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnLi4vYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEN1c3RvbUV2ZW50U2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU3RvcmFnZTogRGF0YVN0b3JhZ2VTZXJ2aWNlLCBwcml2YXRlIGFuYWx5dGljc1NlcnZpY2U6IEFuYWx5dGljc1NlcnZpY2UpIHsgfVxuICAvKipcbiAgICogVGhpcyBtZXRob2QgaXMgZXhwb3NlZCB0byB1c2VyIHRvIGhlbHAgcHVzaGluZyBjdXN0b20gZXZlbnRzXG4gICAqIFxuICAgKiBAcGFyYW0gY3VzdG9tRXZlbnROYW1lIC0gQW55IG5hbWUgdGhhdCB1c2VyIGNhbiBiZSBjb25maWd1cmVcbiAgICogQHBhcmFtIGV2ZW50RGF0YSAtIEFueSBkYXRhLCB3aGljaCB1c2VyIGNvbmZpZ3VyZWQgaW4gYWRkaXRpb25hbCBpbmZvXG4gICAqL1xuICBwdWJsaWMgcHVzaEV2ZW50KGN1c3RvbUV2ZW50TmFtZTogc3RyaW5nLCBldmVudERhdGE6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGFuYWx5dGljc0JlYW46IEFuYWx5dGljc0JlYW4gPVxuICAgICAgdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnNldEFuYWx5dGljc0RhdGEoZXZlbnREYXRhLCAnJywgY3VzdG9tRXZlbnROYW1lLCAnJyk7XG4gICAgdGhpcy5kYXRhU3RvcmFnZS5hcHBlbmRUb0FuYWx5dGljc0FycmF5KGFuYWx5dGljc0JlYW4pO1xuICB9XG59XG4iXX0=