require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const routes = require('./routes');
const path = require("path");
require('./config/dbConfig');

// CORS configurado explicitamente
app.use(cors({
    origin: 'http://localhost:5173', // Ou coloque um array se quiser permitir múltiplas origens
    credentials: true
}));

// Trata preflight (OPTIONS)
app.options('*', cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Só escuta a porta localmente (evita conflito na Vercel)
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });
}

// Exporta para a Vercel usar
module.exports = app;
