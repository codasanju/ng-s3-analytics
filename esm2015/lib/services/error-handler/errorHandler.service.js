/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Injector } from '@angular/core';
import { AnalyticsService } from '../analytics/analytics.service';
import { EventLabels } from '../../types/event.types';
import { DataStorageService } from '../data-storage/data-storage.service';
export class GlobalErrorHandler {
    /**
     * @param {?} injector
     */
    constructor(injector) {
        this.injector = injector;
        this.eventLabels = EventLabels;
    }
    /**
     * @return {?}
     */
    trackConsoleErrors() {
        /** @type {?} */
        const analyticsService = this.injector.get(AnalyticsService);
        /** @type {?} */
        const dataStorageService = this.injector.get(DataStorageService);
        if (window.console && console.error) {
            /** @type {?} */
            const consoleErrorFnObject = console.error;
            /** @type {?} */
            const _self = this;
            // try {
            console.error = (/**
             * @param {...?} error
             * @return {?}
             */
            function (...error) {
                /** @type {?} */
                const processedError = error.map((/**
                 * @param {?} e
                 * @return {?}
                 */
                e => {
                    if (typeof (e) === 'object') {
                        return JSON.stringify(e);
                    }
                    else {
                        return e;
                    }
                }));
                // tslint:disable-next-line: max-line-length
                /** @type {?} */
                const analyticsBean = analyticsService.setAnalyticsData('', {}, _self.eventLabels.CONSOLE_ERROR, '', { consoleErrors: JSON.stringify(processedError) });
                dataStorageService.appendToAnalyticsArray(analyticsBean);
                consoleErrorFnObject.call(console, error);
            });
            // } catch (error) { }
        }
    }
}
GlobalErrorHandler.decorators = [
    { type: Injectable },
];
GlobalErrorHandler.ctorParameters = () => [
    { type: Injector }
];
if (false) {
    /** @type {?} */
    GlobalErrorHandler.prototype.eventLabels;
    /**
     * @type {?}
     * @private
     */
    GlobalErrorHandler.prototype.injector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JIYW5kbGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZXJyb3ItaGFuZGxlci9lcnJvckhhbmRsZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFnQixVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRWxFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUUxRSxNQUFNOzs7O0lBRUYsWUFBb0IsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUR0QyxnQkFBVyxHQUFHLFdBQVcsQ0FBQztJQUUxQixDQUFDOzs7O0lBRUQsa0JBQWtCOztjQUVSLGdCQUFnQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDOztjQUN0RCxrQkFBa0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQztRQUNoRSxJQUFJLE1BQU0sQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTs7a0JBQzNCLG9CQUFvQixHQUFHLE9BQU8sQ0FBQyxLQUFLOztrQkFDcEMsS0FBSyxHQUFHLElBQUk7WUFDbEIsUUFBUTtZQUNKLE9BQU8sQ0FBQyxLQUFLOzs7O1lBQUcsVUFBVSxHQUFHLEtBQVk7O3NCQUMvQixjQUFjLEdBQUcsS0FBSyxDQUFDLEdBQUc7Ozs7Z0JBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ2pDLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRTt3QkFDekIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUM1Qjt5QkFBTTt3QkFDSCxPQUFPLENBQUMsQ0FBQztxQkFDWjtnQkFDTCxDQUFDLEVBQUM7OztzQkFFSSxhQUFhLEdBQWtCLGdCQUFnQixDQUFDLGdCQUFnQixDQUNqRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUM7Z0JBQ3BHLGtCQUFrQixDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUN6RCxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzlDLENBQUMsQ0FBQSxDQUFDO1lBQ04sc0JBQXNCO1NBQ3pCO0lBQ0wsQ0FBQzs7O1lBOUJKLFVBQVU7OztZQUx3QixRQUFROzs7O0lBT3ZDLHlDQUEwQjs7Ozs7SUFDZCxzQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFcnJvckhhbmRsZXIsIEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnLi4vYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc0JlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBFdmVudExhYmVscyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcbmltcG9ydCB7IERhdGFTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZSc7XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgR2xvYmFsRXJyb3JIYW5kbGVyIHtcbiAgICBldmVudExhYmVscyA9IEV2ZW50TGFiZWxzO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgfVxuXG4gICAgdHJhY2tDb25zb2xlRXJyb3JzKCkge1xuXG4gICAgICAgIGNvbnN0IGFuYWx5dGljc1NlcnZpY2UgPSB0aGlzLmluamVjdG9yLmdldChBbmFseXRpY3NTZXJ2aWNlKTtcbiAgICAgICAgY29uc3QgZGF0YVN0b3JhZ2VTZXJ2aWNlID0gdGhpcy5pbmplY3Rvci5nZXQoRGF0YVN0b3JhZ2VTZXJ2aWNlKTtcbiAgICAgICAgaWYgKHdpbmRvdy5jb25zb2xlICYmIGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnNvbGVFcnJvckZuT2JqZWN0ID0gY29uc29sZS5lcnJvcjtcbiAgICAgICAgICAgIGNvbnN0IF9zZWxmID0gdGhpcztcbiAgICAgICAgICAgIC8vIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvciA9IGZ1bmN0aW9uICguLi5lcnJvcjogYW55W10pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvY2Vzc2VkRXJyb3IgPSBlcnJvci5tYXAoZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChlKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBtYXgtbGluZS1sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9IGFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgKCcnLCB7fSwgX3NlbGYuZXZlbnRMYWJlbHMuQ09OU09MRV9FUlJPUiwgJycsIHsgY29uc29sZUVycm9yczogSlNPTi5zdHJpbmdpZnkocHJvY2Vzc2VkRXJyb3IpIH0pO1xuICAgICAgICAgICAgICAgICAgICBkYXRhU3RvcmFnZVNlcnZpY2UuYXBwZW5kVG9BbmFseXRpY3NBcnJheShhbmFseXRpY3NCZWFuKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZUVycm9yRm5PYmplY3QuY2FsbChjb25zb2xlLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vIH0gY2F0Y2ggKGVycm9yKSB7IH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==