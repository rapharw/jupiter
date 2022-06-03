import commandExecution from "./../../../../../models/command-execution/command-execution";
import azCliWarningNotLogged from "../../../az-cli-warning-not-logged";
import AppService from "../app-service";

const printConsole = false;

export default (resourceGroup: string, subscription: string) => {
    
    return new Promise<AppService[]>((resolve, reject) => {
        try {

            commandExecution(`az webapp list --resource-group "${resourceGroup}" --subscription "${subscription}"`, printConsole, (data: string) => {
                const appServices: AppService[] = JSON.parse(data);
                resolve(
                    appServices.map(appService => {
                        return { name: appService.name }
                    })
                );
            }, 
            azCliWarningNotLogged)
        } 
        catch (e) {
            console.log(e);
            reject(new Error("Error on execute AZ Webapp list --resource-group $ --subscription $"))
        }
    })
}