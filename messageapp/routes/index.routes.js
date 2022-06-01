const router = require("express").Router();
const ApiHandler = require('./../services/APIHandler')

const messageHandler = new ApiHandler()

router.post("/messages", (req, res, next) => {

  const { destination, message } = req.body

  messageHandler
    .sendMessage({ destination, body: message })
    .then(({ data }) => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
});


module.exports = router;
