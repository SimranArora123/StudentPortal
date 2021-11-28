require('dotenv').config();
const mongoose = require('mongoose');
function connectDB() {
    // Database connection 🥳
    mongoose.connect(process.env.MONGO_CONNECTION_URL, 
        { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));
}

// mIAY0a6u1ByJsWWZ

module.exports = connectDB;