const axios = require('axios')

module.exports = class ApiHandler {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'http://messageapp:3000',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })
    }

    sendMessage(messageInfo) {
        console.log('El message ---->', messageInfo)
        return this.axiosApp.post('/message', messageInfo)
    }
}