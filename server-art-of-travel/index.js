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
// hash Passwords logic 
const bcrypt = require('bcrypt'); 


app.use(cors())
app.use(express.json()); 
app.use(bodyParser.urlencoded({extended: true}))

// Request all users
app.get("/api/get_users", (req, res) => {
    const querySelect = "SELECT * FROM users_db";
    db.query(querySelect, (err, results)=>{
        console.log(results);
        res.send(results);
    })
})

// Sending a new user to database 
app.post("/api/users", async (req, res)=>{
    try {
        const email_address = req.body.email_address;
        const protectedPassword = await bcrypt.hash(req.body.password, 10)
        console.log( protectedPassword )

        const queryInsert = "INSERT INTO users_db (email_address, password) VALUES (?,?)";  
        db.query(queryInsert, [email_address, protectedPassword], (err, result) => {
            console.log(err); 
        })     
    } catch {
        console.log('there was an error'); 
    }
})

app.listen(port, () => {
    console.log(`Server Active on port ${port}`); 
})