import { GoogleLogout } from "react-google-login";

const clientId = "14744009432-sho7uojc68bh2vltlv820e3in76d9843.apps.googleusercontent.com";

function Logout() {
    const onSuccess = () => {
        console.log("Log out successfull");
    }

    return (
        <div id="signOutButton">
            <GoogleLogout
                clientId={clientId}
                buttonText={"Logout"}
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default Logout;