// import React from "react";

// const Chat = ({thread}) => {
//     return (
//         <div className="forumData">
//             <div className="flex">
//                 <div className="forumLatest">
//                     <a href="threadPage" className="postFull">
//                         <h1 className="threadTitle">Thread Title</h1>
//                         {/* <a href="threadPage" className="threadTile">Thread</a> */}
//                     </a>
//                     <a href="threadPage" className="postFull">
//                         <h1 className="threadTitle">Thread Title</h1>
//                         {/* <a href="threadPage" className="threadTile">Thread</a> */}
//                     </a>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Chat;

import React from 'react'
import Threads from '../Threads'
import Chatbox from '../Chatbox'

const chat = () => {
  return (
    <div className="chatHome">
        <div className="container">
            <Threads/>
        </div>
    </div>
  )
}

export default chat
