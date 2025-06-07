const mongoose = require("mongoose");
const { Schema } = mongoose;


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
    }
}, { timestamps: true })

const UserModel = mongoose.model("UserModel", userSchema);

module.exports = UserModel;