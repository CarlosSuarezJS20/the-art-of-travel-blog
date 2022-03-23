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
// Authentication token 
const jwt = require('jsonwebtoken');


app.use(cors())
app.use(express.json()); //to use json data in the app
app.use(bodyParser.urlencoded({extended: true}))



// registering 
app.post("/api/register", async (req, res)=>{
    try {
        const email_address = req.body.email_address;
        // creating hashed email. 
        const protectedPassword = await bcrypt.hash(req.body.password, 10)
        console.log( protectedPassword )
     
        const queryInsert = "INSERT INTO users_db (email_address, password) VALUES (?,?)";  
        db.query(queryInsert, [email_address, protectedPassword], (err, result) => {
            if(err) {
                res.status(401).send({error: 'Something went wrong! :('})
            } 
            res.status(201).send({message: 'user created successfully'})
        })  
    } catch {
        res.status(401).send({error: 'Something went wrong! :('})
    }
})

// Login end point  
app.post("/api/login", (req, res)=>{
    const email_address = req.body.email_address;
    const password = req.body.password;
    
    const findUserQuery = `SELECT * FROM users_db WHERE email_address = ?`
    db.query(findUserQuery, [email_address], async (err, result) => {
        if(err) {
            res.status(401).send({error: 'Something went wrong! :('});
        } 
        // authentication: 
        console.log(password, result[0].password)
        try{
            if(await bcrypt.compare(password, result[0].password)) {
                res.status(201).send({message: 'user matched passsword'});
            } else {
                res.status(202).send({error: 'not match found! :('});
            }
        } catch {
            res.status(500).send();
        }
    })
})

// Request all users
app.get("/api/users", (req, res) => {
    const querySelect = "SELECT * FROM users_db";
    db.query(querySelect, (err, results)=>{
        console.log(results);
        res.send(results);
    })
})

app.listen(port, () => {
    console.log(`Server Active on port ${port}`); 
})