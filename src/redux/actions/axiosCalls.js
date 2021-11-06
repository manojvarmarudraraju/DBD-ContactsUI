import axios from 'axios';

const endpoint = "http://localhost:8000/contacts";

function getDataCall(){
    return axios.get(endpoint).then(response => response);
}

function deleteContactCall(data){
    return axios.delete(endpoint, {data: data}).then(response => response);
}

function updateContactCall(data){
    return axios.post(endpoint, {data: data}).then(response => response);
}

function addContactCall(data){
    return axios.put(endpoint, {data: data}).then(response => response);
}

export {getDataCall, deleteContactCall, updateContactCall, addContactCall};