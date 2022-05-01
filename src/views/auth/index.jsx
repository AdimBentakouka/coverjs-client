import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { FormButton } from "Components/form/button";
import { Input, useInput } from "Components/form/input";

import { Login as ServiceLogin, Register as ServiceRegister } from "Services/auth.service";
import * as AuthAction from "Store/actions/authAction";

import { emailValid, passwordValid, usernameValid } from "utils/form";

import "./auth.css";

const _Login = ({ setLogin }) => {
	const [email, emailHandleChangeInput, emailSetState] = useInput();
	const [password, passwordHandleChangeInput, passwordSetState] = useInput();
	const [errorMsg, setErrorMsg] = useState("");

	const onSubmit = (event) => {
		event.preventDefault();

		const emailVerif = emailValid(email?.value);
		const passwordVerif = passwordValid(password?.value);

		emailSetState(emailVerif?.state, emailVerif?.msg);
		passwordSetState(passwordVerif?.state, passwordVerif?.msg);

		if (isFormValid()) {
			ServiceLogin({ email: email.value, password: password.value })
				.then((response) => {
					const { token, refreshToken } = response;
					setLogin({ token, refreshToken });
				})
				.catch((error) => {
					if (error?.data === "Adresse e-mail introuvable !") {
						emailSetState("error", error?.data);
					} else if (error?.data === "Mot de passe incorrect !") {
						passwordSetState("error", error?.data);
					} else if (error?.data) {
						setErrorMsg(error?.data);
					} else {
						setErrorMsg("Une erreur est survenu, veuillez réessayer plus tard ...");

						emailSetState("error", "");
						passwordSetState("error", "");
					}
				});
		} else {
		}
	};

	const isFormValid = () => {
		return !email?.value || !password?.value ? false : true;
	};

	return (
		<div className="form-container">
			<form className="form-auth" onSubmit={onSubmit}>
				<h1 className="form-header">
					<span>CoverJS</span> Connexion
				</h1>
				{errorMsg && <p className="label-error">{errorMsg}</p>}

				<Input
					type="email"
					name="login"
					value={email?.value}
					onChange={emailHandleChangeInput}
					label="Adresse e-mail"
					state={email?.state}
					msg={email?.msg}
				/>
				<Input
					type="password"
					name="password"
					value={password?.value}
					onChange={passwordHandleChangeInput}
					label={"Mot de passe"}
					state={password?.state}
					msg={password?.msg}
				/>
				<FormButton label="Se connecter" disabled={!isFormValid()} />
				<p className="form-footer">
					<Link to="/auth/reset">Mot de passe oublié</Link> ou <Link to="/auth/signup">se créer un compte</Link> ?
				</p>
			</form>
		</div>
	);
};

export const Register = () => {
	const navigate = useNavigate();

	const [username, usernameHandleChangeInput, usernameSetState] = useInput();
	const [email, emailHandleChangeInput, emailSetState] = useInput();
	const [password, passwordHandleChangeInput, passwordSetState] = useInput();

	const [errorMsg, setErrorMsg] = useState();

	const isFormValid = () => {
		return !email?.value || !password?.value || !username?.value ? false : true;
	};

	const onSubmit = (event) => {
		event.preventDefault();

		const emailVerif = emailValid(email.value);
		const passwordVerif = passwordValid(password.value);
		const usernameVerif = usernameValid(username.value);

		emailSetState(emailVerif.state, emailVerif.msg);
		passwordSetState(passwordVerif.state, passwordVerif.msg);
		usernameSetState(usernameVerif.state, usernameVerif.msg);

		if (isFormValid()) {
			ServiceRegister({ email: email?.value, username: username?.value, password: password?.value })
				.then(() => {
					navigate("/auth/login");
				})
				.catch((error) => {
					if (error?.data === "Adresse mail déjà utilisée !") {
						emailSetState("error", error?.data);
					} else {
						setErrorMsg("Une erreur est survenu, veuillez réessayer plus tard ...");

						emailSetState("error", "");
						passwordSetState("error", "");
						usernameSetState("error", "");
					}
				});
		}
	};

	return (
		<div className="form-container">
			<form className="form-auth" onSubmit={onSubmit}>
				<h1 className="form-header">
					<span>CoverJS</span> Inscription
				</h1>
				{errorMsg && <p className="label-error">{errorMsg}</p>}

				<Input
					name="username"
					value={username.value}
					onChange={usernameHandleChangeInput}
					label="Nom de compte"
					state={username.state}
					msg={username.msg}
				/>
				<Input
					name="email"
					value={email.value}
					onChange={emailHandleChangeInput}
					label="Adresse e-mail"
					autoComplete="username"
					state={email.state}
					msg={email.msg}
				/>
				<Input
					type="password"
					name="password"
					value={password.value}
					onChange={passwordHandleChangeInput}
					label={"Mot de passe"}
					autoComplete="new-password"
					state={password.state}
					msg={password.msg}
				/>
				<FormButton label="Se connecter" disabled={!isFormValid()} />
				<p className="form-footer">
					Vous possedez déjà un compte ? <Link to="/auth/login">se connecter</Link>
				</p>
			</form>
		</div>
	);
};

export const ForgotPassword = () => {
	const [email, emailHandleChangeInput, emailSetState] = useInput();
	const [error, setError] = useState(null);

	const onSubmit = (event) => {
		event.preventDefault();

		const emailVerif = emailValid(email.value);

		emailSetState(emailVerif.state, emailVerif.msg);

		if (emailVerif.state !== "error") {
			setError("Fonctionnalité pas encore disponible !");
		}
	};

	return (
		<div className="form-container">
			<form className="form-auth" onSubmit={onSubmit}>
				<h1 className="form-header">Mot de passe oublié</h1>
				{error && <p className="label-error">{error}</p>}
				<Input
					name="email"
					value={email.value}
					onChange={emailHandleChangeInput}
					label="Adresse e-mail"
					autoComplete="username"
					state={email.state}
					msg={email.msg}
				/>

				<FormButton label="suivant" />
			</form>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	setLogin: bindActionCreators((payload) => AuthAction.setLogin(payload), dispatch),
});

export const Login = connect(null, mapDispatchToProps)(_Login);
