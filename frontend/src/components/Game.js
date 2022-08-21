import React from "react";
import { useState } from "react";
import {
	useChannelStateContext,
	Window,
	MessageList,
	MessageInput,
} from "stream-chat-react";
import Board from "./Board";
// import "./chat.css";

function Game({ rival, setChannel }) {
	const [result, setResult] = useState({ winner: "", state: "Starting" });
	const { channel } = useChannelStateContext();
	const [playersIn, setPlayersIn] = useState(channel.state.watcher_count === 2);
	channel.on("user.watching.start", (event) => {
		setPlayersIn(event.watcher_count === 2);
	});
	if (!playersIn) {
		return <div>Waiting for {rival} to join</div>;
	}
	return (
		<>
			<div>Game vs {rival}</div>
			<Board result={result} setResult={setResult} />
			{/* <Window className="test">
				<MessageList
					disableDateSeparator
					closeReactionSelectorOnClick
					messageActions={["react"]}
					hideDeletedMessages
				/>
				<MessageInput noFiles />
			</Window> */}
			{/* CHAT */}
			<button
				onClick={async () => {
					await channel.stopWatching();
					setChannel(null);
				}}
			></button>
		</>
	);
}

export default Game;
