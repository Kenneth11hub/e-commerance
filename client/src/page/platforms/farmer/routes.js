import Administrator from "./dashboard";
import Products from "./products";
import Sales from "./sales";

const routes = {
  path: "farmer",
  children: [
    {
      path: "dashboard",
      element: <Administrator />,
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
