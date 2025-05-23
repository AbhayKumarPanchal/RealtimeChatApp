import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios'

const socket = io('http://localhost:8080');

function Chat() {

  const location = useLocation();
  const userName = location.state?.userName || "Anonymous";
  const userId = location.state?.userId || "none";
  const navigate = useNavigate();
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
    axios.delete(`http://localhost:8080/logout/${userId}`).then((res) => {
      // console.log(res.data);
      alert('userDeleted')
      navigate('/signup')
      return(`deleted data :- ${res.data}`);
    }).catch((err)=>{
      console.log(`got some error while deleting ${err}`);
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
      <button onClick = {handleLogout}>DeleteAccount</button>
    </div>
  );
}

export default Chat;
