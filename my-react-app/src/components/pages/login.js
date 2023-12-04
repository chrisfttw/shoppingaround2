import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../googledatebase/config";
import { getAuth, signOut } from "firebase/auth";


const Login = () => {
  const [err,setErr] = useState(false);
  const navigate = useNavigate();
  
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

  const auth = getAuth();
  signOut(auth).then(() => {
  // Sign-out successful.
  }).catch((error) => {
  // An error happened.
  });

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