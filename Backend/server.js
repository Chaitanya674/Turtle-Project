require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const eventRoutes = require('./routes/events')
const feeds = require('./feed.json');
const store = require('./store.json');

// express app 
const app = express()
app.use(cors({
    origin: "https://turtlein.netlify.app",
    methods: ["GET", "POST"]
}   
));
//middleware
app.use(express.json())

app.use((req , res , next) => {
    console.log(req.path, req.method)
    next()
})

app.use("/api/event" , eventRoutes)


app.get('/api/feeds', (req, res) => {
    res.json(feeds);
});

app.get('/api/store', (req, res) => {
    res.json(store);
});

//connect to the mongodb
mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        app.listen(process.env.PORT, () => {
            console.log('listening on port 4000 !!!' , process.env.PORT)
        }) 
    })
    .catch((error) => {
        console.log(error.message)
    })
