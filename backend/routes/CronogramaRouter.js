const router = require("express").Router();
const CronogramaController = require("../controllers/cronogramaController");
const userController = require("../controllers/userController");

// criar cronograma
router.post("/cronograma", userController.checkAdmin, CronogramaController.criarCronograma);
// criar semana
router.post("/cronograma/:cronogramaId/semana", userController.checkAdmin, CronogramaController.adicionarSemana);
// remover semana
router.delete("/cronograma/:cronogramaId/semana/:semanaId", userController.checkAdmin, CronogramaController.removerSemana);
// criar dia
router.post("/cronograma/:cronogramaId/semana/:semanaId/dia", userController.checkAdmin, CronogramaController.adicionarDia);
// remover dia
router.delete("/cronograma/:cronogramaId/semana/:semanaId/dia/:diaId", userController.checkAdmin, CronogramaController.removerDia);
// adicionar conteudo
router.post("/cronograma/:cronogramaId/semana/:semanaId/dia/:diaId", userController.checkAdmin, CronogramaController.adicionarConteudo);
// remover conteudo
router.delete("/cronograma/:cronogramaId/semana/:semanaId/dia/:diaId/conteudo/:conteudoId", userController.checkAdmin, CronogramaController.removerConteudo);
// mostrar cronogramas 
router.get("/cronograma/read", userController.checkAdmin, CronogramaController.read);
// mostrar 1 cronograma 
router.get("/cronograma/read/:id", userController.checkToken, CronogramaController.readOne);
// excluir cronograma
router.delete("/cronograma/delete/:id", userController.checkAdmin, CronogramaController.removerCronograma);
// mover cronograma
router.put("/cronograma/mover/:idCronograma/:idPastaNova", userController.checkAdmin, CronogramaController.mover);
// renderizar cronograma 
router.get("/cronograma/renderizar/:pastaId", userController.checkAdmin, CronogramaController.renderizarCronograma);
// clonar cronograma
router.post("/cronograma/clonar/:id", userController.checkAdmin, CronogramaController.clonar);
// atualizar nome do cronograma
router.put("/cronograma/atualizar-nome/:id", userController.checkAdmin, CronogramaController.atualizarNome);
// atualizar conteudo
router.put("/cronograma/:cronogramaId/semana/:semanaId/dia/:diaId/conteudo/:conteudoId", userController.checkAdmin, CronogramaController.atualizarConteudo);
// associar usuarios
router.patch("/cronograma/:idCronograma/associar-usuarios", userController.checkAdmin, CronogramaController.associarUsuarios);
// mudar visibilidade da semana
router.put("/cronograma/:cronogramaId/semana/:semanaId/changevisible", userController.checkAdmin, CronogramaController.changeVisible);
// clonar semana
router.post("/cronograma/:cronogramaId/semana/:semanaId/clonar", userController.checkAdmin, CronogramaController.clonarSemana);
// corrigir ids duplicados (rota de admin)
router.patch("/admin/corrigir-ids-cronogramas", userController.checkAdmin, CronogramaController.corrigirIdsDuplicados);

module.exports = router;
