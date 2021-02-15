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
        this.userObject = new Subject();
    }
    // Setting Configuration on environment
    // Setting Configuration on environment
    /**
     * @param {?} configuration
     * @param {?} isPageLoadingToBeDetected
     * @param {?=} origin
     * @return {?}
     */
    EnvironmentService.prototype.setConfigurationToEnvironment = 
    // Setting Configuration on environment
    /**
     * @param {?} configuration
     * @param {?} isPageLoadingToBeDetected
     * @param {?=} origin
     * @return {?}
     */
    function (configuration, isPageLoadingToBeDetected, origin) {
        environment.dataCollectionApi = configuration.dataCollectionApi;
        environment.isPageLoadingToBeDetected = isPageLoadingToBeDetected;
        environment.remoteConfigApi = configuration.remoteConfigApi;
        environment.origin = origin || '';
        this.envConfig.next(environment);
        this.envConfig.complete();
        this.userObject.next({ userEmail: '', userProfileImage: '', userName: '', userPhoneNumber: '', userId: '', otherInfo: '' });
        environment.track = { mouse: true, scroll: true };
        if (configuration.track && configuration.track.mouse !== undefined) {
            environment.track.mouse = configuration.track.mouse;
        }
        if (configuration.track && configuration.track.scroll !== undefined) {
            environment.track.scroll = configuration.track.scroll;
        }
    };
    /**
     * @return {?}
     */
    EnvironmentService.prototype.getEnvObservable = /**
     * @return {?}
     */
    function () {
        return this.envConfig;
    };
    /**
     * @param {?} userObject
     * @return {?}
     */
    EnvironmentService.prototype.setUserInfo = /**
     * @param {?} userObject
     * @return {?}
     */
    function (userObject) {
        this.userObject.next(userObject);
    };
    /**
     * @return {?}
     */
    EnvironmentService.prototype.getUserInfo = /**
     * @return {?}
     */
    function () {
        return this.userObject.asObservable();
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
    /** @type {?} */
    EnvironmentService.prototype.userObject;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52aXJvbm1lbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9lbnZpcm9ubWVudC9lbnZpcm9ubWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsT0FBTyxFQUFjLE1BQU0sTUFBTSxDQUFDOztBQUUzQztJQUFBO1FBS0UsY0FBUyxHQUFRLElBQUksT0FBTyxFQUFnQixDQUFDO1FBQzdDLGVBQVUsR0FBc0IsSUFBSSxPQUFPLEVBQVksQ0FBQztLQWdDekQ7SUE5QkMsdUNBQXVDOzs7Ozs7OztJQUN2QywwREFBNkI7Ozs7Ozs7O0lBQTdCLFVBQThCLGFBQTRCLEVBQUUseUJBQWtDLEVBQUUsTUFBZTtRQUM3RyxXQUFXLENBQUMsaUJBQWlCLEdBQUcsYUFBYSxDQUFDLGlCQUFpQixDQUFDO1FBQ2hFLFdBQVcsQ0FBQyx5QkFBeUIsR0FBRyx5QkFBeUIsQ0FBQztRQUNsRSxXQUFXLENBQUMsZUFBZSxHQUFHLGFBQWEsQ0FBQyxlQUFlLENBQUM7UUFDNUQsV0FBVyxDQUFDLE1BQU0sR0FBRyxNQUFNLElBQUksRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLGdCQUFnQixFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUU1SCxXQUFXLENBQUMsS0FBSyxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDbEQsSUFBSSxhQUFhLENBQUMsS0FBSyxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUNsRSxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztTQUNyRDtRQUNELElBQUksYUFBYSxDQUFDLEtBQUssSUFBSSxhQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDbkUsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7U0FDdkQ7SUFDSCxDQUFDOzs7O0lBRUQsNkNBQWdCOzs7SUFBaEI7UUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFFRCx3Q0FBVzs7OztJQUFYLFVBQVksVUFBb0I7UUFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7OztJQUVELHdDQUFXOzs7SUFBWDtRQUNFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QyxDQUFDOztnQkFyQ0YsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OzZCQVJEO0NBNENDLEFBdENELElBc0NDO1NBbENZLGtCQUFrQjs7O0lBQzdCLHVDQUE2Qzs7SUFDN0Msd0NBQXdEIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gJy4uLy4uL2Vudmlyb25tZW50L2Vudmlyb25tZW50JztcbmltcG9ydCB7IENvbmZpZ3VyYXRpb24sIFBsdWdpbkNvbmZpZywgVXNlckJlYW4gfSBmcm9tICcuLi8uLi9hbmFseXRpY3MtYmVhbi9hbmFseXRpY3MtYmVhbic7XG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuXG5leHBvcnQgY2xhc3MgRW52aXJvbm1lbnRTZXJ2aWNlIHtcbiAgZW52Q29uZmlnOiBhbnkgPSBuZXcgU3ViamVjdDxQbHVnaW5Db25maWc+KCk7XG4gIHVzZXJPYmplY3Q6IFN1YmplY3Q8VXNlckJlYW4+ID0gbmV3IFN1YmplY3Q8VXNlckJlYW4+KCk7XG5cbiAgLy8gU2V0dGluZyBDb25maWd1cmF0aW9uIG9uIGVudmlyb25tZW50XG4gIHNldENvbmZpZ3VyYXRpb25Ub0Vudmlyb25tZW50KGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb24sIGlzUGFnZUxvYWRpbmdUb0JlRGV0ZWN0ZWQ6IGJvb2xlYW4sIG9yaWdpbj86IHN0cmluZykge1xuICAgIGVudmlyb25tZW50LmRhdGFDb2xsZWN0aW9uQXBpID0gY29uZmlndXJhdGlvbi5kYXRhQ29sbGVjdGlvbkFwaTtcbiAgICBlbnZpcm9ubWVudC5pc1BhZ2VMb2FkaW5nVG9CZURldGVjdGVkID0gaXNQYWdlTG9hZGluZ1RvQmVEZXRlY3RlZDtcbiAgICBlbnZpcm9ubWVudC5yZW1vdGVDb25maWdBcGkgPSBjb25maWd1cmF0aW9uLnJlbW90ZUNvbmZpZ0FwaTtcbiAgICBlbnZpcm9ubWVudC5vcmlnaW4gPSBvcmlnaW4gfHwgJyc7XG4gICAgdGhpcy5lbnZDb25maWcubmV4dChlbnZpcm9ubWVudCk7XG4gICAgdGhpcy5lbnZDb25maWcuY29tcGxldGUoKTtcbiAgICB0aGlzLnVzZXJPYmplY3QubmV4dCh7IHVzZXJFbWFpbDogJycsIHVzZXJQcm9maWxlSW1hZ2U6ICcnLCB1c2VyTmFtZTogJycsIHVzZXJQaG9uZU51bWJlcjogJycsIHVzZXJJZDogJycsIG90aGVySW5mbzogJycgfSk7XG5cbiAgICBlbnZpcm9ubWVudC50cmFjayA9IHsgbW91c2U6IHRydWUsIHNjcm9sbDogdHJ1ZSB9O1xuICAgIGlmIChjb25maWd1cmF0aW9uLnRyYWNrICYmIGNvbmZpZ3VyYXRpb24udHJhY2subW91c2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZW52aXJvbm1lbnQudHJhY2subW91c2UgPSBjb25maWd1cmF0aW9uLnRyYWNrLm1vdXNlO1xuICAgIH1cbiAgICBpZiAoY29uZmlndXJhdGlvbi50cmFjayAmJiBjb25maWd1cmF0aW9uLnRyYWNrLnNjcm9sbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBlbnZpcm9ubWVudC50cmFjay5zY3JvbGwgPSBjb25maWd1cmF0aW9uLnRyYWNrLnNjcm9sbDtcbiAgICB9XG4gIH1cblxuICBnZXRFbnZPYnNlcnZhYmxlKCkge1xuICAgIHJldHVybiB0aGlzLmVudkNvbmZpZztcbiAgfVxuXG4gIHNldFVzZXJJbmZvKHVzZXJPYmplY3Q6IFVzZXJCZWFuKSB7XG4gICAgdGhpcy51c2VyT2JqZWN0Lm5leHQodXNlck9iamVjdCk7XG4gIH1cblxuICBnZXRVc2VySW5mbygpOiBPYnNlcnZhYmxlPFVzZXJCZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMudXNlck9iamVjdC5hc09ic2VydmFibGUoKTtcbiAgfVxufVxuIl19