const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser');
const cors = require('cors');


const pass = "volunteerNetwork";

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://volunteer-network:volunteerNetwork@cluster0.is4kq.mongodb.net/project-volunteer?retryWrites=true&w=majority`;

const app = express()

app.use(bodyParser.json());
app.use(cors());

const port = 5000

const ObjectId = require('mongodb').ObjectId;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const eventCollection = client.db("volunteerNetworkDB").collection("events");
    console.log('Database connected successfully!!');

    // insert user registered events
    app.post("/registeredEvent", (req, res) => {
        const selectedEvent = req.body;
        console.log(selectedEvent);
    })


    // create single event from fakeData
    // app.post("/addEvent", (req, res) => {
    //     const event = req.body;
    //     eventCollection.insertOne(event[0])
    //         .then(result => {
    //             console.log(result.insertedCount);
    //             res.send(result.insertedCount)
    //         })
    // })

    // create bulk event from fakeData
    app.post("/addEvents", (req, res) => {
        const event = req.body;
        eventCollection.insertMany(event)
            .then(result => {
                console.log(result.insertedCount);
                res.send(result.insertedCount)
            })
    })

    // read event
    app.get("/events", (req, res) => {
        eventCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

    // read single event
    app.get("/events/:_id", (req, res) => {
        eventCollection.find({ _id: ObjectId(req.params._id) })
            .toArray((err, documents) => {
                res.send(documents[0])
            })
    })


});


app.get('/', (req, res) => {
    res.send('Volunteer network server is ready!')
})

app.listen(port);