import React, { useRef, useState, useContext, useEffect } from "react";
import Page from "../../Utils/Page";
// import ChatRoom from "./ChatRoom";
import "./chat.css";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import { useAuthState } from "react-firebase-hooks/auth";
import { AuthContext } from "../../SSO/Auth";
import { Link, useParams } from "react-router-dom";
import { Avatar, Button } from "@material-ui/core";
import { SellerArea } from "./chat";

// const auth = firebase.auth();
const firestore = firebase.firestore();
// const analytics = firebase.analytics();

export default function Notifications({ title, setTitle, setActive, user }) {
  // const [user] = useAuthState(auth);
  // const { currentUser } = useContext(AuthContext);
  // const user = currentUser;
  console.log(user);
  const [loading, setLoading] = useState(false);
  let tmp = [{ name: "loading" }];
  const [products, setProducts] = useState(tmp);
  const [sellerId, setSellerId] = useState();
  const [secondaryId, setScondaryId] = useState();
  const [selling, setSelling] = useState(false);
  const [itemId, setItemId] = useState("");
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
    }
    use();
  }, [user]);

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
              <h1>Choose Product</h1>
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

                      {/* <img
                          src={
                            item["photo"]
                              ? item["photo"]
                              : "../../../Assets/Images/ReBuy.png"
                          }
                          alt="userPhoto"
                          className="rounded-circle user_img"
                        /> */}
                    </div>
                    <div className="user_info">
                      <span>
                        <Link
                          to={`/${item["ownerId"]}/${item["description"]} / ${item["seconderyId"]}`}
                          style={{ color: "blue" }}
                        >
                          {item.name}
                        </Link>
                        {/* <Button
                            onClick={() => {
                              console.log(item);
                              setItemId(item["seconderyId"]);
                              setSelling(true);
                            }}
                            key={index}
                          >
                            {item.name}
                          </Button> */}
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
    </Page>
  );
}

// function SellerArea({ sellerId, prodId }) {
//   console.log(sellerId);
//   console.log(prodId);
//   let tmp = [{ name: "loading" }];
//   const [recivers, setRecivers] = useState(tmp);

//   useEffect(() => {
//     //  function use() {
//     firestore
//       .collection(`users/${sellerId}/prod/${prodId}/recivers`)
//       .get()
//       .then((querySnapshot) => {
//         console.log(querySnapshot.docs);
//         let temp = [];
//         querySnapshot.docs.map((doc) => temp.push(doc.data()));
//         // console.log(temp);
//         temp.length > 0 && setRecivers(temp);
//       })
//       .catch((error) => {
//         console.log("Error getting documents: ", error);
//       });
//     // }
//     // use();
//   }, [sellerId, prodId]);

//   return (
//     <>
//       <div className="card contacts_card">
//         <div className="card-header">
//           <div className="col-12">
//             <div className="header ">
//               <h1>People who interested your product</h1>
//             </div>
//           </div>
//         </div>
//         <div className="card-body contacts_body">
//           <ui className="contacts">
//             <li className="active">
//               {recivers.map((item, index) => (
//                 <>
//                   <div className="d-flex bd-highlight">
//                     <div className="img_cont">
//                       <img
//                         src={
//                           item.photoURL
//                             ? item.photoURL
//                             : "https://api.adorable.io/avatars/23/abott@adorable.png"
//                         }
//                         alt="userPhoto"
//                         className="rounded-circle user_img"
//                       />
//                     </div>
//                     <div className="user_info">
//                       <span>
//                         <Link
//                           to={`/chat/${item.id}/${prodId}/${sellerId}`}
//                           key={index}
//                         >
//                           {item.name}
//                         </Link>
//                       </span>
//                       <p></p>
//                     </div>
//                   </div>
//                   <hr />
//                 </>
//               ))}
//             </li>
//           </ui>
//         </div>
//       </div>
//     </>
//   );
// }
