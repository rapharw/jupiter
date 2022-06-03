import commandExecution from "../../../../../models/command-execution/command-execution";
import azCliWarningNotLogged from "../../../az-cli-warning-not-logged";
import Identity from "../../az-webapp/identity/identity";

const printConsole = false;

export default (identity: Identity, keyvault: string, resourceGroup: string, subscription: string) => {
    
    return new Promise<any>((resolve, reject) => {
        try {
            const secretPermissions = "get list";
            commandExecution(`az keyvault set-policy --object-id ${identity.principalId} --secret-permissions ${secretPermissions} --name ${keyvault} --resource-group ${resourceGroup} --subscription ${subscription}`, printConsole, (data: string) => {
                resolve(true);
            },
            azCliWarningNotLogged)
        } 
        catch (e) {
            console.log(e);
            reject(new Error("Error on execute AZ KeyVault Set-Policy"))
        }
    })
}