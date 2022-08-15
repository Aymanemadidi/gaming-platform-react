import React from "react";
import { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import Game from "./Game";

function JoinGame({ nameOfUser }) {
	const [rivalUsername, setRivalUsername] = useState("");
	const [channel, setChannel] = useState(null);
	const { client } = useChatContext();

	async function createChannel() {
		const response = await client.queryUsers({ name: { $eq: rivalUsername } });
		if (response.users.length === 0) {
			alert("User Not Found");
			return;
		}
		const newChannel = client.channel("messaging", {
			members: [client.userID, response.users[0].id],
		});

		await newChannel.watch();
		setChannel(newChannel);
	}

	return (
		<>
			{channel ? (
				<Channel channel={channel}>
					<Game rival={rivalUsername} />
				</Channel>
			) : (
				<div className="joinGame">
					<p>Hello {nameOfUser}</p>
					<h4>Create Game</h4>
					<input
						type="text"
						value={rivalUsername}
						placeholder="Username of rival"
						onChange={(e) => setRivalUsername(e.target.value)}
					/>
					<button onClick={createChannel}>Join/Start Game</button>
				</div>
			)}
		</>
	);
}

export default JoinGame;
