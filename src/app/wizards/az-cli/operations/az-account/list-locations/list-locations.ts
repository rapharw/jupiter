import Location from "./location";

export default interface ListLocations {
    
    listLocations(): Promise<Location[]>;
}