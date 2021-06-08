import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import Alert from "./Alert";
import swal from "@sweetalert/with-react";
import styled from "styled-components";
import firebase from "firebase/app";
import "react-table/index";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import "bootstrap/dist/css/bootstrap.min.css";

const firestore = firebase.firestore();

const Update = styled.div`
  color: #ef9b0f;
  cursor: pointer;
`;

const Delete = styled.div`
  color: #ff0000;
  cursor: pointer;
`;

export function UpdateProduct({ id }) {
  const history = useHistory();
  console.log(id, "btam");
  const updateUser = (event) => {
    event.preventDefault();
    history.push(`/Update/${id}`);
  };
  return <Update onClick={updateUser}>Update</Update>;
}

export class DeleteProduct extends Component {
  constructor() {
    super();
  }
  deleteUser = (event) => {
    event.preventDefault();

    swal({
      title: "Are you sure?",
      text: `Do tou want to delete the product ${this.props.id} permanently?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        firestore
          .collection("products")
          .where("seconderyId", "==", this.props.id)
          .get()
          .then((Snapshot) => {
            Snapshot.forEach((doc) => {
              doc.ref.delete().then((res) => {
                this.props.deleteHandler(this.props.id);
                swal("Poof! Your Product has been deleted!", {
                  icon: "success",
                });
              });
            });
          })
          .catch((error) => {
            Alert(error.message);
          });
      } else {
        swal("Your Product file is safe!");
      }
    });
  };
  render() {
    return <Delete onClick={this.deleteUser}>DELETE</Delete>;
  }
}
