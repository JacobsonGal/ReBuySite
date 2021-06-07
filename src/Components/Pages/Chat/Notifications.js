import React, { useRef, useState, useContext } from "react";
import Page from "../../Utils/Page";
import ChatRoom from "./ChatRoom";
import "./chat.css";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useParams } from "react-router-dom";


const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

export default function Notifications({ title, setTitle, setActive }) {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  let tmp = [{ name: "loading" }];
  const [products, setProducts] = useState(tmp);
  const [recivers, setRecivers] = useState(tmp);
  firestore
    .collection(`products`).where("ownerId", "==", user?.uid)
    .get()
    .then((querySnapshot) => {
      let temp = [];
      querySnapshot.docs.map((doc) => temp.push(doc.data()));
      setProducts(temp);
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  {


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
        <div className="card contacts_card">
          <div className="card-header">

            <div className="col-12">
              <div className="header ">
                <h1>people who interested your products</h1>
              </div>

            </div>
          </div>
          <div className="card-body contacts_body">
            <ui className="contacts">
              <li className="active">
                {products.map((item, index) => (
                  <>
                    <div className="d-flex bd-highlight">
                      <div className="img_cont">
                        <img
                          src={
                            item.photo ||
                            "https://api.adorable.io/avatars/23/abott@adorable.png"
                          }
                          className="rounded-circle user_img"
                        />
                      </div>
                      <div className="user_info">
                        <span>
                          <Link
                            to={`/chat/${item.id}/${item.prodID}/${user?.uid}`}
                            key={index}
                          >
                            {item.name}
                          </Link>
                        </span>
                        <p></p>
                      </div>
                    </div>
                    <hr />
                  </>
                ))}
              </li>
            </ui >
          </div >
        </div >
      </Page >
    );
  }
}
