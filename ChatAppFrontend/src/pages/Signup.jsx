import { useState } from "react"
import axios from 'axios';

const Signup = () =>{
    
    const [user, setUser] = useState({name:"", email:"", password:""})

    const handleChange = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        
        axios.post("http://localhost:8080/register", user).then((res)=>{
            console.log(res.data);
            setUser({name:"", email:"", password:""});
            alert(`Registeration successfull with name, ${res.data.name} `);
        }).catch((err)=>{
            console.log(`you got some error while Regstering! :- ${err}`);
        })
    }

    return(
        <>
        <h1> Register For Community Group Chat</h1>
        <form onSubmit={ handleSubmit }>
            
            <label htmlFor="name">Name</label>
            <input type = "text" name = "name" value = {user.name} onChange = {handleChange}/>
            <label htmlFor="email">Email</label>
            <input type = "email" name = "email" value = {user.email} onChange = {handleChange}/>
            <label htmlFor="password">Password</label>
            <input type = "password" name = "password" value = {user.password} onChange = {handleChange}/>
            <button type="submit">Reginster</button>
        </form>
        </>
    )
}

export default Signup;
