import React, { Component } from "react";
import api from "../../../API/API";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

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
      address: "",
      image: "",
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
  handleChangeInputAddress = async (event) => {
    const address = event.target.value;
    this.setState({ address });
  };
  handleChangeInputImage = async (event) => {
    const image = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      this.setState({
        image,
      });
    }
  };

  handleChangePrice = async (event) => {
    const price = event.target.value;
    this.setState({ price });
  };

  handleChangeOwner = async (event) => {
    const ownerId = event.target.value;
    this.setState({ ownerId });
  };

  handleIncludeProduct = async () => {
    let data = new FormData();
    console.log(this.state.name);
    data.append("name", this.state.name);
    data.append("condition", this.state.condition);
    data.append("description", this.state.description);
    data.append("address", this.state.address);
    data.append("image", this.state.image);
    data.append("price", this.state.price);
    data.append("ownerId", this.state.ownerId);

    if (
      Object.values(this.state).some((element) => {
        return element === "" || element === null;
      })
    ) {
      this.setState({ alert: true });
    } else {
      await api.insertProduct(data).then((res) => {
        window.alert(`Product inserted successfully`);
        this.setState({
          name: "",
          condition: "",
          description: "",
          address: "",
          image: "",
          price: null,
          ownerId: null,
          redirect: true,
        });
      });
    }
  };

  render() {
    const {
      name,
      condition,
      description,
      address,
      image,
      price,
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
        <Title>Create Product</Title>
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
          <InputText
            type="text"
            value={condition}
            onChange={this.handleChangeInputCondition}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <Label>Description: </Label>
          <InputText
            type="text"
            value={description}
            onChange={this.handleChangeInputDescription}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <Label>Address: </Label>
          <InputText
            type="text"
            value={address}
            onChange={this.handleChangeInputAddress}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <Label>Image: </Label>
          <InputText
            type="file"
            name="image"
            id="image"
            onChange={this.handleChangeInputImage}
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
        <div style={{ textAlign: "center" }}>
          <Label>OwnerId: </Label>
          <InputText
            type="number"
            value={ownerId}
            onChange={this.handleChangeOwner}
          />
        </div>
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
