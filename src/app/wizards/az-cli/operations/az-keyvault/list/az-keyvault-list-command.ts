import commandExecution from "./../../../../../models/command-execution/command-execution";
import azCliWarningNotLogged from "../../../az-cli-warning-not-logged";

const printConsole = false;

export default (resourceGroup: string, subscription: string) => {
    
    return new Promise<any>((resolve, reject) => {
        try {
            commandExecution(`az keyvault list --resource-group ${resourceGroup} --subscription ${subscription}`, printConsole, (data: string) => {
                const keyvaults: any[] = JSON.parse(data);
                resolve(
                    keyvaults.map(keyvault => {
                        return { name: keyvault.name }
                    })
                );
            },
            azCliWarningNotLogged)
        } 
        catch (e) {
            console.log(e);
            reject(new Error("Error on execute AZ KeyVault List"))
        }
    })
}