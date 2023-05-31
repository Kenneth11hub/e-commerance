const router = require("express").Router(),
  { browse, save, update, destroy } = require("../controllers/Carts"),
  { protect } = require("../middleware");

router
  .get("/", protect, browse)
  .post("/save", protect, save)
  .put("/:id/update", protect, update)
  .delete("/:id/destroy", protect, destroy);

module.exports = router;
