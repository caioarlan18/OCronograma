const router = require("express").Router();
const userController = require("../controllers/userController");

router.post("/user/register", userController.register);
router.post("/user/login", userController.login);
router.get("/user/logged/:id", userController.checkToken, userController.logged);
router.post("/esqueci-senha", userController.recuperarSenhaEmail);
router.post("/redefinir-senha/:id", userController.redefinirSenha);

module.exports = router;
