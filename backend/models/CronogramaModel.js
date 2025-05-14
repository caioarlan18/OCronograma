const mongoose = require("mongoose");

const { Schema } = mongoose;

const conteudoSchema = new Schema({
    areaConhecimento: { type: String },
    resumoConteudo: { type: String },
    link: { type: String }
});

const diaSchema = new Schema({
    conteudos: [conteudoSchema]
});

const semanaSchema = new Schema({
    dias: [diaSchema],
    visible: {
        type: Boolean,
        required: true,
        default: false
    }
});

const cronogramaSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    userCriador: {
        type: String,
        required: true
    },
    pasta: {
        type: String,
        required: true,
    },
    quantidadeSemanas: {
        type: Number,
        required: true
    },
    usuariosAssociados: {
        type: [String]
    },
    semanas: [semanaSchema]

}, { timestamps: true })

cronogramaSchema.pre('save', function (next) {
    if (this.semanas.length === 0) {
        for (let i = 0; i < this.quantidadeSemanas; i++) {
            this.semanas.push({
                dias: Array.from({ length: 7 }, () => ({
                    conteudos: []
                })),

            });
        }
    }
    next();
});

const CronogramaModel = mongoose.model("CronogramaModel", cronogramaSchema);

module.exports = CronogramaModel;

