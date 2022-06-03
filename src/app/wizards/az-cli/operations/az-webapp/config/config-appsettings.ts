import EnvironmentVariable from "./environment-variable";

export default interface ConfigAppSettings {

    listEnvironmentVariables(appService: string, subscription: string, resourceGroup: string): Promise<EnvironmentVariable[]>;

    setEnvironmentVariables(environmentVariableName: string, environmentVariableValue: string, appService: string, resourceGroup: string, subscription: string): Promise<any>;

    assignEnvironmentVariableToAKeyVault(environmentVariableName: string, keyvault: string, keyvaultSecretName: string, appService: string, resourceGroup: string, subscription: string): Promise<any>;
}