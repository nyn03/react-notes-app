import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const host = 'http://localhost:5011';

    const [credentials, setCredentials] = useState({ email: "", password: "" })

    let navigate = useNavigate()

    const clickLogin = async (e) => {
        e.preventDefault()
        
        const url = `${host}/api/auth/login`
    
        const response = await fetch(
          url,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
          }
        )
        const json = await response.json();
        
        if(json.success) {
            // save auth token and redirect
            localStorage.setItem('token', json.authToken)
            navigate("/notes")
            return;
        } 

        alert("Invalid credentials");
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="container my-3">
            <h2>Login</h2>
            <form onSubmit={clickLogin}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp"
                        onChange={onChange}
                        value={credentials.email} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="password"
                        onChange={onChange}
                        value={credentials.password} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login