export default abstract class Question {

    constructor(public name: string, public message: string){

    }


    abstract ask(): any;

}