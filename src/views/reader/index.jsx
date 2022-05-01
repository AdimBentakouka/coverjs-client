import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ListBox } from "Components/form/listbox";
import { getVolumes } from "Services/metadata.service";

import Reader from "./reader";

import "./index.css";
import { CSSTransition } from "react-transition-group";

/**
 * ! Mise en forme du label de page
 */
const formatPage = (value, nbPages) => {
	return `${value} / ${nbPages}`;
};

/**
 * ! Component ReaderView - Regroupe tous les composants pour lire un ebook
 */
const ReaderView = () => {
	const contentRef = useRef(null);
	const { collectionName, volumeName, page: currentPage = 1 } = useParams();

	const navigate = useNavigate();

	const { isLoading, volume, optionPages, optionChapters } = useLoadData(collectionName, volumeName, currentPage);

	const setPage = (page, chapterName = volumeName) => {
		navigate(`/reader/${collectionName}/${chapterName}/${page}`);
	};

	const setChapter = (chapterName) => {
		navigate(`/reader/${collectionName}/${chapterName}/1`);
	};

	const onChangePage = (state, onLoadPage = () => {}) => {
		if (state === "next") {
			if (currentPage < volume.nbPages) {
				onLoadPage();
				return setPage(parseInt(currentPage) + 1);
			} else {
				const nextVolume = optionChapters[optionChapters.findIndex((optionChapterName) => optionChapterName === volumeName) + 1];

				if (nextVolume) {
					onLoadPage();
					setChapter(nextVolume);
				}
			}
		}
		if (state === "previous" && currentPage > 1) {
			onLoadPage();
			return setPage(parseInt(currentPage) - 1);
		}
	};

	return (
		<CSSTransition nodeRef={contentRef} in={!isLoading} timeout={250} classNames="fade" unmountOnExit>
			<div ref={contentRef} className="reader">
				<Header title={`${collectionName} - ${volume.name}`}>
					<ListBox
						id="list-box-pages"
						currentValue={formatPage(currentPage, volume.nbPages)}
						options={optionPages}
						onChange={(value, index) => setPage(index + 1)}
					/>
					<ListBox
						id="list-box-chapters"
						currentValue={volume.name}
						options={optionChapters}
						onChange={(chapterName, index) => setChapter(chapterName)}
					/>
				</Header>

				<Reader id="volume" volume={volume} currentPage={currentPage} onChangePage={onChangePage}>
					<div className="reader-progressbar">
						<div className="reader-progressbar-inner" style={{ width: `${(currentPage / volume.nbPages) * 100}%` }} />
					</div>
				</Reader>
			</div>
		</CSSTransition>
	);
};

/**
 * ! Component Header - Contient le header du ReaderView
 */
const Header = ({ title, children }) => {
	return (
		<div className="reader-header">
			<div className="reader-header-title">{title}</div>
			<div className="reader-header-content">{children}</div>
		</div>
	);
};

/**
 * ! Hook - Permet de charger les données de l'ebook / Collection
 */

const useLoadData = (collectionName, volumeName, currentPage) => {
	const navigate = useNavigate();

	const [state, setState] = useState({
		init: true,
		isLoading: true,
		volumes: [],
		volume: {},
		optionPages: [],
		optionChapters: [],
	});

	// load data
	useEffect(() => {
		const controller = new AbortController();
		const { signal } = controller;

		const onLoad = async () => {
			try {
				const volumes = await getVolumes(collectionName, signal);
				setState((c) => ({ ...c, init: false, volumes }));
			} catch (e) {
				console.error(e);
			}
		};

		onLoad();

		return () => {
			controller.abort();
		};
	}, [collectionName]);

	// controle de coherence
	const { volumes, init, isLoading, volume, optionPages, optionChapters } = state;

	useEffect(() => {
		if (!init) {
			if (volumes.length === 0) {
				navigate("/");
				return;
			}

			const volume = volumes.find((volume) => volume.name === volumeName);

			if (!volume) {
				navigate(`/reader/${collectionName}/${volumes[0].name}`);
				return;
			}

			if (volume.nbPages < currentPage || currentPage < 1 || isNaN(currentPage)) {
				navigate(`/reader/${collectionName}/${volume.name}/1`);
				return;
			}

			// récupére les options des pages
			const optionPages = [...Array(volume?.nbPages).keys()].map((i) => formatPage(i + 1, volume?.nbPages));
			// récupére les options des chapitres
			const optionChapters = volumes.map((volume) => volume.name);

			setState((c) => ({ ...c, isLoading: false, volume, optionPages, optionChapters }));
		}
	}, [init, collectionName, isLoading, volumes, volumeName, currentPage, navigate]);

	return { isLoading, volume, optionPages, optionChapters };
};

export default ReaderView;
