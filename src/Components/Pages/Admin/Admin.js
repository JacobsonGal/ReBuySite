import React, { Component } from "react";
import api from "../../../API/API.js";
import _ from "lodash";
import { Bar } from "react-chartjs-2";
const FireBaseAuth =
  "https://console.firebase.google.com/u/0/project/rebuy-47bc6/authentication/users";
class Admin extends Component {
  state = { products: [], users: [], prodByAdress: [], prodByCategory: [] };

  componentDidMount = async () => {
    try {
      await api.getAllProducts().then((product) => {
        this.setState({
          products: product.data.data,
        });
      });
      this.setState({
        prodByAdress: _.countBy(this.state.products, "address"),
        prodByCategory: _.countBy(this.state.products, "category"),
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

  render() {
    const { products, users, prodByAdress, prodByCategory } = this.state;
    let address = [];
    let count = [];
    let category = [];
    let countCategory = [];
    _.forEach(prodByAdress, (val, key) => {
      address.push(key);
      count.push(val);
    });
    console.log(prodByCategory, "category");
    _.forEach(prodByCategory, (val, key) => {
      category.push(key);
      countCategory.push(val);
    });

    return (
      <>
        <div className='container'>
          <div className='row'>
            <div className='col-sm'>
              Number of registered users {users.length}
            </div>
            <div className='col-sm'>Number of products {products.length}</div>
            <div className='col-sm'>{console.log(prodByAdress)}</div>
            <a href={FireBaseAuth}>Users List</a>
          </div>
        </div>

        <Bar
          data={{
            labels: address,
            datasets: [
              {
                label: "Products per address",
                data: count,
                backgroundColor: [
                  "rgba(255, 99, 132,0.4)",
                  "rgba(54, 162, 235, 0.4)",
                  "rgba(255, 206, 86, 0.4)",
                  "rgba(75, 192, 192, 0.4)",
                  "rgba(153, 102, 255, 0.4)",
                  "rgba(255, 159, 64, 0.4)",
                ],
                borderColor: [
                  "rgba(255, 99, 132,0.4)",
                  "rgba(54, 162, 235, 0.4)",
                  "rgba(255, 206, 86, 0.4)",
                  "rgba(75, 192, 192, 0.4)",
                  "rgba(153, 102, 255, 0.4)",
                  "rgba(255, 159, 64, 0.4)",
                ],
                borderWidth: 1,
              },
            ],
          }}
          height={20}
          width={40}
          oprions={{
            maintainAspectRatio: false,
            scales: {
              yAxes: {
                beginAtZero: true,
              },
            },
          }}
        />
        <div></div>
        <Bar
          data={{
            labels: category,
            datasets: [
              {
                label: "Products per Category",
                data: countCategory,
                backgroundColor: [
                  "rgba(255, 99, 132,0.4)",
                  "rgba(54, 162, 235, 0.4)",
                  "rgba(255, 206, 86, 0.4)",
                  "rgba(75, 192, 192, 0.4)",
                  "rgba(153, 102, 255, 0.4)",
                  "rgba(255, 159, 64, 0.4)",
                ],
                borderColor: [
                  "rgba(255, 99, 132,0.4)",
                  "rgba(54, 162, 235, 0.4)",
                  "rgba(255, 206, 86, 0.4)",
                  "rgba(75, 192, 192, 0.4)",
                  "rgba(153, 102, 255, 0.4)",
                  "rgba(255, 159, 64, 0.4)",
                ],
                borderWidth: 1,
              },
            ],
          }}
          height={20}
          width={40}
          oprions={{
            maintainAspectRatio: false,
            scales: {
              yAxes: {
                beginAtZero: true,
              },
            },
          }}
        />
      </>
    );
  }
}

export default Admin;
