import AppService from "../app-service";

export default interface List {

    listAppServices(subscription: string, resourceGroup: string): Promise<AppService[]>;
}