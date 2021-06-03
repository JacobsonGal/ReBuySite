import React, { useRef, useState, useContext } from "react";
import Page from "../../Utils/Page";
import ChatRoom from "./ChatRoom";
import "./chat.css";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
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
import { AuthContext, Admins } from "../../SSO/Auth";
import { NavItem } from "react-bootstrap";
import { func } from "prop-types";

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

export default function Notifications({ title, setTitle, setActive }) {
  const [loading, setLoading] = useState(false);
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
      <h1>Notifications</h1>
      {/* <SellerArea /> */}
      {setActive(false)}
    </Page>
  );
}

async function SellerArea() {
  //   let tmp = [{ name: "loading" }];
  const [recivers, setRecivers] = useState([]);
  const [products, setProducts] = useState([]);
  const { currentUser } = useContext(AuthContext);

  await firestore
    .collection(`products`)
    .get()
    .then((querySnapshot) => {
      let temp = [];
      querySnapshot.docs.foreach((doc) => {
        console.log(doc);
        if (doc.data().uid === currentUser?.uid) temp.push(doc.data().uid);
      });
      setProducts(temp);
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  (await products) &&
    products.forEach((prodId) => {
      firestore
        .collection(`users/${currentUser.uid}/prod/${prodId}/recivers`)
        .get()
        .then((querySnapshot) => {
          let temp = [];
          querySnapshot.docs.map((doc) => temp.push(doc.data()));
          setRecivers(temp);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    });

  return (
    <>
      <div className="card contacts_card">
        <div className="card-header">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search..."
              name
              className="form-control search"
            />
            <div className="input-group-prepend">
              <span className="input-group-text search_btn">🔍</span>
            </div>
          </div>
        </div>
        <div className="card-body contacts_body">
          <ui className="contacts">
            <li className="active">
              {recivers?.foreach((item, index) => (
                <>
                  <div className="d-flex bd-highlight">
                    <div className="img_cont">
                      <img
                        src={
                          item.photoURL ||
                          "https://api.adorable.io/avatars/23/abott@adorable.png"
                        }
                        className="rounded-circle user_img"
                      />
                      <span className="online_icon" />
                    </div>
                    <div className="user_info">
                      <span>
                        {/* <Link
                          to={`/chat/${item.id}/${prodId}/${sellerId}`}
                          key={index}
                        > */}
                        {item.name}
                        {/* </Link> */}
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
