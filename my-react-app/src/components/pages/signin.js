import React from "react";

const Register = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Create an account...</span>
        <form>
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