import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { userInfoContext } from "../../App";
import { useParams } from "react-router";
import { event } from "jquery";
import { useForm } from "react-hook-form";

const EditBook = () => {
  const { id } = useParams();
  const { loadAllBook } = useContext(userInfoContext);
  const [update, setUpdate] = useState({});

  useEffect(() => {
    fetch(`https://pumpkin-pie-72688.herokuapp.com/chosenBook/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUpdate(data);
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
            <button type="submit" className="btn btn-warning form-control my-3">
              <FontAwesomeIcon icon={faCloudUploadAlt} /> Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
