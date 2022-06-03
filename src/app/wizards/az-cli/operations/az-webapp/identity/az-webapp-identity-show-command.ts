import commandExecution from "./../../../../../models/command-execution/command-execution";
import azCliWarningNotLogged from "../../../az-cli-warning-not-logged";
import Identity from "./identity";

const printConsole = false;

export default (appServiceName: string, resourceGroup: string, subscription: string) => {
    
    return new Promise<Identity>((resolve, reject) => {
        try {

            commandExecution(`az webapp identity show --name "${appServiceName}" --resource-group "${resourceGroup}" --subscription "${subscription}"`, printConsole, (data: string) => {
                const identity: Identity = JSON.parse(data);
                resolve(identity);
            }, 
            azCliWarningNotLogged)
        } 
        catch (e) {
            console.log(e);
            reject(new Error("Error on execute AZ Webapp Identity Show --name $ --resource-group $ --subscription $"))
        }
    })
}