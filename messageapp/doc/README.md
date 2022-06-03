# API Contract

This document contains the requests our API accepts, and the possible success and error responses it can return.

## Models

- Message
```http
  {
        _id: ObjectId,
        destination: String,
        message: String,
        number: Number,
        sent: Boolean,
        confirmed: Boolean,
        createdAt: Date,
        updatedAt: Date,
        __v: 0
    }
```

<br/>
<br/>

# POST /messages

Sends message and stores it in database
- **URL Params**: None
- **Data Params**:
```http
{
    destination: String,
    message: String,
    number: Number
}
```
- **Headers**: Content-Type: application/json

<br/>

#### Success
- Required keys well provided: 200: 'Message saved in database'

#### Error
- Provided empty object: 422: 'You should not pass empty object'
- Destination not provided: 422: 'Destination is required'
- Message not provided: 422: 'Message is required'
- Only accept strings: 422: 'Only strings allowed'
- `messageapp` API internal error: 504: 'Internal Server Error'
- `messageapp` timed out: : 'Message saved in database, sent but not confirmed'
- Not sent message but saved in database: 500: 'Message saved in database but not sent'
- Fails saving message in database: 500: 'Couldn't save message'

<br/>
<br/>

# GET /messages
Returns all messages in the system
- **URL Params**: None
- **Data Params**: None
- **Headers**: Content-Type: application/json

<br/>

#### Success
- Response: 200: OK
```http
[
      {<user_object>},
      {<user_object>},
      {<user_object>}
]
```

#### Error
- Internal Server Error: 500: 'Could not get messages from the database'

<br/>
<br/>


# Postman collection with test

[Collection](../bin/Test.postman_collection.json)

