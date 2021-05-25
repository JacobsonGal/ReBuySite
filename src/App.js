import React, { useState } from "react";
import { IntlProvider } from "react-intl";
import Layout from "./Layout";
import messages from "./Styles/MessagesMain";
import "./Styles/App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./Components/SSO/Auth";

import io from "socket.io-client";
const socket = io.connect("http://localhost:3000");

export default function App() {
  const [locale, setLocale] = useState("en");
  const [isActive, setActive] = useState(true);

  return (
    <AuthProvider>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <BrowserRouter>
          <Switch>
            <Route path="/">
              <Layout
                setLocale={setLocale}
                setActive={setActive}
                isActive={isActive}
              />
            </Route>
          </Switch>
        </BrowserRouter>
      </IntlProvider>
    </AuthProvider>
  );
}
