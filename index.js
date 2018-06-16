const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());

const mongoConn = process.env.mongodb || "mongodb://localhost/thecatalog";
mongoose.connect(mongoConn);

// Middleware:  Auth Stuff

const { userRouter} = require('./routes/userRoute')
// Route Endpoints
app.use('/api/user', userRouter)


// Middleware: Error Handling


//Catchall
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`listening on ${port}`);