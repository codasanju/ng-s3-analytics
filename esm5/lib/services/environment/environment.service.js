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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52aXJvbm1lbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjb2RhZ2xvYmFsL25nLXMzLWFuYWx5dGljcy8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9lbnZpcm9ubWVudC9lbnZpcm9ubWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsT0FBTyxFQUFjLE1BQU0sTUFBTSxDQUFDOztBQUUzQztJQUFBO1FBS0UsY0FBUyxHQUFRLElBQUksT0FBTyxFQUFnQixDQUFDO1FBQzdDLGVBQVUsR0FBc0IsSUFBSSxPQUFPLEVBQVksQ0FBQztLQStCekQ7SUE3QkMsdUNBQXVDOzs7Ozs7O0lBQ3ZDLDBEQUE2Qjs7Ozs7OztJQUE3QixVQUE4QixhQUE0QixFQUFFLHlCQUFrQztRQUM1RixXQUFXLENBQUMsaUJBQWlCLEdBQUcsYUFBYSxDQUFDLGlCQUFpQixDQUFDO1FBQ2hFLFdBQVcsQ0FBQyx5QkFBeUIsR0FBRyx5QkFBeUIsQ0FBQztRQUNsRSxXQUFXLENBQUMsZUFBZSxHQUFHLGFBQWEsQ0FBQyxlQUFlLENBQUM7UUFDNUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRTVILFdBQVcsQ0FBQyxLQUFLLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUNsRCxJQUFJLGFBQWEsQ0FBQyxLQUFLLElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ2xFLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1NBQ3JEO1FBQ0QsSUFBSSxhQUFhLENBQUMsS0FBSyxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUNuRSxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztTQUN2RDtJQUNILENBQUM7Ozs7SUFFRCw2Q0FBZ0I7OztJQUFoQjtRQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDOzs7OztJQUVELHdDQUFXOzs7O0lBQVgsVUFBWSxVQUFvQjtRQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs7O0lBRUQsd0NBQVc7OztJQUFYO1FBQ0UsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hDLENBQUM7O2dCQXBDRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7NkJBUkQ7Q0EyQ0MsQUFyQ0QsSUFxQ0M7U0FqQ1ksa0JBQWtCOzs7SUFDN0IsdUNBQTZDOztJQUM3Qyx3Q0FBd0QiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vZW52aXJvbm1lbnQvZW52aXJvbm1lbnQnO1xuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiwgUGx1Z2luQ29uZmlnLCBVc2VyQmVhbiB9IGZyb20gJy4uLy4uL2FuYWx5dGljcy1iZWFuL2FuYWx5dGljcy1iZWFuJztcbmltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5cbmV4cG9ydCBjbGFzcyBFbnZpcm9ubWVudFNlcnZpY2Uge1xuICBlbnZDb25maWc6IGFueSA9IG5ldyBTdWJqZWN0PFBsdWdpbkNvbmZpZz4oKTtcbiAgdXNlck9iamVjdDogU3ViamVjdDxVc2VyQmVhbj4gPSBuZXcgU3ViamVjdDxVc2VyQmVhbj4oKTtcblxuICAvLyBTZXR0aW5nIENvbmZpZ3VyYXRpb24gb24gZW52aXJvbm1lbnRcbiAgc2V0Q29uZmlndXJhdGlvblRvRW52aXJvbm1lbnQoY29uZmlndXJhdGlvbjogQ29uZmlndXJhdGlvbiwgaXNQYWdlTG9hZGluZ1RvQmVEZXRlY3RlZDogYm9vbGVhbikge1xuICAgIGVudmlyb25tZW50LmRhdGFDb2xsZWN0aW9uQXBpID0gY29uZmlndXJhdGlvbi5kYXRhQ29sbGVjdGlvbkFwaTtcbiAgICBlbnZpcm9ubWVudC5pc1BhZ2VMb2FkaW5nVG9CZURldGVjdGVkID0gaXNQYWdlTG9hZGluZ1RvQmVEZXRlY3RlZDtcbiAgICBlbnZpcm9ubWVudC5yZW1vdGVDb25maWdBcGkgPSBjb25maWd1cmF0aW9uLnJlbW90ZUNvbmZpZ0FwaTtcbiAgICB0aGlzLmVudkNvbmZpZy5uZXh0KGVudmlyb25tZW50KTtcbiAgICB0aGlzLmVudkNvbmZpZy5jb21wbGV0ZSgpO1xuICAgIHRoaXMudXNlck9iamVjdC5uZXh0KHsgdXNlckVtYWlsOiAnJywgdXNlclByb2ZpbGVJbWFnZTogJycsIHVzZXJOYW1lOiAnJywgdXNlclBob25lTnVtYmVyOiAnJywgdXNlcklkOiAnJywgb3RoZXJJbmZvOiAnJyB9KTtcblxuICAgIGVudmlyb25tZW50LnRyYWNrID0geyBtb3VzZTogdHJ1ZSwgc2Nyb2xsOiB0cnVlIH07XG4gICAgaWYgKGNvbmZpZ3VyYXRpb24udHJhY2sgJiYgY29uZmlndXJhdGlvbi50cmFjay5tb3VzZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBlbnZpcm9ubWVudC50cmFjay5tb3VzZSA9IGNvbmZpZ3VyYXRpb24udHJhY2subW91c2U7XG4gICAgfVxuICAgIGlmIChjb25maWd1cmF0aW9uLnRyYWNrICYmIGNvbmZpZ3VyYXRpb24udHJhY2suc2Nyb2xsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGVudmlyb25tZW50LnRyYWNrLnNjcm9sbCA9IGNvbmZpZ3VyYXRpb24udHJhY2suc2Nyb2xsO1xuICAgIH1cbiAgfVxuXG4gIGdldEVudk9ic2VydmFibGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZW52Q29uZmlnO1xuICB9XG5cbiAgc2V0VXNlckluZm8odXNlck9iamVjdDogVXNlckJlYW4pIHtcbiAgICB0aGlzLnVzZXJPYmplY3QubmV4dCh1c2VyT2JqZWN0KTtcbiAgfVxuXG4gIGdldFVzZXJJbmZvKCk6IE9ic2VydmFibGU8VXNlckJlYW4+IHtcbiAgICByZXR1cm4gdGhpcy51c2VyT2JqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICB9XG59XG4iXX0=