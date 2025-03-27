const mongoose = require("mongoose");
const dbPass = process.env.DB_PASS;
const dbUser = process.env.DB_USER;
const dbConfig = `mongodb+srv://${dbUser}:${dbPass}@cluster0.eewcak6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

async function main() {
    try {
        await mongoose.connect(dbConfig);
        console.log("Conectado ao banco");
    } catch (error) {
        console.log(`Erro, ${error}`);
    }
}

module.exports = main;
