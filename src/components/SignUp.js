import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react'

const SignUp = (props) => {
	let navigate=useNavigate();
	const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword:""})
	const handleOnchange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
	const handleSub = async (e) => {
		e.preventDefault();
		const {name,email,password}=credentials;
		const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/createuser`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({name, email, password })
		});
		const json =await response.json();
		if (json.success) {
			props.alertFunc('Account created successfully','success')
			localStorage.setItem('token',json.authtoken)
			navigate('/')
		}
		else{
			props.alertFunc('Failed to Sign Up','danger')
		}
	}
	return (
		<div>
			<form className='my-2' onSubmit={handleSub}>
				<div className="mb-3">
					<label htmlFor="name" className="form-label">Name</label>
					<input type="text" className="form-control" onChange={handleOnchange} id="name" name="name" aria-describedby="emailHelp"required/>
				</div>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">Email address</label>
					<input type="email" className="form-control" onChange={handleOnchange} id="email" name="email" aria-describedby="emailHelp"required/>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">Password</label>
					<input type="password" className="form-control" onChange={handleOnchange} name="password" id="password" required minLength={8}/>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">Confirm Password</label>
					<input type="password" className="form-control" onChange={handleOnchange} name="cpassword" id="cpassword" required minLength={8}/>
				</div>
				<button type="submit" className="btn btn-danger my-4">Sign Up </button>
			</form>
		</div>
	)
}

export default SignUp
