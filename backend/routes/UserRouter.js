const router = require("express").Router();
const userController = require("../controllers/userController");

// ROTAS PÚBLICAS

// criar usuário
router.post("/user/register", userController.register);
// login
router.post("/user/login", userController.login);
// enviar email de esqueci a senha
router.post("/esqueci-senha", userController.recuperarSenhaEmail);
// redefinir senha
router.patch("/redefinir-senha/:id", userController.redefinirSenha);


// ROTAS PROTEGIDAS 

// verificação de token + mostrar usuário logado
router.get("/user/logged/:id", userController.checkToken, userController.logged);
// editar usuário
router.put("/user/editar/:id", userController.checkToken, userController.editarUsuario);
// deletar usuário
router.delete("/user/delete/:id", userController.checkToken, userController.excluirUsuario);
// mostrar todos os usuários 
router.get("/user/read", userController.checkToken, userController.read);
// mostrar um usuário
router.get("/user/read/:id", userController.checkToken, userController.readOne);
// verificar validade
router.post("/user/usuario-expirou", userController.checkToken, userController.usuarioExpirou);
// adicionar questões ao histórico
router.post("/user/addQuestionsHistorico/:userId/:idCronograma", userController.checkToken, userController.addQuestionsHistorico);
// verificar matéria adicionada
router.get("/user/verificarMateriaAdicionada/:userId/:materiaId/:cronogramaId", userController.checkToken, userController.verificarMateriaAdicionada);
// pegar histórico completo
router.get("/user/historico/:userId", userController.checkToken, userController.getHistorico);
// pegar histórico atual
router.get("/user/historicoAtual/:userId/:cronogramaId", userController.checkToken, userController.getHistoricoAtual);
// pegar question
router.get("/user/question/:userId/:cronogramaId/:idQuestion", userController.checkToken, userController.getQuestion);
// editar questão
router.put("/user/editquestion/:userId/:cronogramaId/:idQuestion", userController.checkToken, userController.editQuestion);

module.exports = router;
