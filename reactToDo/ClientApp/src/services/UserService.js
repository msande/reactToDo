import decode from 'jwt-decode'
import { StorageService } from './StorageService';

export class UserService {

    static info() {
        let token = StorageService.getJWTKey();
        if (token) {
            return decode(token);
        } else {
            return null;
        }
    }

    static isInRole(role) {
        let roles = this.info().roles;
        for (let i = 0; i < roles.length; i++) {
            if (roles[i] === role) {
                return true;
            }
        }
        return false;
    }
}