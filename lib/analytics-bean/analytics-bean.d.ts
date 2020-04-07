import { KeyStrokeEventType } from '../types/event.types';
export declare class Configuration {
    dataCollectionApi: string;
    restrictIPRange?: string;
}
/**
 * Analytics Object Structure
 */
export interface AnalyticsBean {
    eventLabel: string;
    eventComponent: string;
    browser: string;
    fullURL: string;
    resolution: string;
    xCoord: string;
    yCoord: string;
    pageXCoord: string;
    pageYCoord: string;
    eventTime: any;
    screenshot: string;
    additionalInfo: string;
    utm: string;
    demographicInfo: string;
    htmlElement: any;
    keyStrokeData: KeyStrokeEventType;
    origin: string;
    performance: PerformanceBean;
    errors: string;
}
export interface PerformanceBean {
    navigation: PerformanceNavigation;
    timeOrigin: number;
    timing: PerformanceTiming;
}
export interface PerformanceTiming {
    connectEnd: number;
    connectStart: number;
    domComplete: number;
    domContentLoadedEventEnd: number;
    domContentLoadedEventStart: number;
    domInteractive: number;
    domLoading: number;
    domainLookupEnd: number;
    domainLookupStart: number;
    fetchStart: number;
    loadEventEnd: number;
    loadEventStart: number;
    navigationStart: number;
    redirectEnd: number;
    redirectStart: number;
    requestStart: number;
    responseEnd: number;
    responseStart: number;
    secureConnectionStart: number;
    unloadEventEnd: number;
    unloadEventStart: number;
}
export interface PerformanceNavigation {
    redirectCount: number;
    type: number;
}
export interface MemoryUsageBean {
    jsHeapSizeLimit: number;
    totalJSHeapSize: number;
    usedJSHeapSize: number;
}
