export declare enum EventLabels {
    PAGE_LOAD = "PAGE_LOAD",
    MOUSE_HOVER = "MOUSE_HOVER",
    BUTTON_CLICK = "BUTTON_CLICK",
    MOUSE_MOVE = "MOUSE_MOVE",
    SCROLL = "SCROLL",
    CONSOLE_ERROR = "CONSOLE_ERROR",
    KEY_STROKE = "KEY_STROKE"
}
export declare enum Constants {
    DEMOGRAPHIC_INFO = "demographic-info",
    SESSION_ID = "ngS3AnalyticsSessionId",
    DEMOGRAPHIC_API_URL = "https://ipapi.co/json/"
}
export declare class KeyStrokeEventType {
    key: string;
    keyCode: string;
    elementId: string;
    isForm: boolean;
    form: Array<any>;
    tagName: string;
    htmlElementType: string;
    value: string;
    code: string;
}
