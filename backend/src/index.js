import express from "express";
import cors from "cors";
import { StreamChat } from "stream-chat";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
const app = express();

const port = 3001;

app.use(cors());
app.use(express.json());

const api_key = "wx44rd6ksw69";
const api_secret = process.env.development.local.SECRET_API; //REVEAL THIS TO WORK

const serverClient = StreamChat.getInstance(api_key, api_secret);

app.post("/signup", async (req, res) => {
	try {
		const { firstName, lastName, username, password } = req.body;
		const userId = uuidv4();
		const hashedPassword = await bcrypt.hash(password, 10);
		const token = serverClient.createToken(userId);
		res.json({ token, userId, firstName, lastName, username, hashedPassword });
	} catch (e) {
		res.json(e);
	}
});

app.get("/test", (req, res) => {
	res.send("hello");
});

app.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;
		const { users } = await serverClient.queryUsers({ name: username });
		if (users.length === 0) {
			return res.json({ message: "user not found" });
		}
		const token = serverClient.createToken(users[0].userId);
		const passwordMatch = await bcrypt.compare(
			password,
			users[0].hashedPassword
		);
		if (passwordMatch) {
			res.json({
				token,
				firstName: users[0].firstName,
				lastName: users[0].lastName,
				username,
				userId: users[0].userId,
			});
		}
	} catch (e) {
		res.json(e);
	}
});

app.listen(port, () => {
	console.log("Server running on port 3001");
});
