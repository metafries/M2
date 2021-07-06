import { makeAutoObservable } from "mobx";

export default class Common {
    notFoundError = {};
    serverError = {};
    validationError = {};

    constructor() {
        makeAutoObservable(this);
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