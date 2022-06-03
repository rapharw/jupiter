import OperationIndex from "../../../../../models/operations/operation-index";
import Choice from "../../../../../../lib/inquirer/choice";
import questionConfirmation from "../../shared/question-confirmation";
import resourceGroupQuestionSelect from "../../shared/resource-group-question-input-autocomplete ";
import subscriptionQuestionSelect from "../../shared/subscription-question-select";
import WebApp from "../webapp";
import webappQuestionInputAutocomplete from "../../shared/webapp-question-input-autocomplete";
import webappConfigEnvironmentVariableNameQuestionSelect from "../../shared/webapp-config-environment-variable-name-question-select";
import keyvaultSecretNameQuestionAutocomplete from "../../shared/keyvault-secret-name-question-autocomplete";
import keyvaultQuestionInputAutocomplete from "../../shared/keyvault-question-input-autocomplete";

export default class AzCliAzWebAppConfigAppSettingsSetAssignToKeyvaultOperationIndex extends OperationIndex {

    getChoice(): Choice {
        return new Choice(
            `${process.env.AZCLI_AZ_WEBAPP_CONFIG_APPSETTINGS_SET_ASSIGN_TO_KEYVAULT_CHOICE_NAME}`,
            `${process.env.AZCLI_AZ_WEBAPP_CONFIG_APPSETTINGS_SET_ASSIGN_TO_KEYVAULT_CHOICE_SHORT}`,
            `${process.env.AZCLI_AZ_WEBAPP_CONFIG_APPSETTINGS_SET_ASSIGN_TO_KEYVAULT_CHOICE_VALUE}`);
    }


    async execute(): Promise<any> {
        
        // subscription
        const subscriptionsSelect = await subscriptionQuestionSelect();
        const subscriptionResult = await subscriptionsSelect.ask();
        const subscription = subscriptionResult.subscription;

        // resource group
        const resourceGroupAutocomplete = await resourceGroupQuestionSelect(subscription);
        const resourceGroupResult = await resourceGroupAutocomplete.ask();
        const resourceGroup = resourceGroupResult.resourceGroup;

        // get question of app service
        const appServiceAutocomplete = await webappQuestionInputAutocomplete(subscription, resourceGroup);
        const appServiceResult = await appServiceAutocomplete.ask();
        const appService = appServiceResult.appServiceName;
        
        // get question of environment variables
        const environmentVariableSelect = await webappConfigEnvironmentVariableNameQuestionSelect(appService, resourceGroup, subscription);
        const environmentVariableResult = await environmentVariableSelect.ask();
        const environmentVariable = environmentVariableResult.environmentVariableName;

        // get question of keyvault (autocomplete)
        const keyvaultInputAutocomplete = await keyvaultQuestionInputAutocomplete(resourceGroup, subscription);
        const keyvaultResult = await keyvaultInputAutocomplete.ask();
        const keyvault = keyvaultResult.keyvaultName;

        // get question of secret keyvault
        const keyvaultSecretSelect = await keyvaultSecretNameQuestionAutocomplete(keyvault, subscription);
        const keyvaultSecretResult = await keyvaultSecretSelect.ask();
        const secret = keyvaultSecretResult.secretName;

        const confirmationQuestion = await questionConfirmation();
        const confirm = await confirmationQuestion.ask();
        
        if(confirm.confirmation){
            const webbApp = new WebApp();
            await webbApp.assignEnvironmentVariableToAKeyVault(environmentVariable, keyvault, secret, appService, resourceGroup, subscription);
        }
    }

}