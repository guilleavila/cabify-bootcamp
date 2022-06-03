const Message = require("../models/Message.model")

const saveMessage = (messageInfo) => {
    return Message.create(messageInfo)
}

const getMessages = () => {
    return Message.find()
}

module.exports = { saveMessage, getMessages }