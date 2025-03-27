const router = require("express").Router();

//Cronograma router
const CronogramaRouter = require("./CronogramaRouter");

router.use("/", CronogramaRouter);

module.exports = router;