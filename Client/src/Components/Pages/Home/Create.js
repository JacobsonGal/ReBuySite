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
      images: [{}],
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
  handleChangeInputImages = async (event) => {
    const images = event.target.files[0];
    console.log(images);
    this.setState({
      images,
    });
    // if (event.target.files && event.target.files[0]) {
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
    data.append("name", this.state.name);
    data.append("condition", this.state.condition);
    data.append("description", this.state.description);
    data.append("images", this.state.images);
    data.append("price", this.state.price);
    data.append("ownerId", this.state.ownerId);

    if (
      Object.values(this.state).some((element) => {
        return element === "" || element === null;
      })
    ) {
      this.setState({ alert: true });
    } else {
      await api
        .insertProduct(data)
        .then((res) => {
          window.alert(`Product inserted successfully`);
          this.setState({
            name: "",
            condition: "",
            description: "",
            images: [{}],
            price: null,
            ownerId: null,
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
      images,
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
