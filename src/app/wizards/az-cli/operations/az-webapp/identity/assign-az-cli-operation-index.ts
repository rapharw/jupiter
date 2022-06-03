import OperationIndex from "./../../../../../models/operations/operation-index";
import Choice from "../../../../../../lib/inquirer/choice";
import questionConfirmation from "../../shared/question-confirmation";
import resourceGroupQuestionInputAutocomplete from "../../shared/resource-group-question-input-autocomplete ";
import subscriptionQuestionSelect from "../../shared/subscription-question-select";
import webappQuestionInputAutocomplete from "../../shared/webapp-question-input-autocomplete";
import WebApp from "../webapp";

export default class AzCliAzWebAppIdentityAssignOperationIndex extends OperationIndex {

    getChoice(): Choice {
        return new Choice(
            `${process.env.AZCLI_AZ_WEBAPP_IDENTITY_ASSIGN_CHOICE_NAME}`,
            `${process.env.AZCLI_AZ_WEBAPP_IDENTITY_ASSIGN_CHOICE_SHORT}`,
            `${process.env.AZCLI_AZ_WEBAPP_IDENTITY_ASSIGN_CHOICE_VALUE}`);
    }

    async execute() {

        // get question of subscription
        const subscriptionsSelect = await subscriptionQuestionSelect();
        const subscriptionResult = await subscriptionsSelect.ask();

        // get question of resource group (with result of subscription)
        const resourceGroupAutocomplete = await resourceGroupQuestionInputAutocomplete(subscriptionResult.subscription);
        const resourceGroupResult = await resourceGroupAutocomplete.ask();

        // get question of app service
        const appServiceAutocomplete = await webappQuestionInputAutocomplete(subscriptionResult.subscription, resourceGroupResult.resourceGroup);
        const appServiceResult = await appServiceAutocomplete.ask();

        const webapp = new WebApp();

        // get identity (principalId)
        const identity = await webapp.show(appServiceResult.appServiceName, resourceGroupResult.resourceGroup, subscriptionResult.subscription);

        if (!identity) {
            // ask for confirmation
            const confirmationQuestion = await questionConfirmation();
            const confirm = await confirmationQuestion.ask();

            if (confirm.confirmation) {
                await webapp.assign(appServiceResult.appServiceName, resourceGroupResult.resourceGroup, subscriptionResult.subscription);
            }
        }
        else {
            console.log("Identity is already enabled!");
        }

    }

}