import { Link } from "react-router-dom";

import "./navmodal.css";

export const PanelUser = ({ isAdmin, logout = () => {} }) => {
	return (
		<ul className="panel-items">
			{/* <div className="nav-modal-item">
				<Link className="item" to="/auth/account">
					<span className="modal-icon material-icons">person_outline</span>
					<p>Mon compte</p>
				</Link>
			</div> */}
			{isAdmin && (
				<div className="nav-modal-item">
					<Link className="item" to="/admin/">
						<span className="modal-icon material-icons">admin_panel_settings</span>
						<p>Administration</p>
					</Link>
				</div>
			)}
			<div className="nav-modal-item">
				<div className="item" onClick={logout}>
					<span className="modal-icon material-icons">logout</span>
					<p>Se déconnecter</p>
				</div>
			</div>
		</ul>
	);
};

export const BrightnessModal = ({ value = 75, onChange = () => {} }) => {
	return (
		<div className="BrightnessModal">
			<div className="modal-title">Luminosité</div>
			<div className="input-vertical">
				<span className="input-label" htmlFor="brightness">
					{value}%
				</span>
				<input
					id="brightness"
					orient="vertical"
					type="range"
					onChange={(e) => {
						let value = e.target.value;

						if (value > 100) {
							value = 100;
						}

						if (value < 20) {
							value = 20;
						}

						onChange(value);
					}}
					step="1"
					value={value}
					min="20"
					max="100"
				/>
			</div>
		</div>
	);
};
