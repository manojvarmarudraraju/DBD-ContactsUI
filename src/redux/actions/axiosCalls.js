import axios from 'axios';
const endpoint = "http://localhost:8000/contacts";

const searchPoint = "http://localhost:8000/contactSearch"

const addOption = "http://localhost:8000/addOption";

function getDataCall(){
    return axios.get(endpoint).then(response => response);
}

function getWithSearchCall(data){
    return axios.post(searchPoint,{search: data}).then(response => response);
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

function addOptionCall(data){
    return axios.post(addOption, {data: data}).then(response => response);
}

export {getDataCall, deleteContactCall, updateContactCall, addContactCall, getWithSearchCall, addOptionCall};