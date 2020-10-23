import { Configuration, UserBean } from '../../analytics-bean/analytics-bean';
import { Subject } from 'rxjs';
export declare class EnvironmentService {
    envConfig: any;
    userObject: Subject<UserBean>;
    setConfigurationToEnvironment(configuration: Configuration, isPageLoadingToBeDetected: boolean): void;
    getEnvObservable(): any;
    setUserInfo(userObject: UserBean): void;
    getUserInfo(): import("../../../../../../../../../../../Users/sanju/Documents/OfficeProjects/xa-integration/node_modules/rxjs/internal/Observable").Observable<UserBean>;
}
