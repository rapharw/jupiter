import azGroupListCommand from "./list/az-group-list-command";
import ResourceGroup from "./resource-group";

export default class Group {

    constructor() {
    }

    async listResourceGroups(subscription: string): Promise<ResourceGroup[]> {
        return await azGroupListCommand(subscription);
    }
    
}
