import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'


import './App.css'
import Chat from './pages/Chat.jsx'
import Signup from './pages/Signup.jsx';
import Login from './pages/login.jsx';
import Logout from './pages/logout.jsx';

function App() {

  return (
    <BrowserRouter>
    <Link to = '/logout' ><button>Logout</button></Link>
    <Link to = '/login' ><button>Login</button></Link>
    <Link to = 'signup' ><button>Signup</button></Link>
    <Routes>
      <Route path='/' element={<Signup/>}/>
      <Route path='/chat' element={<Chat/>} />
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/logout' element = {<Logout/>/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
