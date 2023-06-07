const express = require('express')
const cors = require('cors');
const { db } = require('./db/DB.JS');
const app = express()
const cookieParser = require('cookie-parser');
const router = require("./routes")
require('dotenv').config()
const PORT = process.env.PORT
app.use(cookieParser());

app.use(express.json())
app.use(cors())
router(app)

const server = async () => {
    await db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()