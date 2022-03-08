const express = require('express'); 
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


app.get('/', (req, res)=>{
    const queryInsert = "INSERT INTO email_address (email_address) VALUES ('gabriel@hotmail.com')";  
    db.query(queryInsert, (err, result) => {
        console.log('here');
        console.log(err);

        res.send('thanks sending...');
    })

})

app.listen(port, () => {
    console.log(`Server Active on port ${port}`); 
})