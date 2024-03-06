const router = require("express").Router();
const { restoreUser } = require("../../utils/auth");

router.use(restoreUser);

router.use("/session", require("./session"));
router.use("/users", require("./users"));

module.exports = router;
