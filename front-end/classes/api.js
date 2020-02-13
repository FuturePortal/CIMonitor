import HttpClient from 'axios';

import Store from '../store/Store.js';
import { SETTINGS_CLEAR_PASSWORD, SETTINGS_SET_PASSWORD_REQUIRED } from '../store/StaticMutations';

class API {
    constructor() {
        this.GET = 'get';
        this.POST = 'post';
        this.DELETE = 'delete';
        this.PATCH = 'patch';
    }

    post(url, data) {
        return this.fireRequest(this.POST, url, data);
    }

    get(url) {
        return this.fireRequest(this.GET, url);
    }

    delete(url) {
        return this.fireRequest(this.DELETE, url);
    }

    patch(url, data) {
        return this.fireRequest(this.PATCH, url, data);
    }

    getHeaders() {
        let headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        };

        if (Store.state.settings.password) {
            headers.Authorization = Store.state.settings.password;
        }

        return headers;
    }

    getClient() {
        return HttpClient.create({
            timeout: 20000,
            headers: this.getHeaders(),
        });
    }

    fireRequest(method, url, data = undefined) {
        console.log(`[API] ${method} ${url}...`);

        let request = {
            url,
            method,
        };

        if (data) {
            request.data = data;
        }

        return this.getClient()
            .request(request)
            .then(response => this.processResponse(response, method, url))
            .catch(error => this.processError(error, method, url));
    }

    processResponse(response, method, url) {
        console.log(`[API] ${method} ${url} OK:${response.status}`);

        return {
            message: response.data.message,
            data: response.data,
            status: response.status,
        };
    }

    processError(error, method, url) {
        if (!error.response) {
            console.warn(`[API] ${method} ${url} didn't get a response...`);

            throw {
                message: `No API response, check if CIMonitor is running or your internet connection is available.`,
                status: 503,
            };
        }
        console.log(`[API] ${method} ${url} ERROR:${error.response.status}`);

        // When the authoriziation is invalid, clear the password from the store
        if (error.response.status === 401 || error.response.status === 403) {
            console.log(`[API] Cleared the store password since it was invalid.`);
            Store.commit(SETTINGS_CLEAR_PASSWORD);
            Store.commit(SETTINGS_SET_PASSWORD_REQUIRED, true);
        }

        throw {
            message: error.response.data.message,
            status: error.response.status,
        };
    }
}

export default API = new API(); // eslint-disable-line no-class-assign
