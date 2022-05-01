import { useRef } from "react";
import { CSSTransition } from "react-transition-group";

const NavItem = (props) => {
	const { icon = "", isActive = false, handleModal = () => {}, onClick = () => {}, children } = props;

	const fctClick = () => {
		handleModal();
		onClick();
	};
	return (
		<li className="item">
			<div className="nav-icon material-icons" onClick={fctClick}>
				{icon}
			</div>
			{children && <NavItemModal isActive={isActive}>{children}</NavItemModal>}
		</li>
	);
};

export default NavItem;

const NavItemModal = ({ isActive = false, children }) => {
	const nodeRef = useRef(null);
	return (
		<CSSTransition nodeRef={nodeRef} in={isActive} timeout={250} classNames="fade" unmountOnExit>
			<div ref={nodeRef} className="nav-modal">
				{children}
			</div>
		</CSSTransition>
	);
};
