import { forwardRef, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import useSearchBar from "./useSearchBar";
import "./searchbar.css";

const SearchBar = ({ isMinimized, setShowSearchBar = () => {}, search = "", setSearch = () => {} }) => {
	const [isFocused, setFocused] = useState(false);

	const searchbarRef = useRef(null);
	const resultBarRef = useRef(null);

	useEffect(() => {
		if (isMinimized) {
			const onClick = (event) => {
				if (!searchbarRef.current.contains(event.target)) {
					setShowSearchBar();
				}
			};

			const onEscaped = (event) => {
				if (event.key === "Escape") {
					setShowSearchBar();
				}
			};

			document.addEventListener("keydown", onEscaped);

			document.addEventListener("mouseup", onClick);

			return () => {
				document.removeEventListener("mouseup", onClick);
				document.removeEventListener("keydown", onEscaped);
			};
		}
	}, [isMinimized, setShowSearchBar]);

	useEffect(() => {
		const onClick = (event) => {
			if (searchbarRef.current && !searchbarRef.current.contains(event.target)) {
				setFocused(false);
			}
		};
		if (isFocused) {
			document.addEventListener("mouseup", onClick);
		}

		return () => {
			document.removeEventListener("mouseup", onClick);
		};
	}, [searchbarRef, isFocused]);

	return (
		<div className="searchbar">
			<div className="searchbar-container" ref={searchbarRef}>
				<InputSearch
					isMinimized={isMinimized}
					setShowSearchBar={setShowSearchBar}
					value={search}
					onChange={setSearch}
					onFocus={() => setFocused(true)}
				/>
				<CSSTransition nodeRef={resultBarRef} in={search.length > 0 && isFocused} timeout={250} classNames="fade" unmountOnExit>
					<SearchResult
						ref={resultBarRef}
						search={search}
						onBlur={() => {
							setFocused(false);
							setShowSearchBar(false);
						}}
					/>
				</CSSTransition>
			</div>
		</div>
	);
};

const InputSearch = ({ isMinimized, setShowSearchBar, value = "", onChange = () => {}, onFocus = () => {} }) => {
	return (
		<div className="searchbar-input">
			{isMinimized && (
				<span className="searchbar-close material-icons" onClick={setShowSearchBar} title="fermer">
					cancel
				</span>
			)}
			<input
				id="nav-searchbar"
				placeholder="Rechercher"
				value={value}
				onClick={onFocus}
				onChange={(e) => {
					onChange(e);
					onFocus();
				}}
				onFocus={onFocus}
				autoComplete="off"
			/>
			<button className={`searchbar-icons material-icons`} onClick={() => document.getElementById("nav-searchbar").focus()}>
				search
			</button>
		</div>
	);
};

const SearchResult = forwardRef(({ search, onBlur = () => {} }, ref) => {
	const [isLoading, data] = useSearchBar(search);

	return (
		<div className="searchbar-result" ref={ref}>
			{isLoading && <div className="loader" />}

			{!isLoading && data.length > 0 && (
				<>
					<p className="searchbar-title">Collection(s)</p>
					{data.map((collection, key) => {
						return (
							<SearchResultItem
								key={collection.name + "-" + key}
								img={collection.cover}
								name={collection.name}
								desc={collection.desc}
								onClick={onBlur}
							/>
						);
					})}
				</>
			)}

			{!isLoading && data.length === 0 && <p className="searchbar-label">Aucun résultat</p>}
		</div>
	);
});

const SearchResultItem = ({ type = "collection", img, name, desc, onClick = () => {} }) => {
	return (
		<Link to={type === "collection" ? `/collection/${name}` : `/reader/${desc}/${name}`} className="searchbar-item" onClick={onClick}>
			<img src={img} height="50" width="33.203" alt="couverture" loading="lazy" />
			<div className="searchbar-item-content">
				<div className="searchbar-item-name">{name}</div>
				<div className="searchbar-item-desc">{desc}</div>
			</div>
		</Link>
	);
};

export default SearchBar;
