const express = require('express'); 

const bodyParser = require('body-parser'); 
const cors = require('cors'); 
const app = express(); 
const port = 3001; 
// My SQL 
const mysql= require('mysql'); 
const db = mysql.createPool({
    host:'localhost',
    user: 'root',
    password: 'password',
    database:'the_art_of_travel'
})

app.use(cors())
app.use(express.json()); 
app.use(bodyParser.urlencoded({extended: true}))


app.post("/api/users", (req, res)=>{
    const queryInsert = "INSERT INTO users_db (email_address, password) VALUES (?,?)";  
    const email_address = req.body.email_address;
    const password = req.body.password;

    db.query(queryInsert, [email_address, password], (err, result) => {
        console.log(err);

    })
})

app.listen(port, () => {
    console.log(`Server Active on port ${port}`); 
})