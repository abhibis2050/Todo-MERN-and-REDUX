import React, { useState } from "react";
import { useDispatch,useSelector } from 'react-redux'
import { signupUser } from "../reducers/authReducer";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState("Sign In");

  const dispatch = useDispatch()

  const authenticate = ()=>{
    if(auth==="Sign In"){
      
    }else{
      dispatch(signupUser({email:email,password:password}))
    }

  }
  return (
    <div>
      <h1> Please {auth}</h1>
      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {auth === "Sign In" ? (
        <h6 onClick={()=>setAuth("Sign Up")}>Don't Have An Account ?</h6>
      ) : (
        <h6 onClick={()=>setAuth("Sign In")}>Already Have An Account</h6>
      )}
      <button className="btn" onClick={()=>authenticate()} >{auth} </button>
    </div>
  );
};

export default Auth;
