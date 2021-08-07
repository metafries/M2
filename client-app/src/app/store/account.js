import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { stores } from "./config";

export default class Account {
    user = null;

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async creds => {
        try {
            const user = await agent.Account.login(creds);
            stores.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            
            stores.appStore.setOpenIdentityInputs(false);
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        stores.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        history.push('/');
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error);
        }
    }

    register = async creds => {
        try {
            creds.displayName = creds.username.toUpperCase();
            const user = await agent.Account.register(creds);

            stores.commonStore.setToken(user.token);
            runInAction(() => this.user = user);

            stores.appStore.setOpenIdentityInputs(false);
        } catch (error) {
            throw error;
        }
    }
}