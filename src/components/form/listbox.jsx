import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

import "./listbox.css";

export const ListBox = ({ id, currentValue, options, onChange }) => {
	const [isActive, setActive] = useState(false);

	const listBoxOptionsRef = useRef(null);

	useEffect(() => {
		const onClick = (event) => {
			if (listBoxOptionsRef.current && !listBoxOptionsRef.current.contains(event.target)) {
				setActive(false);
			}
		};
		if (isActive) {
			const currentItem = listBoxOptionsRef.current?.querySelector("#active");
			if (currentItem) {
				currentItem.scrollIntoView({ block: "center", inline: "nearest" });
			}
			document.addEventListener("mouseup", onClick);
		}

		return () => {
			document.removeEventListener("mouseup", onClick);
		};
	}, [isActive]);

	return (
		<div id={id} className="list-box-container">
			<div className="list-box-value" onClick={() => setActive(!isActive)}>
				<span>{currentValue}</span> <span className="material-icons">{!isActive ? "expand_more" : "expand_less"}</span>
			</div>
			<CSSTransition nodeRef={listBoxOptionsRef} in={isActive} timeout={250} classNames="fade" unmountOnExit>
				<div ref={listBoxOptionsRef} className="list-box-options">
					{options.map((item, index) => (
						<div
							key={item + index}
							id={currentValue === item ? "active" : ""}
							className="list-box-item"
							onClick={() => {
								if (isActive) {
									onChange(item, index);
									setActive(false);
								}
							}}
						>
							{item}
						</div>
					))}
				</div>
			</CSSTransition>
		</div>
	);
};
