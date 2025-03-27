const router = require("express").Router();
const CronogramaController = require("../controllers/cronogramaController");

router.post("/cronograma/create", CronogramaController.criarCronograma);


module.exports = router;
