const router = require("express").Router();
const { getAllMessages, sendAndSaveMessages } = require("../controllers/messageController");

// --- CREATE MESSAGES ---
router.post("/messages", sendAndSaveMessages);

// --- GET MESSAGES FROM DB ---
router.get("/messages", getAllMessages);

module.exports = router;