const router = require("express").Router(),
  { browse, find, logout } = require("../controllers/Attendances"),
  { protect } = require("../middleware");

router
  .get("/", protect, browse)
  .get("/:id/find", protect, find)
  .get("/:id/logout", protect, logout);

module.exports = router;
