import React, { useState } from "react";
import firebase from "firebase/app";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import { IntlProvider } from "react-intl";
import Layout from "./Layout";
import messages from "./Styles/MessagesMain";
import "./Styles/App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
const ClientTheme = React.lazy(() => import("./Styles/Themes/Client"));
const GuestTheme = React.lazy(() => import("./Styles/Themes/Guest.js"));

const firebaseConfig = {
  apiKey: "AIzaSyAiTqUoIPktHrM66nIC7fRevgXvj7BzN-A",
  authDomain: "rebuy-47bc6.firebaseapp.com",
  databaseURL: "https://rebuy-47bc6-default-rtdb.firebaseio.com",
  projectId: "rebuy-47bc6",
  storageBucket: "rebuy-47bc6.appspot.com",
  messagingSenderId: "904980332172",
  appId: "1:904980332172:web:8bff740bf252313dd885a9",
  measurementId: "G-8HZ67NTJZW",
};
firebase.initializeApp(firebaseConfig);

export function isSignIn() {
  return firebase.auth().currentUser ? true : false;
}

export default function App() {
  const [locale, setLocale] = useState("en");
  const [isActive, setActive] = useState(true);

  const ThemeSelector = ({ children }) => {
    return (
      <>
        <React.Suspense fallback={<></>}>
          {isSignIn() ? <ClientTheme /> : <GuestTheme />}
        </React.Suspense>
        {children}
      </>
    );
  };

  return (
    <FirebaseAuthProvider firebase={firebase}>
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
    </FirebaseAuthProvider>
  );
}
