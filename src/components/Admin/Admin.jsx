import React from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks, faPlus, faPen } from "@fortawesome/free-solid-svg-icons";
import "./Admin.css";
import ManageBook from "../ManageBook/ManageBook";
import AddBook from "../AddBook/AddBook";
import EditBook from "../EditBook/EditBook";
import NoMatch from "../NoMatch/NoMatch";

const Admin = () => {
  const { path, url } = useRouteMatch();
  return (
    <div className="admin">
      
      <div className="part admin-panel">
        <h4 className="text-light panel-header">Admin Panel</h4>
        <ul className="nav-item">
          <Link to={`${url}`} className="link nav-link text-light">
            <FontAwesomeIcon icon={faTasks} /> Manage Book
          </Link>
          <Link to={`${url}/add-book`} className="link nav-link text-light">
            <FontAwesomeIcon icon={faPlus} /> Add Book
          </Link>
          <Link to={`${url}/edit-book/:id`} className="link nav-link text-light">
            <FontAwesomeIcon icon={faPen} /> Edit Book
          </Link>
        </ul>
      </div>

      <div className="part">
        <Switch>
          <Route exact path={path}>
            <ManageBook />
          </Route>
          <Route path={`${path}/add-book`}>
            <AddBook />
          </Route>
          <Route path={`${path}/edit-book/:id`}>
            <EditBook />
          </Route>
          <Route path={`${path}/*`}>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Admin;
