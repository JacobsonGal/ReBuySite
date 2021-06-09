import React, { useState, useEffect } from "react";
import Page from "../../Utils/Page";
import "./chat.css";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { useIntl } from "react-intl";
import { random } from "lodash";

const firestore = firebase.firestore();

export default function Notifications({ title, setTitle, setActive, user }) {
  const intl = useIntl();
  const [loading, setLoading] = useState(true);
  let tmp = [{ name: "loading" }];
  const [products, setProducts] = useState(tmp);
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
  }, [user, userId]);

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
      <div className="card contacts_card border-0">
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
