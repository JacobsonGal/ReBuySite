import React, { Component } from "react";
import Grid from "./Grid";
import BarChart from "./BarChart";
import api from "../../../API/API.js";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:3001";
const socket = socketIOClient(ENDPOINT);
//import Card from "./Card";
class Admin extends Component {
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
  componentDidUpdate() {
    socket.on("count", (data) => {
      console.log(data, "socket data");
      this.setState({ liveUsers: data });
    });
  }
  render() {
    const { products, users, liveUsers } = this.state;

    return (
      <>
        <h1> Welcome Admin</h1>
        <BarChart />
        <Grid products={products} users={users} liveUsers={liveUsers} />
      </>
    );
  }
}

export default Admin;
