import './App.css';
import NavBar from './components/Navbar/NavBar';
import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NoMatch from './components/NoMatch/NoMatch';
import Login from './components/Login/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Checkout from './components/CheckOut/Checkout';
import Admin from './components/Admin/Admin';
import Order from './components/Order/Order';

export const userInfoContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  // load All Book
  const [bookList, setBookList] = useState([]);
  const loadAllBook = () => {
    fetch("https://pumpkin-pie-72688.herokuapp.com/books")
      .then((res) => res.json())
      .then((data) => {
        setBookList(data);
        setLoadingSpinner(false);
      });
  };
  
  return (
    <userInfoContext.Provider value={{ loggedInUser, setLoggedInUser, loadingSpinner, setLoadingSpinner,loadAllBook, bookList }}>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/home'>
            <Home />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <PrivateRoute path='/checkout/:id'>
            <Checkout />
          </PrivateRoute>
          <PrivateRoute path='/order'>
            <Order/>
          </PrivateRoute>
          <PrivateRoute path='/admin'>
            <Admin />
          </PrivateRoute>
          <Route path='*'>
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </userInfoContext.Provider>
  );
}

export default App;
