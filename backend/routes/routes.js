const router = require("express").Router();

//Cronograma router
const CronogramaRouter = require("./CronogramaRouter");
const UserRouter = require("./UserRouter");
router.use("/", CronogramaRouter,);
router.use("/", UserRouter);


module.exports = router;