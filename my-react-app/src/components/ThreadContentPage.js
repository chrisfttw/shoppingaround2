import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../googledatebase/config.js';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import CreateReplyPopup from './CreateReplyPopup.js';

const ThreadContentPage = () => {
  const [thread, setThread] = useState(null);
  const { threadId } = useParams();
  const [isPopupOpen, setPopupOpen] = useState(false);

  //---POPUP LOGIC---
  const openPopup = () => {
    setPopupOpen(true);
  };
  const closePopup = () => {
    setPopupOpen(false);
  };

  //---CALL TO DB---
  const fetchThreadAndReplies = async () => {
    try {
      const threadDocRef = doc(db, 'threads', threadId);
      const threadDoc = await getDoc(threadDocRef);

      if (threadDoc.exists()) {
        const threadData = threadDoc.data();

        const repliesCollectionRef = collection(db, 'threads', threadId, 'replies');
        const repliesQuerySnapshot = await getDocs(repliesCollectionRef);
        const repliesData = repliesQuerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        repliesData.sort((a, b) => a.timestamp.toMillis() - b.timestamp.toMillis());

        setThread({ ...threadData, replies: repliesData });
      } else {
        console.error('Thread not found');
      }
    } catch (error) {
      console.error('Error fetching thread:', error);
    }
  };

  //---USE EFFECT---
  useEffect(() => {
    fetchThreadAndReplies();
  }, [threadId]);

  //---CONSOLE CHECK---
  const handleReplySubmit = (replyContent) => {
      console.log('Submitting reply to the database:', replyContent);
  };

  //---ERROR CHECK FOR NO THREAD---
  if (!thread) {
    return <div>Problem Loading...</div>;
  }

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

  //---THREAD CONTENT PAGE---
  return (
    <div className="page">
      <div className="threadContentPage">
        <div className="threadTitleAndContent">
          <h1>{thread.title || 'Thread Title Not Found'}</h1>
          <h3 className='threadUser'>from {thread.userThread}</h3>
          <p>{thread.content || 'Thread Content Not Found'}</p>
        </div>
      </div>
      <div className="replies">
        {thread.replies &&
          thread.replies.map((reply) => (
            <div key={reply.id} className="replyCard">
              <h3 className='replyUser'>from {reply.user}</h3>
              <p className='reply'>{reply.content}</p>
              <p className='replyTime'>{calculateTimeDifference(reply.timestamp.toDate())}</p>
            </div>
          ))}
      </div>
      <button onClick={openPopup} className='replyButtonForPopup'>Reply</button>
      {isPopupOpen && (
        <CreateReplyPopup
          onClose={closePopup}
          threadId={threadId}
          fetchThreadAndReplies={fetchThreadAndReplies}
          onSubmit={handleReplySubmit}
        />
      )}
    </div>
  );
};

export default ThreadContentPage;
