import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../googledatebase/config";
const Register = () => {

  const handleSubmit = (e) => {
    e.preventDefault()
    const userName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        console.log(user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // .. 
      });
  }

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Create an account...</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="User Name"/>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password"/>
          <button>Sign up</button>
        </form>
        <p>Have an account? Login</p>
      </div>
    </div>
  )
}

export default Register;