const mongoose = require('mongoose');

function connectToDatabase() {
    
    mongoose.connect( process.env.DATABASE_URL, {
   
    });

    const db =  mongoose.connection;

    db.on("error", (error) => { console.log(error);});
    db.once("open", () => { console.log('Connection Successful!!!');});
}

module.exports = connectToDatabase;

