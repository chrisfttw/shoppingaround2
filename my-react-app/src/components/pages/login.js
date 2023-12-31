import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth, signOut } from "firebase/auth";


const Login = () => {
  const [err,setErr] = useState(false);
  const navigate = useNavigate();
  
  //---LOGIN LOGIC---
  const handleSubmit = async (e)=> {
    e.preventDefault()
    const email = e.target[0].value;
    const password = e.target[1].value;

    try{
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    }
    catch(err){
      setErr(true);
    }
  }

  //---GET AUTH---
  const auth = getAuth();
  signOut(auth).then(() => {
  }).catch((error) => {
  });

  //---LOGIN FORM---
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Sign in...</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password"/>
          <button>Sign in</button>
          {err && <span>Problem creating an account...</span>}
        </form>
        <p>Don't have an account? <Link to="/signin">Register</Link></p>
      </div>
    </div>
  )
}

export default Login;