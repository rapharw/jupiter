import commandExecution from "../../../../../../app/models/command-execution/command-execution";
import azCliWarningNotLogged from "../../../az-cli-warning-not-logged";
import Location from "./location";

const printConsole = false;

export default () => {
    
    return new Promise<Location[]>((resolve, reject) => {
        try {
            commandExecution('az account list-locations -o json', printConsole, (data: any) => {
                
                const locations: Location[] = JSON.parse(data);
                resolve(
                    locations.map((location: Location) => {
                        return { name: location.name, displayName: location.displayName }
                    })
                );
            },
            azCliWarningNotLogged)
        } 
        catch (e) {
            console.log(e);
            reject(new Error("Error on execute AZ Account List-Locations"))
        }
    })
}