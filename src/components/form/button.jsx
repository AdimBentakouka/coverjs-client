import "./button.css";

export const FormButton = (props) => {
	const { label, className = "", disabled, onClick = () => {} } = props;

	const createRipple = (event) => {
		const btn = event.currentTarget;

		const object = document.createElement("div");
		const diameter = Math.max(btn.clientWidth, btn.clientHeight);
		const radius = diameter / 2;

		object.style.width = object.style.height = `${diameter}px`;
		object.style.left = `${event.clientX - (btn.offsetLeft + radius)}px`;
		object.style.top = `${window.scrollY + event.clientY - (btn.offsetTop + radius)}px`;
		object.classList.add("ripple");

		btn.appendChild(object);

		setTimeout(() => removeCircle(btn), 1000);
	};

	const removeCircle = (btn) => {
		const ripple = btn.getElementsByClassName("ripple")[0];

		if (ripple) {
			ripple.remove();
		}
	};

	const clickEvent = (event) => {
		createRipple(event);
		onClick();
	};

	return (
		<button className={`${className ? `${className} ` : ""}form-btn`} type="submit" disabled={disabled} onClick={clickEvent}>
			{label}
		</button>
	);
};
