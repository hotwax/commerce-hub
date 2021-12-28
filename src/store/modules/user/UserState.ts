export default interface UserState {
    token: string;
    current: object | null;
    currentFacility: object;
    pinnedPages: Array<any>;
}