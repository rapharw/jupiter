/**
 * Choices used into Inquirer.prompt
 */
export default class Choice{

    /**
     * 
     * @param name display in list
     * @param short display after selection
     * @param value save in the answers hash
     */
    constructor(
        public name: string,
        public short: string,
        public value: string,
    ) { }

    json(){
        return JSON.stringify(this);
    }
}
