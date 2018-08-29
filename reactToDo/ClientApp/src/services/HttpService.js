import { StorageService } from "./StorageService";

export class HttpService {

    static get(url) {
        return HttpService.request('GET', url);
    }

    static post(url, data) {
        return HttpService.request('POST', url, data);
    }

    static request(method, url, data) {
        let isBadRequest = false;
        let body = data;
        let headers = new Headers();

        let jwt = StorageService.getJWTKey();

        if (jwt) {
            headers.set('Authorization', `Bearer ${jwt}`);
        }

        headers.set('Accept', 'application/json');

        if (data) {
            if ((typeof data === 'object')) {
                headers.set('Content-Type', 'application/json');
                body = JSON.stringify(data);
            } else {
                headers.set('Content-Type', 'application/x-www-form-urlencoded');
            }
        }
        
        return fetch(url, {
            method: method,
            headers: headers,
            body: body
        }).then((response) => {

            // check if unauthorized
            if (response.status === 401) {
                StorageService.removeJWTKey();
                window.location.href = `/?expired=1`;
            }

            isBadRequest = (response.status === 400);

            let responseContentType = response.headers.get("content-type");
            if (responseContentType && responseContentType.indexOf("application/json") !== -1) {
                return response.json();
            } else {
                return response.text();
            }
        }).then((responseContent) => {
            let response = {
                error: isBadRequest,
                data: responseContent
            };
            return response;
        });
    }
}