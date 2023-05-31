import Dashboard from "./dashboard";
import Cart from "./cart";
import Order from "./order";

const routes = {
  path: "customer",
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "cart",
      element: <Cart />,
    },
    {
      path: "orders/",
      element: <Order />,
    },
  ],
};

export default routes;
