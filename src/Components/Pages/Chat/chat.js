import "./chat.css";
import React, { useRef, useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link, useParams } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { NavItem } from "react-bootstrap";
import { func } from "prop-types";
import ChatRoom from "./ChatRoom";
import { useIntl } from "react-intl";

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

const Chat = () => {
  const [user] = useAuthState(auth);
  const { sellerId } = useParams();
  const { description } = useParams();
  const { secondaryId } = useParams();
  let ifSeller;
  if (user && user.uid == sellerId) {
    ifSeller = true;
  }
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {ifSeller ? (
        <SellerArea
          sellerId={sellerId}
          prodId={secondaryId}
          productName={description}
        />
      ) : (
        <ChatRoom
          sellerId={sellerId}
          currentId={user?.uid}
          productId={secondaryId}
          currentName={user?.displayName}
          desc={description}
        />
      )}
    </div>
  );
};

export default Chat;

export function SellerArea({ sellerId, prodId, productName }) {
  const intl = useIntl();
  // console.log("sellerId : " + sellerId);
  // console.log("prodId : " + prodId);
  let tmp = [{ name: "loading" }];
  const [recivers, setRecivers] = useState(tmp);

  useEffect(() => {
    async function use() {
      firestore
        .collection(`users/${sellerId}/prod/${prodId}/recivers`)
        .get()
        .then((querySnapshot) => {
          let temp = [];
          querySnapshot.docs.map((doc) => temp.push(doc.data()));
          setRecivers(temp);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
    use();
  }, []);

  return (
    <>
      <div className="card contacts_card">
        <div className="card-header">
          <div className="col-12">
            <div className="header ">
              <h1>
                {productName ? productName.toUpperCase() : ""}
                {intl.formatMessage({ id: "intrestedPeople" })}{" "}
              </h1>
            </div>
          </div>
        </div>
        <div className="card-body contacts_body">
          <ui className="contacts">
            <li className="active">
              {recivers.map((reciver, index) => (
                <>
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
                        src={
                          reciver.photoURL
                            ? reciver.photoURL
                            : reciver["image"]
                            ? reciver["image"]
                            : ""
                        }
                      >
                        {reciver
                          ? reciver.name.toString()[0].toUpperCase()
                          : null}
                      </Avatar>
                      {/* <img
                        src={
                          item.photoURL ||
                          "https://api.adorable.io/avatars/23/abott@adorable.png"
                        }
                        className="rounded-circle user_img"
                      /> */}
                    </div>
                    <div className="user_info">
                      <span>
                        <Link
                          to={`/chat/${reciver.id}/${prodId}/${sellerId}`}
                          key={index}
                        >
                          {reciver.name}
                        </Link>
                      </span>
                      <p></p>
                    </div>
                  </div>
                  <hr />
                </>
              ))}
            </li>
          </ui>
        </div>
      </div>
    </>
  );
}
