import axios from 'axios';

const endpoint = "http://localhost:8000/contacts";

function getDataCall(){
    return axios.get(endpoint).then(response => response);
}

function deleteContactCall(data){
    return axios.delete(endpoint, {data: data}).then(response => response);
}

export {getDataCall, deleteContactCall};