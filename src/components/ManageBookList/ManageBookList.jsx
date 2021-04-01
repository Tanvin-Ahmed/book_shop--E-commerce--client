import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./ManageBookList.css";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { userInfoContext } from "../../App";

const ManageBookList = ({ book, index }) => {
    const {loadAllBook} = useContext(userInfoContext);
    const deleteBook = (id) => {
        fetch(`http://localhost:5000/deleteBook/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => {
            loadAllBook();
        })
    }
  return (
    <>
      <tr>
        <th scope="row">{index + 1}</th>
        <td>{book.name}</td>
        <td>{book.author}</td>
        <td>{book.price} $</td>
        <td>
          <Link to={`/admin/edit-book/${book._id}`} className="btn btn-primary mr-2 my-1">
            <FontAwesomeIcon icon={faEdit} />
          </Link>
          <button onClick={() => deleteBook(book._id)} className="btn btn-danger">
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </td>
      </tr>
    </>
  );
};

export default ManageBookList;
