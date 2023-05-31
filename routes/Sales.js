const router = require("express").Router(),
  {
    browse,
    find,
    save,
    update,
    destroy,
    statistics,
    overview,
    sales,
  } = require("../controllers/Sales"),
  { protect } = require("../middleware");

router
  .get("/", protect, browse)
  .get("/overview", overview)
  .get("/statistics", statistics)
  .get("/:id/find", protect, find)
  .get("/orders/:id/find", sales)
  .post("/save", protect, save)
  .put("/:id/update", protect, update)
  .delete("/:id/destroy", protect, destroy);

module.exports = router;
