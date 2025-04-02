const CronogramaModel = require("../models/CronogramaModel");
const pastaModel = require("../models/PastaModel");
module.exports = {

    async criarCronograma(req, res) {
        const { nome, userCriador, pastaId, quantidadeSemanas } = req.body;
        if (!nome || !userCriador || !pastaId || !quantidadeSemanas) {
            return res.status(400).json({ msg: "Faltando informações para criar o cronograma" });
        }

        try {
            const pasta = await pastaModel.findById(pastaId);
            if (!pasta) return res.status(400).json({ msg: "Pasta não encontrada" });
            const cronograma = await CronogramaModel.create({
                nome,
                userCriador,
                pasta: pastaId,
                quantidadeSemanas,
            });
            pasta.cronogramas.push({ idCronograma: cronograma._id });
            await pasta.save();
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
            return res.status(201).json({ msg: "Conteúdo criado com sucesso", conteudo });
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
    async read(req, res) {
        try {
            const cronogramas = await CronogramaModel.find();
            return res.status(200).json(cronogramas);
        } catch (error) {
            return res.status(500).json({ msg: "Ocorreu um erro", error });
        }
    },
    async readOne(req, res) {
        const { id } = req.params;
        if (!id) return res.status(400).json({ msg: "Faltando id do cronograma" });
        const cronograma = await CronogramaModel.findById(id);
        if (!cronograma) return res.status(400).json({ msg: "Cronograma não encontrado" });
        try {
            return res.status(200).json(cronograma);
        } catch (error) {
            return res.status(500).json({ msg: "Ocorreu um erro", error });
        }
    },
    async removerCronograma(req, res) {
        const { id } = req.params;
        if (!id) return res.status(400).json({ msg: "Faltando id do cronograma" });
        const cronograma = await CronogramaModel.findById(id);
        if (!cronograma) return res.status(400).json({ msg: "Usuário não encontrado" })
        try {
            const pastaAtual = await pastaModel.findById(cronograma.pasta);
            if (pastaAtual) {
                pastaAtual.cronogramas = pastaAtual.cronogramas.filter(
                    (item) => item.idCronograma.toString() !== id
                );
                await pastaAtual.save();
            }
            await CronogramaModel.deleteOne(cronograma);
            return res.status(200).json({ msg: "Cronograma deletado com sucesso" });
        } catch (error) {
            return res.status(500).json({ msg: "Ocorreu um erro", error });
        }
    },
    async mover(req, res) {
        const { idCronograma, idPastaNova } = req.params;
        try {
            const cronograma = await CronogramaModel.findById(idCronograma);
            if (!cronograma) return res.status(404).json({ msg: "Cronograma não encontrado" });
            const novaPasta = await pastaModel.findById(idPastaNova);
            if (!novaPasta) return res.status(404).json({ msg: "Nova pasta não encontrada" });
            const pastaAtual = await pastaModel.findById(cronograma.pasta);
            if (pastaAtual) {
                pastaAtual.cronogramas = pastaAtual.cronogramas.filter(
                    (item) => item.idCronograma.toString() !== cronograma._id.toString()
                );
                await pastaAtual.save();
            }

            novaPasta.cronogramas.push({ idCronograma: cronograma._id });
            await novaPasta.save();
            cronograma.pasta = idPastaNova;
            await cronograma.save();
            return res.status(200).json({ msg: "Cronograma movido com sucesso!" });
        } catch (error) {
            return res.status(500).json({ msg: "Ocorreu um erro", error });
        }
    },
    async renderizarCronograma(req, res) {
        const { pastaId } = req.params;
        if (!pastaId) return res.status(400).json({ msg: "É preciso estar logado" });
        try {
            const pasta = await pastaModel.findById(pastaId);
            const cronogramasIds = pasta.cronogramas;
            const renderizarCronogramas = await pastaModel.find({
                _id: { $in: cronogramasIds }
            });
            return res.status(200).json(renderizarCronogramas);
        } catch (error) {
            return res.status(500).json({ msg: "Ocorreu um erro", error });

        }

    },
    async clonar(req, res) {
        const { id } = req.params;
        if (!id) return res.status(400).json({ msg: "Faltando id do cronograma" });
        try {
            const cronograma = await CronogramaModel.findById(id);
            if (!cronograma) return res.status(404).json({ msg: "Cronograma não encontrado" });
            const cronogramaClone = await CronogramaModel.create({
                nome: cronograma.nome + " [CLONE]",
                userCriador: cronograma.userCriador,
                pasta: cronograma.pasta,
                quantidadeSemanas: cronograma.quantidadeSemanas,
                semanas: cronograma.semanas
            });
            const pasta = await pastaModel.findById(cronograma.pasta);
            pasta.cronogramas.push({ idCronograma: cronograma._id });
            await pasta.save();
            res.status(200).json({ msg: "Cronograma clonado com sucesso", cronogramaClone });
        } catch (error) {
            return res.status(500).json({ msg: "Ocorreu um erro", error });

        }
    }



}