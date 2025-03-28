const CronogramaModel = require("../models/CronogramaModel");

module.exports = {

    async criarCronograma(req, res) {
        const { nome, userCriador, pasta, quantidadeSemanas } = req.body;
        if (!nome || !userCriador || !pasta || !quantidadeSemanas) {
            return res.status(400).json({ msg: "Faltando informações para criar o cronograma" });
        }

        try {
            const cronograma = await CronogramaModel.create({
                nome,
                userCriador,
                pasta,
                quantidadeSemanas,
                semanas
            })
            return res.status(200).json({ msg: "Cronograma criado com sucesso", cronograma });
        } catch (error) {
            return res.status(400).json({ msg: "Erro ao criar cronograma", error });
        }

    },
    async adicionarSemana(req, res) {
        const { cronogramaId } = req.params;

        try {
            const cronograma = await CronogramaModel.findById(cronogramaId);
            if (!cronograma) return res.status(404).json({ msg: "Cronograma não encontrado" });

            const novaSemana = {
                dias: Array.from({ length: 7 }, () => ({ conteudos: [] }))
            };
            cronograma.semanas.push(novaSemana);
            cronograma.quantidadeSemanas = cronograma.semanas.length;

            await cronograma.save();
            return res.status(200).json({ msg: "Semana criado com sucesso", novaSemana });
        } catch (error) {
            return res.status(400).json({ msg: "Erro ao adicionar semana", error });
        }
    },

    async removerSemana(req, res) {
        const { cronogramaId, semanaId } = req.params;

        try {
            const cronograma = await CronogramaModel.findById(cronogramaId);
            if (!cronograma) return res.status(404).json({ msg: "Cronograma não encontrado" });

            cronograma.semanas = cronograma.semanas.filter(s => s._id.toString() !== semanaId);
            cronograma.quantidadeSemanas = cronograma.semanas.length;

            await cronograma.save();
            return res.status(200).json({ msg: "Semana removida!" });
        } catch (error) {
            return res.status(400).json({ msg: "Erro ao remover semana", error });
        }
    },
    async adicionarDia(req, res) {
        const { cronogramaId, semanaId } = req.params;

        try {
            const cronograma = await CronogramaModel.findById(cronogramaId);
            if (!cronograma) return res.status(404).json({ msg: "Cronograma não encontrado" });

            const semana = cronograma.semanas.id(semanaId);
            if (!semana) return res.status(404).json({ msg: "Semana não encontrada" });

            if (semana.dias.length >= 7) {
                return res.status(400).json({ msg: "Uma semana não pode ter mais de 7 dias" });
            }

            semana.dias.push({ conteudos: [] });
            await cronograma.save();

            return res.status(201).json(semana.dias[semana.dias.length - 1]);
        } catch (error) {
            return res.status(400).json({ msg: "Erro ao adicionar dia", error: error.message });
        }
    },
    async removerDia(req, res) {
        const { cronogramaId, semanaId, diaId } = req.params;

        try {
            const cronograma = await CronogramaModel.findById(cronogramaId);
            if (!cronograma) return res.status(404).json({ msg: "Cronograma não encontrado" });

            const semana = cronograma.semanas.id(semanaId);
            if (!semana) return res.status(404).json({ msg: "Semana não encontrada" });

            if (semana.dias.length <= 1) {
                return res.status(400).json({ msg: "Uma semana deve ter pelo menos 1 dia" });
            }

            const diaIndex = semana.dias.findIndex(d => d._id.toString() === diaId);
            if (diaIndex === -1) return res.status(404).json({ msg: "Dia não encontrado" });

            const diaRemovido = semana.dias.splice(diaIndex, 1)[0];
            await cronograma.save();

            return res.status(200).json({ msg: "Dia removido", dia: diaRemovido });
        } catch (error) {
            return res.status(400).json({ msg: "Erro ao remover dia", error: error.message });
        }
    },

    async adicionarConteudo(req, res) {
        const { cronogramaId, semanaId, diaId } = req.params;
        const conteudo = req.body;

        if (!conteudo.areaConhecimento || !conteudo.resumoConteudo) {
            return res.status(400).json({ msg: "Área e resumo são obrigatórios!" });
        }

        try {
            const cronograma = await CronogramaModel.findById(cronogramaId);
            if (!cronograma) return res.status(404).json({ msg: "Cronograma não encontrado" });

            const semana = cronograma.semanas.find(s => s._id.toString() === semanaId);
            if (!semana) return res.status(404).json({ msg: "Semana não encontrada" });

            const dia = semana.dias.find(d => d._id.toString() === diaId);
            if (!dia) return res.status(404).json({ msg: "Dia não encontrado" });

            dia.conteudos.push(conteudo);

            await cronograma.save();
            return res.status(201).json({ msg: "Conteúdo criado com suceso", conteudo });
        } catch (error) {
            return res.status(400).json({ msg: "Erro ao adicionar conteúdo", error });
        }
    },

    async removerConteudo(req, res) {
        const { cronogramaId, semanaId, diaId, conteudoId } = req.params;

        try {
            const cronograma = await CronogramaModel.findById(cronogramaId);
            if (!cronograma) return res.status(404).json({ msg: "Cronograma não encontrado" });

            const semana = cronograma.semanas.find(s => s._id.toString() === semanaId);
            if (!semana) return res.status(404).json({ msg: "Semana não encontrada" });

            const dia = semana.dias.find(d => d._id.toString() === diaId);
            if (!dia) return res.status(404).json({ msg: "Dia não encontrado" });

            dia.conteudos = dia.conteudos.filter(c => c._id.toString() !== conteudoId);

            await cronograma.save();
            return res.status(200).json({ msg: "Conteúdo removido!" });
        } catch (error) {
            return res.status(400).json({ msg: "Erro ao remover conteúdo", error });
        }
    },


}