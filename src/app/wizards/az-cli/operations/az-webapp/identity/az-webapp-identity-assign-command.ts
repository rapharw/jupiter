import commandExecution from "./../../../../../models/command-execution/command-execution";
import azCliWarningNotLogged from "../../../az-cli-warning-not-logged";

const printConsole = true;

export default (appServiceName: string, resourceGroup: string, subscription: string) => {
    
    return new Promise<any>((resolve, reject) => {
        try {
            commandExecution(`az webapp identity assign --name "${appServiceName}" --resource-group "${resourceGroup}" --subscription "${subscription}"`, printConsole, (data: string) => {
                resolve(true);
            }, 
            azCliWarningNotLogged)
        } 
        catch (e) {
            console.log(e);
            reject(new Error("Error on execute AZ Webapp list --resource-group $ --subscription $"))
        }
    })
}