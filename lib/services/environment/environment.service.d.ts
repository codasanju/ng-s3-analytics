import { CredentialsBean } from '../../analytics-bean/analytics-bean';
export declare class EnvironmentService {
    setAuthentication(isAuth: boolean): void;
    setCredentialsToEnvironment(credentials: CredentialsBean, isPageLoadingToBeDetected: boolean): void;
}
