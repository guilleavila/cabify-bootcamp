const Message = require("../models/Message.model")

const saveMessage = (messageInfo) => Message.create(messageInfo)

const getMessages = () => Message.find()

module.exports = { saveMessage, getMessages }