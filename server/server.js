const PORT = process.env.PORT || 8000;
const cors = require("cors");
const express = require("express");
const app = express();
const pool = require("./db");
const { v4: uuidv4 } = require("uuid");

app.use(cors());
app.use(express.json()); // Add this line for body parsing

// get all todos
app.get("/todos/:userEmail", async (req, res) => {
	const { userEmail } = req.params;
	try {
		const todos = await pool.query(
			"SELECT * FROM todos WHERE user_email = $1",
			[userEmail]
		);
		res.json(todos.rows);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "An error occurred" });
	}
});

// create a new todo
app.post("/todos", async (req, res) => {
	const { user_email, title, progress, date } = req.body;
	console.log(user_email, title, progress, date);
	const id = uuidv4();
	try {
		const newTodo = await pool.query(
			`INSERT INTO todos (id, user_email, title, progress, date) VALUES ($1, $2, $3, $4, $5)`,
			[id, user_email, title, progress, date]
		);
		res.json({ message: "Todo created successfully!" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "An error occurred" });
	}
});

// edit a todo
app.put("/todos/:id", async (req, res) => {
	const { id } = req.params;
	const { user_email, title, progress, date } = req.body;
	try {
		await pool.query(
			"UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5",
			[user_email, title, progress, date, id]
		);
		res.json({ message: "Todo updated successfully!" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "An error occurred" });
	}
});

// delete a todo
app.delete("/todos/:id", async (req, res) => {
	const { id } = req.params;
	try {
		await pool.query("DELETE FROM todos WHERE id=$1", [id]);
		res.json({ message: "Todo deleted successfully!" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "An error occurred" });
	}
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
