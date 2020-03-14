/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { DataStorageService } from '../../services/data-storage/data-storage.service';
import { KeyStrokeEventType, EventLabels } from '../../types/event.types';
import * as uuid from 'uuid';
// tslint:disable-next-line: directive-selector
export class KeyStrokeDirective {
    /**
     * Dependencies
     * @param {?} dataStorage
     * @param {?} analyticsService
     * @param {?} el - Element Reference
     * @param {?} renderer - Renderer
     */
    constructor(dataStorage, analyticsService, el, renderer) {
        this.dataStorage = dataStorage;
        this.analyticsService = analyticsService;
        this.el = el;
        this.renderer = renderer;
        /** Event Labels Constants */
        this.eventLabels = EventLabels;
        /**
         * if Id doesn't belongs to the element, which is being tracked,
         * Adding a dynamic Id
         */
        if (!this.el.nativeElement.id) {
            /** @type {?} */
            const dynamicId = `key_stroke_element_${uuid.v4()}`;
            this.renderer.setAttribute(this.el.nativeElement, 'id', dynamicId);
        }
    }
    /**
     * Tracking Key press events using host listener
     * Generating a data bean in a specified format
     * @param {?} $event - KeyPress Event
     * @return {?}
     */
    onKeyStroke($event) {
        /** @type {?} */
        const keyStroke = new KeyStrokeEventType();
        keyStroke.elementId = $event.target.id;
        keyStroke.key = $event.key;
        keyStroke.code = $event.code;
        keyStroke.keyCode = $event.keyCode.toString();
        keyStroke.isForm = $event.target.form !== undefined;
        keyStroke.tagName = $event.target.tagName;
        keyStroke.htmlElementType = $event.target.type;
        keyStroke.value = $event.target.value;
        this.sendData(keyStroke, $event);
    }
    /**
     * Sending data
     * @private
     * @param {?} keyStroke - Captured KeyStroke data
     * @param {?} eventDetails - Key Press event details
     * @return {?}
     */
    sendData(keyStroke, eventDetails) {
        /** @type {?} */
        const analyticsBean = this.analyticsService.setAnalyticsData({}, eventDetails, this.eventLabels.KEY_STROKE, '', { keyStrokeData: keyStroke });
        this.dataStorage.appendToAnalyticsArray(analyticsBean);
    }
}
KeyStrokeDirective.decorators = [
    { type: Directive, args: [{ selector: '[track-keyStroke]' },] },
];
KeyStrokeDirective.ctorParameters = () => [
    { type: DataStorageService },
    { type: AnalyticsService },
    { type: ElementRef },
    { type: Renderer2 }
];
KeyStrokeDirective.propDecorators = {
    onKeyStroke: [{ type: HostListener, args: ['keypress', ['$event'],] }]
};
if (false) {
    /**
     * Event Labels Constants
     * @type {?}
     */
    KeyStrokeDirective.prototype.eventLabels;
    /**
     * @type {?}
     * @private
     */
    KeyStrokeDirective.prototype.dataStorage;
    /**
     * @type {?}
     * @private
     */
    KeyStrokeDirective.prototype.analyticsService;
    /**
     * @type {?}
     * @private
     */
    KeyStrokeDirective.prototype.el;
    /**
     * @type {?}
     * @private
     */
    KeyStrokeDirective.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5LXN0cm9rZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9rZXktc3Ryb2tlL2tleS1zdHJva2UuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUUxRSxPQUFPLEtBQUssSUFBSSxNQUFNLE1BQU0sQ0FBQzs7QUFJN0IsTUFBTTs7Ozs7Ozs7SUFZRixZQUNZLFdBQStCLEVBQy9CLGdCQUFrQyxFQUNsQyxFQUFjLEVBQ2QsUUFBbUI7UUFIbkIsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBQy9CLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNkLGFBQVEsR0FBUixRQUFRLENBQVc7UUFkL0IsNkJBQTZCO1FBQzdCLGdCQUFXLEdBQUcsV0FBVyxDQUFDO1FBZXRCOzs7V0FHRztRQUNILElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUU7O2tCQUNyQixTQUFTLEdBQUcsc0JBQXNCLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRTtZQUNuRCxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDdEU7SUFFTCxDQUFDOzs7Ozs7O0lBT3FDLFdBQVcsQ0FBQyxNQUFXOztjQUNuRCxTQUFTLEdBQXVCLElBQUksa0JBQWtCLEVBQUU7UUFFOUQsU0FBUyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUN2QyxTQUFTLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDM0IsU0FBUyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQzdCLFNBQVMsQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM5QyxTQUFTLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQztRQUNwRCxTQUFTLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQzFDLFNBQVMsQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDL0MsU0FBUyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUV0QyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNyQyxDQUFDOzs7Ozs7OztJQU9PLFFBQVEsQ0FBQyxTQUE2QixFQUFFLFlBQWlCOztjQUN2RCxhQUFhLEdBQ2YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLEVBQUUsRUFDckMsWUFBWSxFQUNaLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLEVBQUUsRUFDL0IsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMzRCxDQUFDOzs7WUE5REosU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFOzs7WUFObkMsa0JBQWtCO1lBRGxCLGdCQUFnQjtZQURTLFVBQVU7WUFBRSxTQUFTOzs7MEJBMkNsRCxZQUFZLFNBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDOzs7Ozs7O0lBL0JwQyx5Q0FBMEI7Ozs7O0lBVXRCLHlDQUF1Qzs7Ozs7SUFDdkMsOENBQTBDOzs7OztJQUMxQyxnQ0FBc0I7Ozs7O0lBQ3RCLHNDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBFbGVtZW50UmVmLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEtleVN0cm9rZUV2ZW50VHlwZSwgRXZlbnRMYWJlbHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0ICogYXMgdXVpZCBmcm9tICd1dWlkJztcblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkaXJlY3RpdmUtc2VsZWN0b3JcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1t0cmFjay1rZXlTdHJva2VdJyB9KVxuZXhwb3J0IGNsYXNzIEtleVN0cm9rZURpcmVjdGl2ZSB7XG5cbiAgICAvKiogRXZlbnQgTGFiZWxzIENvbnN0YW50cyAqL1xuICAgIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG5cbiAgICAvKipcbiAgICAgKiBEZXBlbmRlbmNpZXNcbiAgICAgKiBAcGFyYW0gZGF0YVN0b3JhZ2VcbiAgICAgKiBAcGFyYW0gYW5hbHl0aWNzU2VydmljZVxuICAgICAqIEBwYXJhbSBlbCAtIEVsZW1lbnQgUmVmZXJlbmNlXG4gICAgICogQHBhcmFtIHJlbmRlcmVyIC0gUmVuZGVyZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBkYXRhU3RvcmFnZTogRGF0YVN0b3JhZ2VTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGFuYWx5dGljc1NlcnZpY2U6IEFuYWx5dGljc1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpZiBJZCBkb2Vzbid0IGJlbG9uZ3MgdG8gdGhlIGVsZW1lbnQsIHdoaWNoIGlzIGJlaW5nIHRyYWNrZWQsXG4gICAgICAgICAqIEFkZGluZyBhIGR5bmFtaWMgSWRcbiAgICAgICAgICovXG4gICAgICAgIGlmICghdGhpcy5lbC5uYXRpdmVFbGVtZW50LmlkKSB7XG4gICAgICAgICAgICBjb25zdCBkeW5hbWljSWQgPSBga2V5X3N0cm9rZV9lbGVtZW50XyR7dXVpZC52NCgpfWA7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdpZCcsIGR5bmFtaWNJZCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyYWNraW5nIEtleSBwcmVzcyBldmVudHMgdXNpbmcgaG9zdCBsaXN0ZW5lclxuICAgICAqIEdlbmVyYXRpbmcgYSBkYXRhIGJlYW4gaW4gYSBzcGVjaWZpZWQgZm9ybWF0XG4gICAgICogQHBhcmFtICRldmVudCAtIEtleVByZXNzIEV2ZW50XG4gICAgICovXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5cHJlc3MnLCBbJyRldmVudCddKSBvbktleVN0cm9rZSgkZXZlbnQ6IGFueSkge1xuICAgICAgICBjb25zdCBrZXlTdHJva2U6IEtleVN0cm9rZUV2ZW50VHlwZSA9IG5ldyBLZXlTdHJva2VFdmVudFR5cGUoKTtcblxuICAgICAgICBrZXlTdHJva2UuZWxlbWVudElkID0gJGV2ZW50LnRhcmdldC5pZDtcbiAgICAgICAga2V5U3Ryb2tlLmtleSA9ICRldmVudC5rZXk7XG4gICAgICAgIGtleVN0cm9rZS5jb2RlID0gJGV2ZW50LmNvZGU7XG4gICAgICAgIGtleVN0cm9rZS5rZXlDb2RlID0gJGV2ZW50LmtleUNvZGUudG9TdHJpbmcoKTtcbiAgICAgICAga2V5U3Ryb2tlLmlzRm9ybSA9ICRldmVudC50YXJnZXQuZm9ybSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICBrZXlTdHJva2UudGFnTmFtZSA9ICRldmVudC50YXJnZXQudGFnTmFtZTtcbiAgICAgICAga2V5U3Ryb2tlLmh0bWxFbGVtZW50VHlwZSA9ICRldmVudC50YXJnZXQudHlwZTtcbiAgICAgICAga2V5U3Ryb2tlLnZhbHVlID0gJGV2ZW50LnRhcmdldC52YWx1ZTtcblxuICAgICAgICB0aGlzLnNlbmREYXRhKGtleVN0cm9rZSwgJGV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kaW5nIGRhdGFcbiAgICAgKiBAcGFyYW0ga2V5U3Ryb2tlIC0gQ2FwdHVyZWQgS2V5U3Ryb2tlIGRhdGFcbiAgICAgKiBAcGFyYW0gZXZlbnREZXRhaWxzIC0gS2V5IFByZXNzIGV2ZW50IGRldGFpbHNcbiAgICAgKi9cbiAgICBwcml2YXRlIHNlbmREYXRhKGtleVN0cm9rZTogS2V5U3Ryb2tlRXZlbnRUeXBlLCBldmVudERldGFpbHM6IGFueSk6IHZvaWQge1xuICAgICAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID1cbiAgICAgICAgICAgIHRoaXMuYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKHt9LFxuICAgICAgICAgICAgICAgIGV2ZW50RGV0YWlscyxcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50TGFiZWxzLktFWV9TVFJPS0UsICcnLFxuICAgICAgICAgICAgICAgIHsga2V5U3Ryb2tlRGF0YToga2V5U3Ryb2tlIH0pO1xuICAgICAgICB0aGlzLmRhdGFTdG9yYWdlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkoYW5hbHl0aWNzQmVhbik7XG4gICAgfVxufVxuIl19