// ThreadsPage.js
import React, { useState, useEffect } from 'react';
import { db } from '../googledatebase/config';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import CreateThreadButton from './pages/createThread';
import CreateThreadPopup from './CreateThreadPopup';

const ThreadsPage = () => {
  const [threads, setThreads] = useState([]);
  const [showCreateThread, setCreateThread] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleCreateThreadClick = () => {
    setCreateThread(!showCreateThread);
  }

  const openPopup = () => {
    setPopupOpen(true);
  };
  const closePopup = () => {
    setPopupOpen(false);
  };

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const threadsQuery = query(collection(db, 'threads'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(threadsQuery);
        const threadData = querySnapshot.docs.map(doc => {
          const { title, createdAt } = doc.data();
          const timeDifference = calculateTimeDifference(createdAt.toDate());
          return { id: doc.id, title, timeDifference };
        });
        setThreads(threadData);
      } catch (error) {
        console.error('Error fetching threads:', error);
      }
    };

    fetchThreads();
  }, []);

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

  return (
    <div className="chatHome">
      <div className="container">
        <div className="threads">
          {threads.map((thread) => (
            <a key={thread.id} href={`threadPage/${thread.id}`} className="postFull">
              <div className="threadCard">
                <h1 className="threadTitle">{thread.title}</h1>
                <p className="threadTime">{thread.timeDifference}</p>
                <div className="threadBody">{thread.content}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <aside className="createThread">
        <h1>Create a New Thread</h1>
        <button onClick={openPopup}>Create Thread</button>
        {/* <CreateThreadButton /> */}
      </aside>
      {isPopupOpen && <CreateThreadPopup onClose={closePopup} />}
    </div>
  );
};

export default ThreadsPage;
