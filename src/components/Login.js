import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
const Login = (props) => {
	let navigate=useNavigate();
	const [credentials, setCredentials] = useState({ email: "", password: "" })
	const handleOnchange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
	const handleSub = async (e) => {
		e.preventDefault();
		const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email: credentials.email, password: credentials.password })
		});
		const json =await response.json();
		if (json.authtoken) {
			props.alertFunc('Logged in successfully','success')
			localStorage.setItem('token',json.authtoken)
			navigate('/')
		}
		else{
			props.alertFunc('Invalid login credentials','danger')
		}
	}
	return (
		<div>
			<form className='my-2' onSubmit={handleSub}>
			<div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={handleOnchange} id="email" name="email" aria-describedby="emailHelp" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={handleOnchange} name="password" id="password" minLength={8} required/>
                </div>
				<button type="submit" className="btn btn-danger my-4">Log In</button>
			</form>
		</div>
	)
}

export default Login
