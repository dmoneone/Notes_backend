const express = require('express')
const helmet = require('helmet')
const compression = require('compression')
const app = express()
const path = require('path')
const cors = require('cors')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(helmet())
app.use(compression())
app.use(cors())

const notesRoute = require('./routes/notes')

app.use('/api/notes', notesRoute)

app.get('/', (req, res) => {
    res.json({
        test: 'test'
    })
})

const start = async (port) => {
    try { 
        app.listen(port, () => {
            console.log(`Server has been launched. Port: ${port}`)
        })
    } catch(e) {
        throw e
    }
}

start(process.env.PORT || 3005)