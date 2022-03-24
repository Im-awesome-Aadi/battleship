const mongoose = require('mongoose')
require('dotenv').config();
const encodedPassword = encodeURIComponent(process.env.DBPASSWD)
const dbURL = `mongodb+srv://${process.env.DBUSER}:${encodedPassword}@${process.env.DBNAME}.drixn.mongodb.net/${process.env.CLUSTERNAME}?retryWrites=true&w=majority`;
mongoose.connect(dbURL)
.then((result)=>{
    console.log('Connected to DB'); 
})
.catch((err)=>{
    console.log(err);
});

module.exports = mongoose;