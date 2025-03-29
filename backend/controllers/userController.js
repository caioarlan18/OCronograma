const userModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

module.exports = {
    async register(req, res) {
        const { nome, email, senha, role, validade } = req.body;
        const userExists = await userModel.findOne({ email: email })
        if (userExists) {
            return res.status(400).json({ msg: "Já existe uma conta cadastrada nesse email" });
        }
        if (!nome || !email || !senha || !role || !validade) {
            return res.status(400).json({ msg: "Está faltando dados para criar o usuário" });
        }
        const salt = await bcrypt.genSalt(12);
        const senhaHash = await bcrypt.hash(senha, salt);
        try {
            const user = await userModel.create({
                nome,
                email,
                senha: senhaHash,
                role,
                validade
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
            return res.statys(400).json({ msg: "Falha ao logar " + err });
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
        const user = await userModel.findOne({ _id: id }, '-password')
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

        const link = `http://localhost:3000/redefinir-senha/${usuario._id}`;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'seuemail@gmail.com',
                pass: 'suasenha'
            }
        });

        await transporter.sendMail({
            from: 'seuemail@gmail.com',
            to: email,
            subject: 'Redefinir sua senha',
            html: `<p>Clique no link para redefinir sua senha: <a href="${link}">${link}</a></p>`
        });

        res.json({ msg: 'E-mail de redefinição de senha enviado com sucesso.' });
    },
    async redefinirSenha(req, res) {
        const { id } = req.params;
        const { novaSenha } = req.body;

        const usuario = await userModel.findById(id);
        if (!usuario) {
            return res.status(404).json({ msg: 'Usuário não encontrado' });
        }

        const senhaCriptografada = await bcrypt.hash(novaSenha, 10);
        usuario.senha = senhaCriptografada;

        await usuario.save();

        res.json({ msg: 'Senha redefinida com sucesso!' });
    }
}