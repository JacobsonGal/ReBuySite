import React, { useEffect, useState } from "react";
import firebaseConfig from "./Config.js";
import LoadingOverlay from "react-loading-overlay";
import Icon from "../../Assets/Images/ReBuyLogoTrans.png";

export const AuthContext = React.createContext();

export function Admins(email) {
  switch (email) {
    case "jacobsongal@gmail.com":
      return true;
    case "jacobsongal@cs.colman.ac.il":
      return true;
    case "avivhorovitz1@gmail.com":
      return true;
    case "oshernati22@gmail.com":
      return true;
    default:
      return false;
  }
}

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    firebaseConfig.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);
  return (
    <LoadingOverlay
      active={loading}
      fadeSpeed={100}
      spinner={
        <div style={{ animation: "spin 1.5s linear infinite" }}>
          <img src={Icon} alt={"Icon"} style={{ width: "30%" }} />
        </div>
      }
      styles={{
        wrapper: {},
        overlay: (base) => ({
          ...base,
          backgroundColor: "#f1f7fb",
          opacity: "0.9",
          height: "100%",
          position: "fixed",
        }),
      }}
    >
      <AuthContext.Provider value={{ currentUser }}>
        {children}
      </AuthContext.Provider>
    </LoadingOverlay>
  );
};
