
import commandExecutionDeprecated from "../../../../models/command-execution/command-execution-deprecated";
import azCliWarningNotLogged from "../../az-cli-warning-not-logged";
import Subscription from "./subscription";

const printConsole = false;

export default () => {
    
    return new Promise<Subscription[]>((resolve, reject) => {
        try {
            commandExecutionDeprecated('az login --use-device-code', printConsole, (data: string) => {
                
                const subscriptions: Subscription[] = JSON.parse(data);
                resolve(
                    subscriptions.map(subscription => {
                        return new Subscription(subscription.id, subscription.name);
                    })
                );
            },
            azCliWarningNotLogged)
        } 
        catch (e) {
            console.log(e);
            reject(new Error("Error on execute AZ Login"))
        }
    })
}