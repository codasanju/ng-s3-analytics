/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Input } from '@angular/core';
import { DataStorageService } from '../data-storage/data-storage.service';
import { fromEvent } from 'rxjs';
import { AnalyticsService } from '../analytics/analytics.service';
import * as i0 from "@angular/core";
import * as i1 from "../data-storage/data-storage.service";
import * as i2 from "../analytics/analytics.service";
export class PointerService {
    /**
     * @param {?} dataStorage
     * @param {?} analyticsService
     */
    constructor(dataStorage, analyticsService) {
        this.dataStorage = dataStorage;
        this.analyticsService = analyticsService;
        // tslint:disable-next-line: no-input-rename
        this.data = {};
    }
    /**
     * Track Mouse Movement
     * @return {?}
     */
    trackMouseMoveEvent() {
        fromEvent(window, 'mousemove')
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            this.eventDetails = e;
            this.sendData();
        }));
    }
    /**
     * Pushing Mouse Move details
     * @return {?}
     */
    sendData() {
        /** @type {?} */
        const analyticsBean = this.analyticsService.setAnalyticsData(this.data, this.eventDetails, 'Mouse Move', '');
        this.dataStorage.appendToAnalyticsArray(analyticsBean);
    }
}
PointerService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
PointerService.ctorParameters = () => [
    { type: DataStorageService },
    { type: AnalyticsService }
];
PointerService.propDecorators = {
    data: [{ type: Input, args: ['track-pointer',] }]
};
/** @nocollapse */ PointerService.ngInjectableDef = i0.defineInjectable({ factory: function PointerService_Factory() { return new PointerService(i0.inject(i1.DataStorageService), i0.inject(i2.AnalyticsService)); }, token: PointerService, providedIn: "root" });
if (false) {
    /** @type {?} */
    PointerService.prototype.eventDetails;
    /** @type {?} */
    PointerService.prototype.data;
    /**
     * @type {?}
     * @private
     */
    PointerService.prototype.dataStorage;
    /**
     * @type {?}
     * @private
     */
    PointerService.prototype.analyticsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9pbnRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctczMtYW5hbHl0aWNzLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3BvaW50ZXIvcG9pbnRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBYyxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUUxRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOzs7O0FBS2xFLE1BQU07Ozs7O0lBTUosWUFBb0IsV0FBK0IsRUFBVSxnQkFBa0M7UUFBM0UsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUgvRiw0Q0FBNEM7UUFDcEIsU0FBSSxHQUFRLEVBQUUsQ0FBQztJQUU0RCxDQUFDOzs7OztJQUtwRyxtQkFBbUI7UUFDakIsU0FBUyxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUM7YUFDM0IsU0FBUzs7OztRQUFDLENBQUMsQ0FBYSxFQUFFLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2xCLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFLTSxRQUFROztjQUNQLGFBQWEsR0FDakIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsRUFBRSxDQUFDO1FBQ3hGLElBQUksQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDekQsQ0FBQzs7O1lBN0JGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7O1lBUFEsa0JBQWtCO1lBR2xCLGdCQUFnQjs7O21CQVN0QixLQUFLLFNBQUMsZUFBZTs7Ozs7SUFGdEIsc0NBQWtCOztJQUVsQiw4QkFBdUM7Ozs7O0lBRTNCLHFDQUF1Qzs7Ozs7SUFBRSwwQ0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbnB1dCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBQb2ludGVyU2VydmljZSB7XG5cbiAgZXZlbnREZXRhaWxzOiBhbnk7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgndHJhY2stcG9pbnRlcicpIGRhdGE6IGFueSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVN0b3JhZ2U6IERhdGFTdG9yYWdlU2VydmljZSwgcHJpdmF0ZSBhbmFseXRpY3NTZXJ2aWNlOiBBbmFseXRpY3NTZXJ2aWNlKSB7IH1cblxuICAvKipcbiAgICogVHJhY2sgTW91c2UgTW92ZW1lbnRcbiAgICovXG4gIHRyYWNrTW91c2VNb3ZlRXZlbnQoKSB7XG4gICAgZnJvbUV2ZW50KHdpbmRvdywgJ21vdXNlbW92ZScpXG4gICAgICAuc3Vic2NyaWJlKChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuZXZlbnREZXRhaWxzID0gZTtcbiAgICAgICAgdGhpcy5zZW5kRGF0YSgpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUHVzaGluZyBNb3VzZSBNb3ZlIGRldGFpbHNcbiAgICovXG4gIHB1YmxpYyBzZW5kRGF0YSgpOiB2b2lkIHtcbiAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID1cbiAgICAgIHRoaXMuYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKHRoaXMuZGF0YSwgdGhpcy5ldmVudERldGFpbHMsICdNb3VzZSBNb3ZlJywgJycpO1xuICAgIHRoaXMuZGF0YVN0b3JhZ2UuYXBwZW5kVG9BbmFseXRpY3NBcnJheShhbmFseXRpY3NCZWFuKTtcbiAgfVxuXG59XG4iXX0=