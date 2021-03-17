import React, { Component } from "react";
import api from "../../../API/API";
import styled from "styled-components";

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
      image: "",
      price: 0,
      ownerId: null,
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
  handleChangeInputImage = async (event) => {
    const image = event.target.value;
    this.setState({ image });
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
    const {
      id,
      name,
      condition,
      description,
      image,
      price,
      ownerId,
    } = this.state;
    const payload = { name, condition, description, image, price, ownerId };

    await api.updateProductById(id, payload).then((res) => {
      window.alert(`Product inserted successfully`);
      this.setState({
        name: "",
        condition: "",
        description: "",
        image: "",
        price: null,
        ownerId: null,
      });
    });
  };

  componentDidMount = async () => {
    const { id } = this.state;
    const product = await api.getAllProducts(id);

    this.setState({
      name: product.data.data.name,
      condition: product.data.data.condition,
      description: product.data.data.description,
      image: product.data.data.image,
      price: product.data.data.price,
      ownerId: product.data.data.ownerId,
    });
  };

  render() {
    const { name, condition, description, image, price, ownerId } = this.state;
    return (
      <Wrapper>
        <Title>Update Product</Title>
        <div>
          <Label>Name: </Label>
          <InputText
            type="text"
            value={name}
            onChange={this.handleChangeInputName}
          />
        </div>
        <div>
          {" "}
          <Label>Condition: </Label>
          <InputText
            type="text"
            value={condition}
            onChange={this.handleChangeInputCondition}
          />
        </div>
        <div>
          <Label>Description: </Label>
          <InputText
            type="text"
            value={description}
            onChange={this.handleChangeInputDescription}
          />
        </div>
        <div>
          <Label>Image: </Label>
          <InputText
            type="text"
            value={image}
            onChange={this.handleChangeInputImage}
          />
        </div>
        <div>
          {" "}
          <Label>Price: </Label>
          <InputText
            type="number"
            value={price}
            onChange={this.handleChangePrice}
          />
        </div>
        <div>
          <Label>OwnerId: </Label>
          <InputText
            type="number"
            value={ownerId}
            onChange={this.handleChangeOwner}
          />
        </div>
        <div>
          <div>
            <Button onClick={this.handleIncludeProduct}>Update Product</Button>
          </div>
          <div>
            <CancelButton href={"/Home"}>Cancel</CancelButton>
          </div>
        </div>
      </Wrapper>
   
   );
  }
}
