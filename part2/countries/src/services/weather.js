import axios from 'axios'
const baseUrl = 'https://api.open-meteo.com/v1/forecast'

const get = (lat, lng) => {
    const promise = axios.get(`${baseUrl}?latitude=${lat}&longitude=${lng}&current_weather=true`)
    return promise.then(response => response.data)
}

export default {
    get
}