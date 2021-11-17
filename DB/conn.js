const mongoose = require('mongoose');


const connectDB = async () =>{
    try {
        const connection = await mongoose.connect('mongodb://localhost:27017/bookbaseDB' , {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })

        console.log('MongoDB connection successful');
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}


module.exports = connectDB;