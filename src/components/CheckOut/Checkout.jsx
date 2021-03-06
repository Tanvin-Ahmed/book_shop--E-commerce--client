import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { userInfoContext } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import "./Checkout.css";
import { Spinner } from "react-bootstrap";

const Checkout = () => {
  const { loggedInUser, loadingSpinner, setLoadingSpinner } = useContext(
    userInfoContext
  );
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    setLoadingSpinner(true);
    fetch(`https://pumpkin-pie-72688.herokuapp.com/chosenBook/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoadingSpinner(false);
      });
  }, [id, setLoadingSpinner]);

  const handleOrder = () => {
    const id = Math.floor(Math.random() * 10000000000).toString();

    const d = new Date();
    const date = d.toLocaleDateString();
    const time = d.toLocaleTimeString();

    const email = loggedInUser.email;
    const displayName = loggedInUser.displayName;

    const newCheckout = { ...product };
    newCheckout._id = id;
    newCheckout.date = date;
    newCheckout.time = time;
    newCheckout.email = email;
    newCheckout.displayName = displayName;

    fetch("https://pumpkin-pie-72688.herokuapp.com/placeOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCheckout),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Order placed Successfully");
      });
  };

  return (
    <div className="product-checkout">
      <div className="container">
        {loadingSpinner && (
          <div className="text-center">
            <Spinner animation="grow" variant="primary" />{" "}
            <Spinner animation="grow" variant="secondary" />{" "}
            <Spinner animation="grow" variant="success" />{" "}
          </div>
        )}
        {!loadingSpinner && (
          <div className="card mb-3 chosenProduct-card">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  id="card-img"
                  className="card-img"
                  src={product.imageURL}
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h3 className="card-title">{product.name}</h3>
                  <h5 className="card-text">Author: {product.author}</h5>
                  <h6 className="card-text">Quantity: 1</h6>
                  <h6 className="card-text">Price: {product.price} $</h6>
                  <p className="card-text mt-5">
                    <button
                      onClick={handleOrder}
                      type="submit"
                      className="btn btn-primary"
                    >
                      <FontAwesomeIcon icon={faCartPlus} /> Order
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
