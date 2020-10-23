/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Input } from '@angular/core';
import { DataStorageService } from '../data-storage/data-storage.service';
import { fromEvent, Subscription } from 'rxjs';
import { AnalyticsService } from '../analytics/analytics.service';
import { EventLabels } from '../../types/event.types';
import { environment } from '../../environment/environment';
import * as i0 from "@angular/core";
import * as i1 from "../data-storage/data-storage.service";
import * as i2 from "../analytics/analytics.service";
var PointerService = /** @class */ (function () {
    function PointerService(dataStorage, analyticsService) {
        this.dataStorage = dataStorage;
        this.analyticsService = analyticsService;
        this.eventLabels = EventLabels;
        // tslint:disable-next-line: no-input-rename
        this.data = {};
        this.trackingSubscription = new Subscription();
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
        this.trackingSubscription.add(fromEvent(window, 'mousemove')
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
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
    /** @nocollapse */ PointerService.ngInjectableDef = i0.defineInjectable({ factory: function PointerService_Factory() { return new PointerService(i0.inject(i1.DataStorageService), i0.inject(i2.AnalyticsService)); }, token: PointerService, providedIn: "root" });
    return PointerService;
}());
export { PointerService };
if (false) {
    /** @type {?} */
    PointerService.prototype.eventLabels;
    /** @type {?} */
    PointerService.prototype.eventDetails;
    /** @type {?} */
    PointerService.prototype.data;
    /** @type {?} */
    PointerService.prototype.trackingSubscription;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9pbnRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvZGFnbG9iYWwvbmctczMtYW5hbHl0aWNzLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3BvaW50ZXIvcG9pbnRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBYyxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUUxRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLCtCQUErQixDQUFDOzs7O0FBRTVEO0lBV0Usd0JBQW9CLFdBQStCLEVBQVUsZ0JBQWtDO1FBQTNFLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFOL0YsZ0JBQVcsR0FBRyxXQUFXLENBQUM7UUFFMUIsNENBQTRDO1FBQ3BCLFNBQUksR0FBUSxFQUFFLENBQUM7UUFDdkMseUJBQW9CLEdBQWlCLElBQUksWUFBWSxFQUFFLENBQUM7SUFFMkMsQ0FBQztJQUVwRzs7T0FFRzs7Ozs7SUFDSCw0Q0FBbUI7Ozs7SUFBbkI7UUFBQSxpQkFhQztRQVpDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUM7YUFDekQsU0FBUzs7OztRQUFDLFVBQUMsQ0FBYTtZQUN2Qjs7Y0FFRTtZQUNGLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7Z0JBQzNCLEtBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO2dCQUN0QixLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDakI7aUJBQU07Z0JBQ0wsS0FBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3pDO1FBQ0gsQ0FBQyxFQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSSxpQ0FBUTs7OztJQUFmOztZQUNRLGFBQWEsR0FDakIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUM7UUFDdkcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN6RCxDQUFDOztnQkF0Q0YsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7O2dCQVRRLGtCQUFrQjtnQkFHbEIsZ0JBQWdCOzs7dUJBWXRCLEtBQUssU0FBQyxlQUFlOzs7eUJBaEJ4QjtDQWdEQyxBQXhDRCxJQXdDQztTQXJDWSxjQUFjOzs7SUFFekIscUNBQTBCOztJQUMxQixzQ0FBa0I7O0lBRWxCLDhCQUF1Qzs7SUFDdkMsOENBQXdEOzs7OztJQUU1QyxxQ0FBdUM7Ozs7O0lBQUUsMENBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5wdXQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRXZlbnRMYWJlbHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5pbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gJy4uLy4uL2Vudmlyb25tZW50L2Vudmlyb25tZW50JztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUG9pbnRlclNlcnZpY2Uge1xuXG4gIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG4gIGV2ZW50RGV0YWlsczogYW55O1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWlucHV0LXJlbmFtZVxuICBASW5wdXQoJ3RyYWNrLXBvaW50ZXInKSBkYXRhOiBhbnkgPSB7fTtcbiAgdHJhY2tpbmdTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFTdG9yYWdlOiBEYXRhU3RvcmFnZVNlcnZpY2UsIHByaXZhdGUgYW5hbHl0aWNzU2VydmljZTogQW5hbHl0aWNzU2VydmljZSkgeyB9XG5cbiAgLyoqXG4gICAqIFRyYWNrIE1vdXNlIE1vdmVtZW50XG4gICAqL1xuICB0cmFja01vdXNlTW92ZUV2ZW50KCkge1xuICAgIHRoaXMudHJhY2tpbmdTdWJzY3JpcHRpb24uYWRkKGZyb21FdmVudCh3aW5kb3csICdtb3VzZW1vdmUnKVxuICAgICAgLnN1YnNjcmliZSgoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAvKipcbiAgICAgICAgKiBDaGVja2luZyB3aGV0aGVyIHVzZXIgb3B0IHRvIGRpc2FibGUgdHJhY2tpbmcgbW91c2VcbiAgICAgICAgKi9cbiAgICAgICAgaWYgKGVudmlyb25tZW50LnRyYWNrLm1vdXNlKSB7XG4gICAgICAgICAgdGhpcy5ldmVudERldGFpbHMgPSBlO1xuICAgICAgICAgIHRoaXMuc2VuZERhdGEoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnRyYWNraW5nU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQdXNoaW5nIE1vdXNlIE1vdmUgZGV0YWlsc1xuICAgKi9cbiAgcHVibGljIHNlbmREYXRhKCk6IHZvaWQge1xuICAgIGNvbnN0IGFuYWx5dGljc0JlYW46IEFuYWx5dGljc0JlYW4gPVxuICAgICAgdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnNldEFuYWx5dGljc0RhdGEodGhpcy5kYXRhLCB0aGlzLmV2ZW50RGV0YWlscywgdGhpcy5ldmVudExhYmVscy5NT1VTRV9NT1ZFLCAnJyk7XG4gICAgdGhpcy5kYXRhU3RvcmFnZS5hcHBlbmRUb0FuYWx5dGljc0FycmF5KGFuYWx5dGljc0JlYW4pO1xuICB9XG5cbn1cbiJdfQ==