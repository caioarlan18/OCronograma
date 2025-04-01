const router = require("express").Router();
const pastaController = require("../controllers/PastaController");

//criar pasta
router.post("/pasta/criar", pastaController.criarPasta);
//mostrar todas as pastas
router.get("/pasta/read", pastaController.read);
//mostrar uma pasta
router.get("/pasta/read/:id", pastaController.readOne);
//editar uma pasta
router.put("/pasta/editar/:id", pastaController.updatePasta);
//deletar uma pasta
router.delete("/pasta/delete/:id", pastaController.deletePasta);

module.exports = router;