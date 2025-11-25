const CronogramaModel = require("../models/CronogramaModel");
const pastaModel = require("../models/PastaModel");
const userModel = require("../models/UserModel");
const mongoose = require("mongoose");

const axios = require('axios');
module.exports = {
    async checkToken(req, res, next) {
        const token = req.headers['x-access-token'];
        const secret = process.env.SECRET;

        if (!token) {
            return res.status(401).json({ msg: 'Acesso negado' });
        }

        try {
            const decoded = jwt.verify(token, secret);
            const user = await userModel.findById(decoded.id);

            if (!user || user.tokenAtivo !== token) {
                return res.status(401).json({ msg: 'Sessão inválida ou expirada' });
            }
            next();
        } catch (err) {
            return res.status(401).json({ msg: 'Token inválido' });
        }
    },
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

            return res.status(201).json({ msg: "Dia criado!" });
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

        // if (!conteudo.areaConhecimento || !conteudo.resumoConteudo) {
        //     return res.status(400).json({ msg: "Área e resumo são obrigatórios!" });
        // }

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
        if (!pastaId) return res.status(400).json({ msg: "Pasta não existe" });
        try {
            const pasta = await pastaModel.findById(pastaId);
            const cronogramasIds = pasta.cronogramas.map(item => item.idCronograma);
            const renderizarCronogramas = await CronogramaModel.find({
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
            const cronogramaOriginal = await CronogramaModel.findById(id).lean();
            if (!cronogramaOriginal) {
                return res.status(404).json({ msg: "Cronograma não encontrado" });
            }
            const {
                _id: _ignoreId,
                __v: _ignoreV,
                createdAt: _ignoreCreated,
                updatedAt: _ignoreUpdated,
                ...base
            } = cronogramaOriginal;
            const semanasOrig = Array.isArray(base.semanas) ? base.semanas : [];
            const semanasClone = semanasOrig.map((semana) => {
                const { _id: _ignoreSemanaId, dias = [], ...restSemana } = semana;

                const diasClone = (Array.isArray(dias) ? dias : []).map((dia) => {
                    const { _id: _ignoreDiaId, conteudos = [], ...restDia } = dia;

                    const conteudosClone = (Array.isArray(conteudos) ? conteudos : []).map((conteudo) => {
                        const { _id: _ignoreConteudoId, ...restConteudo } = conteudo;
                        return { ...restConteudo };
                    });

                    return { ...restDia, conteudos: conteudosClone };
                });
                return { ...restSemana, dias: diasClone };
            });
            const dadosClone = {
                ...base,
                nome: `Cópia de ${cronogramaOriginal.nome}`,
                semanas: semanasClone,
                usuariosAssociados: []
            };
            const cronogramaClone = await CronogramaModel.create(dadosClone);
            const pasta = await pastaModel.findById(cronogramaOriginal.pasta);
            if (pasta) {
                pasta.cronogramas.push({ idCronograma: cronogramaClone._id });
                await pasta.save();
            }

            return res.status(201).json({
                msg: "Cronograma clonado com sucesso",
                cronogramaClone,
            });
        } catch (error) {
            console.error("Erro ao clonar cronograma:", error);
            return res.status(500).json({ msg: "Ocorreu um erro no servidor", error: error.message });
        }
    },
    async atualizarNome(req, res) {
        const { id } = req.params;
        if (!id) return res.status(400).json({ msg: "Faltando id do cronograma" });
        const { novoNome } = req.body;
        if (!novoNome) return res.status(400).json({ msg: "Faltando dados para atualizar" });
        try {
            const cronograma = await CronogramaModel.findById(id);
            cronograma.nome = novoNome;
            await cronograma.save();
            return res.status(200).json({ msg: "Nome do cronograma atualizado com sucesso" });
        } catch (error) {
            return res.status(500).json({ msg: "Ocorreu um erro", error });

        }

    },
    async atualizarConteudo(req, res) {
        const { cronogramaId, semanaId, diaId, conteudoId } = req.params;
        const dadosAtualizados = req.body;

        try {
            const cronograma = await CronogramaModel.findById(cronogramaId);
            if (!cronograma) return res.status(404).json({ msg: "Cronograma não encontrado" });

            const semana = cronograma.semanas.find(s => s._id.toString() === semanaId);
            if (!semana) return res.status(404).json({ msg: "Semana não encontrada" });

            const dia = semana.dias.find(d => d._id.toString() === diaId);
            if (!dia) return res.status(404).json({ msg: "Dia não encontrado" });

            const conteudo = dia.conteudos.find(c => c._id.toString() === conteudoId);
            if (!conteudo) return res.status(404).json({ msg: "Conteúdo não encontrado" });

            Object.keys(dadosAtualizados).forEach((key) => {
                conteudo[key] = dadosAtualizados[key];
            });

            await cronograma.save();

            return res.status(200).json({ msg: "Conteúdo atualizado com sucesso!", conteudo });
        } catch (error) {
            return res.status(500).json({ msg: "Erro ao atualizar conteúdo", error });
        }
    },
    async associarUsuarios(req, res) {
        const { idCronograma } = req.params;
        const { idUsuarios } = req.body;

        try {
            const cronograma = await CronogramaModel.findById(idCronograma);
            if (!cronograma) {
                return res.status(404).json({ msg: "Cronograma não encontrado." });
            }

            const usuariosAnteriores = cronograma.usuariosAssociados.map(id => id.toString());
            const novosUsuarios = idUsuarios.map(id => id.toString());


            // 1. Desassociar usuários que foram REMOVIDOS deste cronograma
            const removidos = usuariosAnteriores.filter(id => !novosUsuarios.includes(id));
            if (removidos.length > 0) {
                await userModel.updateMany(
                    { _id: { $in: removidos } },
                    { $set: { cronogramaAssociado: '' } }
                );
            }

            // 2. Verificar se os novos usuários já estão em outros cronogramas
            for (const userId of novosUsuarios) {
                const user = await userModel.findById(userId);

                if (user.cronogramaAssociado && user.cronogramaAssociado !== idCronograma) {
                    const cronogramaAntigo = await CronogramaModel.findById(user.cronogramaAssociado);
                    if (cronogramaAntigo) {
                        cronogramaAntigo.usuariosAssociados = cronogramaAntigo.usuariosAssociados.filter(
                            id => id.toString() !== userId
                        );
                        await cronogramaAntigo.save();
                    }
                }


                user.cronogramaAssociado = idCronograma;
                const jaTemNoHistorico = user.historicoCronogramas.some(h => h.idCronograma.toString() === idCronograma);
                if (!jaTemNoHistorico) {
                    user.historicoCronogramas.push({
                        idCronograma,
                        questions: []
                    });
                }
                // Atualizar o campo cronogramaAssociado do usuário
                await user.save();
            }

            // 3. Atualizar o cronograma atual com os novos usuários
            cronograma.usuariosAssociados = novosUsuarios;
            await cronograma.save();

            //enviar email para os novos usuarios
            const realmenteNovos = novosUsuarios.filter(id => !usuariosAnteriores.includes(id));
            if (realmenteNovos.length > 0) {
                const usuarios = await userModel.find({ _id: { $in: realmenteNovos } });

                const users = usuarios.map(user => ({
                    nome: user.nome,
                    email: user.email
                }));

                await axios.post("https://n8n.punchmarketing.com.br/webhook/usuario-associado", {
                    users,
                    cronograma: cronograma.nome
                });
            }

            //sucesso
            return res.status(200).json({ msg: "Usuários associados com sucesso!" });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Erro ao associar usuários.", error });
        }
    },
    async changeVisible(req, res) {
        const { cronogramaId, semanaId } = req.params;
        if (!cronogramaId || !semanaId) return res.status(400).json({ msg: "Erro" });
        const cronograma = await CronogramaModel.findById(cronogramaId);
        if (!cronograma) return res.status(400).json({ msg: "Cronograma não encontrado" });
        const semana = cronograma.semanas.id(semanaId);
        if (!semana) return res.status(400).json({ msg: "Semana não encontrada" });
        try {
            semana.visible = !semana.visible;
            await cronograma.save();
            return res.status(200).json({ msg: "Visibilidade alterada com sucesso!" });

        } catch (error) {
            return res.status(500).json({ msg: "Erro ao associar usuários.", error });

        }

    },
    async clonarSemana(req, res) {
        const { cronogramaId, semanaId } = req.params;
        if (!cronogramaId || !semanaId) {
            return res.status(400).json({ msg: "IDs do cronograma e semana são obrigatórios" });
        }

        try {
            const cronograma = await CronogramaModel.findById(cronogramaId);
            if (!cronograma) {
                return res.status(404).json({ msg: "Cronograma não encontrado" });
            }

            // Encontra a semana original que será clonada
            const semanaOriginal = cronograma.semanas.id(semanaId);
            if (!semanaOriginal) {
                return res.status(404).json({ msg: "Semana não encontrada" });
            }

            // Encontra o índice para saber onde inserir a cópia
            const indexOriginal = cronograma.semanas.findIndex(
                semana => semana._id.toString() === semanaId
            );


            // 1. Converte a semana original para um objeto JS puro para manipulação segura
            const semanaObjeto = semanaOriginal.toObject();

            // 2. Recria a estrutura interna, removendo os _id's de todos os níveis
            const novaSemana = {
                ...semanaObjeto, // Copia outras propriedades da semana (ex: 'visible')
                dias: (semanaObjeto.dias || []).map(dia => {
                    // 3. Remove o _id do DIA
                    const { _id, ...restoDoDia } = dia;

                    const conteudosClonados = (dia.conteudos || []).map(conteudo => {
                        // 4. Remove o _id do CONTEÚDO
                        const { _id, ...restoDoConteudo } = conteudo;
                        return restoDoConteudo; // Retorna o conteúdo sem _id
                    });

                    // Retorna o dia sem _id, com os conteúdos clonados
                    return { ...restoDoDia, conteudos: conteudosClonados };
                })
            };

            // 5. Remove o _id da própria semana que está sendo clonada
            delete novaSemana._id;


            // Insere a semana clonada (e sem IDs) logo após a original
            cronograma.semanas.splice(indexOriginal + 1, 0, novaSemana);

            // Atualiza a contagem de semanas
            cronograma.quantidadeSemanas = cronograma.semanas.length;

            await cronograma.save();

            // Pega o ID da semana recém-criada para retornar na resposta, se desejar
            const semanaClonada = cronograma.semanas[indexOriginal + 1];

            res.status(200).json({
                msg: `Semana clonada com sucesso na posição ${indexOriginal + 2}`,
                semanaClonada
            });

        } catch (error) {
            console.error("Erro ao clonar semana:", error);
            res.status(500).json({ msg: "Erro interno no servidor", error: error.message });
        }
    },

    async corrigirIdsDuplicados(req, res) {
        try {
            const cronogramas = await CronogramaModel.find({});
            let cronogramasCorrigidos = 0;
            let totalIdsCorrigidos = 0;

            // Rastreamento GLOBAL de IDs (para garantir unicidade entre todos os cronogramas)
            const idsSemanasGlobal = new Set();
            const idsDiasGlobal = new Set();
            const idsConteudosGlobal = new Set();

            for (const cronograma of cronogramas) {
                let modificado = false;
                const idsSemanasLocal = new Set();

                for (let semana of cronograma.semanas) {
                    // Verifica duplicidade GLOBAL ou LOCAL
                    const idSemanaStr = semana._id?.toString();
                    if (!semana._id || !mongoose.Types.ObjectId.isValid(semana._id)) {
                        semana._id = new mongoose.Types.ObjectId();
                        modificado = true;
                        totalIdsCorrigidos++;
                    }
                    else if (idsSemanasGlobal.has(idSemanaStr) || idsSemanasLocal.has(idSemanaStr)) {
                        semana._id = new mongoose.Types.ObjectId();
                        modificado = true;
                        totalIdsCorrigidos++;
                    }

                    idsSemanasLocal.add(semana._id.toString());
                    idsSemanasGlobal.add(semana._id.toString());

                    const idsDiasLocal = new Set();
                    for (let dia of semana.dias) {
                        // Verificação para dias
                        const idDiaStr = dia._id?.toString();
                        if (!dia._id || !mongoose.Types.ObjectId.isValid(dia._id)) {
                            dia._id = new mongoose.Types.ObjectId();
                            modificado = true;
                            totalIdsCorrigidos++;
                        }
                        else if (idsDiasGlobal.has(idDiaStr) || idsDiasLocal.has(idDiaStr)) {
                            dia._id = new mongoose.Types.ObjectId();
                            modificado = true;
                            totalIdsCorrigidos++;
                        }

                        idsDiasLocal.add(dia._id.toString());
                        idsDiasGlobal.add(dia._id.toString());

                        const idsConteudosLocal = new Set();
                        for (let conteudo of dia.conteudos) {
                            // Verificação para conteúdos
                            const idConteudoStr = conteudo._id?.toString();
                            if (!conteudo._id || !mongoose.Types.ObjectId.isValid(conteudo._id)) {
                                conteudo._id = new mongoose.Types.ObjectId();
                                modificado = true;
                                totalIdsCorrigidos++;
                            }
                            else if (idsConteudosGlobal.has(idConteudoStr) || idsConteudosLocal.has(idConteudoStr)) {
                                conteudo._id = new mongoose.Types.ObjectId();
                                modificado = true;
                                totalIdsCorrigidos++;
                            }

                            idsConteudosLocal.add(conteudo._id.toString());
                            idsConteudosGlobal.add(conteudo._id.toString());
                        }
                    }
                }

                if (modificado) {
                    await cronograma.save();
                    cronogramasCorrigidos++;
                    console.log(`Corrigido cronograma ${cronograma._id}: ${totalIdsCorrigidos} IDs substituídos`);
                }
            }

            return res.status(200).json({
                msg: "Correção de IDs concluída",
                totalCronogramas: cronogramas.length,
                cronogramasCorrigidos,
                totalIdsCorrigidos,
                detalhes: "Todos os IDs (válidos, inválidos e duplicados) foram verificados em todos os níveis."
            });

        } catch (error) {
            console.error("Erro durante a correção:", error);
            return res.status(500).json({
                msg: "Falha na correção",
                error: error.message,
                recomendacao: "Verifique manualmente alguns documentos antes de executar novamente"
            });
        }
    }







}