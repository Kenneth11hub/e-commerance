const router = require("express").Router(),
  { browse, find, update, destroy } = require("../controllers/Users"),
  { protect } = require("../middleware");

router
  .get("/", protect, browse)
  .get("/:id/find", protect, find)
  .put("/:id/update", protect, update)
  .delete("/:id/destroy", protect, destroy);

module.exports = router;
