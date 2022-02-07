// BUILD YOUR SERVER HERE
const express = require('express') 
const server = express()
const Users = require('./users/model')

server.use(express.json())


// When the client makes a `POST` request to `/api/users`:
server.post('./api/user', async(req , res) =>{
    console.log(req.body)
    try{
        const { name, bio } = req.body;
        if(!name || !body){
            res.status(400).json({message: "Please provide name and bio for the user"})
        }else{
            const newUser = await Users.insert({ name, bio })
            res.status(201).json(newUser)
        }
    } catch (err){
        res.status(500).json({ message: "There was an error while saving the user to the database" })
    }
})

// When the client makes a `GET` request to `/api/users`:
server.get('/api/users', async (req, res) => {
    try {
        const users = await Users.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: "The users information could not be retrieved" })
    }
})

// When the client makes a `GET` request to `/api/users/:id`:

// - If the _user_ with the specified `id` is not found:

//   - respond with HTTP status code `404` (Not Found).
//   - return the following JSON object: `{ message: "The user with the specified ID does not exist" }`.

// - If there's an error in retrieving the _user_ from the database:
//   - respond with HTTP status code `500`.
//   - return the following JSON object: `{ message: "The user information could not be retrieved" }`.

server.get('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await Users.findById(id)
        if (!user) {
          res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else {
          res.json(user)
        }
      } catch (err) {
        res.status(500).json({ message: "The user information could not be retrieved" })
      }
})


// When the client makes a `DELETE` request to `/api/users/:id`:

// - If the _user_ with the specified `id` is not found:

//   - respond with HTTP status code `404` (Not Found).
//   - return the following JSON object: `{ message: "The user with the specified ID does not exist" }`.

// - If there's an error in removing the _user_ from the database:
//   - respond with HTTP status code `500`.
//   - return the following JSON object: `{ message: "The user could not be removed" }`.

// When the client makes a `PUT` request to `/api/users/:id`:

// - If the _user_ with the specified `id` is not found:

//   - respond with HTTP status code `404` (Not Found).
//   - return the following JSON object: `{ message: "The user with the specified ID does not exist" }`.

// - If the request body is missing the `name` or `bio` property:

//   - respond with HTTP status code `400` (Bad Request).
//   - return the following JSON response: `{ message: "Please provide name and bio for the user" }`.

// - If there's an error when updating the _user_:

//   - respond with HTTP status code `500`.
//   - return the following JSON object: `{ message: "The user information could not be modified" }`.

// - If the user is found and the new information is valid:

//   - update the user document in the database using the new information sent in the `request body`.
//   - respond with HTTP status code `200` (OK).
//   - return the newly updated _user document_.
module.exports = server; // EXPORT YOUR SERVER instead of {}
