import React,{useState} from "react";
import './UserProfile.css';

function UserProfile() {
    const [newMessage,setNewMessage]=useState('');
    const [messages,setMessages]=useState([
        {from :'User 1',content:'Hey, great Roast'},
        {from:'User 2', content:'man you nailed it'},
    ]);

    const handleSendMessages=()=>{
        if(newMessage.trim()){
            setMessages([...messages,{from:'You',content:newMessage}]);
        }
    };

    return (
        <div className="user-profile">
            <h1>User Profile</h1>
            <section className="section">
                <h2>Replies</h2>
                <p>Reply from User1:Great post!</p>
                <div className="item">
                    <p>Reply from User2: I totally agree with your point.</p>
                </div>
            </section>

            <section className="section">
                <h2>Followers</h2>
                <div className="item">
                    <p>User1</p>
                </div>
                <div className="item">
                    <p>User2</p>
                </div>
                <div className="item">
                    <p>User3</p>
                </div>
            </section>

            <section className="section">
                <h2>Personal message</h2>
                {messages.map((message, index)=>{
                    <div key={index} className="item">
                        <p>From {message.from}:{message.content}</p>
                    </div>
                })}
                <div className="new-message">
                    <input
                    type="text"
                    value={newMessage}
                    onChange={(e)=>setNewMessage(e.target.value)}
                    placeholder="Type a new message..."
                    ></input>
                    <button onClick={handleSendMessages}></button>
                </div>
            </section>
        </div>
    )
}

export default UserProfile;