/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var EventLabels = {
    PAGE_LOAD: 'PAGE_LOAD',
    MOUSE_HOVER: 'MOUSE_HOVER',
    BUTTON_CLICK: 'BUTTON_CLICK',
    MOUSE_MOVE: 'MOUSE_MOVE',
    SCROLL: 'SCROLL',
    CONSOLE_ERROR: 'CONSOLE_ERROR',
    KEY_STROKE: 'KEY_STROKE',
};
export { EventLabels };
/** @enum {string} */
var Constants = {
    DEMOGRAPHIC_INFO: 'demographic-info',
    SESSION_ID: 'ngS3AnalyticsSessionId',
    DEMOGRAPHIC_API_URL: 'https://ipapi.co/json/',
};
export { Constants };
var KeyStrokeEventType = /** @class */ (function () {
    function KeyStrokeEventType() {
    }
    return KeyStrokeEventType;
}());
export { KeyStrokeEventType };
if (false) {
    /** @type {?} */
    KeyStrokeEventType.prototype.key;
    /** @type {?} */
    KeyStrokeEventType.prototype.keyCode;
    /** @type {?} */
    KeyStrokeEventType.prototype.elementId;
    /** @type {?} */
    KeyStrokeEventType.prototype.isForm;
    /** @type {?} */
    KeyStrokeEventType.prototype.tagName;
    /** @type {?} */
    KeyStrokeEventType.prototype.htmlElementType;
    /** @type {?} */
    KeyStrokeEventType.prototype.value;
    /** @type {?} */
    KeyStrokeEventType.prototype.code;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQudHlwZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvIiwic291cmNlcyI6WyJsaWIvdHlwZXMvZXZlbnQudHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQ0ksV0FBWSxXQUFXO0lBQ3ZCLGFBQWMsYUFBYTtJQUMzQixjQUFlLGNBQWM7SUFDN0IsWUFBYSxZQUFZO0lBQ3pCLFFBQVMsUUFBUTtJQUNqQixlQUFnQixlQUFlO0lBQy9CLFlBQWEsWUFBWTs7Ozs7SUFJekIsa0JBQW1CLGtCQUFrQjtJQUNyQyxZQUFhLHdCQUF3QjtJQUNyQyxxQkFBc0Isd0JBQXdCOzs7QUFJbEQ7SUFBQTtJQVNBLENBQUM7SUFBRCx5QkFBQztBQUFELENBQUMsQUFURCxJQVNDOzs7O0lBUkcsaUNBQVk7O0lBQ1oscUNBQWdCOztJQUNoQix1Q0FBa0I7O0lBQ2xCLG9DQUFnQjs7SUFDaEIscUNBQWdCOztJQUNoQiw2Q0FBd0I7O0lBQ3hCLG1DQUFjOztJQUNkLGtDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGVudW0gRXZlbnRMYWJlbHMge1xuICAgIFBBR0VfTE9BRCA9ICdQQUdFX0xPQUQnLFxuICAgIE1PVVNFX0hPVkVSID0gJ01PVVNFX0hPVkVSJyxcbiAgICBCVVRUT05fQ0xJQ0sgPSAnQlVUVE9OX0NMSUNLJyxcbiAgICBNT1VTRV9NT1ZFID0gJ01PVVNFX01PVkUnLFxuICAgIFNDUk9MTCA9ICdTQ1JPTEwnLFxuICAgIENPTlNPTEVfRVJST1IgPSAnQ09OU09MRV9FUlJPUicsXG4gICAgS0VZX1NUUk9LRSA9ICdLRVlfU1RST0tFJ1xufVxuXG5leHBvcnQgZW51bSBDb25zdGFudHMge1xuICAgIERFTU9HUkFQSElDX0lORk8gPSAnZGVtb2dyYXBoaWMtaW5mbycsXG4gICAgU0VTU0lPTl9JRCA9ICduZ1MzQW5hbHl0aWNzU2Vzc2lvbklkJyxcbiAgICBERU1PR1JBUEhJQ19BUElfVVJMID0gJ2h0dHBzOi8vaXBhcGkuY28vanNvbi8nXG59XG5cblxuZXhwb3J0IGNsYXNzIEtleVN0cm9rZUV2ZW50VHlwZSB7XG4gICAga2V5OiBzdHJpbmc7IC8vIHByZXNzZWQgS2V5XG4gICAga2V5Q29kZTogc3RyaW5nOyAvLyBwcmVzc2VkIEtleSBDb2RlXG4gICAgZWxlbWVudElkOiBzdHJpbmc7IC8vIElkIG9mIGVsZW1lbnRcbiAgICBpc0Zvcm06IGJvb2xlYW47IC8vIGlzIGl0IGEgZm9ybVxuICAgIHRhZ05hbWU6IHN0cmluZzsgLy8gdGFnTmFtZSBvZiBlbGVtZW50XG4gICAgaHRtbEVsZW1lbnRUeXBlOiBzdHJpbmc7IC8vIHR5cGUgb2YgZWxlbWVudFxuICAgIHZhbHVlOiBzdHJpbmc7IC8vIHByZXZpb3VzIHZhbHVlIG9mIHRoZSBlbGVtZW50XG4gICAgY29kZTogc3RyaW5nOyAvLyBQcmVzc2VkIGtleSBsYWJlbFxufVxuIl19