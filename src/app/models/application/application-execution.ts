import WizardIndex from "../../wizard-index";

export default interface ApplicationExecution {
    
    showHeader(): void;
    showQuestions(): Promise<WizardIndex | undefined>;
    performSelection(wizardIndex: WizardIndex | undefined): void;
}