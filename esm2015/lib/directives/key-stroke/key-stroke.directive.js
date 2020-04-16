/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { DataStorageService } from '../../services/data-storage/data-storage.service';
import { KeyStrokeEventType, EventLabels } from '../../types/event.types';
import * as uuid from 'uuid';
import { environment } from '../../environment/environment';
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
    }
    /**
     * @param {?} classList
     * @return {?}
     */
    checkClassNames(classList) {
        /** @type {?} */
        const classNames = [...classList].concat(environment.ignoreCssRules);
        return [...new Set(classNames)].length === classNames.length;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5LXN0cm9rZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9rZXktc3Ryb2tlL2tleS1zdHJva2UuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUUxRSxPQUFPLEtBQUssSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUM3QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sK0JBQStCLENBQUM7O0FBSTVELE1BQU07Ozs7Ozs7O0lBWUYsWUFDWSxXQUErQixFQUMvQixnQkFBa0MsRUFDbEMsRUFBYyxFQUNkLFFBQW1CO1FBSG5CLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUMvQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBZC9CLDZCQUE2QjtRQUM3QixnQkFBVyxHQUFHLFdBQVcsQ0FBQztRQWV0Qjs7O1dBR0c7UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFOztrQkFDckIsU0FBUyxHQUFHLHNCQUFzQixJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUU7WUFDbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ3RFO0lBRUwsQ0FBQzs7Ozs7OztJQU9xQyxXQUFXLENBQUMsTUFBVzs7Y0FDbkQsU0FBUyxHQUF1QixJQUFJLGtCQUFrQixFQUFFO1FBQzlELElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssVUFBVSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNwRixTQUFTLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ3ZDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUMzQixTQUFTLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDN0IsU0FBUyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzlDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDO1lBQ3BELFNBQVMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDckcsU0FBUyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUMxQyxTQUFTLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQy9DLFNBQVMsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDcEM7SUFFTCxDQUFDOzs7OztJQUVELGVBQWUsQ0FBQyxTQUF3Qjs7Y0FDOUIsVUFBVSxHQUFrQixDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUM7UUFDbkYsT0FBTyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssVUFBVSxDQUFDLE1BQU0sQ0FBQztJQUNqRSxDQUFDOzs7Ozs7OztJQU9PLFFBQVEsQ0FBQyxTQUE2QixFQUFFLFlBQWlCOztjQUN2RCxhQUFhLEdBQ2YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLEVBQUUsRUFDckMsWUFBWSxFQUNaLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLEVBQUUsRUFDL0IsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMzRCxDQUFDOzs7WUFyRUosU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFOzs7WUFQbkMsa0JBQWtCO1lBRGxCLGdCQUFnQjtZQURTLFVBQVU7WUFBRSxTQUFTOzs7MEJBNENsRCxZQUFZLFNBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDOzs7Ozs7O0lBL0JwQyx5Q0FBMEI7Ozs7O0lBVXRCLHlDQUF1Qzs7Ozs7SUFDdkMsOENBQTBDOzs7OztJQUMxQyxnQ0FBc0I7Ozs7O0lBQ3RCLHNDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBFbGVtZW50UmVmLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hbmFseXRpY3MvYW5hbHl0aWNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEtleVN0cm9rZUV2ZW50VHlwZSwgRXZlbnRMYWJlbHMgfSBmcm9tICcuLi8uLi90eXBlcy9ldmVudC50eXBlcyc7XG5pbXBvcnQgeyBBbmFseXRpY3NCZWFuIH0gZnJvbSAnLi4vLi4vYW5hbHl0aWNzLWJlYW4vYW5hbHl0aWNzLWJlYW4nO1xuaW1wb3J0ICogYXMgdXVpZCBmcm9tICd1dWlkJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vZW52aXJvbm1lbnQvZW52aXJvbm1lbnQnO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRpcmVjdGl2ZS1zZWxlY3RvclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3RyYWNrLWtleVN0cm9rZV0nIH0pXG5leHBvcnQgY2xhc3MgS2V5U3Ryb2tlRGlyZWN0aXZlIHtcblxuICAgIC8qKiBFdmVudCBMYWJlbHMgQ29uc3RhbnRzICovXG4gICAgZXZlbnRMYWJlbHMgPSBFdmVudExhYmVscztcblxuICAgIC8qKlxuICAgICAqIERlcGVuZGVuY2llc1xuICAgICAqIEBwYXJhbSBkYXRhU3RvcmFnZVxuICAgICAqIEBwYXJhbSBhbmFseXRpY3NTZXJ2aWNlXG4gICAgICogQHBhcmFtIGVsIC0gRWxlbWVudCBSZWZlcmVuY2VcbiAgICAgKiBAcGFyYW0gcmVuZGVyZXIgLSBSZW5kZXJlclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGRhdGFTdG9yYWdlOiBEYXRhU3RvcmFnZVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgYW5hbHl0aWNzU2VydmljZTogQW5hbHl0aWNzU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGlmIElkIGRvZXNuJ3QgYmVsb25ncyB0byB0aGUgZWxlbWVudCwgd2hpY2ggaXMgYmVpbmcgdHJhY2tlZCxcbiAgICAgICAgICogQWRkaW5nIGEgZHluYW1pYyBJZFxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKCF0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuaWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGR5bmFtaWNJZCA9IGBrZXlfc3Ryb2tlX2VsZW1lbnRfJHt1dWlkLnY0KCl9YDtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2lkJywgZHluYW1pY0lkKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJhY2tpbmcgS2V5IHByZXNzIGV2ZW50cyB1c2luZyBob3N0IGxpc3RlbmVyXG4gICAgICogR2VuZXJhdGluZyBhIGRhdGEgYmVhbiBpbiBhIHNwZWNpZmllZCBmb3JtYXRcbiAgICAgKiBAcGFyYW0gJGV2ZW50IC0gS2V5UHJlc3MgRXZlbnRcbiAgICAgKi9cbiAgICBASG9zdExpc3RlbmVyKCdrZXlwcmVzcycsIFsnJGV2ZW50J10pIG9uS2V5U3Ryb2tlKCRldmVudDogYW55KSB7XG4gICAgICAgIGNvbnN0IGtleVN0cm9rZTogS2V5U3Ryb2tlRXZlbnRUeXBlID0gbmV3IEtleVN0cm9rZUV2ZW50VHlwZSgpO1xuICAgICAgICBpZiAoJGV2ZW50LnRhcmdldC50eXBlICE9PSAncGFzc3dvcmQnICYmIHRoaXMuY2hlY2tDbGFzc05hbWVzKCRldmVudC50YXJnZXQuY2xhc3NMaXN0KSkge1xuICAgICAgICAgICAga2V5U3Ryb2tlLmVsZW1lbnRJZCA9ICRldmVudC50YXJnZXQuaWQ7XG4gICAgICAgICAgICBrZXlTdHJva2Uua2V5ID0gJGV2ZW50LmtleTtcbiAgICAgICAgICAgIGtleVN0cm9rZS5jb2RlID0gJGV2ZW50LmNvZGU7XG4gICAgICAgICAgICBrZXlTdHJva2Uua2V5Q29kZSA9ICRldmVudC5rZXlDb2RlLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBrZXlTdHJva2UuaXNGb3JtID0gJGV2ZW50LnRhcmdldC5mb3JtICE9PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBrZXlTdHJva2UuZm9ybSA9ICRldmVudC50YXJnZXQuZm9ybSAhPT0gdW5kZWZpbmVkID8gSlNPTi5zdHJpbmdpZnkoJGV2ZW50LnRhcmdldC5mb3JtLmVsZW1lbnRzKSA6ICcnO1xuICAgICAgICAgICAga2V5U3Ryb2tlLnRhZ05hbWUgPSAkZXZlbnQudGFyZ2V0LnRhZ05hbWU7XG4gICAgICAgICAgICBrZXlTdHJva2UuaHRtbEVsZW1lbnRUeXBlID0gJGV2ZW50LnRhcmdldC50eXBlO1xuICAgICAgICAgICAga2V5U3Ryb2tlLnZhbHVlID0gJGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuc2VuZERhdGEoa2V5U3Ryb2tlLCAkZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBjaGVja0NsYXNzTmFtZXMoY2xhc3NMaXN0OiBBcnJheTxzdHJpbmc+KSB7XG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZXM6IEFycmF5PHN0cmluZz4gPSBbLi4uY2xhc3NMaXN0XS5jb25jYXQoZW52aXJvbm1lbnQuaWdub3JlQ3NzUnVsZXMpO1xuICAgICAgICByZXR1cm4gWy4uLm5ldyBTZXQoY2xhc3NOYW1lcyldLmxlbmd0aCA9PT0gY2xhc3NOYW1lcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VuZGluZyBkYXRhXG4gICAgICogQHBhcmFtIGtleVN0cm9rZSAtIENhcHR1cmVkIEtleVN0cm9rZSBkYXRhXG4gICAgICogQHBhcmFtIGV2ZW50RGV0YWlscyAtIEtleSBQcmVzcyBldmVudCBkZXRhaWxzXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZW5kRGF0YShrZXlTdHJva2U6IEtleVN0cm9rZUV2ZW50VHlwZSwgZXZlbnREZXRhaWxzOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgYW5hbHl0aWNzQmVhbjogQW5hbHl0aWNzQmVhbiA9XG4gICAgICAgICAgICB0aGlzLmFuYWx5dGljc1NlcnZpY2Uuc2V0QW5hbHl0aWNzRGF0YSh7fSxcbiAgICAgICAgICAgICAgICBldmVudERldGFpbHMsXG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudExhYmVscy5LRVlfU1RST0tFLCAnJyxcbiAgICAgICAgICAgICAgICB7IGtleVN0cm9rZURhdGE6IGtleVN0cm9rZSB9KTtcbiAgICAgICAgdGhpcy5kYXRhU3RvcmFnZS5hcHBlbmRUb0FuYWx5dGljc0FycmF5KGFuYWx5dGljc0JlYW4pO1xuICAgIH1cbn1cbiJdfQ==