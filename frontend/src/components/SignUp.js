import React, { useState } from "react";
import "./SignUp.css";

function SignUp() {
	const [user, setUser] = useState(null);

	function handleSignUp() {}

	return (
		<div className="signUp">
			<label htmlFor="">Sign Up</label>
			<input
				type="text"
				placeholder="First Name"
				onChange={(e) => setUser({ ...user, firstName: e.target.value })}
			/>
			<input
				type="text"
				placeholder="Last Name"
				onChange={(e) => setUser({ ...user, lastName: e.target.value })}
			/>
			<input
				type="text"
				placeholder="Username"
				onChange={(e) => setUser({ ...user, username: e.target.value })}
			/>
			<input
				type="password"
				placeholder="Password"
				onChange={(e) => setUser({ ...user, password: e.target.value })}
			/>
			<button type="submit" onClick={handleSignUp}>
				Sign Up
			</button>
		</div>
	);
}

export default SignUp;
