import React, { Component } from "react";
import api from "../../../API/API";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import Alert from "../../Utils/Alert";
import firebase from "firebase/app";
import "firebase/auth";

const Title = styled.h1.attrs({
  className: "h1",
})``;

const Wrapper = styled.div.attrs({
  className: "form-group",
})`
  margin: 0 30px;
  direction: rtl;
`;

const Label = styled.label`
  margin: 5px;
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

export default class ProductUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: window.location.href.split("/Update/")[1],
      name: "",
      condition: "",
      description: "",
      category: "",
      address: "",
      images: null,
      price: null,
      ownerId: null,
      redirect: false,
      alert: false,
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
  handleChangeInputAdrress = async (event) => {
    const address = event.target.value;
    this.setState({ address });
  };
  handleChangeInputImages = async (event) => {
    let images = event.target.files;
    this.setState({
      images,
    });
  };
  handleChangeInputCategory = async (event) => {
    const category = event.target.value;
    this.setState({ category });
  };
  handleChangeInputPrice = async (event) => {
    const price = event.target.value;
    this.setState({ price });
  };

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
      ? firebase.auth().currentUser.email
      : "jacobsongal@gmail.com";
    data.append("name", this.state.name);
    data.append("condition", this.state.condition);
    data.append("description", this.state.description);
    data.append("category", this.state.category);
    data.append("address", this.state.address);
    for (let i = 0; i < this.state.images.length; i++) {
      data.append("images", this.state.images[i]);
    }

    data.append("price", this.state.price);
    data.append("ownerId", ownerID);

    if (
      Object.values(this.state).some((element) => {
        return element === "" || element === null;
      })
    ) {
      this.setState({ alert: true });
    } else {
      await api
        .updateProductById(this.state.id, data)
        .then((res) => {
          console.log(res);
          console.log("stam");
          Alert(`Product updated successfully`, true);
          this.setState({
            name: "",
            condition: "",
            description: "",
            category: "",
            address: "",
            images: null,
            price: null,
            ownerId: null,
            redirect: true,
            alert: false,
          });
        })
        .catch((err) => console.log(err));
    }
  };
  componentDidMount = async () => {
    const { id } = this.state;
    const product = await api.getProductById(id);
    console.log(product);
    this.setState({
      name: product.data.data.name,
      condition: product.data.data.condition,
      description: product.data.data.description,
      category: product.data.data.category,
      images: product.data.data.images,
      address: product.data.data.address,
      price: product.data.data.price,
      ownerId: product.data.data.ownerId,
    });
  };

  render() {
    const {
      name,
      condition,
      description,
      images,
      address,
      price,
      category,
      ownerId,
      redirect,
      alert,
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
        <Title>Update Product</Title>
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
            style={{ margin: "0 auto", width: "80%", textAlignLast: "center" }}
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
            style={{ margin: "0 auto", width: "80%", textAlignLast: "center" }}
            value={category}
            onChange={this.handleChangeInputCategory}
          >
            <option></option>
            {this.categoryArray.map((category) => {
              return <option>{category}</option>;
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
            onChange={this.handleChangeInputPrice}
          />
        </div>
        <div>
          <div style={{ textAlign: "center" }}>
            <Button onClick={this.handleIncludeProduct}>Update Product</Button>
            <CancelButton href={"/Home"}>Cancel</CancelButton>
            {alertMessage}
          </div>{" "}
        </div>
      </Wrapper>
    );
  }
}
