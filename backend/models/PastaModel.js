const mongoose = require("mongoose");
const { Schema } = mongoose;

const cronogramaSchema = new Schema({
    idCronograma: {
        type: String,
        required: true
    }
})
const pastaSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    cronogramas: [cronogramaSchema]
})

const PastaModel = mongoose.model("PastaModel", pastaSchema);

module.exports = PastaModel;