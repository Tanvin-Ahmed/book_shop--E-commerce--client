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

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoadingSpinner(true);
    loadAllBook();
  }, [setLoadingSpinner]);

  return (
    <div className="p-4 mt-5 manage-book">
      <input
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control bg-dark text-light"
        type="text"
        placeholder="Search Book by Name for update or delete"
      />
      {loadingSpinner && (
        <div className="spinner">
          <Spinner animation="border" variant="dark" />
        </div>
      )}
      {!loadingSpinner && (
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
            {bookList
              .filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (
                  val.name.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((book, index) => (
                <ManageBookList
                  key={book._id}
                  book={book}
                  index={index}
                ></ManageBookList>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageBook;
