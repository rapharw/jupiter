import Application from "../models/application/application";
import JupiterExecution from "./jupiter-execution";

export default class JupiterApp extends Application {

    private jupiterExecution: JupiterExecution = new JupiterExecution();

    constructor() {
        super();
        super.applicationExecution(this.jupiterExecution);
    }

}
