const router = require("express").Router();
const CronogramaController = require("../controllers/cronogramaController");
const userController = require("../controllers/userController");

// criar cronograma
router.post("/cronograma", userController.checkToken, CronogramaController.criarCronograma);
// criar semana
router.post("/cronograma/:cronogramaId/semana", userController.checkToken, CronogramaController.adicionarSemana);
// remover semana
router.delete("/cronograma/:cronogramaId/semana/:semanaId", userController.checkToken, CronogramaController.removerSemana);
// criar dia
router.post("/cronograma/:cronogramaId/semana/:semanaId/dia", userController.checkToken, CronogramaController.adicionarDia);
// remover dia
router.delete("/cronograma/:cronogramaId/semana/:semanaId/dia/:diaId", userController.checkToken, CronogramaController.removerDia);
// adicionar conteudo
router.post("/cronograma/:cronogramaId/semana/:semanaId/dia/:diaId", userController.checkToken, CronogramaController.adicionarConteudo);
// remover conteudo
router.delete("/cronograma/:cronogramaId/semana/:semanaId/dia/:diaId/conteudo/:conteudoId", userController.checkToken, CronogramaController.removerConteudo);
// mostrar cronogramas
router.get("/cronograma/read", userController.checkToken, CronogramaController.read);
// mostrar 1 cronograma
router.get("/cronograma/read/:id", userController.checkToken, CronogramaController.readOne);
// excluir cronograma
router.delete("/cronograma/delete/:id", userController.checkToken, CronogramaController.removerCronograma);
// mover cronograma
router.put("/cronograma/mover/:idCronograma/:idPastaNova", userController.checkToken, CronogramaController.mover);
// renderizar cronograma
router.get("/cronograma/renderizar/:pastaId", userController.checkToken, CronogramaController.renderizarCronograma);
// clonar cronograma
router.post("/cronograma/clonar/:id", userController.checkToken, CronogramaController.clonar);
// atualizar nome do cronograma
router.put("/cronograma/atualizar-nome/:id", userController.checkToken, CronogramaController.atualizarNome);
// atualizar conteudo
router.put("/cronograma/:cronogramaId/semana/:semanaId/dia/:diaId/conteudo/:conteudoId", userController.checkToken, CronogramaController.atualizarConteudo);
// associar usuarios
router.patch("/cronograma/:idCronograma/associar-usuarios", userController.checkToken, CronogramaController.associarUsuarios);
// mudar visibilidade da semana
router.put("/cronograma/:cronogramaId/semana/:semanaId/changevisible", userController.checkToken, CronogramaController.changeVisible);
// clonar semana
router.post("/cronograma/:cronogramaId/semana/:semanaId/clonar", userController.checkToken, CronogramaController.clonarSemana);
// corrigir ids duplicados (rota de admin)
router.patch("/admin/corrigir-ids-cronogramas", userController.checkToken, CronogramaController.corrigirIdsDuplicados);

module.exports = router;
