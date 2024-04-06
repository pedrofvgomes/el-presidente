import UserStore from "./UserStore";

export function resetStores(){
    for (const store in stores){
        stores[store].reset();
    }
}

export const stores = {
    userStore: new UserStore()
};