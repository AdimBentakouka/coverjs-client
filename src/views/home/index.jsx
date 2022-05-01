import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Collections, ReadingVolumes } from "Components/library";
import { getCollections, getReadingVolumes } from "Services/metadata.service";

const Home = () => {
	const { collections, readingVolumes, isLoading, onRefresh } = useLoadingData();

	const contentRef = useRef(null);
	const readingVolumesRef = useRef(null);

	return (
		<CSSTransition
			nodeRef={contentRef}
			in={!isLoading.collections && !isLoading.readingVolumes}
			timeout={250}
			classNames="fade"
			unmountOnExit
		>
			<div className="home-content" ref={contentRef}>
				<CSSTransition nodeRef={readingVolumesRef} in={readingVolumes.length > 0} timeout={250} classNames="fade" unmountOnExit>
					<div ref={readingVolumesRef}>
						<ReadingVolumes readingVolumes={readingVolumes} onRefreshParent={() => onRefresh()} />
					</div>
				</CSSTransition>

				<Collections collections={collections} onRefreshParent={() => onRefresh()} />
			</div>
		</CSSTransition>
	);
};

const useLoadingData = () => {
	const [state, setState] = useState({
		lastUpdated: new Date(),
		collections: [],
		readingVolumes: [],
		isLoading: {
			collections: true,
			readingVolumes: true,
		},
	});

	useEffect(() => {
		const controller = new AbortController();
		const { signal } = controller;

		getCollections(signal)
			.then((result) => {
				setState((c) => ({ ...c, collections: result, isLoading: { ...c.isLoading, collections: false } }));
				return getReadingVolumes(signal);
			})
			.then((result) => {
				setState((c) => ({ ...c, readingVolumes: result, isLoading: { ...c.isLoading, readingVolumes: false } }));
			})
			.catch((e) => {
				console.error(e);
			});

		return () => {
			controller.abort();
		};
	}, [state.lastUpdated]);

	const onRefresh = () => {
		setState((c) => ({ ...c, lastUpdated: new Date() }));
	};

	const { collections, readingVolumes, isLoading, lastUpdated } = state;

	return { collections, readingVolumes, isLoading, lastUpdated, onRefresh };
};

export default Home;
