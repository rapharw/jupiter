import ApplicationExecution from "../models/application/application-execution";
import WizardIndex from "../wizard-index";
import jupiterHeader from "./jupiter-header";
import jupiterQuestions from "./jupiter-questions";
import JupiterGetWizards from "./jupiter-get-wizards";

export default class JupiterExecution implements ApplicationExecution {

    /**
     * @override
     */
    showHeader(): void {
        jupiterHeader().show();
    }


    /**
     * @override
     */
    async showQuestions(): Promise<WizardIndex | undefined> {

        const jupiterWizard = JupiterGetWizards();

        const question = jupiterQuestions(jupiterWizard.getChoices());

        const resultSelectionQuestion = await question.ask();

        const wizardIndex = jupiterWizard.getWizard(resultSelectionQuestion.selection);

        return wizardIndex;
    }


    /**
     * @override
     */
    performSelection(wizardIndex: WizardIndex): void {
        if (wizardIndex) {
            wizardIndex.execute();
        }
        else
            throw new Error("Something went wrong on performSelection WizardIndex [jupiter] !!!")
    }

}
