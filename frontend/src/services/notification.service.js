import axios from "axios";
import authHeader from "@/services/auth-header";
// We define the API_URL as the URL of the backend server.
const API_URL = process.env.VUE_APP_API_URL + '/api/test/notification-overview';
class NotificationService {
    getAll() {
        //We return the axios get request to the API_URL with the authHeader.
        return axios.get(
            API_URL,{
                headers: authHeader()
            }
        );
    }
    delete(id) {
        //We return the axios delete request to the API_URL with the authHeader.
        return axios.delete(
            API_URL + "/" + id, {
                headers: authHeader()
            }
        );
    }
}
//We export the NotificationService.
export default new NotificationService();
