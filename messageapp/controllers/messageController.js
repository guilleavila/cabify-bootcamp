const { saveMessage, getMessages } = require("../utils");

const ApiHandler = require('./../services/APIHandler')
const messageHandler = new ApiHandler()

const sendAndSaveMessages = (req, res) => {
    const { destination, message, number } = req.body

    let status, resMessage

    if (!destination && !message) {
        res.status(422).json({ message: "You should not pass empty object" })
    }
    else if (!destination) {
        res.status(422).json({ message: "Destination is required" })
    }
    else if (!message) {
        res.status(422).json({ message: "Message is required" })
    }
    else if (typeof destination !== "string" || typeof message !== "string") {
        res.status(422).json({ message: "Only strings allowed" })
    }
    else {
        messageHandler
            .sendMessage({ destination, body: message })
            .then(() => {

                status = { sent: true, confirmed: true }
                resMessage = "Message saved in database"

                saveMessage(res, { destination, message, number, status }, resMessage)

            })
            .catch(({ response }) => {

                if (response.status === 500) {
                    status = { sent: false, confirmed: false }
                    resMessage = "Message saved in database but not sent"
                } else if (response.status === 504) {
                    status = { sent: true, confirmed: false }
                    resMessage = "Message saved in database, sent but not confirmed"
                }

                saveMessage(res, { destination, message, number, status }, resMessage)
            })
    }
}

const getAllMessages = (req, res) => {
    getMessages()
        .then(response => res.status(200).json(response))
        .catch(() => res.status(500).json({ message: "Could not get messages from the database" }))
}

module.exports = {
    sendAndSaveMessages,
    getAllMessages
}