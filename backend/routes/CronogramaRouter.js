const router = require("express").Router();
const CronogramaController = require("../controllers/cronogramaController");

//criar cronograma
router.post("/cronograma", CronogramaController.criarCronograma);
//criar semana
router.post("/cronograma/:cronogramaId/semana", CronogramaController.adicionarSemana);
//remover semana
router.delete("/cronograma/:cronogramaId/semana/:semanaId", CronogramaController.removerSemana);
//criar dia
router.post("/cronograma/:cronogramaId/semana/:semanaId/dia", CronogramaController.adicionarDia);
//remover dia
router.delete("/cronograma/:cronogramaId/semana/:semanaId/dia/:diaId", CronogramaController.removerDia);
//adicionar conteudo
router.post("/cronograma/:cronogramaId/semana/:semanaId/dia/:diaId", CronogramaController.adicionarConteudo);
//remover conteudo
router.delete("/cronograma/:cronogramaId/semana/:semanaId/dia/:diaId/conteudo/:conteudoId", CronogramaController.removerConteudo);
//mostrar cronogramas
router.get("/cronograma/read", CronogramaController.read);
//mostrar 1 cronograma
router.get("/cronograma/read/:id", CronogramaController.readOne);
//excluir cronograma
router.delete("/cronograma/delete/:id", CronogramaController.removerCronograma);
//mover cronograma
router.put("/cronograma/mover/:idCronograma/:idPastaNova", CronogramaController.mover);
//renderizar cronograma
router.get("/cronograma/renderizar/:pastaId", CronogramaController.renderizarCronograma);
//clonar cronograma
router.post("/cronograma/clonar/:id", CronogramaController.clonar);

module.exports = router;
