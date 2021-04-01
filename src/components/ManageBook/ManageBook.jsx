import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { userInfoContext } from "../../App";
import ManageBookList from "../ManageBookList/ManageBookList";
import "./ManageBook.css";

const ManageBook = () => {
  const {
    loadingSpinner,
    setLoadingSpinner,
    loadAllBook,
    bookList,
  } = useContext(userInfoContext);

  useEffect(() => {
    setLoadingSpinner(true);
    loadAllBook();
  }, [setLoadingSpinner]);

  return (
    <div className="p-4 mt-5 manage-book">
      {loadingSpinner && (
        <div className="spinner">
          Reload... <Spinner animation="border" variant="dark" />
        </div>
      )}
      <table class="table table-dark table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">BOOK NAME</th>
            <th scope="col">AUTHOR</th>
            <th scope="col">PRICE</th>
            <th scope="col">ACTION</th>
          </tr>
        </thead>

        <tbody>
          {bookList.map((book, index) => (
            <ManageBookList
              key={book._id}
              book={book}
              index={index}
            ></ManageBookList>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBook;
