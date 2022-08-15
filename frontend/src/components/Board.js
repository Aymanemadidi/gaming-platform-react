import React, { useState } from "react";
import { useChannelStateContext, useChatContext } from "stream-chat-react";
import Square from "./Square";

function Board() {
	const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
	const [player, setPlayer] = useState("X");
	const [turn, setTurn] = useState("X");

	const { channel } = useChannelStateContext();
	const { client } = useChatContext();

	async function chooseSquare(square) {
		if (turn === player && board[square] === "") {
			setTurn(player === "X" ? "O" : "X");
			if (channel) {
				await channel.sendEvent({
					type: "game-move",
					data: { square, player },
				});
			}
			setBoard(
				board.map((val, index) => {
					if (index === square && val === "") {
						return player;
					}
					return val;
				})
			);
		}
	}
	if (channel) {
		channel.on((event) => {
			if (event.type === "game-move" && event.user.id !== client.userID) {
				setBoard(
					board.map((val, index) => {
						if (index === event.data.square && val === "") {
							return event.data.player;
						}
						return val;
					})
				);
			}
		});
	}

	return (
		<div className="board">
			<div className="row">
				<Square
					chooseSquare={() => {
						chooseSquare(0);
					}}
					val={Board[0]}
				/>
				<Square
					chooseSquare={() => {
						chooseSquare(1);
					}}
					val={Board[1]}
				/>
				<Square
					chooseSquare={() => {
						chooseSquare(2);
					}}
					val={Board[2]}
				/>
			</div>
			<div className="row">
				<Square
					chooseSquare={() => {
						chooseSquare(3);
					}}
					val={Board[3]}
				/>
				<Square
					chooseSquare={() => {
						chooseSquare(4);
					}}
					val={Board[4]}
				/>
				<Square
					chooseSquare={() => {
						chooseSquare(5);
					}}
					val={Board[5]}
				/>
			</div>
			<div className="row">
				<Square
					chooseSquare={() => {
						chooseSquare(6);
					}}
					val={Board[6]}
				/>
				<Square
					chooseSquare={() => {
						chooseSquare(7);
					}}
					val={Board[7]}
				/>
				<Square
					chooseSquare={() => {
						chooseSquare(8);
					}}
					val={Board[8]}
				/>
			</div>
		</div>
	);
}

export default Board;
