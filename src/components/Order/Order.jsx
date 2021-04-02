import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { userInfoContext } from "../../App";
import OrderList from "../OrderList/OrderList";
import "./Order.css";

const Order = () => {
  const { loggedInUser, loadingSpinner, setLoadingSpinner } = useContext(
    userInfoContext
  );
  const [orders, setOrders] = useState([]);
  const loadUserOrders = (loggedInUser) => {
    fetch(
      `https://pumpkin-pie-72688.herokuapp.com/getCurrentUserOrder?email=${loggedInUser.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoadingSpinner(false);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    setLoadingSpinner(true);
    loadUserOrders(loggedInUser);
  }, [loggedInUser, setLoadingSpinner]);

  const totalPrice = orders.reduce((totalPrice, order) => totalPrice + Number(order.price), 0);

  return (
    <div className="mt-5 p-5">
      <h2 className="text-center mb-5">Order Review</h2>
      <div className="order-table">
        {loadingSpinner && (
          <div className="loading-spinner">
            <Spinner animation="border" variant="primary" />
          </div>
        )}
        <table class="table table-secondary table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Date</th>
              <th scope="col">Price</th>
              <th scope="col">Cancel</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <OrderList
                key={order._id}
                order={order}
                index={index}
                loadUserOrders={loadUserOrders}
              ></OrderList>
            ))}
          </tbody>
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Item: {orders.length} </th>
              <th scope="col">Quantity: {orders.length} </th>
              <th scope="col"></th>
              <th scope="col">Total Price: {totalPrice} $ </th>
              <th scope="col"></th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default Order;
