import React, { useState } from "react";
import { useChannelStateContext, useChatContext } from "stream-chat-react";
import Square from "./Square";

function Board() {
	const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
	const [player, setPlayer] = useState("X");
	const [turn, setTurn] = useState("X");

	const { channel } = useChannelStateContext();
	const { client } = useChatContext();

	const chooseSquare = async (square) => {
		if (turn === player && board[square] === "") {
			setTurn(player === "X" ? "O" : "X");
			if (channel) {
				await channel.sendEvent({
					type: "game-move",
					data: { square, player },
				});
			}
			setBoard(
				board.map((val, idx) => {
					if (idx === square && val === "") {
						return player;
					}
					return val;
				})
			);
		}
	};

	if (channel) {
		channel.on((event) => {
			if (event.type === "game-move" && event.user.id !== client.userID) {
				const currentPlayer = event.data.player === "X" ? "O" : "X";
				setPlayer(currentPlayer);
				setTurn(currentPlayer);
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
					val={board[0]}
				/>
				<Square
					chooseSquare={() => {
						chooseSquare(1);
					}}
					val={board[1]}
				/>
				<Square
					chooseSquare={() => {
						chooseSquare(2);
					}}
					val={board[2]}
				/>
			</div>
			<div className="row">
				<Square
					chooseSquare={() => {
						chooseSquare(3);
					}}
					val={board[3]}
				/>
				<Square
					chooseSquare={() => {
						chooseSquare(4);
					}}
					val={board[4]}
				/>
				<Square
					chooseSquare={() => {
						chooseSquare(5);
					}}
					val={board[5]}
				/>
			</div>
			<div className="row">
				<Square
					chooseSquare={() => {
						chooseSquare(6);
					}}
					val={board[6]}
				/>
				<Square
					chooseSquare={() => {
						chooseSquare(7);
					}}
					val={board[7]}
				/>
				<Square
					chooseSquare={() => {
						chooseSquare(8);
					}}
					val={board[8]}
				/>
			</div>
		</div>
	);
}

export default Board;
