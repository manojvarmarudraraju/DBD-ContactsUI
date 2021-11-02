import axios from 'axios';

const endpoint = "http://localhost:8000/contacts";

function getDataCall(){
    return axios.get(endpoint).then(response => response);
}

export {getDataCall};