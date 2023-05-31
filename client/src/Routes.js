import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

//Errors
import ErrorBad from "./page/errors/bad";
import ErrorNull from "./page/errors/null";

//Dashboard
import Dashboard from "./page/platforms";

// Sessions
import Login from "./page/sessions/login";
import Register from "./page/sessions/register";
import Verification from "./page/sessions/verification";

// Glocal Components
import UserProfile from "./components/profile";
import Attendances from "./components/attendance";
import Sales from "./page/platforms/administrator/employees/receipt";

import RootRoutes from "./RootRoutes";
import Receipt from "./components/receipt";

const Routers = () => {
  return (
    <Routes>
      {/* Initial */}
      {/* <Route path="/" element={<Initial />} /> */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Platforms */}
      <Route path="platform" element={<Dashboard />}>
        {RootRoutes.map(({ path, children }, index) => (
          <Route path={path} key={`root-${index}`}>
            <Route path="profile" element={<UserProfile />} />
            {children.map((child, cIndex) => {
              if (child.children) {
                return child.children.map((gChildren, gIndex) => (
                  <Route
                    path={`${child.path}/${gChildren.path}`}
                    key={`gChildren-${gIndex}`}
                    element={gChildren.element}
                  />
                ));
              } else {
                return (
                  <Route
                    path={child.path}
                    key={`child-${cIndex}`}
                    element={child.element}
                  />
                );
              }
            })}
            <Route path="" element={<ErrorBad />} />
          </Route>
        ))}

        {/* Error 400 */}
        <Route path="" element={<ErrorBad />} />
      </Route>

      <Route path="attendance/:id" element={<Attendances />} />
      <Route path="receipt/:id/:action" element={<Receipt />} />
      <Route path="sales/:id/:action" element={<Sales />} />

      {/* Sessions */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="verification/:code" element={<Verification />} />

      {/* Error 404 */}
      <Route path="*" element={<ErrorNull />} />
    </Routes>
  );
};

export default Routers;
