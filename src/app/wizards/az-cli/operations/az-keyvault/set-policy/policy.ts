import Identity from "../../az-webapp/identity/identity";

export default interface Policy {

    setPolicy(identity: Identity, keyvault: string, resourceGroup: string, subscription: string): Promise<any>;
}