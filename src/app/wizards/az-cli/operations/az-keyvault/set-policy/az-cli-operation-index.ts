import OperationIndex from "./../../../../../models/operations/operation-index";
import Choice from "../../../../../../lib/inquirer/choice";
import questionConfirmation from "../../shared/question-confirmation";
import resourceGroupQuestionInputAutocomplete from "../../shared/resource-group-question-input-autocomplete ";
import subscriptionQuestionSelect from "../../shared/subscription-question-select";
import KeyVault from "../keyvault";
import keyvaultQuestionInputAutocomplete from "../../shared/keyvault-question-input-autocomplete";
import WebApp from "../../az-webapp/webapp";
import webappQuestionInputAutocomplete from "../../shared/webapp-question-input-autocomplete";

export default class AzCliAzKeyVaultCreateOperationIndex extends OperationIndex {

    getChoice(): Choice {
        return new Choice(
            `${process.env.AZCLI_AZ_KEYVAULT_SETPOLICY_CHOICE_NAME}`,
            `${process.env.AZCLI_AZ_KEYVAULT_SETPOLICY_CHOICE_SHORT}`,
            `${process.env.AZCLI_AZ_KEYVAULT_SETPOLICY_CHOICE_VALUE}`);
    }

    async execute() {

        // get question of subscription
        const subscriptionsSelect = await subscriptionQuestionSelect();
        const subscriptionResult = await subscriptionsSelect.ask();
        const subscription = subscriptionResult.subscription;

        // get question of resource group (autocomplete)
        const resourceGroupAutocomplete = await resourceGroupQuestionInputAutocomplete(subscription);
        const resourceGroupResult = await resourceGroupAutocomplete.ask();
        const resourceGroup = resourceGroupResult.resourceGroup;

        // get question of keyvault (autocomplete)
        const keyvaultInputAutocomplete = await keyvaultQuestionInputAutocomplete(resourceGroup, subscription);
        const keyvaultResult = await keyvaultInputAutocomplete.ask();
        const keyvault = keyvaultResult.keyvaultName;

        // get question of keyvault (autocomplete)
        const appserviceInputAutocomplete = await webappQuestionInputAutocomplete(subscription, resourceGroup);
        const appserviceResult = await appserviceInputAutocomplete.ask();
        const appservice = appserviceResult.appServiceName;

        const webapp = new WebApp();
        const identity = await webapp.show(appservice, resourceGroup, subscription);

        //TODO enable now?
        if(!identity){
            throw new Error("Identity isn't enabled");
        }

        console.log("PrincipalId:" + identity.principalId);

        // ask for confirmation
        const confirmationQuestion = await questionConfirmation();
        const confirm = await confirmationQuestion.ask();

        // perform list keyvault (with subscription and resource group)
        if (confirm.confirmation) {
            const keyvaultObj = new KeyVault();
            await keyvaultObj.setPolicy(identity, keyvault, resourceGroup, subscription);
        }

    }

}