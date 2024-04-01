const router = require("express").Router();
const { restoreUser } = require("../../utils/auth");

router.use(restoreUser);

router.use("/session", require("./session"));
router.use("/users", require("./users"));
router.use("/projects", require("./projects"));
router.use("/items", require("./items"));
router.use("/aws", require("./aws"));
router.use("/notes", require("./notes"));

module.exports = router;
