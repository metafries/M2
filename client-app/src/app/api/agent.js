import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Error from '../../components/utils/ErrorToast';
import { history } from '../..';
import { stores } from '../store/config'

const mockLatency = (delay) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.interceptors.response.use(async response => {
        await mockLatency(1000);
        return response;
}, error => {
    const { config, data, status, statusText } = error.response;
    switch (status) {
        case 400:
            toast.error(<Error msg={statusText}/>);
            const dataErr = data.errors;
            if (config.method === 'get') {
                // Bad Guid
                if (dataErr) {
                    stores.commonStore.setNotFoundError(data);
                    history.push('/not-found');
                }
            }
            // Validation Error
            if (config.method === 'post') {
                console.log(data);
                const modalStateErrors = [];
                for (const k in dataErr) {
                    if (dataErr[k]) {
                        modalStateErrors.push(dataErr[k]);
                    }
                }
                stores.commonStore.setValidationError(data);
                throw modalStateErrors.flat();
            }
            break;
        case 401:
            toast.error(<Error msg={statusText}/>);
            break;
        case 404:
            toast.error(<Error msg={statusText}/>);
            stores.commonStore.setNotFoundError(data);
            history.push('/not-found')
            break;
        case 500:
            toast.error(<Error msg={statusText}/>);
            stores.commonStore.setServerError(data);
            history.push('/server-error');
            break;
        default:
            toast.error(<Error msg={statusText}/>);
    }
    return Promise.reject(error);
})

axios.defaults.baseURL = 'http://localhost:5000/api';

const respData = (response) => response.data;

const requests = {
    get: (url) => axios.get(url).then(respData),
    post: (url, data) => axios.post(url, data).then(respData),
    put: (url, data) => axios.put(url, data).then(respData),
    delete: (url) => axios.delete(url).then(respData),
}

const Activities = {
    list: () => requests.get('/activities'),
    details: (id) => requests.get(`/activities/${id}`),
    create: (activity) => requests.post('/activities', activity),
    update: (activity) => requests.put(`/activities/${activity.id}`, activity),
    delete: (id) => requests.delete(`/activities/${id}`),
}

const agent = {
    Activities
}

export default agent;