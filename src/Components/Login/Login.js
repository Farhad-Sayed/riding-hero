import React, { useContext, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import "./Login.css";
import googleIcon from '../../Assets/icons8-google-50.png';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Login = () => {
  const [newUser, setNewUser] = useState(true);
  const [user, setUser] = useState({
    isSignIn: false,
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  //   google sign in
  const handleGoogleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var { displayName, email } = result.user;
        const signedInUser = { name: displayName, email };
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((error) => {
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  // email-password sign in starts
  const handleSubmit = (event) => {
    if (newUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((result) => {
          const newUserInfo = { ...user };
          newUserInfo.isSignIn = true;
          newUserInfo.success = true;
          newUserInfo.error = "";
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.success = false;
          newUserInfo.error = error.message;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
        });
    }
    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((result) => {
          const newUserInfo = { ...user };
          newUserInfo.isSignIn = true;
          newUserInfo.success = true;
          newUserInfo.error = "";
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.success = false;
          newUserInfo.error = error.message;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
        });
    }

    event.preventDefault();
  };

  const handleBlur = (event) => {
    let isFieldValid = true;
    if (event.target.name === "email") {
      const re = /\S+@\S+\.\S+/;
      isFieldValid = re.test(event.target.value);
    }
    if (event.target.name === "password") {
      const re = /\d{1}/;
      const isPasswordValid = event.target.value.length > 6;
      const isPasswordHasNumber = re.test(event.target.value);
      isFieldValid = isPasswordValid && isPasswordHasNumber;

    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
      setLoggedInUser(newUserInfo);
    }
  };
  return (
    <div className="main">
      <div className="signInArea">
        <div className="signIn">
          <h1>{newUser ? 'Create an account': 'Login'}</h1>
          <br />
          <br />
          {/* email-pass sign in field */}
          <form onSubmit={handleSubmit}>
            {newUser && (
              <input
                className="input-field"
                onBlur={handleBlur}
                type="text"
                name="name"
                placeholder="Name"
              />
            )}
            <br />
            <input
              className="input-field"
              onBlur={handleBlur}
              type="email"
              name="email"
              id=""
              placeholder="Email"
              required
            />
            <br />
            <input
              className="input-field"
              onBlur={handleBlur}
              type="password"
              name="password"
              id=""
              placeholder="Password"
              required
            />
            <br />
            {newUser && (
            <input
              className="input-field"
              onBlur={handleBlur}
              type="password"
              name="confirmPassword"
              id=""
              placeholder="Confirm Password"
              required
            />)}
            <br />
            <input className="submit-btn" type="submit" value={newUser ? "Create an account" : "Login"} />{" "}
          </form> <br/>
          <input
            onChange={() => setNewUser(!newUser)}
            type="checkbox"
            name=""
            id=""
          />
          {newUser ? 
            <label htmlFor="newUser">Already hanve an account? Login (check box)</label>:
            <label htmlFor="newUser">Don't have an account? Create (check box)</label>
          } <br />
              {/* Without checkbox */}
              {/* <div style={{display:'flex', marginLeft:'4rem'}}>
                {newUser ? <h4>Already have an account?</h4> : <h4>Don't have an account?</h4>}
                <Link onClick={()=> setNewUser(!newUser)}>{newUser ? <p>Login</p>: <p>Crater an account</p>}</Link>
              </div> */}
          <p style={{ color: "red" }}>{user.error}</p>
          {user.success && (
            <p style={{ color: "green" }}>
              user {newUser ? "created" : "logged in"} successfully
            </p>
          )}
        </div>
        <p style={{textAlign:'center', marginBottom:'1rem'}}>or</p>
        <button className="google" onClick={handleGoogleSignIn}>
          <img style={{height:'25px', marginLeft:'30px', marginRight:'100px'}} src={googleIcon} alt=""/> 
          Continue With Google</button>
      </div>
    </div>
  );
};

export default Login;
