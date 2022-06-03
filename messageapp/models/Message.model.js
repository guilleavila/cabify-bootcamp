const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema(
    {
        destination: {
            type: String,
            required: [true, 'Destination required']
        },
        message: {
            type: String,
            required: [true, 'Message required']
        },
        number: {
            type: Number,
            required: [true, 'Number required']
        },
        status: {
            sent: Boolean,
            confirmed: Boolean
        }
    },
    {
        timestamps: true
    }
)

const Message = mongoose.model("Message", messageSchema)
module.exports = Message