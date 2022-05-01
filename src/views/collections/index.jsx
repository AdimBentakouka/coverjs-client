import { Volumes } from "Components/library/volumes";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { getVolumes } from "Services/metadata.service";

const CollectionView = () => {
	const { collectionName } = useParams();

	const { volumes, isLoading, onRefresh } = useLoadingData(collectionName);

	const contentRef = useRef(null);

	return (
		<CSSTransition nodeRef={contentRef} in={!isLoading} timeout={250} classNames="fade" unmountOnExit>
			<div ref={contentRef}>
				<Volumes collectionName={collectionName} volumes={volumes} onRefreshParent={() => onRefresh()} />
			</div>
		</CSSTransition>
	);
};

const useLoadingData = () => {
	const { collectionName } = useParams();
	const navigate = useNavigate();

	const [state, setState] = useState({
		lastUpdated: new Date(),
		volumes: [],
		isLoading: true,
	});

	const onRefresh = () => {
		setState((c) => ({ ...c, lastUpdated: new Date() }));
	};

	useEffect(() => {
		const controller = new AbortController();
		const { signal } = controller;

		getVolumes(collectionName, signal)
			.then((result) => {
				if (result.length === 0) {
					navigate("/");
				}
				setState((c) => ({ ...c, volumes: result, isLoading: false }));
			})
			.catch((e) => {
				console.error(e);
				navigate("/");
			});

		return () => {
			controller.abort();
		};
	}, [collectionName, state.lastUpdated, navigate]);

	const { volumes, isLoading, lastUpdated } = state;

	return { volumes, isLoading, lastUpdated, onRefresh };
};

export default CollectionView;
