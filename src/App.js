import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppRoutes from "./routes/Routes";
import PrivateRoute from "./components/PrivateRoute";
import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {AppRoutes.map(({ path, Component, isPrivate }) =>
            isPrivate ? (
              <Fragment key={Component}>
                <Route path={path} element={<PrivateRoute />}>
                  <Route path={path} element={<Component />} />
                </Route>
              </Fragment>
            ) : (
              <Fragment key={Component}>
                <Route path={path} element={<Component />} />
              </Fragment>
            )
          )}
        </Routes>
      </Router>
      <Toaster position="top-right" />
      <Helmet>
        <title>W-Match</title>
      </Helmet>
    </>
  );
}

export default App;
