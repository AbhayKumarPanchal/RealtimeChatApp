import { useState } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Login = () =>{
    

    const navigate = useNavigate();
    const [user, setUser] = useState({name:"", password:""})

    const handleChange = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        
        axios.post("http://localhost:8080/login", user).then((res)=>{
            // console.log(res.data.name);
            setUser({name:"", password:""});
            console.log(`this is returned Data:- ${res.data.name}` )
            navigate('/chat', {state: {userName: res.data.name} } )
        }).catch((err)=>{
            console.log(`you got some error while Regstering! :- ${err}`);
        })
    }

    return(
        <>
        <h1> Login To The Community Group Chat </h1>
        <form onSubmit={ handleSubmit }>
            
            <label htmlFor="name">Name</label>&nbsp;
            <input type = "text" name = "name" value = {user.name} onChange = {handleChange}/><br></br><br></br>
            <label htmlFor="password">Password</label>&nbsp;
            <input type = "password" name = "password" value = {user.password} onChange = {handleChange}/><br></br>
            <button type="submit">Login</button>
        </form>
        </>
    )
}

export default Login;