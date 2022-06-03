import commandExecution from "./../../../../../models/command-execution/command-execution";
import azCliWarningNotLogged from "../../../az-cli-warning-not-logged";
import ResourceGroup from "../resource-group";

const printConsole = false;

export default (subscription: string) => {

    return new Promise<ResourceGroup[]>((resolve, reject) => {
        try {
            
            commandExecution(`az group list --subscription "${subscription}"`, printConsole, (data: string) => {
                const resourceGroups: ResourceGroup[] = JSON.parse(data);
                resolve(
                    resourceGroups.map(resourceGroup => {
                        return { name: resourceGroup.name }
                    })
                );
            },
            azCliWarningNotLogged)
        }
        catch (e) {
            console.log(e);
            reject(new Error("Error on execute AZ Group List --Subscription"))
        }
    })
}