import { Configuration } from '../../analytics-bean/analytics-bean';
export declare class EnvironmentService {
    envConfig: any;
    setConfigurationToEnvironment(configuration: Configuration, isPageLoadingToBeDetected: boolean): void;
    getEnvObservable(): any;
}
