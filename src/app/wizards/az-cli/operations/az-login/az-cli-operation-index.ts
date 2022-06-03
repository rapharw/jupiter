import OperationIndex from "./../../../../models/operations/operation-index";
import Choice from "../../../../../lib/inquirer/choice";
import Login from "./login";

export default class AzCliAzLoginOperationIndex  extends OperationIndex{

    getChoice(): Choice {
        return new Choice(
            `${process.env.AZCLI_AZ_LOGIN_CHOICE_NAME}`,
            `${process.env.AZCLI_AZ_LOGIN_CHOICE_SHORT}`,
            `${process.env.AZCLI_AZ_LOGIN_CHOICE_VALUE}`);
    }

    async execute (): Promise<any> {
        const login = new Login();
        login.execute();
    }

}