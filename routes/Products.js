const router = require("express").Router(),
  {
    browse,
    find,
    save,
    update,
    destroy,
    search,
  } = require("../controllers/Products"),
  { protect } = require("../middleware");

router
  .get("/", protect, browse)
  .get("/:barcode/find", protect, find)
  .get("/:key/search", protect, search)
  .post("/save", protect, save)
  .put("/:id/update", protect, update)
  .delete("/:id/destroy", protect, destroy);

module.exports = router;
