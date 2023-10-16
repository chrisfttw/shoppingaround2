import { useState } from "react";
import Login from "../Loginbutton";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../../googledatebase/config";

export default function Signin() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("LOGIN SUCCESS Current user: ", result.user);
    } catch (error) {
      console.log("LOGIN FAILED res: ", error);
    }
    setIsLoading(false);
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  return (
    <div className="main-container">
      {user ? (
        <div>
          <p>Welcome, {user.displayName}!</p>
          <button onClick={() => auth.signOut()}>Sign out</button>
        </div>
      ) : (
        <Login onClick={handleGoogleLogin} isLoading={isLoading} />
      )}
    </div>
  );
}