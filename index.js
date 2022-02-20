const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express()
const port = 3001

const mysql = require('mysql')

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',  
    database : 'diagnostic'
})
connection.connect()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
}));

app.get('/',(req,res)=>{
    connection.query(`
        select * from people 
        order by primary_key
    `,(error,results,fields)=>{
        if(error) throw error
        res.send(results)
    });
})
app.post('/',(req,res)=>{
    const body = req.body
    console.log(body)
    connection.query(`insert into people (name,sex,address,email,phone) values ("${body.name}","${body.sex}","${body.address}","${body.email}","${body.phone}");`,
        (error,results,fields)=>{
            if(error) throw error;
                console.log(`sucess getting info ${results}`)
        }
    )
    res.send({msg:'¡Registro Insertado correctamente!'})
})

app.listen(port,()=>{
    console.log('listen')
})