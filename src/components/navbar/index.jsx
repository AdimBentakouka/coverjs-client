import { useEffect, useRef, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "Store/actions/authAction";
import { setLuminosity } from "Store/actions/appAction";

import useWindowDimensions from "Utils/hook/getdimension";

import { BrightnessModal, PanelUser } from "./navmodal";
import NavItem from "./navitem";

import "./navbar.css";
import SearchBar from "./searchbar";

const Navbar = () => {
	const [isMinimized, setMinimized] = useState(false);
	const [showSearchBar, setShowSearchBar] = useState(false);
	const [search, setSearch] = useState("");

	// listener dimension de la page pour réadapter la navbar
	const { width } = useWindowDimensions();

	// Minimiser la searchbar si < 650px
	useEffect(() => {
		if (width > 650 && isMinimized) {
			setMinimized(false);
			setShowSearchBar(false);
		}
		if (width <= 650 && !isMinimized) {
			setMinimized(true);
		}
	}, [isMinimized, width]);

	return (
		<nav className="navbar">
			{!showSearchBar && (
				<div className="navbar-title">
					<h2>
						<Link to="/">CoverJS</Link>
					</h2>
				</div>
			)}

			{(!isMinimized || showSearchBar) && (
				<div className="navbar-searchbar">
					<SearchBar
						isMinimized={isMinimized}
						setShowSearchBar={() => setShowSearchBar(false)}
						search={search}
						setSearch={(e) => setSearch(e.target.value)}
					/>
				</div>
			)}

			{!showSearchBar && (
				<div className="navbar-items">
					<ListNavItemRedux isMinimized={isMinimized} setShowSearchBar={() => setShowSearchBar(true)} />
				</div>
			)}
		</nav>
	);
};

const ListNavItem = ({ isAdmin, logout = () => {}, luminosity, setLuminosity = () => {}, isMinimized, setShowSearchBar = () => {} }) => {
	const [modal, setModal] = useState("");

	const navItemsRef = useRef(null);

	const handleModal = (modalName) => {
		if (modal === modalName) {
			return setModal(null);
		}
		if (!modal) {
			return setModal(modalName);
		}
		setModal(null);
		setTimeout(() => setModal(modalName), 250);
	};

	useEffect(() => {
		const onClick = (event) => {
			if (!navItemsRef.current.contains(event.target) || navItemsRef.current === event.target || event.target.tagName === "A") {
				setModal(null);
			}
		};
		if (modal) {
			document.addEventListener("mouseup", onClick);
		}

		return () => {
			document.removeEventListener("mouseup", onClick);
		};
	}, [navItemsRef, modal]);

	return (
		<ul ref={navItemsRef}>
			{isMinimized && (
				<NavItem
					icon="search"
					onClick={() => {
						setShowSearchBar();
						setTimeout(() => document.getElementById("nav-searchbar").focus(), 50);
					}}
					handleModal={() => handleModal(null)}
				/>
			)}
			<NavItem icon="brightness_medium" isActive={modal === "brightness"} handleModal={() => handleModal("brightness")}>
				<BrightnessModal value={luminosity} onChange={setLuminosity} />
			</NavItem>

			{/* <NavItem icon="crop" isActive={modal === "resize"} handleModal={() => handleModal("resize")}>
				Modal TODO: Resize
			</NavItem> */}

			<NavItem icon="manage_accounts" isActive={modal === "account"} handleModal={() => handleModal("account")}>
				<PanelUser isAdmin={isAdmin} logout={logout} />
			</NavItem>
		</ul>
	);
};

/**
 * ! Composant liée avec Redux
 */
const mapStateToProps = (state) => {
	return {
		isAdmin: state.auth.user?.isAdmin,
		luminosity: state.app.luminosity,
	};
};
const mapDispatchToProps = (dispatch) => {
	return { logout: bindActionCreators(logout, dispatch), setLuminosity: bindActionCreators(setLuminosity, dispatch) };
};

const ListNavItemRedux = connect(mapStateToProps, mapDispatchToProps)(ListNavItem);

export default Navbar;
