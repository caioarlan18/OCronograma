const router = require("express").Router();

//Cronograma router
const CronogramaRouter = require("./CronogramaRouter");
const UserRouter = require("./UserRouter");
const PastaRouter = require("./PastaRouter");
router.use("/", CronogramaRouter,);
router.use("/", UserRouter);
router.use("/", PastaRouter);

module.exports = router;