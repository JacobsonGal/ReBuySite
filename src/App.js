import React, { useState } from "react";
import { IntlProvider } from "react-intl";
import Layout from "./Layout";
import messages from "./Styles/MessagesMain";
import Guest from "./Redux/userControl";
import "./Styles/App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
const ClientTheme = React.lazy(() => import("./Styles/Themes/Client"));
const GuestTheme = React.lazy(() => import("./Styles/Themes/Guest.js"));

export default function App() {
  const [locale, setLocale] = useState("en");
  const [isActive, setActive] = useState(true);

  const ThemeSelector = ({ children }) => {
    return (
      <>
        <React.Suspense fallback={<></>}>
          {Guest() ? <GuestTheme /> : <ClientTheme />}
        </React.Suspense>
        {children}
      </>
    );
  };

  return (
    <React.Fragment>
      <ThemeSelector>
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
      </ThemeSelector>
    </React.Fragment>
  );
}
