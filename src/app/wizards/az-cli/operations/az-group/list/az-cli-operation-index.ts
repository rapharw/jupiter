import OperationIndex from "../../../../../../app/models/operations/operation-index";
import Choice from "../../../../../../lib/inquirer/choice";
import subscriptionQuestionSelect from "../../shared/subscription-question-select";
import Group from "../group";

export default class AzCliAzGroupListOperationIndex  extends OperationIndex{

    getChoice(): Choice {
        return new Choice(
            `${process.env.AZCLI_AZ_GROUP_LIST_CHOICE_NAME}`,
            `${process.env.AZCLI_AZ_GROUP_LIST_CHOICE_SHORT}`,
            `${process.env.AZCLI_AZ_GROUP_LIST_CHOICE_VALUE}`);
    }

    async execute (): Promise<any> {

        // subscription
        const subscriptionsSelect = await subscriptionQuestionSelect();
        const subscriptionResult = await subscriptionsSelect.ask();

        const group = new Group();
        return await group.listResourceGroups(subscriptionResult.subscription).then(console.log);
    }

}