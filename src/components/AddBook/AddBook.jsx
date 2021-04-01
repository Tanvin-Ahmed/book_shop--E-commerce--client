import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import "./AddBook.css";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { userInfoContext } from "../../App";

const AddBook = () => {
  const { loadingSpinner, setLoadingSpinner, loadAllBook } = useContext(
    userInfoContext
  );
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    price: "",
    imageURL: "",
  });

  const handleFormData = (e) => {
    const data = { ...formData };
    data[e.target.name] = e.target.value;
    setFormData(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/addBook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        loadAllBook();
        alert("Add to Database Successfully");
      });
  };

  const handleImageUpload = (e) => {
    setLoadingSpinner(true);
    const imageData = new FormData();
    imageData.set("key", "785be335abfe8116c2bb9a46ed6e4c98");
    imageData.append("image", e.target.files[0]);
    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        const data = { ...formData };
        data.imageURL = response.data.data.display_url;
        setFormData(data);
        setLoadingSpinner(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="p-4 mt-5 add-book">
      <div className=" bg-secondary p-4 rounded">
        <h2 className="text-light add-book-header">ADD BOOK</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-part">
            <input
              name="name"
              onBlur={handleFormData}
              className="form-control my-3 mr-5"
              type="text"
              placeholder="Name"
            />
            <input
              name="author"
              onBlur={handleFormData}
              className="form-control my-3"
              type="text"
              placeholder="Author"
            />
          </div>
          <div className="form-part">
            <input
              name="price"
              onBlur={handleFormData}
              className="form-control my-3 mr-5"
              type="text"
              placeholder="Price"
            />
            <input onChange={handleImageUpload} type="file" id="img" />
            <label
              htmlFor="img"
              className="btn btn-outline-light form-control my-3"
            >
              {loadingSpinner && (
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}{" "}
              <FontAwesomeIcon icon={faImage} /> Upload Image
            </label>
          </div>
          <div className="px-5 mt-5 text-center">
            <button
              onClick={handleSubmit}
              type="submit"
              className="btn btn-primary"
            >
              <FontAwesomeIcon icon={faCloudUploadAlt} /> Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
