import { Card, ContextMenu, ItemContextMenu, useContextMenu } from "Components/card";
import { Category } from "Components/library/category";
import { PATH_COVER } from "Config/";
import { forwardRef, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { markCollectionRead, markCollectionUnread } from "Services/metadata.service";

export const Collections = ({ collections = [], onRefreshParent = () => {} }) => {
	return (
		<Category title="Bibliothèques" description={`${collections.length} collection(s)`}>
			{collections.map((collection, index) => (
				<CardCollection key={`${collection.name}-${index}`} collection={collection} onRefresh={onRefreshParent} />
			))}
		</Category>
	);
};

const CardCollection = ({ collection = {}, onRefresh = () => {} }) => {
	const { name, cover, nbVolumes, nbVolumesRead } = collection;

	const navigate = useNavigate();

	const cardRef = useRef(null);
	const contextMenuRef = useRef(null);

	const { anchorPoint, show } = useContextMenu(cardRef);

	const markRead = async () => {
		try {
			await markCollectionRead(collection.id);
			onRefresh();
		} catch (err) {}
	};

	const markUnread = async () => {
		try {
			await markCollectionUnread(collection.id, false);
			onRefresh();
		} catch (err) {}
	};

	return (
		<>
			<Card ref={cardRef} cover={`${PATH_COVER}${cover}`} onClick={() => navigate(`/collection/${name}`)}>
				<Link title={name} to={`/collection/${name}`} className="card-title">
					{name}
				</Link>
				<div className="card-label">
					{nbVolumesRead === 0 && `${nbVolumes} volumes`}
					{nbVolumesRead > 0 && `${nbVolumesRead}/${nbVolumes} volumes`}
				</div>
			</Card>

			<CSSTransition nodeRef={contextMenuRef} in={show} timeout={250} classNames="fade" unmountOnExit>
				<ContextMenuCollection
					ref={contextMenuRef}
					anchorPoint={anchorPoint}
					name={name}
					nbVolumesRead={nbVolumesRead}
					isActive={show}
					onRead={markRead}
					onUnread={markUnread}
				/>
			</CSSTransition>
		</>
	);
};

const ContextMenuCollection = forwardRef(({ anchorPoint, name, nbVolumesRead, isActive, onRead = () => {}, onUnread = () => {} }, ref) => {
	return (
		<ContextMenu ref={ref} name={name} anchorPoint={anchorPoint} isActive={isActive}>
			<ItemContextMenu icon="done" label="Marquer la collection comme lu" onClick={() => onRead()} />
			{nbVolumesRead > 0 && (
				<ItemContextMenu icon="remove_done" label="Marquer la collection comme non lu" onClick={() => onUnread()} />
			)}
		</ContextMenu>
	);
});
