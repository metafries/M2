import { makeAutoObservable } from "mobx";

export default class App {
    openPersistentDrawer = false;
    openIdentityInputs = false;

    constructor() {
        makeAutoObservable(this);
    }

    setOpenPersistentDrawer = state => {
        this.openPersistentDrawer = state;
    }

    setOpenIdentityInputs = state => {
        this.openIdentityInputs = state;
    }
}