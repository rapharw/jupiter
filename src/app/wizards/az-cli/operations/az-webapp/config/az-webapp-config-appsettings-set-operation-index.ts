import OperationIndex from "../../../../../models/operations/operation-index";
import Choice from "../../../../../../lib/inquirer/choice";
import questionConfirmation from "../../shared/question-confirmation";
import resourceGroupQuestionSelect from "../../shared/resource-group-question-input-autocomplete ";
import subscriptionQuestionSelect from "../../shared/subscription-question-select";
import WebApp from "../webapp";
import webappQuestionInputAutocomplete from "../../shared/webapp-question-input-autocomplete";
import webappConfigEnvironmentVariableNameQuestionInput from "../../shared/webapp-config-environment-variable-name-question-input";
import webappConfigEnvironmentVariableValueQuestionInput from "../../shared/webapp-config-environment-variable-value-question-input";

export default class AzCliAzWebAppConfigAppSettingsSetOperationIndex extends OperationIndex {

    getChoice(): Choice {
        return new Choice(
            `${process.env.AZCLI_AZ_WEBAPP_CONFIG_APPSETTINGS_SET_CHOICE_NAME}`,
            `${process.env.AZCLI_AZ_WEBAPP_CONFIG_APPSETTINGS_SET_CHOICE_SHORT}`,
            `${process.env.AZCLI_AZ_WEBAPP_CONFIG_APPSETTINGS_SET_CHOICE_VALUE}`);
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
        
        // get question of env variables name of app service
        const envVarNameInput = await webappConfigEnvironmentVariableNameQuestionInput();
        const envVarNameResult = await envVarNameInput.ask();
        const envVarName = envVarNameResult.envVarName;

        // get question of env variables name of app service
        const envVarValueInput = await webappConfigEnvironmentVariableValueQuestionInput();
        const envVarValueResult = await envVarValueInput.ask();
        const envVarValue = envVarValueResult.envVarValue;

        const confirmationQuestion = await questionConfirmation();
        const confirm = await confirmationQuestion.ask();
        
        if(confirm.confirmation){
            const webbApp = new WebApp();
            await webbApp.setEnvironmentVariables(envVarName, envVarValue, appService, resourceGroup, subscription);            
        }
    }

}