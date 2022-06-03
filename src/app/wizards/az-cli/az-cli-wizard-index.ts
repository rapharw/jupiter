import Choice from "../../../lib/inquirer/choice";
import WizardIndex from "../../wizard-index";
import AzCliApp from "./az-cli-app";
import Login from "./operations/az-login/login";


export default class AzCliWizardIndex extends WizardIndex {

    getChoice(): Choice {
        return new Choice(
            `${process.env.APP_WIZARD_AZCLI_CHOICE_NAME}`,
            `${process.env.APP_WIZARD_AZCLI_CHOICE_SHORT}`,
            `${process.env.APP_WIZARD_AZCLI_CHOICE_VALUE}`);
    }

    async execute (): Promise<any> {

        const l = new Login();
        const result = await l.execute();

        if(result){
            const azCliApp = new AzCliApp();
            azCliApp.execute();
        }
    }

}