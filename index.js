// import your node modules

const db = require('./data/db.js');
const express = require('express');
const cors = require('cors');

const server = express();

var Port = 5000;

// add your server code starting here
server.use(cors());
server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res
                .status(200)
                .json(posts)
        })
        .catch(error => {
            res
                .status(500)
                .json({ error: "The posts information could not be retrieved." })
        })
})
server.get('/api/posts/:id', (req, res) => {
    const thisId = req.params.id;
    // console.log(thisId);
    db.findById(thisId)
        // .then(post => {
        //     res
        //         .status(200)
        //         .json(post)
        // })
        .then(post => {
            if(user) {
                res
                    .status(200)
                    .json(post)
            } 
            else {
                res
                    .status(404)
                    .json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res
                .status(500)
                .json({ error: "The post information could not be retrieved." })  
        })
})

server.post('/api/posts', (req, res) => {
    const {createdPost} = req.params
    db.insert(createdPost)
        .then(post => {
            res
                .status(201)
                .json(post)
        })
        .catch(error => {
            res
                .status(500)
                .json({ error: "There was an error while saving the post to the database" })
        })
})

//ALWAYS AT BOTTOM
server.listen(Port, () => {
    console.log(`Server at Port ${Port} is up and running!`)
})
