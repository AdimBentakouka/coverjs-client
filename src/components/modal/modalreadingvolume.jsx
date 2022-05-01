import { forwardRef } from "react";
import { Link } from "react-router-dom";
import Modal from ".";

export const ModalContinueReadingVolume = forwardRef(({ title, currentPage, url, onClose = () => {} }, ref) => {
	return (
		<Modal ref={ref} title={title} onClose={onClose}>
			<Link className="modal-item" to={`${url}/${currentPage}`}>
				Reprendre à la <b>page {currentPage}</b>
			</Link>
			<Link className="modal-item" to={`${url}`}>
				Retourner sur la première page
			</Link>
		</Modal>
	);
});
