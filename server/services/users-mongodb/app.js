if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 4001
const cors = require('cors');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { mongoConnect } = require('./config/mongoConnect');
const os = require('os')

app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(router)

app.get('/',(_,res)=>{
    res.status(200).json({
      message : "app service is running on port "+ port,
      os : os.platform()
    })
  })

app.use(errorHandler)



mongoConnect()
    .then(_ => {
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    })