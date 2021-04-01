import React, { useContext, useState } from 'react';
import { userInfoContext } from '../../App';
import './Login.css';
import { createUserWithEmailAndPassword, initializationLoginFramework, signInWithEmailAndPassword, signInWithGoogle } from './LoginManager';
import googleIcon from '../../img/icon/google.png';
import { Spinner } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';

const Login = () => {

    initializationLoginFramework();

    const {setLoggedInUser, loadingSpinner, setLoadingSpinner} = useContext(userInfoContext);
    const [login, setLogin] = useState(true);

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });


    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const handleResponse = (res, success) => {
        setUser(res);
        setLoggedInUser(res);
        setLoadingSpinner(false);
        if (success) {
            history.replace(from);
        }
    }

    const handleFormData = (e) => {
        let isValid = true;
        if (e.target.name === "email") {
            isValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === "password") {
            isValid = e.target.value.length > 5;
        }
          if (e.target.name === "confirmPassword") {
            isValid = e.target.value.length > 5;
        }
        if (isValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }


    const handleSubmitFormData = (e) => {
        e.preventDefault();

        if (!login && user.password === user.confirmPassword && user.name !== "" && user.email && user.password) {
            setLoadingSpinner(true);
            createUserWithEmailAndPassword(user.name, user.email, user.password)
            .then(res => {
                handleResponse(res, res.success);
            })
        }

        if (login && user.email && user.password) {
            setLoadingSpinner(true);
            signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
                handleResponse(res, res.success);
            })
        }
    }

    const handleSignInWithGoogle = () => {
        signInWithGoogle()
        .then(res => {
            setUser(res);
            setLoggedInUser(res);
            history.replace(from);
        }) 
    }



    return (
        <div className="form">
            <div className="form-container rounded bg-dark p-3">
            <div>
                <button className={login ? "choose-btn" : "choose-btn btn-dark"} type="button" onClick={() => setLogin(true)}>LogIn</button>
                <button className={!login ? "choose-btn" : "choose-btn btn-dark"} type="button" onClick={() => setLogin(false)}>Sign In</button>
            </div>
            <form onSubmit={handleSubmitFormData}>
                {
                    !login && <input onBlur={handleFormData} className="form-control my-3" name="name" type="text" placeholder="Name" required />
                }
                <input onBlur={handleFormData} className="form-control my-3" name="email" type="email" placeholder="Email" required />
                <input onBlur={handleFormData} className="form-control my-3" name="password" type="password" placeholder="Password" required />
                {
                    !login && <input onBlur={handleFormData} className="form-control my-3" name="confirmPassword" type="password" placeholder="Confirm Password" required />
                }
                {
                    !login && user.password !== "" && user.confirmPassword !== "" && (user.password !== user.confirmPassword) ? <div><small className="text-danger">Password Not matched.</small><br/></div> : ''
                }
                {
                    !login ? <small className="text-info">Password should greater then 5 characters.</small> : ''
                }
                <input onClick={handleSubmitFormData} className="form-control btn btn-primary my-3" type="submit" value={login ? "Log In" : "Sign In"} />
            </form>
            {
                user.error !== "" ? <small className="text-danger">{user.error}</small> : <small className="text-success">{login ? "Login" : "User Created"} Successfully.</small>
            }
            {
                loadingSpinner && <div>
                     <Spinner animation="grow" variant="warning" size="sm" />
                     <Spinner animation="grow" variant="info" size="sm" />
                     <Spinner animation="grow" variant="light" size="sm" />
                </div>
            }
            <br/>
            <h3 className="text-warning">Or</h3>
            <br/>
            <button onClick={handleSignInWithGoogle} className="btn btn-danger w-100" type="submit"><img className="googleIcon" src={googleIcon} alt=""/> Continue with Google</button>
        </div>
        </div>
    );
};
export default Login;