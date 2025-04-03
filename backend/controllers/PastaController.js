const pastaModel = require("../models/PastaModel");
const cronogramaModel = require("../models/CronogramaModel");
module.exports = {
    async criarPasta(req, res) {
        const { nome } = req.body;
        if (!nome) return res.status(400).json({ msg: "Faltando nome para criar a pasta" });

        try {
            const pasta = await pastaModel.create({ nome });
            return res.status(201).json({ msg: "Pasta criada com sucesso", pasta });
        } catch (error) {
            return res.status(500).json({ msg: "Erro interno do servidor", error });
        }
    },

    async read(req, res) {
        try {
            const pastas = await pastaModel.find();
            return res.status(200).json(pastas);
        } catch (error) {
            return res.status(500).json({ msg: "Erro interno do servidor", error });
        }
    },

    async readOne(req, res) {
        const { id } = req.params;
        if (!id) return res.status(400).json({ msg: "Faltando ID da pasta" });

        try {
            const pasta = await pastaModel.findById(id);
            if (!pasta) return res.status(404).json({ msg: "Pasta não encontrada" });

            return res.status(200).json(pasta);
        } catch (error) {
            return res.status(500).json({ msg: "Erro interno do servidor", error });
        }
    },

    async updatePasta(req, res) {
        const { id } = req.params;
        const { novoNome } = req.body;

        if (!id) return res.status(400).json({ msg: "Faltando ID da pasta" });
        if (!novoNome) return res.status(400).json({ msg: "Defina um novo nome" });

        try {
            const pasta = await pastaModel.findById(id);
            if (!pasta) return res.status(404).json({ msg: "Pasta não encontrada" });

            pasta.nome = novoNome;
            await pasta.save();

            return res.status(200).json({ msg: "Nome atualizado com sucesso", pasta });
        } catch (error) {
            return res.status(500).json({ msg: "Erro interno do servidor", error });
        }
    },
    async deletePasta(req, res) {
        const { id } = req.params;
        if (!id) return res.status(400).json({ msg: "Faltando ID da pasta" });
        try {
            const pasta = await pastaModel.findById(id);
            if (!pasta) return res.status(404).json({ msg: "Pasta não encontrada" });
            pasta.cronogramas.forEach(async (item) => {
                const cronograma = await cronogramaModel.findById(item._id);
                await cronogramaModel.deleteOne(cronograma);
            })
            await pastaModel.deleteOne(pasta);
            return res.status(200).json({ msg: "Pasta deletada com sucesso" });
        } catch (error) {
            return res.status(500).json({ msg: "Erro interno do servidor", error });

        }
    }
};
