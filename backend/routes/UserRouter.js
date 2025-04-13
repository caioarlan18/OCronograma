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
//promover cargo para adm2
router.patch("/user/promover/:id", userController.promoverUsuario);
//rebaixar cargo para aluno
router.patch("/user/rebaixar/:id", userController.rebaixarUsuario);
//deletar usuario
router.delete("/user/delete/:id", userController.excluirUsuario);
//mostrar todos os usuarios
router.get("/user/read", userController.read);
//mostrar um usuario
router.get("/user/read/:id", userController.readOne);
//verificacao de validade para deixar usuario inativo
setInterval(userController.usuarioExpirou, 12 * 60 * 60 * 1000); // Executa a cada 12 horas

module.exports = router;
