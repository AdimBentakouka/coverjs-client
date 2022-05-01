import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { getVolumePage } from "Services/reader.service";

import "./reader.css";

const Reader = ({ luminosity, volume = {}, currentPage, onChangePage = (state) => {}, children }) => {
	const pageRef = useRef(null);
	const contentRef = useRef(null);

	const { page } = useReaderPage({ pageRef, volumeId: volume.id, currentPage, luminosity });

	const [isLoading, setLoading] = useState(true);

	const handleClickPage = (event) => {
		let statePage = "next";

		const posX = event.pageX - event.target.offsetLeft;

		if (posX < event.target.clientWidth / 2) {
			statePage = "previous";
		}

		onChangePage(statePage, () => {
			setLoading(true);
		});
	};

	useEffect(() => {
		if (!isLoading) {
			contentRef.current?.scrollIntoView({ block: "start" });

			// now account for fixed header
			const scrolledY = window.scrollY;
			const navHeight = document.getElementsByClassName("navbar")[0].clientHeight;

			if (scrolledY) {
				window.scroll(0, scrolledY - navHeight);
			}
		}
	}, [isLoading, currentPage]);

	useEffect(() => {
		if (isLoading) {
			pageRef.current?.setAttribute("style", `filter: blur(5px) brightness(${luminosity}%)`);
		} else {
			pageRef.current?.setAttribute("style", `filter: brightness(${luminosity}%)`);
		}
	}, [isLoading, luminosity]);

	return (
		<div className="reader-content ">
			<div ref={contentRef} className={`reader-img`}>
				{children}
				<img ref={pageRef} onLoad={() => setLoading(false)} alt="" src={page} onClick={handleClickPage} />
			</div>
		</div>
	);
};

const useReaderPage = ({ volumeId, currentPage }) => {
	const [state, setState] = useState({
		isLoading: true,
		page: null,
	});

	// loadImg
	useEffect(() => {
		const controller = new AbortController();
		const { signal } = controller;

		setState((s) => ({ ...s, isLoading: true }));
		getVolumePage(volumeId, currentPage, signal)
			.then((page) => {
				setState((s) => ({ ...s, page, isLoading: false }));
			})
			.catch((e) => {
				console.error(e);
			});

		return () => {
			controller.abort();
		};
	}, [volumeId, currentPage]);

	return { ...state };
};

const mapStateToProps = (state) => {
	return {
		luminosity: state.app.luminosity,
	};
};

export default connect(mapStateToProps)(Reader);
