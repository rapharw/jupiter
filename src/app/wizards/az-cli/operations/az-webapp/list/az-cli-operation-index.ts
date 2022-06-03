import OperationIndex from "./../../../../../models/operations/operation-index";
import Choice from "../../../../../../lib/inquirer/choice";
import questionConfirmation from "../../shared/question-confirmation";
import resourceGroupQuestionSelect from "../../shared/resource-group-question-input-autocomplete ";
import subscriptionQuestionSelect from "../../shared/subscription-question-select";
import WebApp from "../webapp";

export default class AzCliAzWebAppListOperationIndex extends OperationIndex {

    getChoice(): Choice {
        return new Choice(
            `${process.env.AZCLI_AZ_WEBAPP_LIST_CHOICE_NAME}`,
            `${process.env.AZCLI_AZ_WEBAPP_LIST_CHOICE_SHORT}`,
            `${process.env.AZCLI_AZ_WEBAPP_LIST_CHOICE_VALUE}`);
    }


    async execute(): Promise<any> {
        // subscription
        const subscriptionsSelect = await subscriptionQuestionSelect();
        const subscriptionResult = await subscriptionsSelect.ask();
        
        // resource group
        const resourceGroupAutocomplete = await resourceGroupQuestionSelect(subscriptionResult.subscription);
        const resourceGroupResult = await resourceGroupAutocomplete.ask();
        
        const confirmationQuestion = await questionConfirmation();
        const confirm = await confirmationQuestion.ask();
        
        if(confirm.confirmation){
            const webbApp = new WebApp();
            const appServices = await webbApp.listAppServices(subscriptionResult.subscription, resourceGroupResult.resourceGroup);
            console.log(appServices);
        }
    }

}