import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import "./Login.css";

function Login() {
	const cookies = new Cookies();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	function handleLogin() {
		Axios.post("http://localhost:3001/login", { username, password }).then(
			(res) => {
				const { token, userId, firstName, lastName, username, hashedPassword } =
					res.data;
				cookies.set("token", token);
				cookies.set("userId", userId);
				cookies.set("firstName", firstName);
				cookies.set("lastName", lastName);
				cookies.set("username", username);
				cookies.set("hashedPassword", hashedPassword);
			}
		);
	}
	return (
		<div className="login">
			<label htmlFor="">Login</label>
			<input
				type="text"
				placeholder="Username"
				onChange={(e) => setUsername(e.target.value)}
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
