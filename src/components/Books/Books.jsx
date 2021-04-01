import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Books.css';

const Books = ({ book }) => {
  return (
      <div className="col my-3">
      <div className="card h-100">
        <img src={book.imageURL} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{book.name}</h5>
          <p className="card-text">Author : {book.author}</p>
        </div>
        <div id="card-footer" className="card-footer d-flex justify-content-between align-items-center">
          <h5 className = "text-primary">{book.price}$</h5>
          <Link to={`/checkout/${book._id}`}><button type="submit" className="btn btn-primary"><FontAwesomeIcon icon={faShoppingCart} /> Buy Now</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Books;
