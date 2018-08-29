
export class StorageService {

    static KEY = 'JWT';

    static getJWTKey() {
        let jwt = sessionStorage.getItem(this.KEY);
        if (jwt) {
            return jwt;
        } else {
            return null;
        }
    }

    static setJWTKey(jwt) {
        sessionStorage.setItem(this.KEY, jwt);
    }

    static removeJWTKey(jwt) {
        sessionStorage.removeItem(this.KEY);
    }
}