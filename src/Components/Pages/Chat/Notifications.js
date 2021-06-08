import React, { useRef, useState, useContext, useEffect } from "react";
import Page from "../../Utils/Page";
// import ChatRoom from "./ChatRoom";
import "./chat.css";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import { useAuthState } from "react-firebase-hooks/auth";
import { AuthContext } from "../../SSO/Auth";
import { Link, useParams } from "react-router-dom";
import { Avatar, Button } from "@material-ui/core";
import { SellerArea } from "./chat";
import { useIntl } from "react-intl";
import { random } from "lodash";

// const auth = firebase.auth();
const firestore = firebase.firestore();
// const analytics = firebase.analytics();

export default function Notifications({ title, setTitle, setActive, user }) {
  // const [user] = useAuthState(auth);
  // const { currentUser } = useContext(AuthContext);
  // const user = currentUser;
  const intl = useIntl();
  // console.log(user);
  const [loading, setLoading] = useState(true);
  let tmp = [{ name: "loading" }];
  const [products, setProducts] = useState(tmp);
  const [sellerId, setSellerId] = useState();
  const [secondaryId, setScondaryId] = useState();
  const [selling, setSelling] = useState(false);
  const [itemId, setItemId] = useState("");
  const userId = user && user["uid"];

  useEffect(() => {
    async function use() {
      firestore
        .collection(`products`)
        .where("ownerId", "==", userId && userId)
        .get()
        .then((querySnapshot) => {
          let temp = [];
          querySnapshot.docs.map((doc) => temp.push(doc.data()));
          setProducts(temp);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
      setLoading(false);
    }
    use();
  }, [user]);

  return (
    <Page
      loading={loading}
      title={title}
      color={"#fdeded"}
      setTitle={setTitle}
      add={false}
      FAB="none"
      dots={false}
    >
      <div
        className="card contacts_card"
        style={{
          width: "100%",
          height: "100%",
          direction: "ltr",
          border: "0px",
        }}
      >
        <div className="card-header">
          <div className="col-12">
            <div className="header ">
              <h1>{intl.formatMessage({ id: "NotificationCenter" })}</h1>
            </div>
          </div>
        </div>
        <div className="card-body contacts_body">
          <ui className="contacts">
            <li className="active">
              {products.map((item, index) => (
                <Link
                  to={`/${item["ownerId"]}/${item["description"]} / ${item["seconderyId"]}`}
                  key={random(0, 1000)}
                >
                  <div className="d-flex bd-highlight">
                    <div className="img_cont">
                      <Avatar
                        style={{
                          alignSelf:
                            window.screen.width <= 800 ? "right" : "center",
                          width: "70px",
                          height: "70px",
                          borderRadius: "50%",
                        }}
                        variant="rounded"
                        src={item["photo"] ? item["photo"] : ""}
                      >
                        {item ? item.name.toString()[0].toUpperCase() : null}
                      </Avatar>
                    </div>
                    <div className="user_info">
                      <span>{item.name.toUpperCase()}</span>
                    </div>
                  </div>
                  <hr />
                </Link>
              ))}
            </li>
          </ui>
        </div>
      </div>
    </Page>
  );
}
