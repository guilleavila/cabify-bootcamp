const Message = require("../models/Message.model")

const saveMessage = (res, messageInfo, resMessage) => {
    Message
        .create(messageInfo)
        .then(() => res.status(200).json({ message: resMessage }))
        .catch(() => res.status(500).json({ message: "Couldn't save message" }))
}

const getMessages = () => Message.find()

module.exports = { saveMessage, getMessages }