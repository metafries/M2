import { makeAutoObservable, reaction } from "mobx";

export default class Common {
    modal = {
        open: false,
        body: null,
    };
    token = window.localStorage.getItem('jwt');
    appLoaded = false;
    notFoundError = {};
    serverError = {};
    validationError = {};

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.token, 
            token => {
                if (token) {
                    window.localStorage.setItem('jwt', token)
                } else {
                    window.localStorage.removeItem('jwt')
                }
            }
        )
    }

    openModal = content => {
        this.modal.open = true;
        this.modal.body = content;
    }

    closeModal = () => {
        this.modal.open = false;
        this.modal.body = null;
    }

    setToken = token => {
        this.token = token;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }

    setNotFoundError = error => {
        this.notFoundError = error;
    }

    setServerError = error => {
        this.serverError = error;
    }

    setValidationError = error => {
        this.validationError = error;
    }
}