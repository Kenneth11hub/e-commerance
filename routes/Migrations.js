const router = require("express").Router(),
  { save } = require("../controllers/Migrations");

router.post("/", save);

module.exports = router;
