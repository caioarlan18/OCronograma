const mongoose = require("mongoose");
const { Schema } = mongoose;

const historicoCronogramasSchema = new Schema({
    idCronograma: {
        type: String
    },
    questions: [{
        nome: { type: String },
        idMateria: { type: String },
        acertos: { type: Number },
        erros: { type: Number }
    }]

}, { timestamps: true });

const userSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    validade: {
        type: Date,
        required: false
    },
    status: {
        type: String,
        required: true
    },
    cronogramaAssociado: {
        type: String,
        required: false
    },
    inadimplente: {
        type: Boolean,
        required: true,
        default: false
    },
    especialista: {
        type: String,
        required: false
    },
    historicoCronogramas: [historicoCronogramasSchema],
    tokenAtivo: {
        type: String,
        required: false
    }
}, { timestamps: true })

const UserModel = mongoose.model("UserModel", userSchema);

module.exports = UserModel;