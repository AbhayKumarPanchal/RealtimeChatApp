import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useLocation } from 'react-router-dom';

const socket = io('http://localhost:8080');

function Chat() {

  const location = useLocation();
  const userName = location.state?.userName || "Anonymous";
  const userId = location.state?.userId || "none";
  // console.log(userName)


  const [chat, setChat] = useState([]);
  const [name, setName] = useState(userName);
  const [message, setMessage] = useState('');

  //jb bhi naya msg aayega ye trigger hoga
  useEffect(() => {
    socket.on('chat message', (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      socket.emit('chat message', { name, message }); 
      setMessage('');
    }
  };

  const handleLogout = (e) =>{
    e.preventDefault();
    axios.delete(`http://localhost:8080/logout/{userId}`).then((res) => {
      console.log(res.data);
      return(`deleted data :- ${res.data});
    }).catch((err)=>{
      console.log(`got some error while deleting ${err});
      return(err);
    })
  }

  return (
    <div >
      <h2>Real-time Chat</h2>
      <input type="text" name="name" value={name} readOnly={true} />

      <ul>
        {chat.map((msg, index) => (
          <li key={index} >
            <strong >{msg.name}</strong><br/>
            {msg.message}
          </li>
        ))}
      </ul>

      <form onSubmit={sendMessage}>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type message..." />
        <button type = "submit">Send</button>
      </form>
    </div>
      <button onClick = {handleLogout}>UserLogout</button>
  );
}

export default Chat;
