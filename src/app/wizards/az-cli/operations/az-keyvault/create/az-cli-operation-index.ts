import OperationIndex from "./../../../../../models/operations/operation-index";
import Choice from "../../../../../../lib/inquirer/choice";
import keyvaultQuestionInput from "../../shared/keyvault-question-input";
import locationsQuestionInputAutocomplete from "../../shared/locations-question-input-autocomplete";
import questionConfirmation from "../../shared/question-confirmation";
import resourceGroupQuestionInputAutocomplete from "../../shared/resource-group-question-input-autocomplete ";
import subscriptionQuestionSelect from "../../shared/subscription-question-select";
import KeyVault from "../keyvault";

export default class AzCliAzKeyVaultCreateOperationIndex extends OperationIndex {

    getChoice(): Choice {
        return new Choice(
            `${process.env.AZCLI_AZ_KEYVAULT_CREATE_CHOICE_NAME}`,
            `${process.env.AZCLI_AZ_KEYVAULT_CREATE_CHOICE_SHORT}`,
            `${process.env.AZCLI_AZ_KEYVAULT_CREATE_CHOICE_VALUE}`);
    }

    async execute() {

        // get question of locations
        const locationsAutocomplete = await locationsQuestionInputAutocomplete();
        const locationResult = await locationsAutocomplete.ask();

        // get question of subscription
        const subscriptionsSelect = await subscriptionQuestionSelect();
        const subscriptionResult = await subscriptionsSelect.ask();

        // get question of resource group (with result of subscription)
        const resourceGroupAutocomplete = await resourceGroupQuestionInputAutocomplete(subscriptionResult.subscription);
        const resourceGroupResult = await resourceGroupAutocomplete.ask();

        // get question of keyvault
        const keyvaultInput = await keyvaultQuestionInput();
        const keyvaultResult = await keyvaultInput.ask();

        // ask for confirmation
        const confirmationQuestion = await questionConfirmation();
        const confirm = await confirmationQuestion.ask();

        // perform list keyvault (with subscription and resource group)
        if (confirm.confirmation) {
            const keyvault = new KeyVault();
            await keyvault.create(locationResult.location, keyvaultResult.keyvaultName, resourceGroupResult.resourceGroup, subscriptionResult.subscription);
        }

    }

}