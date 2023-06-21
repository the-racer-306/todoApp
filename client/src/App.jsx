import { useEffect, useState } from "react";
import ListItem from "./components/ListItem";
import ListHeader from "./components/ListHeader";

const App = () => {
	const userEmail = "khaled@test.com";
	const [tasks, setTasks] = useState(null);

	// get data function
	const getData = async () => {
		try {
			const response = await fetch(`http://localhost:8000/todos/${userEmail}`);
			const json = await response.json();
			setTasks(json);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	// sort by date
	const sortedTasks = tasks?.sort(
		(a, b) => new Date(a.date) - new Date(b.date)
	);

	return (
		<div className="app">
			<ListHeader listName={"Holiday tick list"} getData={getData} />
			{sortedTasks?.map((task) => (
				<ListItem key={task.id} task={task} getData={getData} />
			))}
		</div>
	);
};

export default App;
