// import { GoogleLogin } from "react-google-login";
// import { auth } from "../googledatebase/config";
// import { GoogleAuthProvider } from "firebase/auth";
// import { useState } from "react";

// const clientId = "14744009432-b7jqrtdpqiqshgpa345fgr1os5ej7n1l.apps.googleusercontent.com";

// function Login({ onClick, isLoading }) {
    

//     const onSuccess = (res) => {
//         console.log("LOGIN SUCCESS Current user: ", res.profileObj);
//     };
//     const onFailure = (res) => {
//         console.log("LOGIN FAILED res: ", res);
//     };

//     const renderButton = (props) => (
//         <button
//             onClick={props.onClick}
//             disabled={props.disabled}
//             className="custom-login-button"
//         >
//             Sign in with Google
//         </button>
//     );

//     return (
//         <button onClick={onClick} disabled={isLoading} className="custom-login-button">
//           {isLoading ? <div className="spinner"></div> : "Sign in with Google"}
//         </button>
//       );
// }

// export default Login;