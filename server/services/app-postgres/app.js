require('dotenv').config();
const cors = require('cors')

const router = require('./routes')
const express = require('express')
const errorHandler = require('./middlewares/errorHandler')
const app = express()
const port = process.env.PORT || 4002
const os = require('os') 


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended :false}))

app.get('/',(_,res)=>{
  res.status(200).json({
    message : "app service is test running on port " + port,
    os : os.platform()
  })
})

app.use(router)
app.use(errorHandler)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})