import ApplicationExecution from "./application-execution";

export default abstract class Application {

    private appExecution: ApplicationExecution | undefined;

    constructor(){

    }

    applicationExecution(applicationExecution: ApplicationExecution): Application{
        this.appExecution = applicationExecution;
        return this;
    }

    async execute(): Promise<any> {
        if(this.appExecution){
            this.appExecution.showHeader();
    
            const result = await this.appExecution.showQuestions();
            
            this.appExecution.performSelection(result);
        }
        else{
            throw new Error("Add a ApplicationExecution to your Application");
        }
    }
}