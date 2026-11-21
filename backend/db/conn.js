const mongoose = require("mongoose");
const dbPass = process.env.DB_PASS;
const dbUser = process.env.DB_USER;
const dbConfig = `mongodb+srv://${dbUser}:${dbPass}@cluster0.eewcak6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

async function main() {
    try {
        // family: 4 força IPv4 (o Fly.io pode falhar ao conectar no Atlas por IPv6)
        await mongoose.connect(dbConfig, { family: 4, serverSelectionTimeoutMS: 15000 });
        console.log("Conectado ao banco");
    } catch (error) {
        console.log(`Erro, ${error}`);
    }
}

module.exports = main;
