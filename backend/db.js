const mongoose = require('mongoose');

const mongoURI = "mongodb://root:password@127.0.0.1:27017?directConnection=true&serverSelectionTimeoutMS=2000"

const connectToMongo = () => {

    try {
        mongoose.connect(mongoURI);
        console.log('Connected to mongo db');
    } catch(err) {
        console.log(err)
    }
}

module.exports = connectToMongo; 