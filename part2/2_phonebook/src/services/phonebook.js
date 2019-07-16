import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    return axios.get(baseUrl).then(response=>response.data);
}

const addNum = (data) => {
    return axios.post(baseUrl, data).then(response=>response.data);
}

const deleteRec = (p_id) => {
    return axios.delete(`${baseUrl}/${p_id}`);
}

const updateNum = (data) => {
    return axios.put(`${baseUrl}/${data.id}`, data).then(response => response.data);
}

export default {
    getAll,
    addNum,
    deleteRec,
    updateNum
}