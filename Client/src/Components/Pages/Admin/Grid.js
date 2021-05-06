import React, { Component } from "react";
import api from "../../../API/API.js";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:3001";
const socket = socketIOClient(ENDPOINT);
class Grid extends Component {
  state = { products: [], users: [], liveUsers: 0, socket: "" };

  componentDidMount = async () => {
    try {
      await api.getAllProducts().then((product) => {
        this.setState({
          products: product.data.data,
        });
      });
      await api.getAllUsers().then((user) => {
        this.setState({
          users: user.data.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
 
  };
  componentDidUpdate(){
   socket.on("count", (data) => {
     console.log(data, "socket data");
     this.setState({ liveUsers: data });
   });
  };

  render() {
    const { products, users, liveUsers } = this.state;
    return (
      <>
        <div className='container'>
          <div className='row'>
            <div className='col-sm'>numbe of live users {liveUsers}</div>
            <div className='col-sm'>
              number of registered users {users.length}
            </div>
            <div className='col-sm'>number of products {products.length}</div>
          </div>
        </div>
      </>
    );
  }
}

export default Grid;
