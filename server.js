//  Import dependencies
const express = require('express');
const app = express()
const dotenv = require('dotenv')
const mysql = require('mysql2')


dotenv.config()

//  Create a Connection with Mysql Workbench
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME

})

//  Establish Connection
db.connect((err)=>{
    if(err) return console.log('Error Connecting to the database', err)
    console.log('Successfully connected to Mysql database:', db.threadId)
})

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

// Answer 1
app.get('/patients', (req,res)=>{
    db.query('SELECT * FROM patients', (err, data) =>{
        if(err){
            return res.status(400).send("Failed to retrieve data", err)
        }
        // Code below should be used without ejs
        // res.status(400).send(data)
        res.status(400).render('data', {data})

    })
})


//  Answer 2
app.get('/providers', (req,res) =>{
    db.query('SELECT * FROM providers', (err,pro_data)=>{
        if(err){
            return res.status(400).send('Failed to retrieve provider data', err)
        }
        res.status(200).render('pro_data', {pro_data})
    })
})


//  Answer 3
app.get('/patients/firstname', (req,res) => {
    db.query('SELECT first_name FROM patients', (err,data)=>{
        if(err){
            return res.status(400).send('Failed to retrieve firstname from provider table', err)
        }
        res.status(200).send(data)

    })

    })


// Answer 4
app.get('/provider/provider_specialty', (req,res)=>{
    db.query('SELECT provider_specialty FROM providers', (err,pro_data)=>{
        if(err){
            return res.status(200).send('Failed to retrieve provider specialty data',err)
        }
        res.status(200).send(pro_data)
    })
})



// Starting the server
app.listen(3000, () => {
    console.log(`server is runnig on http://localhost:${process.env.PORT}`)
    console.log('Server has started running on port 3000')
})