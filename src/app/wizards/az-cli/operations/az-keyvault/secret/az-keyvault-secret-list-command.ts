import commandExecution from "../../../../../models/command-execution/command-execution";
import azCliWarningNotLogged from "../../../az-cli-warning-not-logged";

const printConsole = false;

export default (keyvaultName: string, subscription: string) => {

    return new Promise<any>((resolve, reject) => {
        try {
            commandExecution(`az keyvault secret list --vault-name ${keyvaultName} --subscription ${subscription}`, printConsole, (data: string) => {
                const secrets: any[] = JSON.parse(data);
                resolve(
                    secrets.map(secret => {
                        return { name: secret.name };
                    })
                );
            },
                azCliWarningNotLogged)
        }
        catch (e) {
            console.log(e);
            reject(new Error("Error on execute AZ KeyVault Secret List"))
        }
    })
}