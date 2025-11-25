const router = require("express").Router();
const pastaController = require("../controllers/PastaController");
const userController = require("../controllers/userController");

// criar pasta
router.post("/pasta/criar", userController.checkAdmin, pastaController.criarPasta);
// mostrar todas as pastas
router.get("/pasta/read", userController.checkAdmin, pastaController.read);
// mostrar uma pasta
router.get("/pasta/read/:id", userController.checkAdmin, pastaController.readOne);
// editar uma pasta
router.put("/pasta/editar/:id", userController.checkAdmin, pastaController.updatePasta);
// deletar uma pasta
router.delete("/pasta/delete/:id", userController.checkAdmin, pastaController.deletePasta);

module.exports = router;
