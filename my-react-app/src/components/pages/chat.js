import { useState, useEffect } from "react";
import { ref, push, onValue } from "firebase/database";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth, database } from "../../googledatebase/config";

export default function Chat() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const messagesRef = ref(database, "messages");
    onValue(messagesRef, (snapshot) => {
      const messages = snapshot.val();
      if (messages) {
        setMessages(Object.values(messages));
      }
    });
  }, []);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    const user = auth.currentUser;
    if (user && newMessage) {
      const message = {
        id: new Date().getTime(),
        text: newMessage,
        user: {
          uid: user.uid,
          displayName: user.displayName,
        },
      };
      push(ref(database, "messages"), message);
      setNewMessage("");
    }
  };

  const handleGoogleSignIn = async () => {
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

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("SIGN OUT SUCCESS");
    } catch (error) {
      console.log("SIGN OUT FAILED", error);
    }
  };

  return (
    <div className="forum-container">
      {user ? (
        <div className="chat-container">
          <div className="messages-container">
            {messages.map((message) => (
              <div key={message.id} className="message">
                <p>{message.text}</p>
                <p className="user">{message.user.displayName}</p>
              </div>
            ))}
          </div>
          <div className="new-message-container">
            <input
              type="text"
              placeholder="Type your message here"
              value={newMessage}
              onChange={handleNewMessageChange}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      ) : (
        <div className="signin-container">
          <button onClick={handleGoogleSignIn} disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in with Google"}
          </button>
        </div>
      )}
    </div>
  );
}