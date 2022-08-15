import React from "react";
import { useState } from "react";

function Game({ channel, rival }) {
	const [playersIn, setPlayersIn] = useState(channel.state.watcher_count === 2);
	channel.on("user.watching.start", (event) => {
		setPlayersIn(event.watcher_count === 2);
	});
	if (!playersIn) {
		return <div>Waiting for {rival} to join</div>;
	}
	return <div>Game vs {rival}</div>;
}

export default Game;
