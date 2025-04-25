const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//DB Connection
const conn = require("./db/conn");
conn();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

//routes
const routes = require("./routes/routes");
app.use("/", routes);

app.listen(process.env.PORT, () => {
    console.log("Servidor funcionando");
})

