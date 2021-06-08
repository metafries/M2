import { makeAutoObservable } from "mobx";

export default class App {
    openPersistentDrawer = false;

    constructor() {
        makeAutoObservable(this);
    }

    setOpenPersistentDrawer = state => {
        this.openPersistentDrawer = state;
    }
}