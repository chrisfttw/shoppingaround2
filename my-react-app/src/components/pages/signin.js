import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../googledatebase/config.js";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  
  //------
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    //---CALL TO DB TO CREATE ACCOUNT---
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
      });

      await updateProfile(res.user, {
        displayName,
      });

      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  //---SIGNUP FORM---
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Create an account...</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="User Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign up</button>
          {err && <span>Problem creating an account...</span>}
        </form>
        <p>
          Have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
