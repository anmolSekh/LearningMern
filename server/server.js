const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config({path: "./config.env"});
const port = process.env.PORT || 5000

app.arguments(cors());

app.use(express.json());

app.use(require("./routes/record"));

//Get MongoDB driver connection
const dbo = require("./db/conn")

app.listen(port, () => {
    //Perform a database connection when server starts
    dbo.connectToServer(function (err) {
        if (err) console.error(err);

    });
    console.log('Server is running on port: ${port}');
});
