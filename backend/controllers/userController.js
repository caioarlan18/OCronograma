const userModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const axios = require('axios');
const moment = require('moment');

module.exports = {


    async register(req, res) {
        const { nome, email, senha, validade } = req.body;
        const userExists = await userModel.findOne({ email: email })
        if (userExists) {
            return res.status(400).json({ msg: "Já existe uma conta cadastrada nesse email" });
        }
        if (!nome || !email || !senha || !validade) {
            return res.status(400).json({ msg: "Está faltando dados para criar o usuário" });
        }
        const salt = await bcrypt.genSalt(12);
        const senhaHash = await bcrypt.hash(senha, salt);
        try {
            const user = await userModel.create({
                nome,
                email,
                senha: senhaHash,
                role: "aluno",
                validade,
                status: "ativo"
            })
            return res.status(200).json({ msg: "Conta criada com sucesso" });
        } catch (error) {
            return res.status(400).json({ msg: "Erro ao criar conta ", error })
        }

    },
    async login(req, res) {
        const { email, senha } = req.body;
        if (!email || !senha) {
            return res.status(401).json({ msg: "Dados faltando" });
        }
        const user = await userModel.findOne({ email: email, });
        if (!user) {
            return res.status(400).json({ msg: "Email ou senha incorretos" });
        }
        const checkSenha = await bcrypt.compare(senha, user.senha);
        if (!checkSenha) {
            return res.status(400).json({ msg: "Senha incorreta" });
        }
        try {
            const secret = process.env.SECRET;
            const token = jwt.sign({
                id: user._id
            }, secret);
            return res.status(200).json({ msg: "Logado com sucesso", token, id: user._id });
        } catch (err) {
            return res.status(400).json({ msg: "Falha ao logar " + err });
        }
    },
    async checkToken(req, res, next) {
        const token = req.headers['x-access-token'];
        const secret = process.env.SECRET;
        if (!token) {
            return res.status(401).json({ msg: 'Acesso negado' })
        }
        try {
            jwt.verify(token, secret)
            next()
        } catch (err) {
            return res.status(401).json({ msg: 'Token inválido' })
        }
    },
    async logged(req, res) {
        const id = req.params.id
        const user = await userModel.findOne({ _id: id }, '-senha')
        if (!user) {
            return res.status(401).json({ msg: 'Acesso negado' })
        }
        return res.status(200).json(user)

    },
    async recuperarSenhaEmail(req, res) {
        const { email } = req.body;

        const usuario = await userModel.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ msg: 'E-mail não encontrado' });
        }
        try {
            await axios.post("https://hook.eu2.make.com/hn41bov9iciu9aqn3thwrsagpxncyf1m", { email: usuario.email, nome: usuario.nome, id: usuario._id });

            return res.status(200).json({ msg: "E-mail de recuperação enviado." });
        } catch (error) {
            return res.status(500).json({ erro: "Erro ao enviar solicitação.", error });
        }
    },
    async redefinirSenha(req, res) {
        const { id } = req.params;
        if (!id) return res.status(400).json({ msg: "Faltando id do usuário" });
        const { novaSenha } = req.body;
        const regexNumero = /\d/;
        if (!novaSenha || novaSenha.length < 8 || !regexNumero.test(novaSenha)) return res.status(400).json({ msg: "A senha tem que ter pelo menos 8 carácteres e pelo menos 1 dígito numérico" });
        const user = await userModel.findById(id);
        if (!user) return res.status(400).json({ msg: "Usuário não encontrado" });
        const checkSenha = await bcrypt.compare(novaSenha, user.senha);
        if (checkSenha) return res.status(400).json({ msg: "Escolha outra senha, essa é sua senha atual" });
        const salt = await bcrypt.genSalt(12);
        const novaSenhaHash = await bcrypt.hash(novaSenha, salt);
        try {
            user.senha = novaSenhaHash;
            await user.save();
            return res.status(200).json({ msg: "Senha atualizada com sucesso" });
        } catch (error) {
            return res.status(500).json({ msg: "Erro", error });
        }
    },
    async editarUsuario(req, res) {
        const { novoNome, novoEmail, novaValidade } = req.body;
        if (!novoNome || !novoEmail || !novaValidade) return res.status(400).json({ msg: "Os campos devem estar preenchidos" });
        const { id } = req.params;
        if (!id) return res.status(400).json({ msg: "Faltando id do usuário" });
        const user = await userModel.findById(id);
        if (!user) return res.status(400).json({ msg: "Usuário não encontrado" });

        try {
            user.nome = novoNome;
            user.email = novoEmail;
            user.validade = novaValidade;
            await user.save();
            return res.status(200).json({ msg: "Usuário editado com sucesso" });
        } catch (error) {
            return res.status(500).json({ msg: "Ocorreu um erro", error });
        }

    },
    async promoverUsuario(req, res) {
        const { id } = req.params;
        if (!id) return res.status(400).json({ msg: "Faltando id do usuário" });
        const user = await userModel.findById(id);
        if (!user) return res.status(400).json({ msg: "Usuário não encontrado" });
        if (user.role === "adm2") return res.status(400).json({ msg: "Usuário já estava promovido" });
        try {
            user.role = "adm2";
            await user.save();
            return res.status(200).json({ msg: "Usuário promovido com sucesso" });

        } catch (error) {
            return res.status(500).json({ msg: "Ocorreu um erro", error });

        }
    },
    async rebaixarUsuario(req, res) {
        const { id } = req.params;
        if (!id) return res.status(400).json({ msg: "Faltando id do usuário" });
        const user = await userModel.findById(id);
        if (!user) return res.status(400).json({ msg: "Usuário não encontrado" });
        if (user.role === "aluno") return res.status(400).json({ msg: "Usuário já estava rebaixado" });
        try {
            user.role = "aluno";
            await user.save();
            return res.status(200).json({ msg: "Usuário rebaixado com sucesso" });

        } catch (error) {
            return res.status(500).json({ msg: "Ocorreu um erro", error });

        }
    },
    async excluirUsuario(req, res) {
        const { id } = req.params;
        if (!id) return res.status(400).json({ msg: "Faltando id do usuário" });
        const user = await userModel.findById(id);
        if (!user) return res.status(400).json({ msg: "Usuário não encontrado" });
        try {
            await userModel.deleteOne(user);
            return res.status(200).json({ msg: "Usuário deletado com sucesso" });
        } catch (error) {
            return res.status(500).json({ msg: "Ocorreu um erro", error });

        }

    },
    async usuarioExpirou() {
        const usuarios = await userModel.find();
        usuarios.forEach(async (usuario) => {
            if (usuario.validade && moment(usuario.validade).isBefore(moment())) {
                usuario.status = 'inativo';
                await usuario.save();
            } else {
                usuario.status = "ativo";
                await usuario.save();
            }
        });
    },
    async read(req, res) {
        try {
            const users = await userModel.find();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ msg: "Ocorreu um erro", error });

        }
    },
    async readOne(req, res) {
        const { id } = req.params;
        if (!id) return res.status(400).json({ msg: "Faltando id do usuário" });
        const user = await userModel.findById(id);
        if (!user) return res.status(400).json({ msg: "Usuário não encontrado" });
        try {
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ msg: "Ocorreu um erro", error });

        }
    }

}