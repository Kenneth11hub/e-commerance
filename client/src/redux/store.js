import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import notifications from "./slices/notifications";
import users from "./slices/users";
import products from "./slices/products";
import attendances from "./slices/attendances";
import sales from "./slices/sales";
import carts from "./slices/carts";

export const store = configureStore({
  reducer: {
    auth,
    notifications,
    users,
    products,
    attendances,
    sales,
    carts,
  },
});
