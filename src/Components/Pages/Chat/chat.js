import "./chat.css";
import React, { useRef, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "bootstrap-css-only/css/bootstrap.min.css";
// import 'mdbreact/dist/css/mdb.css';
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link, useParams } from "react-router-dom";
import {
  MDBListGroupItem,
  MDBContainer,
  MDBListGroup,
  MDBRow,
  MDBCol,
} from "mdbreact";
import { NavItem } from "react-bootstrap";
import { func } from "prop-types";
import ChatRoom from "./ChatRoom";

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
    <MDBContainer>
      <div className="header">
        <h1 style={{ color: "rgba(0,212,255,1)", textAlign: "center" }}>
          {description}
        </h1>
        <hr />
      </div>

      <section className="section">
        {ifSeller ? (
          <SellerArea sellerId={sellerId} prodId={secondaryId} />
        ) : (
          <ChatRoom
            sellerId={sellerId}
            currentId={user.uid}
            productId={secondaryId}
            currentName={user.displayName}
            desc={description}
          />
        )}
      </section>
    </MDBContainer>
  );
};

export default Chat;

function SellerArea({ sellerId, prodId }) {
  let tmp = [{ name: "loading" }];
  const [recivers, setRecivers] = useState(tmp);
  const [id, setId] = useState();

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

  return (
    <>
      <main className="main">
        <h1>people who interested in your product </h1>
        <hr />

        {recivers.map((item, index) => (
          <MDBListGroup style={{ width: "22rem" }}>
            <MDBListGroupItem>
              <Link to={`/chat/${item.id}/${prodId}/${sellerId}`} key={index}>
                {item.name}
              </Link>
            </MDBListGroupItem>
          </MDBListGroup>
        ))}
      </main>
    </>
  );
}
