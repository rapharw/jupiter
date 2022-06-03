import commandExecution from "../../../../../models/command-execution/command-execution";
import azCliWarningNotLogged from "../../../az-cli-warning-not-logged";

const printConsole = false;

export default (keyvaultName: string, keyvaultSecretName: string, keyvaultSecretValue: string, subscription: string) => {
    
    return new Promise<any>((resolve, reject) => {
        try {
            commandExecution(`az keyvault secret set --vault-name ${keyvaultName} --name ${keyvaultSecretName} --value ${keyvaultSecretValue} --subscription ${subscription}`, printConsole, (data: string) => {
                resolve(true);
            },
            azCliWarningNotLogged)
        } 
        catch (e) {
            console.log(e);
            reject(new Error("Error on execute AZ KeyVault Secret Set"))
        }
    })
}