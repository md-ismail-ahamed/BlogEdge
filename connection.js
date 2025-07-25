const dotenv = require("dotenv").config();
const mongoose = require("mongoose");


function connectToMongoDB() {
return mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDb Connected"));
}

module.exports = {
    connectToMongoDB,
}
