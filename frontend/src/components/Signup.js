import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../context/alert/AlertContext";

const Signup = () => {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "", });

    const alertContext = useContext(AlertContext);  

    let navigate = useNavigate()
    const host = 'http://localhost:5011';

    const clickSignup = async (e) => {
        e.preventDefault();

        const url = `${host}/api/auth/createuser`
        const {name, email, password} = credentials;
        const response = await fetch(
          url,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, password})
          }
        )
        const json = await response.json();
        
        if(json.success) {
            // save auth token and redirect
            localStorage.setItem('token', json.authToken)
            alertContext.success('Signup successful');
            navigate("/notes")
            return;
        }

        alertContext.error('Error signup');
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="container my-3">
            <h2>Sign up</h2>
            <form onSubmit={clickSignup}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" name="name" className="form-control" id="name"
                        onChange={onChange}
                        value={credentials.name} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp"
                        onChange={onChange}
                        value={credentials.email} required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="password"
                        onChange={onChange}
                        value={credentials.password} required minLength={5}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm password</label>
                    <input type="cpassword" name="cpassword" className="form-control" id="cpassword"
                        onChange={onChange}
                        value={credentials.cpassword} required minLength={5}/>
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
        </div>
    )
}

export default Signup