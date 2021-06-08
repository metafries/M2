import { createContext, useContext } from "react";
import App from "./app";
import Activity from "./activity";

export const stores = {
    appStore: new App(),
    activityStore: new Activity()
}

export const DataContext = createContext(stores);

export const useStore = () => useContext(DataContext);