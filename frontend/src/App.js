import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import JoinGame from "./components/JoinGame";

function App() {
	const cookies = new Cookies();
	const token = cookies.get("token");
	const nameOfUser = cookies.get("username");
	const api_key = "wx44rd6ksw69";
	const client = StreamChat.getInstance(api_key);
	const [isAuth, setIsAuth] = useState(false);

	function logOut() {
		cookies.remove("token");
		cookies.remove("userId");
		cookies.remove("firstName");
		cookies.remove("lastName");
		cookies.remove("username");
		cookies.remove("hashedPassword");
		client.disconnectUser();
		setIsAuth(false);
	}

	useEffect(() => {
		if (token) {
			console.log("connect called");
			client
				.connectUser(
					{
						id: cookies.get("userId"),
						name: cookies.get("username"),
						firstName: cookies.get("firstName"),
						lastName: cookies.get("lastName"),
						hashedPassword: cookies.get("hashedPassword"),
					},
					token
				)
				.then((user) => {
					setIsAuth(true);
				});
		}
	}, []);

	return (
		<div className="App sign-log-container">
			{isAuth ? (
				<Chat client={client}>
					<JoinGame nameOfUser={nameOfUser} logOut={logOut} />
				</Chat>
			) : (
				<>
					<SignUp setIsAuth={setIsAuth} />
					<Login setIsAuth={setIsAuth} />
				</>
			)}
		</div>
	);
}

export default App;
