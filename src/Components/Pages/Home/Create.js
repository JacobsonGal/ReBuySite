import React, { Component } from "react";
import api from "../../../API/API";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import Alert from "../../Utils/Alert";
import firebase from "firebase/app";
import { useIntl } from "react-intl";

import "firebase/auth";
import "firebase/storage";

const storage = firebase.storage();

const Title = styled.h1.attrs({
  className: "h1",
})``;

const Wrapper = styled.div.attrs({
  className: "form-group",
})`
  margin: 0 30px;
`;

const Label = styled.label`
  margin: 5px;
  direction: ltr;
`;

const InputText = styled.input.attrs({
  className: "form-control",
})`
  margin: 0 auto;
  width: 80%;
  text-align: center;
`;

const Button = styled.button.attrs({
  className: `btn btn-primary`,
})`
  margin: 15px 15px 15px 5px;
`;

const CancelButton = styled.a.attrs({
  className: `btn btn-danger`,
})`
  margin: 15px 15px 15px 5px;
`;

export default class ProductInsert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      condition: "",
      description: "",
      category: "",
      address: "",
      price: null,
      images: [],
      // ownerId: null,
      redirect: false,
      alert: false,
      intl: props.intl,
    };
  }

  handleChangeInputName = async (event) => {
    const name = event.target.value;
    this.setState({ name });
  };
  handleChangeInputCondition = async (event) => {
    const condition = event.target.value;
    this.setState({ condition });
  };
  handleChangeInputDescription = async (event) => {
    const description = event.target.value;
    this.setState({ description });
  };
  handleChangeInputCategory = async (event) => {
    const category = event.target.value;
    this.setState({ category });
  };
  handleChangeInputAdrress = async (event) => {
    const address = event.target.value;
    this.setState({ address });
  };
  handleChangeInputImages = async (event) => {
    return Promise.all(
      [...event.target.files].map((image) => {
        console.log(image);
        storage
          .ref(`products/${image.name}`)
          .put(image)
          .on(
            "state_changed",
            () => {},
            (error) => {
              console.log(error);
            },
            () =>
              storage
                .ref("products")
                .child(image.name)
                .getDownloadURL()
                .then((url) =>
                  this.setState({
                    images: [...this.state.images, url],
                  })
                )
                .catch((error) => {
                  Alert(error);
                })
          );
      })
    );
  };

  handleChangePrice = async (event) => {
    const price = event.target.value;
    this.setState({ price });
  };

  // handleChangeOwner = async (event) => {
  //   // const ownerId = event.target.value;
  //   const ownerId = firebase.auth().currentUser.email;
  //   this.setState({ ownerId });
  // };

  categoryArray = [
    "Sport",
    "Clothing",
    "Electricity",
    "Underwear",
    "Swimwear",
    "Homecare",
    "Plants",
    "Activewear",
    "Jewlery",
    "Other",
  ];
  handleIncludeProduct = async () => {
    let data = new FormData();
    let ownerID = firebase.auth().currentUser
      ? firebase.auth().currentUser.uid
      : "jacobsongal@gmail.com";
    data.append("name", this.state.name);
    data.append("condition", this.state.condition);
    data.append("description", this.state.description);
    data.append("address", this.state.address);
    data.append("price", this.state.price);
    data.append("category", this.state.category);
    data.append("ownerId", ownerID);
    data.append("seconderyId", this.state.description + ownerID);
    data.append("photo", this.state.images);
    console.log(this.state);

    if (
      Object.values(this.state).some((element) => {
        return element === "" || element === null;
      })
    ) {
      this.setState({ alert: true });
    } else {
      data && console.log("sending data" + data.values());
      await api
        .insertProduct(data)
        .then((res) => {
          Alert(`Product inserted successfully`, true);
          this.setState({
            name: "",
            condition: "",
            description: "",
            category: "",
            address: "",
            images: null,
            price: null,

            // ownerId: null,
            redirect: true,
          });
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    }
  };

  render() {
    const {
      name,
      condition,
      description,
      address,
      images,
      category,
      price,
      // ownerId,
      redirect,
      alert,
      intl,
    } = this.state;
    let alertMessage = "";
    if (redirect) {
      return <Redirect to="/" />;
    }
    if (alert) {
      alertMessage = (
        <Alert variant="danger">Please fill all the fields.</Alert>
      );
    }

    return (
      <Wrapper style={{ marginTop: "50px" }}>
        <Title>{intl.formatMessage({ id: "CreateProduct" })}</Title>
        <div style={{ textAlign: "center" }}>
          <Label>Name: </Label>
          <InputText
            type="text"
            value={name}
            onChange={this.handleChangeInputName}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          {" "}
          <Label>Condition: </Label>
          <select
            class="form-control"
            style={{
              margin: "0 auto",
              width: "80%",
              textAlignLast: "center",
              direction: "ltr",
            }}
            value={condition}
            onChange={this.handleChangeInputCondition}
          >
            <option></option>
            <option>USED</option>
            <option>NEW</option>
          </select>
        </div>
        <div style={{ textAlign: "center" }}>
          <Label>Description: </Label>
          <InputText
            type="text"
            value={description}
            onChange={this.handleChangeInputDescription}
          />
        </div>{" "}
        <div style={{ textAlign: "center" }}>
          {" "}
          <Label>Category: </Label>
          <select
            class="form-control"
            style={{
              margin: "0 auto",
              width: "80%",
              textAlignLast: "center",
              direction: "ltr",
            }}
            value={category}
            onChange={this.handleChangeInputCategory}
          >
            <option></option>
            {this.categoryArray.map((category) => {
              return (
                <option style={{ textAlignLast: "center" }}>{category}</option>
              );
            })}
          </select>
        </div>
        <div style={{ textAlign: "center" }}>
          {" "}
          <Label>Address: </Label>
          <InputText
            type="text"
            value={address}
            onChange={this.handleChangeInputAdrress}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <Label>Image: </Label>
          <InputText
            type="file"
            multiple={true}
            name="images"
            id="images"
            onChange={this.handleChangeInputImages}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          {" "}
          <Label>Price: </Label>
          <InputText
            type="number"
            value={price}
            onChange={this.handleChangePrice}
          />
        </div>
        {/* <div style={{ textAlign: "center" }}>
          <Label>OwnerId: </Label>
          <InputText
            type="number"
            value={ownerId}
            onChange={this.handleChangeOwner}
          />
        </div> */}
        <div>
          <div style={{ textAlign: "center" }}>
            <Button onClick={this.handleIncludeProduct}>Add Product</Button>
            <CancelButton href={"/Home"}>Cancel</CancelButton>
            {alertMessage}
          </div>{" "}
        </div>
      </Wrapper>
    );
  }
}
