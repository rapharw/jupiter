import Choice from "../../../lib/inquirer/choice";
import WizardIndex from "../../wizard-index";

export default class AzDevopsCliWizardIndex extends WizardIndex {
    
    getChoice(): Choice {
        return new Choice(
            `${process.env.APP_WIZARD_AZDEVOPSCLI_CHOICE_NAME}`,
            `${process.env.APP_WIZARD_AZDEVOPSCLI_CHOICE_SHORT}`,
            `${process.env.APP_WIZARD_AZDEVOPSCLI_CHOICE_VALUE}`);
    }

    execute(): void {
        throw new Error("[AZ DEVOPS CLI] Method not implemented.");
    }

}
