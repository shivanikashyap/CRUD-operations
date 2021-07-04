const express = require('express');
var bodyParser =  require('body-parser');
const cors = require('cors');

const { mongoose } = require('./db.js');
var employeeController = require('./controllers/employeeController');

const app = express();

app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}));

app.listen(3000, () => {
    console.log('Server is started at port: 3000');
});

app.use('/employees', employeeController);