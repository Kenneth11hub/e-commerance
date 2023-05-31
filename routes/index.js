// const middleware = require("../middleware");

const routers = app => {
  // List of available Routes
  app.use("/auth", require("./Auth"));
  app.use("/users", require("./Users"));
  app.use("/notifications", require("./Notifications"));
  app.use("/attendances", require("./Attendances"));
  app.use("/products", require("./Products"));
  app.use("/sales", require("./Sales"));
  app.use("/mailer", require("./Mailer"));
  app.use("/carts", require("./Carts"));
  app.use("/migrations", require("./Migrations"));
  // app.use(middleware.notFound);
  // app.use(middleware.errorHandler);
};

module.exports = routers;
