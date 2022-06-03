import azLogin from "./az-login-command";

export default class Login {

    constructor(
    ) { }

    /**
     * @override
     */
    async execute() {
        const subscriptions = await azLogin();
        return subscriptions;
    }
}
