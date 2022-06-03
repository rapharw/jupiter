import Header from "../header"

export default () => {
    return new Header(`${process.env.APP_TITLE}`);
}
