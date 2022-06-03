import commandExecution from "../../../../../models/command-execution/command-execution";
import azCliWarningNotLogged from "../../../az-cli-warning-not-logged";

const printConsole = false;

export default (environmentVariableName: string, environmentVariableValue: string, appService: string, resourceGroup: string, subscription: string) => {
    
    return new Promise<any>((resolve, reject) => {
        try {
            commandExecution(`az webapp config appsettings set --settings ${environmentVariableName}="${environmentVariableValue}" --name ${appService} --resource-group "${resourceGroup}" --subscription "${subscription}"`, printConsole, (data: string) => {
                resolve(true);
            }, 
            azCliWarningNotLogged)
        } 
        catch (e) {
            console.log(e);
            reject(new Error("Error on execute AZ Webapp Config appsettings set"))
        }
    })
}