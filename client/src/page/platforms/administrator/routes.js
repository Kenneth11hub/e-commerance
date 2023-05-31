import Administrator from "./dashboard";
import Employees from "./employees";
import Products from "./products";
import Sales from "./sales";

const routes = {
  path: "admin",
  children: [
    {
      path: "dashboard",
      element: <Administrator />,
    },
    {
      path: "employees/:type",
      element: <Employees />,
    },
    {
      path: "sales",
      element: <Sales />,
    },
    {
      path: "products",
      element: <Products />,
    },
  ],
};

export default routes;
