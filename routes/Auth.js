const router = require("express").Router(),
  {
    login,
    validateRefresh,
    save,
    changePassword,
    file,
    validateEmail,
  } = require("../controllers/Auth"),
  { protect } = require("../middleware");

router
  .get("/login", login)
  .get("/validateRefresh", validateRefresh)
  .get("/validateEmail/:token", validateEmail)
  .post("/save", save)
  .put("/changePassword", protect, changePassword)
  .post("/file", protect, file);

module.exports = router;
