import commandExecution from "../../../../../models/command-execution/command-execution";
import azCliWarningNotLogged from "../../../az-cli-warning-not-logged";
import EnvironmentVariable from "./environment-variable";

const printConsole = false;

export default (appService: string, resourceGroup: string, subscription: string) => {
    
    return new Promise<EnvironmentVariable[]>((resolve, reject) => {
        try {

            commandExecution(`az webapp config appsettings list --name ${appService} --resource-group "${resourceGroup}" --subscription "${subscription}"`, printConsole, (data: string) => {
                const environmentVariables: EnvironmentVariable[] = JSON.parse(data);
                resolve(environmentVariables);
            }, 
            azCliWarningNotLogged)
        } 
        catch (e) {
            console.log(e);
            reject(new Error("Error on execute AZ Webapp Config appsettings list"))
        }
    })
}