import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'


import './App.css'
import Chat from './pages/Chat.jsx'
import Signup from './pages/Signup.jsx';
import Login from './pages/login.jsx';

function App() {

  return (
    <BrowserRouter>
    <Link to = '/login' ><button>Login</button></Link>
    <Link to = 'signup' ><button>Signup</button></Link>
    <Routes>
      <Route path='/' element={<Signup/>}/>
      <Route path='/chat' element={<Chat/>} />
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
