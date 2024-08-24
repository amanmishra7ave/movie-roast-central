import React,{useState} from "react";
import './Auth.css';

const Login=()=>{
    const [name,setName]=useState('');
    const [password,setPassword]=useState('');

    const handleSubmit=(e)=>{
        e.preventDefualt();

        console.log('Login:',{name,password});
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Login to Movie Roast Central</h2>
                <input
                type="name"
                placeholder="name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                required
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;