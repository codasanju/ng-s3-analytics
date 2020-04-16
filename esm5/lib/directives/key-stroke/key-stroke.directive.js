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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5LXN0cm9rZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9rZXktc3Ryb2tlL2tleS1zdHJva2UuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN0RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFMUUsT0FBTyxLQUFLLElBQUksTUFBTSxNQUFNLENBQUM7QUFDN0IsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLCtCQUErQixDQUFDOztBQUc1RDtJQU1JOzs7Ozs7T0FNRztJQUNILDRCQUNZLFdBQStCLEVBQy9CLGdCQUFrQyxFQUNsQyxFQUFjLEVBQ2QsUUFBbUI7UUFIbkIsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBQy9CLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNkLGFBQVEsR0FBUixRQUFRLENBQVc7UUFkL0IsNkJBQTZCO1FBQzdCLGdCQUFXLEdBQUcsV0FBVyxDQUFDO1FBZXRCOzs7V0FHRztRQUNILElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUU7O2dCQUNyQixTQUFTLEdBQUcsd0JBQXNCLElBQUksQ0FBQyxFQUFFLEVBQUk7WUFDbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ3RFO0lBRUwsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDbUMsd0NBQVc7Ozs7OztJQUFqRCxVQUFrRCxNQUFXOztZQUNuRCxTQUFTLEdBQXVCLElBQUksa0JBQWtCLEVBQUU7UUFDOUQsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxVQUFVLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3BGLFNBQVMsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDdkMsU0FBUyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO1lBQzNCLFNBQVMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztZQUM3QixTQUFTLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDOUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxTQUFTLENBQUM7WUFDcEQsU0FBUyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNyRyxTQUFTLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQzFDLFNBQVMsQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDL0MsU0FBUyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNwQztJQUVMLENBQUM7Ozs7O0lBRUQsNENBQWU7Ozs7SUFBZixVQUFnQixTQUF3Qjs7WUFDOUIsVUFBVSxHQUFRLGlCQUFJLFNBQVMsRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQztRQUN6RSxPQUFPLGlCQUFJLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLE1BQU0sS0FBSyxVQUFVLENBQUMsTUFBTSxDQUFDO0lBQ2pFLENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7OztJQUNLLHFDQUFROzs7Ozs7O0lBQWhCLFVBQWlCLFNBQTZCLEVBQUUsWUFBaUI7O1lBQ3ZELGFBQWEsR0FDZixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxFQUNyQyxZQUFZLEVBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsRUFBRSxFQUMvQixFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzNELENBQUM7O2dCQXJFSixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUU7OztnQkFQbkMsa0JBQWtCO2dCQURsQixnQkFBZ0I7Z0JBRFMsVUFBVTtnQkFBRSxTQUFTOzs7OEJBNENsRCxZQUFZLFNBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDOztJQW1DeEMseUJBQUM7Q0FBQSxBQXRFRCxJQXNFQztTQXJFWSxrQkFBa0I7Ozs7OztJQUczQix5Q0FBMEI7Ozs7O0lBVXRCLHlDQUF1Qzs7Ozs7SUFDdkMsOENBQTBDOzs7OztJQUMxQyxnQ0FBc0I7Ozs7O0lBQ3RCLHNDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBFbGVtZW50UmVmLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEtleVN0cm9rZUV2ZW50VHlwZSwgRXZlbnRMYWJlbHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0ICogYXMgdXVpZCBmcm9tICd1dWlkJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vZW52aXJvbm1lbnQvZW52aXJvbm1lbnQnO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRpcmVjdGl2ZS1zZWxlY3RvclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3RyYWNrLWtleVN0cm9rZV0nIH0pXG5leHBvcnQgY2xhc3MgS2V5U3Ryb2tlRGlyZWN0aXZlIHtcblxuICAgIC8qKiBFdmVudCBMYWJlbHMgQ29uc3RhbnRzICovXG4gICAgZXZlbnRMYWJlbHMgPSBFdmVudExhYmVscztcblxuICAgIC8qKlxuICAgICAqIERlcGVuZGVuY2llc1xuICAgICAqIEBwYXJhbSBkYXRhU3RvcmFnZVxuICAgICAqIEBwYXJhbSBhbmFseXRpY3NTZXJ2aWNlXG4gICAgICogQHBhcmFtIGVsIC0gRWxlbWVudCBSZWZlcmVuY2VcbiAgICAgKiBAcGFyYW0gcmVuZGVyZXIgLSBSZW5kZXJlclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGRhdGFTdG9yYWdlOiBEYXRhU3RvcmFnZVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgYW5hbHl0aWNzU2VydmljZTogQW5hbHl0aWNzU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGlmIElkIGRvZXNuJ3QgYmVsb25ncyB0byB0aGUgZWxlbWVudCwgd2hpY2ggaXMgYmVpbmcgdHJhY2tlZCxcbiAgICAgICAgICogQWRkaW5nIGEgZHluYW1pYyBJZFxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKCF0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuaWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGR5bmFtaWNJZCA9IGBrZXlfc3Ryb2tlX2VsZW1lbnRfJHt1dWlkLnY0KCl9YDtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2lkJywgZHluYW1pY0lkKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJhY2tpbmcgS2V5IHByZXNzIGV2ZW50cyB1c2luZyBob3N0IGxpc3RlbmVyXG4gICAgICogR2VuZXJhdGluZyBhIGRhdGEgYmVhbiBpbiBhIHNwZWNpZmllZCBmb3JtYXRcbiAgICAgKiBAcGFyYW0gJGV2ZW50IC0gS2V5UHJlc3MgRXZlbnRcbiAgICAgKi9cbiAgICBASG9zdExpc3RlbmVyKCdrZXlwcmVzcycsIFsnJGV2ZW50J10pIG9uS2V5U3Ryb2tlKCRldmVudDogYW55KSB7XG4gICAgICAgIGNvbnN0IGtleVN0cm9rZTogS2V5U3Ryb2tlRXZlbnRUeXBlID0gbmV3IEtleVN0cm9rZUV2ZW50VHlwZSgpO1xuICAgICAgICBpZiAoJGV2ZW50LnRhcmdldC50eXBlICE9PSAncGFzc3dvcmQnICYmIHRoaXMuY2hlY2tDbGFzc05hbWVzKCRldmVudC50YXJnZXQuY2xhc3NMaXN0KSkge1xuICAgICAgICAgICAga2V5U3Ryb2tlLmVsZW1lbnRJZCA9ICRldmVudC50YXJnZXQuaWQ7XG4gICAgICAgICAgICBrZXlTdHJva2Uua2V5ID0gJGV2ZW50LmtleTtcbiAgICAgICAgICAgIGtleVN0cm9rZS5jb2RlID0gJGV2ZW50LmNvZGU7XG4gICAgICAgICAgICBrZXlTdHJva2Uua2V5Q29kZSA9ICRldmVudC5rZXlDb2RlLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBrZXlTdHJva2UuaXNGb3JtID0gJGV2ZW50LnRhcmdldC5mb3JtICE9PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBrZXlTdHJva2UuZm9ybSA9ICRldmVudC50YXJnZXQuZm9ybSAhPT0gdW5kZWZpbmVkID8gSlNPTi5zdHJpbmdpZnkoJGV2ZW50LnRhcmdldC5mb3JtLmVsZW1lbnRzKSA6ICcnO1xuICAgICAgICAgICAga2V5U3Ryb2tlLnRhZ05hbWUgPSAkZXZlbnQudGFyZ2V0LnRhZ05hbWU7XG4gICAgICAgICAgICBrZXlTdHJva2UuaHRtbEVsZW1lbnRUeXBlID0gJGV2ZW50LnRhcmdldC50eXBlO1xuICAgICAgICAgICAga2V5U3Ryb2tlLnZhbHVlID0gJGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuc2VuZERhdGEoa2V5U3Ryb2tlLCAkZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBjaGVja0NsYXNzTmFtZXMoY2xhc3NMaXN0OiBBcnJheTxzdHJpbmc+KSB7XG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZXM6IGFueSA9IFsuLi5jbGFzc0xpc3RdLmNvbmNhdChlbnZpcm9ubWVudC5pZ25vcmVDc3NSdWxlcyk7XG4gICAgICAgIHJldHVybiBbLi4ubmV3IFNldChjbGFzc05hbWVzKV0ubGVuZ3RoID09PSBjbGFzc05hbWVzLmxlbmd0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kaW5nIGRhdGFcbiAgICAgKiBAcGFyYW0ga2V5U3Ryb2tlIC0gQ2FwdHVyZWQgS2V5U3Ryb2tlIGRhdGFcbiAgICAgKiBAcGFyYW0gZXZlbnREZXRhaWxzIC0gS2V5IFByZXNzIGV2ZW50IGRldGFpbHNcbiAgICAgKi9cbiAgICBwcml2YXRlIHNlbmREYXRhKGtleVN0cm9rZTogS2V5U3Ryb2tlRXZlbnRUeXBlLCBldmVudERldGFpbHM6IGFueSk6IHZvaWQge1xuICAgICAgICBjb25zdCBhbmFseXRpY3NCZWFuOiBBbmFseXRpY3NCZWFuID1cbiAgICAgICAgICAgIHRoaXMuYW5hbHl0aWNzU2VydmljZS5zZXRBbmFseXRpY3NEYXRhKHt9LFxuICAgICAgICAgICAgICAgIGV2ZW50RGV0YWlscyxcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50TGFiZWxzLktFWV9TVFJPS0UsICcnLFxuICAgICAgICAgICAgICAgIHsga2V5U3Ryb2tlRGF0YToga2V5U3Ryb2tlIH0pO1xuICAgICAgICB0aGlzLmRhdGFTdG9yYWdlLmFwcGVuZFRvQW5hbHl0aWNzQXJyYXkoYW5hbHl0aWNzQmVhbik7XG4gICAgfVxufVxuIl19