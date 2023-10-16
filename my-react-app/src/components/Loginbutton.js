import { GoogleLogin } from "react-google-login";

const clientId = "14744009432-sho7uojc68bh2vltlv820e3in76d9843.apps.googleusercontent.com";

function Login() {
    const onSuccess = (res) => {
        console.log("LOGIN SUCCESS Current user: ", res.profileObj);
    }
    const onFailure = (res) => {
        console.log("LOGIN FAILED res: ", res);
    }

    return(
        <div id="signInButton">
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

export default Login;