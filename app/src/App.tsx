import React from "react";
import { HashRouter, Route } from "react-router-dom";
import { GlobalStyles } from "twin.macro";

import AppGlobalStyles from "@globals/AppGlobalStyle";

import HomePage from "@pages/Home";
import NavBar from "@components/organisms/NavBar";

const App: React.FunctionComponent = () => {
  return (
    <div tw="h-screen">
      <GlobalStyles />
      <AppGlobalStyles />
      <NavBar>
        <HashRouter>
          <Route path="/" exact component={HomePage} />
        </HashRouter>
      </NavBar>
    </div>
  );
};

export default App;
