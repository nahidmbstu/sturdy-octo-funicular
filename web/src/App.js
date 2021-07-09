import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// import the pages here for navigation

import Home from "./pages/Home";
import Report from "./pages/Report";

export default function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route path="/report">
            <Report />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
