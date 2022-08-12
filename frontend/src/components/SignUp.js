import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import "./SignUp.css";

function SignUp() {
	const cookies = new Cookies();
	const [user, setUser] = useState(null);

	function handleSignUp() {
		Axios.post("http://localhost:3001/signup", user).then((res) => {
			const { token, userId, firstName, lastName, username, hashedPassword } =
				res.data;
			cookies.set("token", token);
			cookies.set("userId", userId);
			cookies.set("firstName", firstName);
			cookies.set("lastName", lastName);
			cookies.set("username", username);
			cookies.set("hashedPassword", hashedPassword);
		});
	}

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
