const router = require("express").Router();
const userController = require("../controllers/userController");

//criar usuario
router.post("/user/register", userController.register);
//logar
router.post("/user/login", userController.login);
//verificacao de token
router.get("/user/logged/:id", userController.checkToken, userController.logged);
//enviar email de esqueci a senha
router.post("/esqueci-senha", userController.recuperarSenhaEmail);
//redefinir senha
router.patch("/redefinir-senha/:id", userController.redefinirSenha);
//editar usuario
router.put("/user/editar/:id", userController.editarUsuario);
//deletar usuario
router.delete("/user/delete/:id", userController.excluirUsuario);
//mostrar todos os usuarios
router.get("/user/read", userController.read);
//mostrar um usuario
router.get("/user/read/:id", userController.readOne);
//verificacao de validade para deixar usuario inativo
router.post("/user/usuario-expirou", userController.usuarioExpirou);
//Adicionar questoes no historico
router.post("/user/addQuestionsHistorico/:userId/:idCronograma", userController.addQuestionsHistorico);
//verificar materia adicionada
router.get("/user/verificarMateriaAdicionada/:userId/:materiaId/:cronogramaId", userController.verificarMateriaAdicionada);
// pegar historico completo de cronogramas
router.get("/user/historico/:userId", userController.getHistorico);
// pegar historico atual
router.get("/user/historicoAtual/:userId/:cronogramaId", userController.getHistoricoAtual);
module.exports = router;
