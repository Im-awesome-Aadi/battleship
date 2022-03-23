const mongoose = require('mongoose')
console.log("inside the DB config");
const dbURL = 'mongodb+srv://Aditya:MongoDB%402505@battleship.drixn.mongodb.net/mybattleship?retryWrites=true&w=majority';
mongoose.connect(dbURL)
.then((result)=>{
    console.log("Connected to DB"); 
})
.catch((err)=>{
    
    console.log("Not able to connect to DB");
});

module.exports = mongoose;