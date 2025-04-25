const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config();

app.use(cors({
    origin: ['http://localhost:5173'], // Frontends permitidos
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Se estiver usando cookies/sessões
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//DB Connection
const conn = require("./db/conn");
conn();


//routes
const routes = require("./routes/routes");
app.use("/", routes);

app.listen(process.env.PORT, () => {
    console.log("Servidor funcionando");
})

