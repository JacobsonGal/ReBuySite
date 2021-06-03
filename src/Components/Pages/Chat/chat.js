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
import { Link, useParams } from 'react-router-dom';
import { MDBListGroupItem, MDBContainer, MDBListGroup, MDBRow, MDBCol } from 'mdbreact';
import { NavItem } from 'react-bootstrap';
import { func } from 'prop-types';
import ChatRoom from "./ChatRoom";



const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();



const Chat = () => {
  const [user] = useAuthState(auth);
  const { sellerId } = useParams();
  const { description } = useParams()
  const { secondaryId } = useParams()
  let ifSeller;
  if (user && user.uid == sellerId) {
    ifSeller = true;
  }
  return (
    < MDBContainer style={{ height: '100%', width: '100%' }}>
      <section className="section">
        {ifSeller ? <SellerArea sellerId={sellerId} prodId={
          secondaryId
        } /> : <ChatRoom sellerId={sellerId} currentId={user.uid} productId={secondaryId} currentName={user.displayName} desc={description} />}
      </section>

    </MDBContainer >

  );
}

export default Chat


function SellerArea({ sellerId, prodId }) {
  let tmp = [{ name: "loading" }];
  const [recivers, setRecivers] = useState(tmp);


  firestore.collection(`users/${sellerId}/prod/${prodId}/recivers`).get().then((querySnapshot) => {
    let temp = [];
    querySnapshot.docs.map((doc) => temp.push(doc.data()));
    setRecivers(temp);

  }).catch((error) => {
    console.log("Error getting documents: ", error);
  });



  return (
    <>
      <div className="card contacts_card">
        <div className="card-header">
          <div className="input-group">
            <input type="text" placeholder="Search..." name className="form-control search" />
            <div className="input-group-prepend">
              <span className="input-group-text search_btn">🔍</span>
            </div>
          </div>
        </div>
        <div className="card-body contacts_body">
          <ui className="contacts">
            <li className="active">

              {

                recivers.map((item, index) => (
                  <>
                    <div className="d-flex bd-highlight">
                      <div className="img_cont">
                        <img src={item.photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} className="rounded-circle user_img" />
                        <span className="online_icon" />
                      </div>
                      <div className="user_info">
                        <span>< Link to={`/chat/${item.id}/${prodId}/${sellerId}`} key={index}>{item.name}</Link></span>
                        <p></p>
                      </div>
                    </div>
                    <hr />
                  </>


                ))
              }




            </li>
          </ui>
        </div>
      </div>


    </>
  )

}


