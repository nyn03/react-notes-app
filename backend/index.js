const express = require('express')
const connectToMongo = require('./db')
const cors = require('cors')
connectToMongo();
const app = express()
const port = 5011
app.use(cors())
app.use(express.json())


app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`iNotebook app listening on port ${port}`)
})
