/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "./Modal";
import PropTypes from "prop-types";

const ListHeader = ({ listName, getData }) => {
	const [showModal, setShowModal] = useState(false);
	const signOut = () => {
		console.log(showModal);
	};

	return (
		<div className="list-header">
			<h1>{listName}</h1>
			<div className="button-container">
				<button className="create" onClick={() => setShowModal(true)}>
					Add New
				</button>
				<button className="sign-out" onClick={signOut}>
					Sign Out
				</button>
			</div>
			{showModal && (
				<Modal mode={"create"} setShowModal={setShowModal} getData={getData} />
			)}
		</div>
	);
};
// Type Validation
ListHeader.propTypes = {
	listName: PropTypes.string.isRequired,
};

export default ListHeader;
