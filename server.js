//webserver
const express = require("express");
const app = express();
app.use(express.static('www'));
const server = app.listen(8080,() =>
{
        console.log("Starting API Web/Server..");
});

