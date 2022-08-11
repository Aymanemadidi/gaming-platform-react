import React, { useState } from "react";
import "./Login.css";

function Login() {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");

	function handleLogin() {}
	return (
		<div className="login">
			<label htmlFor="">Login</label>
			<input
				type="text"
				placeholder="Username"
				onChange={(e) => setUserName(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Password"
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button type="submit" onClick={handleLogin}>
				Login
			</button>
		</div>
	);
}

export default Login;
