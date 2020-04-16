/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
var EnvironmentService = /** @class */ (function () {
    function EnvironmentService() {
        this.envConfig = new Subject();
    }
    // Setting Configuration on environment
    // Setting Configuration on environment
    /**
     * @param {?} configuration
     * @param {?} isPageLoadingToBeDetected
     * @return {?}
     */
    EnvironmentService.prototype.setConfigurationToEnvironment = 
    // Setting Configuration on environment
    /**
     * @param {?} configuration
     * @param {?} isPageLoadingToBeDetected
     * @return {?}
     */
    function (configuration, isPageLoadingToBeDetected) {
        environment.dataCollectionApi = configuration.dataCollectionApi;
        environment.isPageLoadingToBeDetected = isPageLoadingToBeDetected;
        environment.remoteConfigApi = configuration.remoteConfigApi;
        this.envConfig.next(environment);
        this.envConfig.complete();
    };
    /**
     * @return {?}
     */
    EnvironmentService.prototype.getEnvObservable = /**
     * @return {?}
     */
    function () {
        console.log('calling here', this.envConfig);
        return this.envConfig;
    };
    EnvironmentService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */ EnvironmentService.ngInjectableDef = i0.defineInjectable({ factory: function EnvironmentService_Factory() { return new EnvironmentService(); }, token: EnvironmentService, providedIn: "root" });
    return EnvironmentService;
}());
export { EnvironmentService };
if (false) {
    /** @type {?} */
    EnvironmentService.prototype.envConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52aXJvbm1lbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9lbnZpcm9ubWVudC9lbnZpcm9ubWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsT0FBTyxFQUFjLE1BQU0sTUFBTSxDQUFDOztBQUUzQztJQUFBO1FBS0UsY0FBUyxHQUFRLElBQUksT0FBTyxFQUFnQixDQUFDO0tBZTlDO0lBYkMsdUNBQXVDOzs7Ozs7O0lBQ3ZDLDBEQUE2Qjs7Ozs7OztJQUE3QixVQUE4QixhQUE0QixFQUFFLHlCQUFrQztRQUM1RixXQUFXLENBQUMsaUJBQWlCLEdBQUcsYUFBYSxDQUFDLGlCQUFpQixDQUFDO1FBQ2hFLFdBQVcsQ0FBQyx5QkFBeUIsR0FBRyx5QkFBeUIsQ0FBQztRQUNsRSxXQUFXLENBQUMsZUFBZSxHQUFHLGFBQWEsQ0FBQyxlQUFlLENBQUM7UUFDNUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM1QixDQUFDOzs7O0lBRUQsNkNBQWdCOzs7SUFBaEI7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7O2dCQW5CRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7NkJBUkQ7Q0EwQkMsQUFwQkQsSUFvQkM7U0FoQlksa0JBQWtCOzs7SUFDN0IsdUNBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gJy4uLy4uL2Vudmlyb25tZW50L2Vudmlyb25tZW50JztcbmltcG9ydCB7IENvbmZpZ3VyYXRpb24sIFBsdWdpbkNvbmZpZyB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5cbmV4cG9ydCBjbGFzcyBFbnZpcm9ubWVudFNlcnZpY2Uge1xuICBlbnZDb25maWc6IGFueSA9IG5ldyBTdWJqZWN0PFBsdWdpbkNvbmZpZz4oKTtcblxuICAvLyBTZXR0aW5nIENvbmZpZ3VyYXRpb24gb24gZW52aXJvbm1lbnRcbiAgc2V0Q29uZmlndXJhdGlvblRvRW52aXJvbm1lbnQoY29uZmlndXJhdGlvbjogQ29uZmlndXJhdGlvbiwgaXNQYWdlTG9hZGluZ1RvQmVEZXRlY3RlZDogYm9vbGVhbikge1xuICAgIGVudmlyb25tZW50LmRhdGFDb2xsZWN0aW9uQXBpID0gY29uZmlndXJhdGlvbi5kYXRhQ29sbGVjdGlvbkFwaTtcbiAgICBlbnZpcm9ubWVudC5pc1BhZ2VMb2FkaW5nVG9CZURldGVjdGVkID0gaXNQYWdlTG9hZGluZ1RvQmVEZXRlY3RlZDtcbiAgICBlbnZpcm9ubWVudC5yZW1vdGVDb25maWdBcGkgPSBjb25maWd1cmF0aW9uLnJlbW90ZUNvbmZpZ0FwaTtcbiAgICB0aGlzLmVudkNvbmZpZy5uZXh0KGVudmlyb25tZW50KTtcbiAgICB0aGlzLmVudkNvbmZpZy5jb21wbGV0ZSgpO1xuICB9XG5cbiAgZ2V0RW52T2JzZXJ2YWJsZSgpIHtcbiAgICBjb25zb2xlLmxvZygnY2FsbGluZyBoZXJlJywgdGhpcy5lbnZDb25maWcpO1xuICAgIHJldHVybiB0aGlzLmVudkNvbmZpZztcbiAgfVxufVxuIl19