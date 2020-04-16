/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { DataStorageService } from '../../services/data-storage/data-storage.service';
import { KeyStrokeEventType, EventLabels } from '../../types/event.types';
import * as uuid from 'uuid';
import { environment } from '../../environment/environment';
// tslint:disable-next-line: directive-selector
var KeyStrokeDirective = /** @class */ (function () {
    /**
     * Dependencies
     * @param dataStorage
     * @param analyticsService
     * @param el - Element Reference
     * @param renderer - Renderer
     */
    function KeyStrokeDirective(dataStorage, analyticsService, el, renderer) {
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
            var dynamicId = "key_stroke_element_" + uuid.v4();
            this.renderer.setAttribute(this.el.nativeElement, 'id', dynamicId);
        }
    }
    /**
     * Tracking Key press events using host listener
     * Generating a data bean in a specified format
     * @param $event - KeyPress Event
     */
    /**
     * Tracking Key press events using host listener
     * Generating a data bean in a specified format
     * @param {?} $event - KeyPress Event
     * @return {?}
     */
    KeyStrokeDirective.prototype.onKeyStroke = /**
     * Tracking Key press events using host listener
     * Generating a data bean in a specified format
     * @param {?} $event - KeyPress Event
     * @return {?}
     */
    function ($event) {
        /** @type {?} */
        var keyStroke = new KeyStrokeEventType();
        if ($event.target.type !== 'password' && this.checkClassNames($event.target.classList)) {
            keyStroke.elementId = $event.target.id;
            keyStroke.key = $event.key;
            keyStroke.code = $event.code;
            keyStroke.keyCode = $event.keyCode.toString();
            keyStroke.isForm = $event.target.form !== undefined;
            keyStroke.form = $event.target.form !== undefined ? JSON.stringify($event.target.form.elements) : '';
            keyStroke.tagName = $event.target.tagName;
            keyStroke.htmlElementType = $event.target.type;
            keyStroke.value = $event.target.value;
            this.sendData(keyStroke, $event);
            console.log('keystroke', $event);
        }
    };
    /**
     * @param {?} classList
     * @return {?}
     */
    KeyStrokeDirective.prototype.checkClassNames = /**
     * @param {?} classList
     * @return {?}
     */
    function (classList) {
        /** @type {?} */
        var classNames = tslib_1.__spread(classList).concat(environment.ignoreCssRules);
        return tslib_1.__spread(new Set(classNames)).length === classNames.length;
    };
    /**
     * Sending data
     * @param keyStroke - Captured KeyStroke data
     * @param eventDetails - Key Press event details
     */
    /**
     * Sending data
     * @private
     * @param {?} keyStroke - Captured KeyStroke data
     * @param {?} eventDetails - Key Press event details
     * @return {?}
     */
    KeyStrokeDirective.prototype.sendData = /**
     * Sending data
     * @private
     * @param {?} keyStroke - Captured KeyStroke data
     * @param {?} eventDetails - Key Press event details
     * @return {?}
     */
    function (keyStroke, eventDetails) {
        /** @type {?} */
        var analyticsBean = this.analyticsService.setAnalyticsData({}, eventDetails, this.eventLabels.KEY_STROKE, '', { keyStrokeData: keyStroke });
        this.dataStorage.appendToAnalyticsArray(analyticsBean);
    };
    KeyStrokeDirective.decorators = [
        { type: Directive, args: [{ selector: '[track-keyStroke]' },] },
    ];
    KeyStrokeDirective.ctorParameters = function () { return [
        { type: DataStorageService },
        { type: AnalyticsService },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    KeyStrokeDirective.propDecorators = {
        onKeyStroke: [{ type: HostListener, args: ['keypress', ['$event'],] }]
    };
    return KeyStrokeDirective;
}());
export { KeyStrokeDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5LXN0cm9rZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9rZXktc3Ryb2tlL2tleS1zdHJva2UuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN0RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFMUUsT0FBTyxLQUFLLElBQUksTUFBTSxNQUFNLENBQUM7QUFDN0IsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLCtCQUErQixDQUFDOztBQUc1RDtJQU1JOzs7Ozs7T0FNRztJQUNILDRCQUNZLFdBQStCLEVBQy9CLGdCQUFrQyxFQUNsQyxFQUFjLEVBQ2QsUUFBbUI7UUFIbkIsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBQy9CLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNkLGFBQVEsR0FBUixRQUFRLENBQVc7UUFkL0IsNkJBQTZCO1FBQzdCLGdCQUFXLEdBQUcsV0FBVyxDQUFDO1FBZXRCOzs7V0FHRztRQUNILElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUU7O2dCQUNyQixTQUFTLEdBQUcsd0JBQXNCLElBQUksQ0FBQyxFQUFFLEVBQUk7WUFDbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ3RFO0lBRUwsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDbUMsd0NBQVc7Ozs7OztJQUFqRCxVQUFrRCxNQUFXOztZQUNuRCxTQUFTLEdBQXVCLElBQUksa0JBQWtCLEVBQUU7UUFDOUQsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxVQUFVLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3BGLFNBQVMsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDdkMsU0FBUyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO1lBQzNCLFNBQVMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztZQUM3QixTQUFTLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDOUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxTQUFTLENBQUM7WUFDcEQsU0FBUyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNyRyxTQUFTLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQzFDLFNBQVMsQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDL0MsU0FBUyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNwQztJQUVMLENBQUM7Ozs7O0lBRUQsNENBQWU7Ozs7SUFBZixVQUFnQixTQUF3Qjs7WUFDOUIsVUFBVSxHQUFrQixpQkFBSSxTQUFTLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUM7UUFDbkYsT0FBTyxpQkFBSSxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxNQUFNLEtBQUssVUFBVSxDQUFDLE1BQU0sQ0FBQztJQUNqRSxDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7Ozs7SUFDSyxxQ0FBUTs7Ozs7OztJQUFoQixVQUFpQixTQUE2QixFQUFFLFlBQWlCOztZQUN2RCxhQUFhLEdBQ2YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLEVBQUUsRUFDckMsWUFBWSxFQUNaLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLEVBQUUsRUFDL0IsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMzRCxDQUFDOztnQkF0RUosU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFOzs7Z0JBUG5DLGtCQUFrQjtnQkFEbEIsZ0JBQWdCO2dCQURTLFVBQVU7Z0JBQUUsU0FBUzs7OzhCQTRDbEQsWUFBWSxTQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7SUFvQ3hDLHlCQUFDO0NBQUEsQUF2RUQsSUF1RUM7U0F0RVksa0JBQWtCOzs7Ozs7SUFHM0IseUNBQTBCOzs7OztJQVV0Qix5Q0FBdUM7Ozs7O0lBQ3ZDLDhDQUEwQzs7Ozs7SUFDMUMsZ0NBQXNCOzs7OztJQUN0QixzQ0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgRWxlbWVudFJlZiwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYW5hbHl0aWNzL2FuYWx5dGljcy5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2RhdGEtc3RvcmFnZS9kYXRhLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBLZXlTdHJva2VFdmVudFR5cGUsIEV2ZW50TGFiZWxzIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXZlbnQudHlwZXMnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCAqIGFzIHV1aWQgZnJvbSAndXVpZCc7XG5pbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gJy4uLy4uL2Vudmlyb25tZW50L2Vudmlyb25tZW50JztcblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkaXJlY3RpdmUtc2VsZWN0b3JcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1t0cmFjay1rZXlTdHJva2VdJyB9KVxuZXhwb3J0IGNsYXNzIEtleVN0cm9rZURpcmVjdGl2ZSB7XG5cbiAgICAvKiogRXZlbnQgTGFiZWxzIENvbnN0YW50cyAqL1xuICAgIGV2ZW50TGFiZWxzID0gRXZlbnRMYWJlbHM7XG5cbiAgICAvKipcbiAgICAgKiBEZXBlbmRlbmNpZXNcbiAgICAgKiBAcGFyYW0gZGF0YVN0b3JhZ2VcbiAgICAgKiBAcGFyYW0gYW5hbHl0aWNzU2VydmljZVxuICAgICAqIEBwYXJhbSBlbCAtIEVsZW1lbnQgUmVmZXJlbmNlXG4gICAgICogQHBhcmFtIHJlbmRlcmVyIC0gUmVuZGVyZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBkYXRhU3RvcmFnZTogRGF0YVN0b3JhZ2VTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGFuYWx5dGljc1NlcnZpY2U6IEFuYWx5dGljc1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpZiBJZCBkb2Vzbid0IGJlbG9uZ3MgdG8gdGhlIGVsZW1lbnQsIHdoaWNoIGlzIGJlaW5nIHRyYWNrZWQsXG4gICAgICAgICAqIEFkZGluZyBhIGR5bmFtaWMgSWRcbiAgICAgICAgICovXG4gICAgICAgIGlmICghdGhpcy5lbC5uYXRpdmVFbGVtZW50LmlkKSB7XG4gICAgICAgICAgICBjb25zdCBkeW5hbWljSWQgPSBga2V5X3N0cm9rZV9lbGVtZW50XyR7dXVpZC52NCgpfWA7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdpZCcsIGR5bmFtaWNJZCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyYWNraW5nIEtleSBwcmVzcyBldmVudHMgdXNpbmcgaG9zdCBsaXN0ZW5lclxuICAgICAqIEdlbmVyYXRpbmcgYSBkYXRhIGJlYW4gaW4gYSBzcGVjaWZpZWQgZm9ybWF0XG4gICAgICogQHBhcmFtICRldmVudCAtIEtleVByZXNzIEV2ZW50XG4gICAgICovXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5cHJlc3MnLCBbJyRldmVudCddKSBvbktleVN0cm9rZSgkZXZlbnQ6IGFueSkge1xuICAgICAgICBjb25zdCBrZXlTdHJva2U6IEtleVN0cm9rZUV2ZW50VHlwZSA9IG5ldyBLZXlTdHJva2VFdmVudFR5cGUoKTtcbiAgICAgICAgaWYgKCRldmVudC50YXJnZXQudHlwZSAhPT0gJ3Bhc3N3b3JkJyAmJiB0aGlzLmNoZWNrQ2xhc3NOYW1lcygkZXZlbnQudGFyZ2V0LmNsYXNzTGlzdCkpIHtcbiAgICAgICAgICAgIGtleVN0cm9rZS5lbGVtZW50SWQgPSAkZXZlbnQudGFyZ2V0LmlkO1xuICAgICAgICAgICAga2V5U3Ryb2tlLmtleSA9ICRldmVudC5rZXk7XG4gICAgICAgICAgICBrZXlTdHJva2UuY29kZSA9ICRldmVudC5jb2RlO1xuICAgICAgICAgICAga2V5U3Ryb2tlLmtleUNvZGUgPSAkZXZlbnQua2V5Q29kZS50b1N0cmluZygpO1xuICAgICAgICAgICAga2V5U3Ryb2tlLmlzRm9ybSA9ICRldmVudC50YXJnZXQuZm9ybSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAga2V5U3Ryb2tlLmZvcm0gPSAkZXZlbnQudGFyZ2V0LmZvcm0gIT09IHVuZGVmaW5lZCA/IEpTT04uc3RyaW5naWZ5KCRldmVudC50YXJnZXQuZm9ybS5lbGVtZW50cykgOiAnJztcbiAgICAgICAgICAgIGtleVN0cm9rZS50YWdOYW1lID0gJGV2ZW50LnRhcmdldC50YWdOYW1lO1xuICAgICAgICAgICAga2V5U3Ryb2tlLmh0bWxFbGVtZW50VHlwZSA9ICRldmVudC50YXJnZXQudHlwZTtcbiAgICAgICAgICAgIGtleVN0cm9rZS52YWx1ZSA9ICRldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICB0aGlzLnNlbmREYXRhKGtleVN0cm9rZSwgJGV2ZW50KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdrZXlzdHJva2UnLCAkZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBjaGVja0NsYXNzTmFtZXMoY2xhc3NMaXN0OiBBcnJheTxzdHJpbmc+KSB7XG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZXM6IEFycmF5PHN0cmluZz4gPSBbLi4uY2xhc3NMaXN0XS5jb25jYXQoZW52aXJvbm1lbnQuaWdub3JlQ3NzUnVsZXMpO1xuICAgICAgICByZXR1cm4gWy4uLm5ldyBTZXQoY2xhc3NOYW1lcyldLmxlbmd0aCA9PT0gY2xhc3NOYW1lcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VuZGluZyBkYXRhXG4gICAgICogQHBhcmFtIGtleVN0cm9rZSAtIENhcHR1cmVkIEtleVN0cm9rZSBkYXRhXG4gICAgICogQHBhcmFtIGV2ZW50RGV0YWlscyAtIEtleSBQcmVzcyBldmVudCBkZXRhaWxzXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZW5kRGF0YShrZXlTdHJva2U6IEtleVN0cm9rZUV2ZW50VHlwZSwgZXZlbnREZXRhaWxzOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9XG4gICAgICAgICAgICB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YSh7fSxcbiAgICAgICAgICAgICAgICBldmVudERldGFpbHMsXG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudExhYmVscy5LRVlfU1RST0tFLCAnJyxcbiAgICAgICAgICAgICAgICB7IGtleVN0cm9rZURhdGE6IGtleVN0cm9rZSB9KTtcbiAgICAgICAgdGhpcy5kYXRhU3RvcmFnZS5hcHBlbmRUb0FuYWx5dGljc0FycmF5KGFuYWx5dGljc0JlYW4pO1xuICAgIH1cbn1cbiJdfQ==