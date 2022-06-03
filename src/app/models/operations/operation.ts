import OperationExecution from "./operation-execution";

export default abstract class Operation {

    private operExecution: OperationExecution | undefined;

    constructor(){

    }

    applicationExecution(operationExecution: OperationExecution): Operation{
        this.operExecution = operationExecution;
        return this;
    }

    async execute(): Promise<any> {
        if(this.operExecution){
            console.log("operExecution");

            const result = await this.operExecution.pre();
            
            // const result = await this.appExecution.showQuestions();
            
            // this.appExecution.performSelection(result);
        }
        else{
            throw new Error("Add a ApplicationExecution to your Application");
        }
    }
}