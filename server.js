const express = require('express');
const connectDB = require('./DB/conn');
const app = express();


app.use(express.json())

connectDB()

const userRouter = require('./Routes/User')

const bookRouter = require('./Routes/Book')

app.use('/user' , userRouter)

app.use('/book' , bookRouter)

app.get('/' , (req,res)=>{
    res.json({
        status:200,
        message:"Hello World"
    })
})


app.listen(process.env.PORT || 5000 , () =>{
    console.log('App started on port 5000');
} )
