import "./input.css";

import { useState } from "react";

export const useInput = () => {
	const [InputForm, setInputForm] = useState({
		value: "",
		state: "",
		msg: "",
	});

	const handleChangeInput = (event) => {
		const { value } = event.target;

		setInputForm((state) => ({ ...state, value, state: "", msg: "" }));
	};

	const setState = (_state, _msg) => {
		setInputForm((state) => ({ ...state, state: _state, msg: _msg }));
	};

	return [InputForm, handleChangeInput, setState];
};

export const Input = (props) => {
	const {
		type = "text",
		name,
		value = "",
		label = "label",
		required,
		msg = "",
		state = "",
		autoComplete = "off",
		onChange = () => {},
	} = props;

	return (
		<div className={`form-input${state ? ` ${state}` : ""}`}>
			<label className={`input-label${value && " filled"}`} htmlFor={name}>
				{label}
			</label>
			<input id={name} type={type} name={name} value={value} onChange={onChange} required={required} autoComplete={autoComplete} />

			{state && <span className="material-icons input-icon">{state === "success" ? "done" : state}</span>}

			{msg && (
				<label className={`input-helper`} htmlFor={name}>
					{msg}
				</label>
			)}
		</div>
	);
};
