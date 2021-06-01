import "./chat.css";
import React, { useRef, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "bootstrap-css-only/css/bootstrap.min.css";
// import 'mdbreact/dist/css/mdb.css';
import { useCollectionData } from "react-firebase-hooks/firestore";
import { MDBJumbotron, MDBContainer, MDBBtn, MDBRow, MDBCol } from "mdbreact";

const auth = firebase.auth();
const firestore = firebase.firestore();

function ChatRoom({ sellerId, currentId, productId, currentName }) {
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

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRefCurrent.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    await messagesRefSeller.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });
    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
    if (currentName != "flag") {
      await reciverRef.set({
        id: currentId,
        name: currentName,
      });
    }
  };

  return (
    <>
      <main className="main">
        {messagesCurrent &&
          messagesCurrent.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        <span ref={dummy}></span>
      </main>
      <form className="form-inline form" onSubmit={sendMessage}>
        <input
          type="text"
          className="form-control form-control-sm w-75 text-center "
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />
      </form>
    </>
  );
}

export default ChatRoom;
function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

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
        <p className="p">{text}</p>
      </div>
    </>
  );
}
