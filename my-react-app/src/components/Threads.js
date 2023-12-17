import React, { useState, useEffect } from 'react';
import { db } from '../googledatebase/config.js';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { auth } from '../googledatebase/config.js';
import CreateThreadPopup from './CreateThreadPopup.js';

const ThreadsPage = () => {
  const [user, setUser] = useState(null);
  const [threads, setThreads] = useState([]);
  const [showCreateThread, setCreateThread] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);

  //---USER AUTH CHECK---
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  //---USER SIGNED IN ERROR CHECK---
  const handleCreateThreadClick = () => {
    if (user) {
      setCreateThread(!showCreateThread);
      setPopupOpen(true);
    } else {
      console.log('Please sign in to create a thread.');
    }
  };

  //---POPUP LOGIC---
  const openPopup = () => {
    if (user) {
      setPopupOpen(true);
    } else {
      console.log('Please sign in to create a thread.');
    }
  };
  const closePopup = () => {
    setPopupOpen(false);
  };

  //---CALL TO DB---
  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const threadsQuery = query(collection(db, 'threads'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(threadsQuery);
        const threadData = querySnapshot.docs.map(doc => {
          const { title, createdAt, userThread } = doc.data();
          const timeDifference = calculateTimeDifference(createdAt.toDate());
          return { id: doc.id, title, timeDifference, userThread };
        });
        setThreads(threadData);
      } catch (error) {
        console.error('Error fetching threads:', error);
      }
    };

    fetchThreads();
  }, []);

  //---LOGIC FOR DETERMING WHEN THREAD WAS MADE (M, H, D)---
  const calculateTimeDifference = (timestamp) => {
    const now = new Date();
    const timeDifferenceInMinutes = Math.round((now - timestamp) / (60 * 1000));

    if (timeDifferenceInMinutes < 60) {
      return `${timeDifferenceInMinutes}m`;
    } else if (timeDifferenceInMinutes < 1440) {
      const hours = Math.floor(timeDifferenceInMinutes / 60);
      return `${hours}h`;
    } else {
      const days = Math.floor(timeDifferenceInMinutes / 1440);
      return `${days}d`;
    }
  };

  //---CHAT HOME/LISTS ALL THE THREADS---
  return (
    <div className="chatHome">
      <div className="containerLeft">
        <div className="threads">
          {threads.map((thread) => (
            <a key={thread.id} href={`thread/${thread.id}`} className="postFull">
              <div className="threadCard">
                <h1 className="threadTitle">{thread.title}</h1>
                <p className="threadTime">{thread.timeDifference}</p>
                <p className='threadUser'>by {thread.userThread}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className='containerRight'>
          <button onClick={handleCreateThreadClick} className='createThreadButton'>
            {user ? 'Create Thread' : 'Sign In to Create Thread'}
          </button>
      </div>
      {isPopupOpen && <CreateThreadPopup onClose={closePopup} />}
    </div>
  );
};

export default ThreadsPage;
