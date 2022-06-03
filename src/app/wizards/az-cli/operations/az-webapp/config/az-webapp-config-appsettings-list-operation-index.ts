import OperationIndex from "../../../../../models/operations/operation-index";
import Choice from "../../../../../../lib/inquirer/choice";
import questionConfirmation from "../../shared/question-confirmation";
import resourceGroupQuestionSelect from "../../shared/resource-group-question-input-autocomplete ";
import subscriptionQuestionSelect from "../../shared/subscription-question-select";
import WebApp from "../webapp";
import webappQuestionInputAutocomplete from "../../shared/webapp-question-input-autocomplete";

export default class AzCliAzWebAppConfigAppSettingsListOperationIndex extends OperationIndex {

    getChoice(): Choice {
        return new Choice(
            `${process.env.AZCLI_AZ_WEBAPP_CONFIG_APPSETTINGS_LIST_CHOICE_NAME}`,
            `${process.env.AZCLI_AZ_WEBAPP_CONFIG_APPSETTINGS_LIST_CHOICE_SHORT}`,
            `${process.env.AZCLI_AZ_WEBAPP_CONFIG_APPSETTINGS_LIST_CHOICE_VALUE}`);
    }


    async execute(): Promise<any> {
        // subscription
        const subscriptionsSelect = await subscriptionQuestionSelect();
        const subscriptionResult = await subscriptionsSelect.ask();
        
        // resource group
        const resourceGroupAutocomplete = await resourceGroupQuestionSelect(subscriptionResult.subscription);
        const resourceGroupResult = await resourceGroupAutocomplete.ask();
        
        // get question of app service
        const appServiceAutocomplete = await webappQuestionInputAutocomplete(subscriptionResult.subscription, resourceGroupResult.resourceGroup);
        const appServiceResult = await appServiceAutocomplete.ask();

        const confirmationQuestion = await questionConfirmation();
        const confirm = await confirmationQuestion.ask();
        
        if(confirm.confirmation){
            const webbApp = new WebApp();
            const appServices = await webbApp.listEnvironmentVariables(appServiceResult.appServiceName, subscriptionResult.subscription, resourceGroupResult.resourceGroup);
            console.log(appServices);
        }
    }

}