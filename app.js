const express = require('express');
const cors = require("cors")
const { dbConnection } = require('./config/dbconnection');
const app = express() ;
const port = 3006 || process.env.PORT ;
app.use(express.json());
app.use(cors());
 dbConnection();


  app.use("/users" , require("./api/user.routes"))
app.use("/notes" , require("./api/note.routes"))
app.use("*" , (req,res)=>{
  res.json({message:"incorrect path"})
})

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))