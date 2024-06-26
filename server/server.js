const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config({path: "./config.env"});
// PORT = 5000
const port = process.env.PORT || 5000

app.use(cors());

app.use(express.json());

app.use(require("./routes/record"));

//Get MongoDB driver connection
const dbo = require("./db/conn")

app.listen(port, () => {
    //Perform a database connection when server starts
    dbo.connectToServer(function (err) {
        
        if (err) console.error(err);

    });
    let portmsg = 'Server is running on port:'
    let portstr = portmsg.concat(' ',port)
    // console.log("GG");
    console.log( portstr);
});
