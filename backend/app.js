const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//DB Connection
const conn = require("./db/conn");
conn();


//routes
const routes = require("./routes/routes");
app.use("/", routes);

app.listen(process.env.PORT, () => {
    console.log("Servidor funcionando");
})

