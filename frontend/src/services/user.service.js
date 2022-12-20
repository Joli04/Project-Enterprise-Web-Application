import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8085/api/test/';

class UserService {
    getUsers() {
        return axios.get( API_URL + 'users/all');
    }

    getUsersByRole(role_id) {
        return axios.get( API_URL + 'users/role/' + role_id, {
            headers: authHeader()
        });
    }

    updateUser(user_id, user){
        return axios.put(API_URL + 'users/' + user_id,  {
            username: user.username,
            password: user.password,
            email: user.email,
            ship: user.ship
        });
    }

    createUser(user){
        return axios.post(API_URL +'users/create',  {
            username: user.username,
            password: user.password,
            email: user.email,
            shipID: user.shipID,
            roleID: user.roleID
        });
    }

    deleteUser(user_id) {
        return axios.delete(API_URL + 'users/' + user_id);
    }

}

export default new UserService();
