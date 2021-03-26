const express = require('express');

const connectDB = require('./config/db');

app = express();

//connect database
connectDB();

//init middlewar

app.use(express.json({extended:false}))

const PORT = 3000


app.get('/',(req,res) => {
    res.send('hello')
})

// Define Routes 
app.use('/api/users',require('./routes/api/users'))
app.use('/api/auth',require('./routes/api/auth'))
app.use('/api/profile',require('./routes/api/profile'))
app.use('/api/posts',require('./routes/api/posts'))


app.listen(PORT,() => console.log(`APP RUNNIG ON PORT ${PORT}`))