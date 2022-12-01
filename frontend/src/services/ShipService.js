import axios from 'axios';

const API_URL = 'http://localhost:8085/api/test/';

class ShipDataService {
    getAll() {
        return axios.get(API_URL + "ships/all");
    }

    get(id){
        return axios.get(API_URL + 'ships/' + id)
    }

    create(ship) {
        return axios.post(API_URL +"ships/create", ship);
    }

    updateShip(ship_id, ship) {
        return axios.put(API_URL + 'ships/' + ship_id,
            {
                name: ship.name,
                location: ship.location,
                origin: ship.origin,
                destination: ship.destination
            });
    }

    deleteShip(ship_id) {
        return axios.delete("ships/" + ship_id)
    }

    getWater() {
        return axios.get(API_URL + 'chart');
    }
}

export default new ShipDataService();
