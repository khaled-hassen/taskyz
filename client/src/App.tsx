import React from "react";
import loadable from "@loadable/component";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import {
  EAuthState,
  useAuthorization,
} from "./hook/authentication/useAuthorization";
import { toasterConfig } from "./config/toaster.config";
import { AppConfig } from "./store/app.config";
import { BodyContainer, BrandContainer } from "./components/styles/Containers";
import { Title } from "./components/styles/Text";
import { Spinner } from "./components/styles/Button";

const Home = loadable(() => import("./pages/Home"));
const Welcome = loadable(() => import("./pages/Welcome"));

function App() {
  const {
    config,
    state,
    resetConfig,
    handleAuthentication,
    handleLogout,
  } = useAuthorization();

  return (
    <BrowserRouter>
      <BodyContainer noBgImage={state === EAuthState.NOT_AUTHORIZED}>
        {state === EAuthState.NOT_AUTHORIZED && (
          <Switch>
            <Route exact path="/">
              <Welcome onAuth={handleAuthentication} />
            </Route>
            <Redirect to="/" />
          </Switch>
        )}
        {state === EAuthState.LOADING && (
          <div
            className="h-screen w-screen grid place-items-center"
            style={{ backgroundColor: "hsl(var(--bg-color))" }}
          >
            <BrandContainer forceCenter>
              <Title>Taskyz</Title>
              <p className="mb-10">The customizable TODO app</p>
              <Spinner />
            </BrandContainer>
          </div>
        )}
        <AppConfig.Provider value={{ ...config, resetConfig }}>
          {state === EAuthState.AUTHORIZED && <Home onLogout={handleLogout} />}
        </AppConfig.Provider>
      </BodyContainer>
      <Toaster position="top-center" toastOptions={toasterConfig} />
    </BrowserRouter>
  );
}

export default App;
