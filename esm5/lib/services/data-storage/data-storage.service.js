/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AnalyticsService } from '../analytics/analytics.service';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';
import { Constants } from '../../types/event.types';
import * as uuid from 'uuid';
import * as i0 from "@angular/core";
import * as i1 from "../analytics/analytics.service";
import * as i2 from "@angular/common/http";
var DataStorageService = /** @class */ (function () {
    function DataStorageService(analyticalService, http) {
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
    DataStorageService.prototype.setUrlKey = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var e_1, _a;
        /** @type {?} */
        var flag = 0;
        if (this.previousUrl === undefined) {
            this.eventCollector.set(data, []);
            this.previousUrl = data || '/';
        }
        else if (!(data === this.previousUrl)) {
            try {
                for (var _b = tslib_1.__values(Array.from(this.eventCollector.keys())), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    if (key === data) {
                        flag = 1;
                        break;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (flag === 0) {
                this.eventCollector.set(data, []);
            }
            this.previousUrl = data;
        }
    };
    /**
     * @param {?} data
     * @return {?}
     */
    DataStorageService.prototype.appendToAnalyticsArray = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        if (this.previousUrl === undefined) {
            this.setUrlKey(data.eventComponent);
        }
        this.eventCollector.get(this.previousUrl).push(data);
    };
    /**
     * @return {?}
     */
    DataStorageService.prototype.pushDataArrayToS3 = /**
     * @return {?}
     */
    function () {
        var e_2, _a, e_3, _b;
        this.count++;
        try {
            for (var _c = tslib_1.__values(Array.from(this.eventCollector.keys())), _d = _c.next(); !_d.done; _d = _c.next()) {
                var key = _d.value;
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
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_2) throw e_2.error; }
        }
        this.eventCollector.clear();
        try {
            for (var _e = tslib_1.__values(this.keys), _f = _e.next(); !_f.done; _f = _e.next()) {
                var key = _f.value;
                this.eventCollector.set(key, []);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    /**
     * @param {?} routeDetails
     * @return {?}
     */
    DataStorageService.prototype.setRouteDetails = /**
     * @param {?} routeDetails
     * @return {?}
     */
    function (routeDetails) {
        this.routeDetails = routeDetails;
    };
    /**
     * @return {?}
     */
    DataStorageService.prototype.getRouteDetails = /**
     * @return {?}
     */
    function () {
        return this.routeDetails;
    };
    /**
     * If the session is idle for 30 min, the session will be cleared
     */
    /**
     * If the session is idle for 30 min, the session will be cleared
     * @return {?}
     */
    DataStorageService.prototype.startCalculateIdleTime = /**
     * If the session is idle for 30 min, the session will be cleared
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.idleTimerSubscription) {
            this.idleTimerSubscription = interval(1000 * 60 * 30).subscribe((/**
             * @param {?} x
             * @return {?}
             */
            function (x) {
                /** @type {?} */
                var sessionId = uuid.v4();
                sessionStorage.setItem(_this.constants.SESSION_ID, sessionId);
                _this.stopIdleTimer();
            }));
        }
    };
    /**
     * if the idle timer is running, resetting the timer
     */
    /**
     * if the idle timer is running, resetting the timer
     * @return {?}
     */
    DataStorageService.prototype.stopIdleTimer = /**
     * if the idle timer is running, resetting the timer
     * @return {?}
     */
    function () {
        if (this.idleTimerSubscription) {
            this.idleTimerSubscription.unsubscribe();
            this.idleTimerSubscription = null;
        }
        this.startCalculateIdleTime();
    };
    DataStorageService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    DataStorageService.ctorParameters = function () { return [
        { type: AnalyticsService },
        { type: HttpClient }
    ]; };
    /** @nocollapse */ DataStorageService.ngInjectableDef = i0.defineInjectable({ factory: function DataStorageService_Factory() { return new DataStorageService(i0.inject(i1.AnalyticsService), i0.inject(i2.HttpClient)); }, token: DataStorageService, providedIn: "root" });
    return DataStorageService;
}());
export { DataStorageService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1zdG9yYWdlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY29kYWdsb2JhbC9uZy1zMy1hbmFseXRpY3MvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZGF0YS1zdG9yYWdlL2RhdGEtc3RvcmFnZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFbEQsT0FBTyxFQUFFLFFBQVEsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3BELE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFDOzs7O0FBRTdCO0lBZUUsNEJBQW9CLGlCQUFtQyxFQUFVLElBQWdCO1FBQTdELHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFZO1FBVmpGLGNBQVMsR0FBRyxTQUFTLENBQUM7UUFDdEIsMEJBQXFCLEdBQWUsRUFBRSxDQUFDO1FBTXZDLFNBQUksR0FBZSxFQUFFLENBQUM7UUFFdEIsbUJBQWMsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBRW5CLGlCQUFZLEdBQVEsRUFBRSxDQUFDO1FBQy9CLFVBQUssR0FBRyxDQUFDLENBQUM7SUFGMkUsQ0FBQzs7Ozs7SUFHdEYsc0NBQVM7Ozs7SUFBVCxVQUFVLElBQVk7OztZQUNoQixJQUFJLEdBQUcsQ0FBQztRQUNaLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxTQUFTLEVBQUU7WUFDbEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFB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WUFBQyxVQUFBLENBQUM7O29CQUN6RCxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRTtnQkFDM0IsY0FBYyxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDN0QsS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3ZCLENBQUMsRUFBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsMENBQWE7Ozs7SUFBYjtRQUNFLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFO1lBQzlCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN6QyxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO1NBQ25DO1FBQ0QsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDaEMsQ0FBQzs7Z0JBOUZGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OztnQkFUUSxnQkFBZ0I7Z0JBQ2hCLFVBQVU7Ozs2QkFGbkI7Q0F3R0MsQUFoR0QsSUFnR0M7U0E3Rlksa0JBQWtCOzs7SUFFN0IsdUNBQXNCOztJQUN0QixtREFBdUM7O0lBQ3ZDLDhDQUdFOztJQUNGLHlDQUFvQjs7SUFDcEIsa0NBQXNCOztJQUN0QixtREFBb0M7O0lBQ3BDLDRDQUEyQjs7Ozs7SUFFM0IsMENBQStCOztJQUMvQixtQ0FBVTs7Ozs7SUFGRSwrQ0FBMkM7Ozs7O0lBQUUsa0NBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4uL2FuYWx5dGljcy9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgQW5hbHl0aWNzQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IGludGVydmFsLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gJy4uLy4uL3R5cGVzL2V2ZW50LnR5cGVzJztcbmltcG9ydCAqIGFzIHV1aWQgZnJvbSAndXVpZCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIERhdGFTdG9yYWdlU2VydmljZSB7XG5cbiAgY29uc3RhbnRzID0gQ29uc3RhbnRzO1xuICBhbGxEYXRhQW5hbHl0aWNzQXJyYXk6IEFycmF5PGFueT4gPSBbXTtcbiAgYWxsRGF0YUFuYWx5dGljczoge1xuICAgIHBhZ2VVcmw6IHN0cmluZyxcbiAgICBldmVudFZhbHVlczogQXJyYXk8YW55PlxuICB9O1xuICBwcmV2aW91c1VybDogc3RyaW5nO1xuICBrZXlzOiBBcnJheTxhbnk+ID0gW107XG4gIGlkbGVUaW1lclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBldmVudENvbGxlY3RvciA9IG5ldyBNYXAoKTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhbmFseXRpY2FsU2VydmljZTogQW5hbHl0aWNzU2VydmljZSwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7IH1cbiAgcHJpdmF0ZSByb3V0ZURldGFpbHM6IGFueSA9IFtdO1xuICBjb3VudCA9IDA7XG4gIHNldFVybEtleShkYXRhOiBzdHJpbmcpIHtcbiAgICBsZXQgZmxhZyA9IDA7XG4gICAgaWYgKHRoaXMucHJldmlvdXNVcmwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5ldmVudENvbGxlY3Rvci5zZXQoZGF0YSwgW10pO1xuICAgICAgdGhpcy5wcmV2aW91c1VybCA9IGRhdGEgfHwgJy8nO1xuICAgIH0gZWxzZSBpZiAoIShkYXRhID09PSB0aGlzLnByZXZpb3VzVXJsKSkge1xuICAgICAgZm9yIChjb25zdCBrZXkgb2YgQXJyYXkuZnJvbSh0aGlzLmV2ZW50Q29sbGVjdG9yLmtleXMoKSkpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gZGF0YSkge1xuICAgICAgICAgIGZsYWcgPSAxO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZmxhZyA9PT0gMCkge1xuICAgICAgICB0aGlzLmV2ZW50Q29sbGVjdG9yLnNldChkYXRhLCBbXSk7XG4gICAgICB9XG4gICAgICB0aGlzLnByZXZpb3VzVXJsID0gZGF0YTtcbiAgICB9XG4gIH1cbiAgYXBwZW5kVG9BbmFseXRpY3NBcnJheShkYXRhOiBBbmFseXRpY3NCZWFuKSB7XG4gICAgaWYgKHRoaXMucHJldmlvdXNVcmwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5zZXRVcmxLZXkoZGF0YS5ldmVudENvbXBvbmVudCk7XG4gICAgfVxuICAgIHRoaXMuZXZlbnRDb2xsZWN0b3IuZ2V0KHRoaXMucHJldmlvdXNVcmwpLnB1c2goZGF0YSk7XG4gIH1cblxuICBwdXNoRGF0YUFycmF5VG9TMygpIHtcbiAgICB0aGlzLmNvdW50Kys7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgQXJyYXkuZnJvbSh0aGlzLmV2ZW50Q29sbGVjdG9yLmtleXMoKSkpIHtcbiAgICAgIHRoaXMuYWxsRGF0YUFuYWx5dGljcyA9IHtcbiAgICAgICAgcGFnZVVybDoga2V5LFxuICAgICAgICBldmVudFZhbHVlczogQXJyYXkuZnJvbSh0aGlzLmV2ZW50Q29sbGVjdG9yLmdldChrZXkpLnZhbHVlcygpKVxuICAgICAgfTtcbiAgICAgIHRoaXMua2V5cy5wdXNoKGtleSk7XG4gICAgICBpZiAodGhpcy5hbGxEYXRhQW5hbHl0aWNzLmV2ZW50VmFsdWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5zdG9wSWRsZVRpbWVyKCk7XG4gICAgICAgIHRoaXMuYW5hbHl0aWNhbFNlcnZpY2UucHVzaERhdGEodGhpcy5hbGxEYXRhQW5hbHl0aWNzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RhcnRDYWxjdWxhdGVJZGxlVGltZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmV2ZW50Q29sbGVjdG9yLmNsZWFyKCk7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgdGhpcy5rZXlzKSB7XG4gICAgICB0aGlzLmV2ZW50Q29sbGVjdG9yLnNldChrZXksIFtdKTtcbiAgICB9XG4gIH1cblxuICBzZXRSb3V0ZURldGFpbHMocm91dGVEZXRhaWxzOiBhbnkpIHtcbiAgICB0aGlzLnJvdXRlRGV0YWlscyA9IHJvdXRlRGV0YWlscztcbiAgfVxuXG4gIGdldFJvdXRlRGV0YWlscygpIHtcbiAgICByZXR1cm4gdGhpcy5yb3V0ZURldGFpbHM7XG4gIH1cblxuICAvKipcbiAgICogSWYgdGhlIHNlc3Npb24gaXMgaWRsZSBmb3IgMzAgbWluLCB0aGUgc2Vzc2lvbiB3aWxsIGJlIGNsZWFyZWRcbiAgICovXG4gIHN0YXJ0Q2FsY3VsYXRlSWRsZVRpbWUoKSB7XG4gICAgaWYgKCF0aGlzLmlkbGVUaW1lclN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5pZGxlVGltZXJTdWJzY3JpcHRpb24gPSBpbnRlcnZhbCgxMDAwICogNjAgKiAzMCkuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgICBjb25zdCBzZXNzaW9uSWQgPSB1dWlkLnY0KCk7XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0odGhpcy5jb25zdGFudHMuU0VTU0lPTl9JRCwgc2Vzc2lvbklkKTtcbiAgICAgICAgdGhpcy5zdG9wSWRsZVRpbWVyKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogaWYgdGhlIGlkbGUgdGltZXIgaXMgcnVubmluZywgcmVzZXR0aW5nIHRoZSB0aW1lclxuICAgKi9cbiAgc3RvcElkbGVUaW1lcigpIHtcbiAgICBpZiAodGhpcy5pZGxlVGltZXJTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuaWRsZVRpbWVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLmlkbGVUaW1lclN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMuc3RhcnRDYWxjdWxhdGVJZGxlVGltZSgpO1xuICB9XG5cbn1cbiJdfQ==