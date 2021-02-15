import { Configuration, UserBean } from '../../analytics-bean/analytics-bean';
import { Subject, Observable } from 'rxjs';
export declare class EnvironmentService {
    envConfig: any;
    userObject: Subject<UserBean>;
    setConfigurationToEnvironment(configuration: Configuration, isPageLoadingToBeDetected: boolean, origin?: string): void;
    getEnvObservable(): any;
    setUserInfo(userObject: UserBean): void;
    getUserInfo(): Observable<UserBean>;
}
