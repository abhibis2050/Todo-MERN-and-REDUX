import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInUser, signupUser } from "../reducers/authReducer";
import '../App.css';

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState("Sign In");

  const { loading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const authenticate = () => {
    if (auth === "Sign In") {
      dispatch(signInUser({ email: email, password: password }));
    } else {
      dispatch(signupUser({ email: email, password: password }));
    }
  };
  return (
    <div>
      {loading && (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      )}
      <h1> Please {auth}</h1>
      {error && <h5>{error}</h5>}

      <div className="emailDiv">
        <label>
          <h4>Email</h4>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="passwordDiv">
        <label>
          <h4>Password</h4>
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {auth === "Sign In" ? (
        <h6 onClick={() => setAuth("Sign Up")}>Don't Have An Account ?</h6>
      ) : (
        <h6 onClick={() => setAuth("Sign In")}>Already Have An Account</h6>
      )}
      <button className="btn" onClick={() => authenticate()}>
        {auth}{" "}
      </button>
    </div>
  );
};

export default Auth;
