import Axios from'axios';

const axios = Axios.create({
    baseURL :"https://todolistapi.ap-1.sharedwithexpose.com/api/v1",
    headers :{
        user : "ilma",
    },
});
const ENDPOINT_TODOS ='/todos';

export default {
    list(){
        return axios .get(ENDPOINT_TODOS);
         },
    create(payload){
        return axios.post(ENDPOINT_TODOS,payload);
    },
    update(payload,id){
        return axios.patch(ENDPOINT_TODOS + "/" + id, payload);
    },
    toggleDone(id){
        return axios.patch(ENDPOINT_TODOS + "/" + id);
    },
    delete(id){
        return axios.delete(ENDPOINT_TODOS + "/" + id);
    },
    deleteAll() {
        return axios.delete(ENDPOINT_TODOS + "/all");
    },

}