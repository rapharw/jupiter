import azKeyvaultCreateComand from "./create/az-keyvault-create-comand";
import Create from "./create/create";
import azKeyvaultListCommand from "./list/az-keyvault-list-command";
import List from "./list/list";
import azKeyvaultSetPolicyCommand from "./set-policy/az-keyvault-set-policy-command";
import Policy from "./set-policy/policy";
import Identity from "../az-webapp/identity/identity";
import Secret from "./secret/secret";
import azKeyvaultSecretSetCommand from "./secret/az-keyvault-secret-set-command";
import azKeyvaultSecretListCommand from "./secret/az-keyvault-secret-list-command";

export default class KeyVault implements List, Create, Policy, Secret{
    
    constructor() {
    }

    async listSecrets(keyvaultName: string, subscription: string): Promise<any> {
        return azKeyvaultSecretListCommand(keyvaultName, subscription);
    }

    async createSecret(keyvaultName: string, keyvaultSecretName: string, keyvaultSecretValue: string, subscription: string): Promise<any> {
        return azKeyvaultSecretSetCommand(keyvaultName, keyvaultSecretName, keyvaultSecretValue, subscription);
    }

    async setPolicy(identity: Identity, keyvault: string, resourceGroup: string, subscription: string): Promise<any> {
        return azKeyvaultSetPolicyCommand(identity, keyvault, resourceGroup, subscription);
    }
    
    async create(azLocation: string, keyvault: string, resourceGroup: string, subscription: string): Promise<any> {
        return azKeyvaultCreateComand(azLocation, keyvault, resourceGroup, subscription);
    }

    async list(resourceGroup: string, subscription: string): Promise<any> {
        return azKeyvaultListCommand(resourceGroup, subscription);
    }
    
}
