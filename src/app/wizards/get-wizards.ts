import fs from "fs"
import path from "path"
import Choice from "../../lib/inquirer/choice"
import WizardIndex from "../wizard-index"

/**
 * 
 * @param {*} dirPath 
 * @param {*} arrayOfFiles 
 * @returns 
 */
const getFiles = (dirPath: string, arrayOfFiles: string[] = []) => {

    arrayOfFiles = arrayOfFiles || []

    const files = fs.readdirSync(dirPath);

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getFiles(dirPath + "/" + file, arrayOfFiles)
        } else {
            if (file.includes('-wizard-index.js') || file.includes('-wizard-index.ts')) {
                arrayOfFiles.push(path.join(dirPath, "/", file).replace(path.resolve(dirPath, '..'), ""));
            }
        }
    })
    return arrayOfFiles
}


export default class GetWizards {

    static FILE_PATH: string = __dirname
    
    private choices: Choice[] = [];
    private wizardsMap: Map<string, WizardIndex> = new Map();

    constructor() {
        
        getFiles(GetWizards.FILE_PATH).forEach(element => {
            let indexRequired = require("." + element);
            
            let wizardIndex: WizardIndex = new indexRequired.default();

            let wizardChoice: Choice = wizardIndex.getChoice();

            this.wizardsMap.set(wizardChoice.value, wizardIndex);
            this.choices.push(wizardChoice);
        });


    }

    getChoices() {
        return this.choices;
    }

    getWizard(value: string): WizardIndex | undefined {
        return this.wizardsMap.get(value);
    }

}
