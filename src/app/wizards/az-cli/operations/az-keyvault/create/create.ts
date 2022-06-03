export default interface Create {

    create(azLocation: string, keyvault: string, resourceGroup: string, subscription: string): Promise<any>;
}