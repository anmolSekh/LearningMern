//Manipulate the records
const express = require("express");

//Control requests
const recordRoutes = express.Router();

// Connect to the database
const dbo = require("../db/conn");

//convert string id to an id object
const ObjectId = require("mongodb").ObjectId;

//get list of records from database
recordRoutes.route("/record").get(function (req,) {
    let db_connect = dbo.getDb("employees");
    db_connect
        .collection("records")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            result.json(result);
        });

});

//get single record
recordRoutes.route("/record/:id").get(function(req,req){
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id)};
    db_connect
        .collection("records")
        .findOne(myquery,function (err, reseult){
            if (err) throw err
            reseult.json(result);
        });
});

//create a record
recordRoutes.route("/record/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
    };
    db_connect.collection("records").insertOne(myobj,function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

//Update record by id
recordRoutes.route("/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id)};
    let newvalues = {
        $set: {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level,
        },
    };
    db_connect
        .collection("records")
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated")
            response.json(res);
        });
});

//delete record
recordRoutes.route("/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id)};
    db_connect.collection("records").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});

module.exports = recordRoutes;
