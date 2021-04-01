import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./OrderList.css";
import { userInfoContext } from "../../App";

const OrderList = ({ order, index, loadUserOrders }) => {
  const { loggedInUser } = useContext(userInfoContext);
  const handleCancelOrder = (id) => {
    fetch(`https://pumpkin-pie-72688.herokuapp.com/cancelOrder/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        loadUserOrders(loggedInUser);
      });
  };

  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>{order.name}</td>
      <td>1</td>
      <td>
        {order.time} <br /> {order.date}
      </td>
      <td>{order.price} $</td>
      <td>
        <button
          onClick={() => handleCancelOrder(order._id)}
          type="submit"
          className="btn btn-outline-danger"
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </td>
    </tr>
  );
};

export default OrderList;
