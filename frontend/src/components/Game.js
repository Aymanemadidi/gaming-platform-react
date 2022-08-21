import React, { useEffect } from "react";
import { useState } from "react";
import {
	useChannelStateContext,
	Window,
	MessageList,
	MessageInput,
} from "stream-chat-react";
import Board from "./Board";
// import "./chat.css";

function Game({ rival, setChannel, logOut }) {
	const [result, setResult] = useState({ winner: "", state: "Starting" });
	const [status, setStatus] = useState("");
	const { channel } = useChannelStateContext();
	const [playersIn, setPlayersIn] = useState(channel.state.watcher_count === 2);
	channel.on("user.watching.start", (event) => {
		setPlayersIn(event.watcher_count === 2);
	});
	useEffect(() => {
		if (!playersIn) {
			setStatus("waiting");
			// async function check() {
			// 	console.log("check runned");
			// 	await channel.sendEvent({
			// 		type: "player-leaving",
			// 		data: { rival },
			// 	});
			// }
			// check();
		} else if (playersIn) {
			setStatus("ongoing");
		}
	}, [channel, playersIn, rival]);

	// channel.on((event) => {
	// 	if (event.type === "player-leaving") {
	// 		setStatus("waiting");
	// 	}
	// });

	if (status === "waiting") {
		return <div>Waiting for {rival} to join</div>;
	} else if (status === "ongoing") {
		return (
			<>
				<div>Game vs {rival}</div>
				<Board result={result} setResult={setResult} />
				<button
					onClick={async () => {
						await channel.stopWatching();
						setChannel(null);
					}}
				>
					Leave Game
				</button>
				<button onClick={logOut}>Log Out</button>
			</>
		);
	}
}

export default Game;
