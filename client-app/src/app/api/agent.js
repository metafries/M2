import axios from 'axios';

const mockLatency = (delay) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.interceptors.response.use(async response => {
    try {
        await mockLatency(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
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
    create: (activity) => requests.post('/activities', activity),
    update: (activity) => requests.put(`/activities/${activity.id}`, activity),
    delete: (id) => requests.delete(`/activities/${id}`),
}

const agent = {
    Activities
}

export default agent;