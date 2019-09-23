/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, HostListener } from '@angular/core';
import { DataStorageService } from '../../services/data-storage/data-storage.service';
import { AnalyticsService } from '../../services/analytics/analytics.service';
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
        var _this = this;
        this.eventDetails = $event;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.sendData();
        }), 10);
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
        var analyticsBean = this.analyticsService.setAnalyticsData(this.data, this.eventDetails, 'buttonClick', '');
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
export { ButtonDirective };
if (false) {
    /** @type {?} */
    ButtonDirective.prototype.data;
    /** @type {?} */
    ButtonDirective.prototype.eventDetails;
    /**
     * @type {?}
     * @private
     */
    ButtonDirective.prototype.dataStorage;
    /**
     * @type {?}
     * @private
     */
    ButtonDirective.prototype.analyticsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXMzLWFuYWx5dGljcy8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL2J1dHRvbi9idXR0b24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFFdEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNENBQTRDLENBQUM7Ozs7O0FBTTlFO0lBWUU7Ozs7T0FJRztJQUNILHlCQUFvQixXQUErQixFQUFVLGdCQUFrQztRQUEzRSxnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBWC9GLHVFQUF1RTtRQUN2RSw0Q0FBNEM7UUFDeEIsU0FBSSxHQUFRLEVBQUUsQ0FBQztJQVNnRSxDQUFDO0lBR3BHOztPQUVHOzs7Ozs7SUFDZ0MsaUNBQU87Ozs7O0lBQTFDLFVBQTJDLE1BQVc7UUFBdEQsaUJBS0M7UUFKQyxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztRQUMzQixVQUFVOzs7UUFBQztZQUNULEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNsQixDQUFDLEdBQUUsRUFBRSxDQUFDLENBQUM7SUFDVCxDQUFDO0lBRUQsbUNBQW1DOzs7OztJQUM1QixrQ0FBUTs7OztJQUFmOztZQUNRLGFBQWEsR0FDakIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsRUFBRSxDQUFDO1FBQ3pGLElBQUksQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDekQsQ0FBQzs7Z0JBbkNGLFNBQVMsU0FBQzs7b0JBRVQsUUFBUSxFQUFFLGFBQWE7aUJBQ3hCOzs7Z0JBWFEsa0JBQWtCO2dCQUVsQixnQkFBZ0I7Ozt1QkFjdEIsS0FBSyxTQUFDLFdBQVc7MEJBZWpCLFlBQVksU0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0lBYW5DLHNCQUFDO0NBQUEsQUFwQ0QsSUFvQ0M7U0FoQ1ksZUFBZTs7O0lBSTFCLCtCQUFtQzs7SUFFbkMsdUNBQWtCOzs7OztJQU9OLHNDQUF1Qzs7Ozs7SUFBRSwyQ0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5cbi8qKlxuICogQnV0dG9uIERpcmVjdGl2ZSB0byB0cmFjayBjbGljayBldmVudFxuICogU2VsZWN0b3IgY2FuIGJlIGFkZGVkIHRvIGFueSBIVE1MIEVsZW1lbnRcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGlyZWN0aXZlLXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnW3RyYWNrLWJ0bl0nXG59KVxuZXhwb3J0IGNsYXNzIEJ1dHRvbkRpcmVjdGl2ZSB7XG5cbiAgLy8gR2V0cyBpbXBvcnRhbnQgZGF0YSBhYm91dCB0aGUgYnV0dG9uIGV4cGxpY2l0bHkgZnJvbSB0aGUgYXBwbGljYXRpb25cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KCd0cmFjay1idG4nKSBkYXRhOiBhbnkgPSB7fTtcblxuICBldmVudERldGFpbHM6IGFueTtcblxuICAvKipcbiAgICogQnV0dG9uIFRyYWNraW5nIC0gQ29uc3RydWN0b3JcbiAgICogQHBhcmFtIGRhdGFTdG9yYWdlIC0gRGF0YVN0b3JhZ2VTZXJ2aWNlXG4gICAqIEBwYXJhbSBhbmFseXRpY3NTZXJ2aWNlXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFTdG9yYWdlOiBEYXRhU3RvcmFnZVNlcnZpY2UsIHByaXZhdGUgYW5hbHl0aWNzU2VydmljZTogQW5hbHl0aWNzU2VydmljZSkgeyB9XG5cblxuICAvKipcbiAgICogIExpc3RlbiB0byBidXR0b24gY2xpY2sgYWN0aW9uc1xuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKSBvbkNsaWNrKCRldmVudDogYW55KSB7XG4gICAgdGhpcy5ldmVudERldGFpbHMgPSAkZXZlbnQ7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnNlbmREYXRhKCk7XG4gICAgfSwgMTApO1xuICB9XG5cbiAgLyoqIFNlbmRpbmcgZGF0YSBvbiBidXR0b24gY2xpY2sgKi9cbiAgcHVibGljIHNlbmREYXRhKCk6IHZvaWQge1xuICAgIGNvbnN0IGFuYWx5dGljc0JlYW46IEFuYWx5dGljc0JlYW4gPVxuICAgICAgdGhpcy5hbmFseXRpY3NTZXJ2aWNlLnNldEFuYWx5dGljc0RhdGEodGhpcy5kYXRhLCB0aGlzLmV2ZW50RGV0YWlscywgJ2J1dHRvbkNsaWNrJywgJycpO1xuICAgIHRoaXMuZGF0YVN0b3JhZ2UuYXBwZW5kVG9BbmFseXRpY3NBcnJheShhbmFseXRpY3NCZWFuKTtcbiAgfVxufVxuIl19