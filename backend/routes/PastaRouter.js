const router = require("express").Router();
const pastaController = require("../controllers/PastaController");
const userController = require("../controllers/userController");

// criar pasta
router.post("/pasta/criar", userController.checkToken, pastaController.criarPasta);
// mostrar todas as pastas
router.get("/pasta/read", userController.checkToken, pastaController.read);
// mostrar uma pasta
router.get("/pasta/read/:id", userController.checkToken, pastaController.readOne);
// editar uma pasta
router.put("/pasta/editar/:id", userController.checkToken, pastaController.updatePasta);
// deletar uma pasta
router.delete("/pasta/delete/:id", userController.checkToken, pastaController.deletePasta);

module.exports = router;
