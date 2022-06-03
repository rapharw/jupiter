export default interface Secret {

    createSecret(keyvaultName: string, keyvaultSecretName: string, keyvaultSecretValue: string, subscription: string): Promise<any>;
    listSecrets(keyvaultName: string, subscription: string): Promise<any>;
}
