import OperationIndex from "./operation-index";

export default interface OperationExecution {
    
    pre(): Promise<any>;
    showQuestions(any: any): Promise<any>;
    performSelection(operationIndex: OperationIndex | undefined): void;
}