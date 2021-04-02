import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import Books from "../Books/Books";
import { Spinner } from "react-bootstrap";
import { userInfoContext } from "../../App";
import headerImg from "../../img/logo/header.png";
import facebook from "../../img/icon/Facebook.png";
import twitter from "../../img/icon/Twitter.png";
import youtube from "../../img/icon/YouTube.png";

const Home = () => {
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
    <div className="home">
      <div className="container top-padding">
        <div className="header">
          <div className="row mb-5 p-5 rounded">
            <div className="col-md-6 col-sm-12">
              <div className="part m-auto header">
                <h3>Welcome to</h3>
                <h2 className="title">PROGRAMMING BOOK STORE</h2>
                <p className="header-text">
                  World best E-Programming book store. In here you find any kind
                  of program related book. To make easy to learn Program we
                  build this e-store. Every famous writer's book find in here.
                </p>
                <h6>
                  Keep learning Program. Proved yourself and make revolutionary
                  change in the world.
                </h6>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="part m-auto img">
                <img className="header-img" src={headerImg} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="search-bar text-center mb-5">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            class="form-control"
            type="text"
            placeholder="Search Book by Name"
          />
        </div>
        {loadingSpinner && (
          <div className="spinner">
            <Spinner animation="border" variant="primary" />
          </div>
        )}
        <div class="row row-cols-1 row-cols-md-3 g-4">
          {!loadingSpinner &&
            bookList
              .filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (
                  val.name.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((book) => <Books key={book._id} book={book}></Books>)}
        </div>
      </div>
      <footer className="bg-dark p-5 mt-5">
        <h2 className="text-light text-center">Follow Us</h2>
        <h4 className="text-light text-center">PROGRAMMING BOOK STORE</h4>
        <div className="text-center">
          <a href="https://www.facebook.com/rokomari/" target="_blank">
            <img className="footer-icon" src={facebook} alt="" />
          </a>
          <a href="https://twitter.com/rokomaridotcom?lang=en" target="_blank">
            <img className="footer-icon" src={twitter} alt="" />
          </a>
          <a
            href="https://www.youtube.com/channel/UCMtGHnB-gqavI2L0d8SP2xg"
            target="_blank"
          >
            <img className="footer-icon" src={youtube} alt="" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
