import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const getAll = () => {
    const promise = axios.get(`${baseUrl}/all`)
    return promise.then(result => result.data)
}

/*
const get = (name) => {
    const promise = axios.get(`${baseUrl}/name/${name}`)
    return promise.then(result => result.data)
}
*/

export default {
    getAll,
    //get
}