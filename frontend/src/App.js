import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
	return (
		<div className="App sign-log-container">
			<SignUp />
			<Login />
		</div>
	);
}

export default App;
