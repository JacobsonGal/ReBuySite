import './chat.css';
import React, { useRef, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';
import { MDBJumbotron, MDBContainer, MDBBtn, MDBRow, MDBCol } from 'mdbreact';



const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();



const Chat = () => {
  const [user] = useAuthState(auth);
  const { sellerId } = useParams();
  const { description } = useParams()
  let ifSeller;
  if (user.uid == sellerId) {
    ifSeller = true;
  }
  return (
    < MDBContainer >
      <div className="header">
        <h1 style={{ color: 'rgba(0,212,255,1)', textAlign: "center" }}>{description}</h1>
        <hr />
      </div>

      <section className="section">
        {ifSeller ? <SellerArea sellerId={sellerId} /> : <ChatRoom sellerId={sellerId} currentId={user.uid} currentName={user.name} />}
      </section>

    </MDBContainer >

  );
}

export default Chat

function SellerArea({ sellerId }) {

  let recivers = firestore.collection(`users/${sellerId}/recivers`).get().then((querySnapshot) => {
    let temp = [];
    querySnapshot.docs.map((doc) => temp.push(doc.data()));
    // doc.data() is never undefined for query doc snapshots
    alert(temp[1].id);

  }).catch((error) => {
    console.log("Error getting documents: ", error);
  });


  //<ChatRoom sellerId="lkqzFWSlDwbI4vTccRpYoHaF3Cv1" currentId={user.uid}

  return (
    <>
      <main className="main">
        <h1>user list </h1>
        <hr></hr>

      </main>
    </>
  )

}



function ChatRoom({ sellerId, currentId, currentName }) {
  const dummy = useRef();
  const messagesRefCurrent = firestore.collection('users').doc(currentId).collection("recivers").doc(sellerId).collection("messages");
  const messagesRefSeller = firestore.collection('users').doc(sellerId).collection("recivers").doc(currentId).collection("messages");
  const queryCurrent = messagesRefCurrent.orderBy('createdAt').limit(25);
  const [messagesCurrent] = useCollectionData(queryCurrent, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRefCurrent.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    })
    await messagesRefSeller.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    })

    /*firestore.collection('users').doc(sellerId).collection("recivers").doc(currentId).add({
      id: currentId,
      name: currentName
    })*/
    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main className="main">
      {messagesCurrent && messagesCurrent.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      <span ref={dummy}></span>
    </main>
    <form className="form-inline form" onSubmit={sendMessage}>
      <input type="text" className="form-control form-control-sm w-75 text-center " value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
      <MDBBtn className="aqua-gradient" color="blue-grey" size="sm" type="submit" disabled={!formValue} outline >🕊️</MDBBtn>
    </form>
  </>)
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img className="img" src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p className="p">{text}</p>
    </div>
  </>)
}
