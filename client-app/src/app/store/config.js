import { createContext, useContext } from "react";
import App from "./app";
import Activity from "./activity";
import Common from "./common";
import Account from "./account";

export const stores = {
    accountStore: new Account(),
    commonStore: new Common(),
    appStore: new App(),
    activityStore: new Activity()
}

export const DataContext = createContext(stores);

export const useStore = () => useContext(DataContext);