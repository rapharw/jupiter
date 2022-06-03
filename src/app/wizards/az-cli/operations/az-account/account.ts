import Subscription from "../az-login/subscription";
import azAccountListLocationsCommand from "./list-locations/az-account-list-locations-command";
import ListLocations from "./list-locations/list-locations";
import Location from "./list-locations/location";
import azAccountListCommand from "./list/az-account-list-command";

export default class Account implements ListLocations {

    constructor() {
    }

    async listLocations(): Promise<Location[]> {
        return await azAccountListLocationsCommand();
    }

    async getSubscriptions(): Promise<Subscription[]> {
        return await azAccountListCommand();
    }
    
}
