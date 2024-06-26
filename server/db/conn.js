const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI
const client = new MongoClient (Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var _db;

module.exports = {
    // connectToServer: function (callback) {
        
    //     client.connect(function (err, db) {
    //         console.log("GG");
    //         if (db) //Verify if db was connected successfully
    //         {
    //             _db = db.db("employees");
    //             console.log("Successfully connected to MongoDB");
    //         }
            
    //         return callback(err);
    //     });
        
    // },
    connectToServer: async (callback) => {
        await client.connect()
        console.log("Successfully connected to server");
        _db = client.db("employees");
        console.log("Successfully connected to MongoDB");
    },

    getDb: function () {
        return _db;
    },
};