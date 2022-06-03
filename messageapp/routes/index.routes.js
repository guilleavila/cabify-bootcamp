const router = require("express").Router();
const { saveMessage, getMessages } = require("../utils");
const ApiHandler = require('./../services/APIHandler')

const messageHandler = new ApiHandler()


// --- CREATE MESSAGES ---

router.post("/messages", (req, res, next) => {

  const { destination, message, number } = req.body

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

        saveMessage({ destination, message, number, sent: true, confirmed: true })
          .then(() => res.status(200).json({ message: "Message saved in database" }))
          .catch(() => res.status(500).json({ message: "Couldn't save message" }))

      })
      .catch(err => {

        if (err.response.status === 500) {

          saveMessage({ destination, message, number, sent: false, confirmed: false })
            .then(() => res.status(500).json({ message: "Message saved in database but not sent" }))
            .catch(() => res.status(500).json({ message: "Couldn't save message" }))

        } else if (err.response.status === 504) {

          saveMessage({ destination, message, number, sent: true, confirmed: false })
            .then(() => res.status(408).json({ message: "Message saved in database, sent but not confirmed" }))
            .catch(() => res.status(500).json({ message: "Couldn't save message" }))

        }

      })
  }

});


// --- GET MESSAGES FROM DB ---

router.get("/messages", (req, res, next) => {

  getMessages()
    .then(response => res.status(200).json(response))
    .catch(err => console.log(err))

});


module.exports = router;

// if (data === 'OK') saveMessage({ destination, message, number }).then(() => res.status(200).json({ message: "Message saved in database" }))
        // if (status === 500) res.status(500).json({ message: "Couldn't send message" })