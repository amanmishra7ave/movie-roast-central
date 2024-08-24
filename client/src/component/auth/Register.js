import React, {useState} from 'react';
import './Auth.css';

const Register=()=>{
    const [name,setName]=useState('');
    const [password,setPassword]=useState('');
    const [confirmpassword,setConfirmPassword]=useState('');
    const [error,setError]=useState('');

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(password !==confirmpassword){
          setError('Password dont match')
          return;
        }

        if(password.length<6){
          setError("Password must be at least 6 characters long")
        }

        console.log('Register:',{name,password,password});
    };

    return (
        <div className="auth-container">
          <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Join Movie Roast Central</h2>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="re-Password"
              value={confirmpassword}
              onChange={(e) =>setConfirmPassword(e.target.value)}
              required
            />
                        {error && <p className='error-message'>{error}</p>}

            <button type="submit">Register</button>
          </form>
        </div>
      )


};

export default Register;