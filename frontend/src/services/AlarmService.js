import http from "../http-common";

class Alarms {
    getAll(){
        return  http.get("/test/Alarms")
    }

    delete(index){
        // return http.delete("/test/Alarms/{index}")
        return http.delete("/test/Alarms/"+index)
    }
    put(index){
        // return http.delete("/test/Alarms/{index}")
        return http.put("/test/Alarms/"+index)
    }
}


export default new Alarms()
