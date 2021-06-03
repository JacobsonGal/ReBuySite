import './chat.css';
import React, { useRef, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { BorderBottom } from '@material-ui/icons';






const auth = firebase.auth();
const firestore = firebase.firestore();


function ChatRoom({ sellerId, currentId, productId, currentName, desc }) {

  const [photoURL, setPhotoURL] = useState(null);
  const [sellerName, setSellerName] = useState(null);
  const [sellerPhoto, setSellerPhoto] = useState(null);
  const dummy = useRef();
  const reciverRef = firestore.collection('users').doc(sellerId).collection("prod").doc(productId).collection("recivers").doc(currentId);
  const messagesRefCurrent = firestore.collection('users').doc(currentId).collection("prod").doc(productId).collection("recivers").doc(sellerId).collection("messages");
  const messagesRefSeller = firestore.collection('users').doc(sellerId).collection("prod").doc(productId).collection("recivers").doc(currentId).collection("messages");
  const queryCurrent = messagesRefCurrent.orderBy('createdAt');
  const [messagesCurrent] = useCollectionData(queryCurrent, { idField: 'id' });
  firestore.collection('users').doc(auth.currentUser.uid).get().then((doc) => {
    if (doc.exists) {
      setPhotoURL(doc.data().image);
    } else {
      // doc.data() will be undefined in this case

      console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });

  firestore.collection('users').doc(sellerId).get().then((doc) => {
    if (doc.exists) {
      setSellerName(doc.data().name);
    } else {
      // doc.data() will be undefined in this case

      console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });

  firestore.collection('users').doc(sellerId).get().then((doc) => {
    if (doc.exists) {
      setSellerPhoto(doc.data().image);
    } else {
      // doc.data() will be undefined in this case

      console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });




  const [formValue, setFormValue] = useState('');

  const SendMessage = async (e) => {
    e.preventDefault();
    const { uid } = auth.currentUser;
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

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
    if (currentName != "flag") {
      await reciverRef.set({
        id: currentId,
        name: currentName,
        photoURL: photoURL

      })
    }

  }

  return (<>
    <div className="container-fluid contain h-100">
      <div className="row justify-content-center h-100"></div>
      <div className="col-md-8 mx-auto col-xl-12 chat">
        <div className="card">
          <div className="card-header msg_head">
            <div className="d-flex head  bd-highlight">
              <div className="img_cont">
                <img src={sellerPhoto || 'https://api.adorable.io/avatars/23/abott@adorable.png'} className="rounded-circle user_img" />
              </div>
              <div className="user_info">
                <span>Chat with {sellerName}</span>
                <p>product : {desc}</p>
              </div>
            </div>
            <span id="action_menu_btn"><FontAwesomeIcon icon={faEllipsisV} /></span>
            <div class="action_menu">
              <ul>
                <li><i class="fas fa-user-circle"></i> View profile</li>
                <li><i class="fas fa-ban"></i> Block</li>
              </ul>
            </div>
          </div>
          <div className="card-body msg_card_body">
            {messagesCurrent && messagesCurrent.map(msg => <ChatMessage key={msg.id} message={msg} />)}
            <span ref={dummy}></span>
          </div>
          <div class="card-footer">
            <form className="form-inline form" onSubmit={SendMessage}>
              <button type="none" disabled={!formValue}>😀</button>
              <input type="text" className="form-control form-control-sm w-75 text-center " value={formValue} onChange={(e) => setFormValue(e.target.value)} style={{ backgroundColor: "#282c3454", color: "wheat", margin: '0 auto', border: '1px solid transparent', borderRadius: "20px" }} placeholder=".. say something nice" />
              <button type="submit" disabled={!formValue}>🕊️</button>
            </form>

          </div>
        </div>
      </div>
    </div>




  </>)
}

export default ChatRoom
function ChatMessage(props) {
  const { text, uid, photoURL, createdAt } = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>

      <img className="img" src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <div class="msg_cotainer">
        <p className="p">{text}</p>
        <span className="msg_time">8:40 AM, Today  from osher nati</span>
      </div>
    </div>

  </>)
}