import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { userInfoContext } from "../../App";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const EditBook = () => {
  const { id } = useParams();
  console.log(id);
  const { loadAllBook, loadingSpinner, setLoadingSpinner } = useContext(
    userInfoContext
  );
  const [update, setUpdate] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoadingSpinner(true);
    setError(false);
    fetch(`https://pumpkin-pie-72688.herokuapp.com/chosenBook/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUpdate(data);
        setLoadingSpinner(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, [id]);

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    const newUpdate = { ...update };
    newUpdate.name = data.name;
    newUpdate.price = data.price;
    newUpdate.author = data.author;

    console.log(newUpdate);

    fetch(`https://pumpkin-pie-72688.herokuapp.com/update/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUpdate),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Book Updated Successfully");
        loadAllBook();
      });
  };

  return (
    // for simplicity I use AddBook component form style
    <div className="p-4 mt-5 add-book">
      {error && (
        <div className="text-center text-danger">
          <h4>
            Please go to <Link to="/admin">Manage Book</Link> and select item
            first
          </h4>
        </div>
      )}

      {loadingSpinner && !error && (
        <div className="spinner">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {!loadingSpinner && !error && (
        <div className=" bg-primary p-4 rounded">
          <h2 className="text-light add-book-header">UPDATE BOOK</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-part">
              <input
                name="name"
                className="form-control my-3 mr-5"
                defaultValue={update.name}
                ref={register}
              />
              <input
                name="author"
                className="form-control my-3"
                type="text"
                defaultValue={update.author}
                ref={register}
              />
            </div>
            <div className="form-part">
              <input
                name="price"
                className="form-control my-3 mr-5"
                type="text"
                defaultValue={update.price}
                ref={register}
              />
              <button
                type="submit"
                className="btn btn-warning form-control my-3"
              >
                <FontAwesomeIcon icon={faCloudUploadAlt} /> Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditBook;
