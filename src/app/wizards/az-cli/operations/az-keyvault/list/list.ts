export default interface List {

    list(resourceGroup: string, subscription: string): Promise<any>;
}