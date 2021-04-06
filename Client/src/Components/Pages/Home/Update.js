import React, { Component } from "react";
import api from "../../../API/API";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import Alert from "react-bootstrap/Alert";

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
  margin: 5px;
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
    console.log(images);
    this.setState({
      images,
    });
  };
  handleChangeInputPrice = async (event) => {
    const price = event.target.value;
    this.setState({ price });
  };
  handleChangeInputOwner = async (event) => {
    const ownerId = event.target.value;
    this.setState({ ownerId });
  };
  handleIncludeProduct = async () => {
    let data = new FormData();
    data.append("name", this.state.name);
    data.append("condition", this.state.condition);
    data.append("description", this.state.description);
    data.append("address", this.state.address);
    for (let i = 0; i < this.state.images.length; i++) {
      data.append("images", this.state.images[i]);
    }

    data.append("price", this.state.price);
    data.append("ownerId", this.state.ownerId);
    for (var pair of data.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    if (
      Object.values(this.state).some((element) => {
        return element === "" || element === null;
      })
    ) {
      this.setState({ alert: true });
    } else {
      await api.updateProductById(this.state.id, data).then((res) => {
        console.log(res);
        window.alert(`Product inserted successfully`);
        this.setState({
          name: "",
          condition: "",
          description: "",
          address: "",
          images: null,
          price: null,
          ownerId: null,
          redirect: true,
          alert: false,
        });
      });
    }
  };
  componentDidMount = async () => {
    const { id } = this.state;
    const product = await api.getProductById(id);

    this.setState({
      name: product.data.data.name,
      condition: product.data.data.condition,
      description: product.data.data.description,
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
            <Button onClick={this.handleIncludeProduct}>Update Product</Button>
            <CancelButton href={"/Home"}>Cancel</CancelButton>
            {alertMessage}
          </div>{" "}
        </div>
      </Wrapper>
    );
  }
}
