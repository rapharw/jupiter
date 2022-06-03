import Application from "./../../models/application/application";
import AzCliExecution from "./az-cli-execution";

export default class AzCliApp extends Application{

    private azCliExecution: AzCliExecution = new AzCliExecution();

    constructor() {
        super();
        super.applicationExecution(this.azCliExecution);
    }
}