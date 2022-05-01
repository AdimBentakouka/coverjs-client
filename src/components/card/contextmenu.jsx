import { forwardRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useWindowDimensions from "Utils/hook/getdimension";

import "./contextmenu.css";

export const ContextMenu = forwardRef(({ name, anchorPoint = { y: 0, x: 0 }, isActive, children }, ref) => {
	const { width, height } = useWindowDimensions();
	const [offset, setOffset] = useState({ x: 0, y: 0 });

	useEffect(() => {
		if (ref.current) {
			const { scrollY, scrollX } = window;

			const { clientWidth: objectWidth, clientHeight: objectHeight } = ref.current;

			const isOutsideX = width - (anchorPoint.x - scrollX + objectWidth) < 0;
			const isOutsideY = height - (anchorPoint.y - scrollY + objectHeight) < 0;

			setOffset({ x: isOutsideX ? objectWidth : 0, y: isOutsideY ? objectHeight : 0 });
		}
	}, [ref, anchorPoint, height, width, isActive]);

	return (
		<div
			ref={ref}
			className="context-menu"
			style={{
				top: anchorPoint.y - offset.y,
				left: anchorPoint.x - offset.x < 0 ? 0 : anchorPoint.x - offset.x,
			}}
		>
			<div className="context-menu-title">{name}</div>
			{children}
		</div>
	);
});

export const LinkContextMenu = ({ to = "", icon = "", label = "" }) => {
	return (
		<Link to={to} className="context-menu-item">
			<span className="material-icons">{icon}</span> {label}
		</Link>
	);
};

export const ItemContextMenu = ({ onClick = () => {}, icon = "", label = "" }) => {
	return (
		<div className="context-menu-item" onClick={onClick}>
			<span className="material-icons">{icon}</span> {label}
		</div>
	);
};

export const useContextMenu = (ref) => {
	const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
	const [show, setShow] = useState(false);

	const handleContextMenu = (event) => {
		if (ref.current && ref.current.contains(event.target)) {
			event.preventDefault();

			setAnchorPoint({ x: event.pageX, y: event.pageY });
			setShow(true);
		} else {
			setShow(false);
		}
	};

	const toggleOff = () => {
		setShow(false);
	};

	useEffect(() => {
		const onEscaped = (event) => {
			if (event.key === "Escape") {
				setShow(false);
			}
		};

		document.addEventListener("wheel", toggleOff);
		document.addEventListener("scroll", toggleOff);
		document.addEventListener("mousedown", toggleOff);
		document.addEventListener("contextmenu", handleContextMenu);
		document.addEventListener("keydown", onEscaped);
		return () => {
			document.removeEventListener("wheel", toggleOff);
			document.removeEventListener("scroll", toggleOff);
			document.removeEventListener("mousedown", toggleOff);
			document.removeEventListener("contextmenu", handleContextMenu);
			document.removeEventListener("keydown", onEscaped);
		};
	});
	return { anchorPoint, show };
};
