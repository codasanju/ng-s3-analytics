/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { AnalyticsService } from '../analytics/analytics.service';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';
import { Constants } from '../../types/event.types';
import * as uuid from 'uuid';
import * as i0 from "@angular/core";
import * as i1 from "../analytics/analytics.service";
import * as i2 from "@angular/common/http";
export class DataStorageService {
    /**
     * @param {?} analyticalService
     * @param {?} http
     */
    constructor(analyticalService, http) {
        this.analyticalService = analyticalService;
        this.http = http;
        this.constants = Constants;
        this.allDataAnalyticsArray = [];
        this.keys = [];
        this.eventCollector = new Map();
        this.routeDetails = [];
        this.count = 0;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    setUrlKey(data) {
        /** @type {?} */
        let flag = 0;
        if (this.previousUrl === undefined) {
            this.eventCollector.set(data, []);
            this.previousUrl = data || '/';
        }
        else if (!(data === this.previousUrl)) {
            for (const key of Array.from(this.eventCollector.keys())) {
                if (key === data) {
                    flag = 1;
                    break;
                }
            }
            if (flag === 0) {
                this.eventCollector.set(data, []);
            }
            this.previousUrl = data;
        }
    }
    /**
     * @param {?} data
     * @return {?}
     */
    appendToAnalyticsArray(data) {
        if (this.previousUrl === undefined) {
            this.setUrlKey(data.eventComponent);
        }
        this.eventCollector.get(this.previousUrl).push(data);
    }
    /**
     * @return {?}
     */
    pushDataArrayToS3() {
        this.count++;
        for (const key of Array.from(this.eventCollector.keys())) {
            this.allDataAnalytics = {
                pageUrl: key,
                eventValues: Array.from(this.eventCollector.get(key).values())
            };
            this.keys.push(key);
            if (this.allDataAnalytics.eventValues.length > 0) {
                this.stopIdleTimer();
                this.analyticalService.pushData(this.allDataAnalytics);
            }
            else {
                this.startCalculateIdleTime();
            }
        }
        this.eventCollector.clear();
        for (const key of this.keys) {
            this.eventCollector.set(key, []);
        }
    }
    /**
     * @param {?} routeDetails
     * @return {?}
     */
    setRouteDetails(routeDetails) {
        this.routeDetails = routeDetails;
    }
    /**
     * @return {?}
     */
    getRouteDetails() {
        return this.routeDetails;
    }
    /**
     * If the session is idle for 30 min, the session will be cleared
     * @return {?}
     */
    startCalculateIdleTime() {
        if (!this.idleTimerSubscription) {
            this.idleTimerSubscription = interval(1000 * 60 * 30).subscribe((/**
             * @param {?} x
             * @return {?}
             */
            x => {
                /** @type {?} */
                const sessionId = uuid.v4();
                sessionStorage.setItem(this.constants.SESSION_ID, sessionId);
                this.stopIdleTimer();
            }));
        }
    }
    /**
     * if the idle timer is running, resetting the timer
     * @return {?}
     */
    stopIdleTimer() {
        if (this.idleTimerSubscription) {
            this.idleTimerSubscription.unsubscribe();
            this.idleTimerSubscription = null;
        }
        this.startCalculateIdleTime();
    }
}
DataStorageService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
DataStorageService.ctorParameters = () => [
    { type: AnalyticsService },
    { type: HttpClient }
];
/** @nocollapse */ DataStorageService.ngInjectableDef = i0.defineInjectable({ factory: function DataStorageService_Factory() { return new DataStorageService(i0.inject(i1.AnalyticsService), i0.inject(i2.HttpClient)); }, token: DataStorageService, providedIn: "root" });
if (false) {
    /** @type {?} */
    DataStorageService.prototype.constants;
    /** @type {?} */
    DataStorageService.prototype.allDataAnalyticsArray;
    /** @type {?} */
    DataStorageService.prototype.allDataAnalytics;
    /** @type {?} */
    DataStorageService.prototype.previousUrl;
    /** @type {?} */
    DataStorageService.prototype.keys;
    /** @type {?} */
    DataStorageService.prototype.idleTimerSubscription;
    /** @type {?} */
    DataStorageService.prototype.eventCollector;
    /**
     * @type {?}
     * @private
     */
    DataStorageService.prototype.routeDetails;
    /** @type {?} */
    DataStorageService.prototype.count;
    /**
     * @type {?}
     * @private
     */
    DataStorageService.prototype.analyticalService;
    /**
     * @type {?}
     * @private
     */
    DataStorageService.prototype.http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1zdG9yYWdlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVsRCxPQUFPLEVBQUUsUUFBUSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDcEQsT0FBTyxLQUFLLElBQUksTUFBTSxNQUFNLENBQUM7Ozs7QUFLN0IsTUFBTTs7Ozs7SUFZSixZQUFvQixpQkFBbUMsRUFBVSxJQUFnQjtRQUE3RCxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBWTtRQVZqRixjQUFTLEdBQUcsU0FBUyxDQUFDO1FBQ3RCLDBCQUFxQixHQUFlLEVBQUUsQ0FBQztRQU12QyxTQUFJLEdBQWUsRUFBRSxDQUFDO1FBRXRCLG1CQUFjLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUVuQixpQkFBWSxHQUFRLEVBQUUsQ0FBQztRQUMvQixVQUFLLEdBQUcsQ0FBQyxDQUFDO0lBRjJFLENBQUM7Ozs7O0lBR3RGLFNBQVMsQ0FBQyxJQUFZOztZQUNoQixJQUFJLEdBQUcsQ0FBQztRQUNaLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxTQUFTLEVBQUU7WUFDbEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxJ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O1FBQ1gsSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDOUIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7U0FDbkM7UUFDRCxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUNoQyxDQUFDOzs7WUE5RkYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7WUFUUSxnQkFBZ0I7WUFDaEIsVUFBVTs7Ozs7SUFXakIsdUNBQXNCOztJQUN0QixtREFBdUM7O0lBQ3ZDLDhDQUdFOztJQUNGLHlDQUFvQjs7SUFDcEIsa0NBQXNCOztJQUN0QixtREFBb0M7O0lBQ3BDLDRDQUEyQjs7Ozs7SUFFM0IsMENBQStCOztJQUMvQixtQ0FBVTs7Ozs7SUFGRSwrQ0FBMkM7Ozs7O0lBQUUsa0NBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IGludGVydmFsLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcbmltcG9ydCAqIGFzIHV1aWQgZnJvbSAndXVpZCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIERhdGFTdG9yYWdlU2VydmljZSB7XG5cbiAgY29uc3RhbnRzID0gQ29uc3RhbnRzO1xuICBhbGxEYXRhQW5hbHl0aWNzQXJyYXk6IEFycmF5PGFueT4gPSBbXTtcbiAgYWxsRGF0YUFuYWx5dGljczoge1xuICAgIHBhZ2VVcmw6IHN0cmluZyxcbiAgICBldmVudFZhbHVlczogQXJyYXk8YW55PlxuICB9O1xuICBwcmV2aW91c1VybDogc3RyaW5nO1xuICBrZXlzOiBBcnJheTxhbnk+ID0gW107XG4gIGlkbGVUaW1lclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBldmVudENvbGxlY3RvciA9IG5ldyBNYXAoKTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhbmFseXRpY2FsU2VydmljZTogQW5hbHl0aWNzU2VydmljZSwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7IH1cbiAgcHJpdmF0ZSByb3V0ZURldGFpbHM6IGFueSA9IFtdO1xuICBjb3VudCA9IDA7XG4gIHNldFVybEtleShkYXRhOiBzdHJpbmcpIHtcbiAgICBsZXQgZmxhZyA9IDA7XG4gICAgaWYgKHRoaXMucHJldmlvdXNVcmwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5ldmVudENvbGxlY3Rvci5zZXQoZGF0YSwgW10pO1xuICAgICAgdGhpcy5wcmV2aW91c1VybCA9IGRhdGEgfHwgJy8nO1xuICAgIH0gZWxzZSBpZiAoIShkYXRhID09PSB0aGlzLnByZXZpb3VzVXJsKSkge1xuICAgICAgZm9yIChjb25zdCBrZXkgb2YgQXJyYXkuZnJvbSh0aGlzLmV2ZW50Q29sbGVjdG9yLmtleXMoKSkpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gZGF0YSkge1xuICAgICAgICAgIGZsYWcgPSAxO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZmxhZyA9PT0gMCkge1xuICAgICAgICB0aGlzLmV2ZW50Q29sbGVjdG9yLnNldChkYXRhLCBbXSk7XG4gICAgICB9XG4gICAgICB0aGlzLnByZXZpb3VzVXJsID0gZGF0YTtcbiAgICB9XG4gIH1cbiAgYXBwZW5kVG9BbmFseXRpY3NBcnJheShkYXRhOiBBbmFseXRpY3NCZWFuKSB7XG4gICAgaWYgKHRoaXMucHJldmlvdXNVcmwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5zZXRVcmxLZXkoZGF0YS5ldmVudENvbXBvbmVudCk7XG4gICAgfVxuICAgIHRoaXMuZXZlbnRDb2xsZWN0b3IuZ2V0KHRoaXMucHJldmlvdXNVcmwpLnB1c2goZGF0YSk7XG4gIH1cblxuICBwdXNoRGF0YUFycmF5VG9TMygpIHtcbiAgICB0aGlzLmNvdW50Kys7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgQXJyYXkuZnJvbSh0aGlzLmV2ZW50Q29sbGVjdG9yLmtleXMoKSkpIHtcbiAgICAgIHRoaXMuYWxsRGF0YUFuYWx5dGljcyA9IHtcbiAgICAgICAgcGFnZVVybDoga2V5LFxuICAgICAgICBldmVudFZhbHVlczogQXJyYXkuZnJvbSh0aGlzLmV2ZW50Q29sbGVjdG9yLmdldChrZXkpLnZhbHVlcygpKVxuICAgICAgfTtcbiAgICAgIHRoaXMua2V5cy5wdXNoKGtleSk7XG4gICAgICBpZiAodGhpcy5hbGxEYXRhQW5hbHl0aWNzLmV2ZW50VmFsdWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5zdG9wSWRsZVRpbWVyKCk7XG4gICAgICAgIHRoaXMuYW5hbHl0aWNhbFNlcnZpY2UucHVzaERhdGEodGhpcy5hbGxEYXRhQW5hbHl0aWNzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RhcnRDYWxjdWxhdGVJZGxlVGltZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmV2ZW50Q29sbGVjdG9yLmNsZWFyKCk7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgdGhpcy5rZXlzKSB7XG4gICAgICB0aGlzLmV2ZW50Q29sbGVjdG9yLnNldChrZXksIFtdKTtcbiAgICB9XG4gIH1cblxuICBzZXRSb3V0ZURldGFpbHMocm91dGVEZXRhaWxzOiBhbnkpIHtcbiAgICB0aGlzLnJvdXRlRGV0YWlscyA9IHJvdXRlRGV0YWlscztcbiAgfVxuXG4gIGdldFJvdXRlRGV0YWlscygpIHtcbiAgICByZXR1cm4gdGhpcy5yb3V0ZURldGFpbHM7XG4gIH1cblxuICAvKipcbiAgICogSWYgdGhlIHNlc3Npb24gaXMgaWRsZSBmb3IgMzAgbWluLCB0aGUgc2Vzc2lvbiB3aWxsIGJlIGNsZWFyZWRcbiAgICovXG4gIHN0YXJ0Q2FsY3VsYXRlSWRsZVRpbWUoKSB7XG4gICAgaWYgKCF0aGlzLmlkbGVUaW1lclN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5pZGxlVGltZXJTdWJzY3JpcHRpb24gPSBpbnRlcnZhbCgxMDAwICogNjAgKiAzMCkuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgICBjb25zdCBzZXNzaW9uSWQgPSB1dWlkLnY0KCk7XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0odGhpcy5jb25zdGFudHMuU0VTU0lPTl9JRCwgc2Vzc2lvbklkKTtcbiAgICAgICAgdGhpcy5zdG9wSWRsZVRpbWVyKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogaWYgdGhlIGlkbGUgdGltZXIgaXMgcnVubmluZywgcmVzZXR0aW5nIHRoZSB0aW1lclxuICAgKi9cbiAgc3RvcElkbGVUaW1lcigpIHtcbiAgICBpZiAodGhpcy5pZGxlVGltZXJTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuaWRsZVRpbWVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLmlkbGVUaW1lclN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMuc3RhcnRDYWxjdWxhdGVJZGxlVGltZSgpO1xuICB9XG5cbn1cbiJdfQ==