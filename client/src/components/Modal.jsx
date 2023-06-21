/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";

const Modal = ({ mode, setShowModal, getData, task }) => {
	const editMode = mode === "edit" ? true : false;

	const [data, setData] = useState({
		user_email: editMode ? task.user_email : "khaled@test.com",
		title: editMode ? task.title : "",
		progress: editMode ? task.progress : 50,
		date: editMode ? task.date : new Date(),
	});

	const postData = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`http://localhost:8000/todos`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			if (response.status === 200) {
				{
					console.log("Worked");
					setShowModal(false);
					getData();
				}
			}
		} catch (err) {
			console.log("Error", err);
		}
	};

	const editData = async (e) => {
		e.preventDefault();
		try {
			const respose = await fetch(`http://localhost:8000/todos/${task.id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			if (respose.status === 200) {
				console.log("Edited");
				setShowModal(false);
				getData();
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData((data) => ({
			...data,
			[name]: value,
		}));
	};
	return (
		<div className="overlay">
			<div className="modal">
				<div className="form-title-container">
					<h3>{mode} Your Task</h3>
					<button onClick={() => setShowModal(false)}>X</button>
				</div>
				<form action="">
					<input
						type="text"
						required
						maxLength={30}
						placeholder="Your Task Goes Here"
						name="title"
						value={data.title}
						onChange={handleChange}
					/>
					<br />
					<label htmlFor="range">Drag to Select your current progress</label>
					<input
						id="range"
						type="range"
						required
						min={0}
						max={100}
						name="progress"
						value={data.progress}
						onChange={handleChange}
					/>
					<div className="progess">.Your Progess is {data.progress}%.</div>
					<input
						className={mode}
						type="submit"
						onClick={editMode ? editData : postData}
					/>
				</form>
			</div>
		</div>
	);
};

export default Modal;
