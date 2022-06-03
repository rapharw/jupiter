import OperationIndex from "./../../../../../models/operations/operation-index";
import Choice from "../../../../../../lib/inquirer/choice";
import Account from "../account";

export default class AzCliAzAccountListLocationsOperationIndex  extends OperationIndex {

    getChoice(): Choice {
        return new Choice(
            `${process.env.AZCLI_AZ_ACCOUNT_LISTLOCATIONS_CHOICE_NAME}`,
            `${process.env.AZCLI_AZ_ACCOUNT_LISTLOCATIONS_CHOICE_SHORT}`,
            `${process.env.AZCLI_AZ_ACCOUNT_LISTLOCATIONS_CHOICE_VALUE}`);
    }

    async execute () {

        const account = new Account();
        account.listLocations().then(Locations => console.log(Locations));
    }

}