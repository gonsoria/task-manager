const express = require('express')
const app = express()
const routes = require('./routes')
const bodyParser = require("body-parser");


const PORT = process.env.PORT || 3001

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CORS_URL); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});



app.use(express.json());
app.use('/', routes)

const server = app.listen(PORT, () => {
    console.log(`🚀 Server ready at: http://localhost:${PORT}`);
})