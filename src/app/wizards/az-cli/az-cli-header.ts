import Header from "../../header"

export default () => {
    return new Header(`${process.env.APP_WIZARD_AZCLI_HEADER}`);
}