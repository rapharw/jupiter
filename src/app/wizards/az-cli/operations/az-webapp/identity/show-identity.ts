import Identity from "./identity";

export default interface ShowIdentity {

    show(appServiceName: string, resourceGroup: string, subscription: string): Promise<Identity>;
}