const mongoose = require('mongoose');


const connectDB = async () =>{
    try {
        const connection = await mongoose.connect('mongodb+srv://haseeb1:bookbase@cluster0.ecqdu.mongodb.net/bookbaseDB?retryWrites=true&w=majority' , {
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