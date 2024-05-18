const express = require('express');
const app = express();
const db = require('./utils/db')

const bodyParser = require('body-parser');
app.use(bodyParser.json());




app.get('/',function(req,res){
    res.send("WELCOME TO MY HOTEL")
} );




const personRoutes = require('./routes/personRoutes')
const menuItemRoutes = require('./routes/menuItemRoutes')

app.use('/person',personRoutes)
app.use('/menu',menuItemRoutes)


app.listen(3000,()=>{
    console.log("server is running at port 3000");
});