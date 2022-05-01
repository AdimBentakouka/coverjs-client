import { forwardRef, useEffect, useState } from "react";
import "./modal.css";
const Modal = forwardRef(({ title, onClose = () => {}, children }, ref) => {
	return (
		<div className="modal" ref={ref}>
			<div className="modal-container">
				<div className="modal-header">
					<div className="modal-header-title">{title}</div>
					<span className="material-icons" onClick={onClose}>
						close
					</span>
				</div>
				<div className="modal-content">{children}</div>
			</div>
		</div>
	);
});

export const useModal = (ref) => {
	const [showModal, setModal] = useState(false);

	useEffect(() => {
		const onClick = (event) => {
			if (ref.current && (event.target === ref.current || !ref.current.contains(event.target))) {
				setModal(false);
			}
		};

		const onEscaped = (event) => {
			if (event.key === "Escape") {
				setModal(false);
			}
		};

		if (showModal) {
			document.addEventListener("mousedown", onClick);
			document.addEventListener("keydown", onEscaped);
		}

		return () => {
			document.removeEventListener("mousedown", onClick);
			document.removeEventListener("keydown", onEscaped);

			if (showModal) {
				document.body.style.overflow = "auto";
			}
		};
	}, [showModal, ref]);

	document.body.style.overflow = showModal ? "hidden" : "auto";

	const toggleModal = (state = null) => {
		setModal(state ? state : !showModal);
	};

	return { showModal, toggleModal };
};

export default Modal;
