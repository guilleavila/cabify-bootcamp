const axios = require('axios')

module.exports = class ApiHandler {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'http://localhost:3000'
        })
    }

    sendMessage(messageInfo) {
        console.log('El message ---->', messageInfo)
        return this.axiosApp.post('/message', messageInfo)
    }
}