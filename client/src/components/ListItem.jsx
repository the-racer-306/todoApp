import { useState } from "react";
import TickIcon from "../TickIcon";
import Modal from "./Modal";
// import ProgressBar from "./ProgressBar";

/* eslint-disable react/prop-types */
const ListItem = ({ task, getData }) => {
	const [showModal, setShowModal] = useState(false);

	const deleteItem = async () => {
		try {
			const respose = await fetch(`http://localhost:8000/todos/${task.id}`, {
				method: "DELETE",
			});
			if (respose.status === 200) {
				getData();
			}
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<li className="list-item">
			<div className="info-container">
				<TickIcon />
				<p className="task-title">{task.title}</p>
				{/* <ProgressBar /> */}
			</div>
			<div className="button-container">
				<button className="edit" onClick={() => setShowModal(true)}>
					Edit
				</button>
				<button className="delete" onClick={deleteItem}>
					Delete
				</button>
			</div>
			{showModal && (
				<Modal
					setShowModal={setShowModal}
					mode={"edit"}
					getData={getData}
					task={task}
				/>
			)}
		</li>
	);
};

export default ListItem;
