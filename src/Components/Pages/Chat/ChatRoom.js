import "./chat.css";
import React, { useRef, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import Avatar from "@material-ui/core/Avatar";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEllipsisV } from "@fontawesome/free-solid-svg-icons";
import { BorderBottom } from "@material-ui/icons";

const auth = firebase.auth();
const firestore = firebase.firestore();

function ChatRoom({ sellerId, currentId, productId, currentName, desc }) {
  const [user] = useAuthState(auth);
  const [photoURL, setPhotoURL] = useState(null);
  const [sellerName, setSellerName] = useState(null);
  const [sellerPhoto, setSellerPhoto] = useState(null);
  const dummy = useRef();
  const reciverRef = firestore
    .collection("users")
    .doc(sellerId)
    .collection("prod")
    .doc(productId)
    .collection("recivers")
    .doc(currentId);
  const messagesRefCurrent = firestore
    .collection("users")
    .doc(currentId)
    .collection("prod")
    .doc(productId)
    .collection("recivers")
    .doc(sellerId)
    .collection("messages");
  const messagesRefSeller = firestore
    .collection("users")
    .doc(sellerId)
    .collection("prod")
    .doc(productId)
    .collection("recivers")
    .doc(currentId)
    .collection("messages");
  const queryCurrent = messagesRefCurrent.orderBy("createdAt");
  const [messagesCurrent] = useCollectionData(queryCurrent, { idField: "id" });
  firestore
    .collection("users")
    .doc(auth.currentUser?.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        setPhotoURL(doc.data().image);
      } else {
        // doc.data() will be undefined in this case

        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });

  firestore
    .collection("users")
    .doc(sellerId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        setSellerName(doc.data().name);
      } else {
        // doc.data() will be undefined in this case

        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });

  firestore
    .collection("users")
    .doc(sellerId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        setSellerPhoto(doc.data().image);
      } else {
        // doc.data() will be undefined in this case

        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });

  const [formValue, setFormValue] = useState("");

  const SendMessage = async (e) => {
    e.preventDefault();
    const { uid } = auth.currentUser;
    await messagesRefCurrent.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      name: user?.displayName,

    });

    await messagesRefSeller.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      name: user?.displayName,



    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
    if (currentName != "flag") {
      await reciverRef.set({
        id: currentId,
        name: currentName,
        photoURL: photoURL,
        prodID: productId
      });
    }
  };

  return (
    <div className="card">
      <div className="card-header msg_head">
        <div className="d-flex head  bd-highlight">
          {/* <img
              src={
                sellerPhoto
                  ? sellerPhoto
                  : "https://api.adorable.io/avatars/23/abott@adorable.png"
              }
              className="rounded-circle user_img"
            /> */}
          {sellerPhoto !== null ? (
            <img
              style={{
                alignSelf: window.screen.width <= 800 ? "right" : "center",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
              }}
              variant="top"
              src={sellerPhoto}
              alt={sellerPhoto}
            />
          ) : (
            <Avatar
              style={{
                alignSelf: window.screen.width <= 800 ? "right" : "center",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
              }}
            />
          )}
          <div className="user_info">
            <span>
              Chat with {sellerName}
              <hr />
              {desc}
            </span>
          </div>
        </div>
        <span id="action_menu_btn">
          {/* <FontAwesomeIcon icon={faEllipsisV} /> */}
        </span>
        <div class="action_menu">
          <ul>
            <li>
              <i class="fas fa-user-circle"></i> View profile
            </li>
            <li>
              <i class="fas fa-ban"></i> Block
            </li>
          </ul>
        </div>
      </div>
      <div className="card-body msg_card_body">
        {messagesCurrent &&
          messagesCurrent.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        <span ref={dummy}></span>
      </div>
      <div class="card-footer">
        <form className="form-inline form" onSubmit={SendMessage}>
          <button type="none" className="button" disabled={!formValue}>
            😀
          </button>
          <div className="input">
            <input
              type="text"
              className="form-control input  form-control-sm w-100  text-center "
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              style={{
                backgroundColor: "#282c3454",
                color: "wheat",
                margin: "0 auto",
                border: "1px solid transparent",
                borderRadius: "20px",
              }}
              placeholder=".. say something nice"
            />
          </div>
          <button type="submit" className="button" disabled={!formValue}>
            🕊️
          </button>
        </form>
      </div>
    </div >
  );
}

export default ChatRoom;
function ChatMessage(props) {
  const { text, uid, photoURL, name } = props.message;


  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          className="img"
          src={
            photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
          }
        />
        <div class="msg_cotainer">
          <p className="p">{text}</p>
          <span className="msg_time">from {name}</span>
        </div>
      </div>
    </>
  );
}
