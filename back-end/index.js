//require('dotenv').config();

const express = require('express');
const cors = require('cors');
//const bodyParser = require('body-parser')
const userRoute = require('./routes/user.routes');
const goodsRoute = require('./routes/goods.routes')

const PORT = process.env.PORT || 3020;
const app = express();


app.use(cors()); // Используем cors с настройками
app.use(express.json());

//app.use(bodyParser.urlencoded({extended: true}))


app.use('/api', userRoute);
// app.use('/api/', serviceRoute); 

app.use('/api', goodsRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})

