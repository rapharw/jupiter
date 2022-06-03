import OperationIndex from "./../../../../../models/operations/operation-index";
import Choice from "../../../../../../lib/inquirer/choice";
import questionConfirmation from "../../shared/question-confirmation";
import resourceGroupQuestionInputAutocomplete from "../../shared/resource-group-question-input-autocomplete ";
import subscriptionQuestionSelect from "../../shared/subscription-question-select";
import KeyVault from "../keyvault";

export default class AzCliAzKeyVaultListOperationIndex  extends OperationIndex{

    getChoice(): Choice {
        return new Choice(
            `${process.env.AZCLI_AZ_KEYVAULT_LIST_CHOICE_NAME}`,
            `${process.env.AZCLI_AZ_KEYVAULT_LIST_CHOICE_SHORT}`,
            `${process.env.AZCLI_AZ_KEYVAULT_LIST_CHOICE_VALUE}`);
    }

    async execute () {
        
        // get question of subscription
        const subscriptionsSelect = await subscriptionQuestionSelect();
        const subscriptionResult = await subscriptionsSelect.ask();
        
        // get question of resource group (with result of subscription)
        const resourceGroupAutocomplete = await resourceGroupQuestionInputAutocomplete(subscriptionResult.subscription);
        const resourceGroupResult = await resourceGroupAutocomplete.ask();

        // ask for confirmation
        const confirmationQuestion = await questionConfirmation();
        const confirm = await confirmationQuestion.ask();

        // perform list keyvault (with subscription and resource group)
        if(confirm.confirmation){
            const keyvault = new KeyVault();
            const keyvaults = await keyvault.list(resourceGroupResult.resourceGroup, subscriptionResult.subscription);
            console.log(keyvaults);
        }
        
    }

}