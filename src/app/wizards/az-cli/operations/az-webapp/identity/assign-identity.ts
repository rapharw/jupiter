import Identity from "./identity";

export default interface AssignIdentity {

    assign(appServiceName: string, resourceGroup: string, subscription: string): Promise<Identity>;
}