import OperationIndex from "./../../../../../models/operations/operation-index";
import Choice from "../../../../../../lib/inquirer/choice";
import questionConfirmation from "../../shared/question-confirmation";
import resourceGroupQuestionInputAutocomplete from "../../shared/resource-group-question-input-autocomplete ";
import subscriptionQuestionSelect from "../../shared/subscription-question-select";
import KeyVault from "../keyvault";
import keyvaultQuestionInputAutocomplete from "../../shared/keyvault-question-input-autocomplete";
import keyvaultSecretNameQuestionInput from "../../shared/keyvault-secret-name-question-input";
import keyvaultSecretValueQuestionInput from "../../shared/keyvault-secret-value-question-input-password";

export default class AzCliAzKeyVaultSecretSetOperationIndex extends OperationIndex {

    getChoice(): Choice {
        return new Choice(
            `${process.env.AZCLI_AZ_KEYVAULT_SECRET_SET_CHOICE_NAME}`,
            `${process.env.AZCLI_AZ_KEYVAULT_SECRET_SET_CHOICE_SHORT}`,
            `${process.env.AZCLI_AZ_KEYVAULT_SECRET_SET_CHOICE_VALUE}`);
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

        // get question of keyvault secret name
        const keyvaultSecretNameInput = await keyvaultSecretNameQuestionInput();
        const keyvaultSecretNameResult = await keyvaultSecretNameInput.ask();
        const keyvaultSecretName = keyvaultSecretNameResult.keyvaultSecretName;


        // get question of keyvault secret value
        const keyvaultSecretValueInput = await keyvaultSecretValueQuestionInput();
        const keyvaultSecretValueResult = await keyvaultSecretValueInput.ask();
        const keyvaultSecretValue = keyvaultSecretValueResult.keyvaultSecretValue;


        // ask for confirmation
        const confirmationQuestion = await questionConfirmation();
        const confirm = await confirmationQuestion.ask();


        // perform list keyvault (with subscription and resource group)
        if (confirm.confirmation) {
            const keyvaultObj = new KeyVault();
            await keyvaultObj.createSecret(keyvault, keyvaultSecretName, keyvaultSecretValue, subscription);
        }

    }

}