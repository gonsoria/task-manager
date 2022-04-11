const express = require('express')
const app = express()
const routes = require('./routes')


const PORT = process.env.PORT || 3001






app.use(express.json());
app.use('/', routes)

const server = app.listen(PORT, () => {
    console.log(`🚀 Server ready at: http://localhost:${PORT}`);
})