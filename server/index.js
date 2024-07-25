require('dotenv').config()
const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 5000
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const app = express()
const data = require('./data/tasks.json')
const fs = require('fs')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    return res.json(data.data)
})

const errCallback = (err) => {
    if (err)
        console.log(err);
    else {
        console.log("File written successfully");
    }
}

app.post('/create', (req, res) => {
    const task = req.body
    console.log(req.body)
    data.data.push(task)
    fs.writeFile('./data/tasks.json', JSON.stringify(data) , "utf-8", errCallback)
    res.sendStatus(200)
})
app.post('/update', (req, res) => {
    const task = req.body
    data.data =  data.data.map(i => i.id === task.id ? i = task : i)
    fs.writeFile('./data/tasks.json', JSON.stringify(data) , "utf-8", errCallback)
    res.sendStatus(200)
})
app.post('/delete', (req, res) => {
    const task = req.body
    data.data = data.data.filter((item) => {
        return item.id !== task.id
    })
    fs.writeFile('./data/tasks.json', JSON.stringify(data) , "utf-8", errCallback)
    res.sendStatus(200)
})
app.use(errorHandler)

const start = async () => {
    try{
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e){
        console.log(e)
    }
}

start()