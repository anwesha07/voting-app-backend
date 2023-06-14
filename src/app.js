const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const cors = require('cors');
const router = require('./route');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);

module.exports = app;
