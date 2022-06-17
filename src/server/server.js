require("dotenv").config()
const { api } = require('./routes/index.routes');
const cookieParser = require("cookie-parser");
const express = require("express")
const app = express()
const cors = require("cors");
const path = require('path');
app.use(cors())
app.use(cookieParser());
app.use(express.json())
// app.use(express.urlencoded({extended: true}))
app.use(express.static('dist'));
app.use(api);
app.use('/*', function (req, res) {
    res.sendFile(path.resolve('./dist/index.html'));
})
module.exports = app
