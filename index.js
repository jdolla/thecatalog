const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { mongoConn } = require('./config/config.js')

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());


mongoose.connect(mongoConn);

const cookieParser = require('cookie-parser');
app.use(cookieParser());


// pre-run middleware
const { getAuth } = require('./controllers/userController')
app.use(getAuth)

// Route Endpoints
const { userRouter} = require('./routes/userRoute')
app.use('/api/user', userRouter)


// Middleware: Error Handling
const { logError } = require('./controllers/errorController')
app.use(logError)

//Catchall
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`listening on ${port}`);