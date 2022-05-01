const emailReg = /^[\w\\-]+(\.[\w\\-]+)*@[\w\\-]+(\.[\w\\-]+)*\.[\w\\-]{2,4}$/;

export const emailValid = (email) => {
	if (!email) {
		return {
			state: "error",
			msg: "Saisissez votre adresse e-mail",
		};
	}

	if (!email.match(emailReg)) {
		return {
			state: "error",
			msg: "Saisissez une adresse e-mail valide",
		};
	}

	return {
		state: "success",
	};
};

export const passwordValid = (password) => {
	if (!password) {
		return {
			state: "error",
			msg: "Saisissez votre mot de passe",
		};
	}

	return {
		state: "success",
	};
};

export const usernameValid = (username) => {
	if (!username) {
		return {
			state: "error",
			msg: "Saisissez votre nom d'utilisateur",
		};
	}

	return {
		state: "success",
	};
};
