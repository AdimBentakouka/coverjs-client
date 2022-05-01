import { forwardRef, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { Card, ContextMenu, ItemContextMenu, LinkContextMenu, useContextMenu } from "Components/card";
import { useModal } from "Components/modal";

import { markRead, markUnread } from "Services/metadata.service";

import { CategoryTransitionGroup } from "./category";
import { ModalContinueReadingVolume } from "Components/modal/modalreadingvolume";
import { PATH_COVER } from "Config/";

export const ReadingVolumes = ({ readingVolumes, onRefreshParent = () => {} }) => {
	return (
		<CategoryTransitionGroup
			title="Continuer à lire"
			description={`${readingVolumes.length === 0 ? 1 : readingVolumes.length} volume(s)`}
		>
			{readingVolumes.map((item) => (
				<CSSTransition classNames="fade" key={`${item.collectionName}`} timeout={250}>
					<CardReadingVolume item={item} onRefresh={onRefreshParent} />
				</CSSTransition>
			))}
		</CategoryTransitionGroup>
	);
};

const CardReadingVolume = ({ item = {}, onRefresh = () => {} }) => {
	const { id, cover, currentPage, nbPages, collectionName, name } = item;

	const cardRef = useRef(null);
	const contextMenuRef = useRef(null);
	const modalRef = useRef(null);

	const { anchorPoint, show } = useContextMenu(cardRef);
	const { showModal, toggleModal } = useModal(modalRef);

	const navigate = useNavigate();

	const toCollection = `/collection/${collectionName}`;
	const urlRead = `/reader/${collectionName}/${name}`;

	const markReadVolume = async () => {
		try {
			await markRead(id);
			onRefresh();
		} catch (e) {}
	};

	const markUnreadVolume = async () => {
		try {
			await markUnread(id);
			onRefresh();
		} catch (e) {}
	};

	const onClickCover = () => {
		if (currentPage > 1) {
			toggleModal();
		} else {
			navigate(urlRead);
		}
	};

	return (
		<>
			<Card ref={cardRef} cover={`${PATH_COVER}${cover}`} onClick={onClickCover}>
				<Link title={`${collectionName} - ${name}`} to={toCollection} className="card-title">
					{collectionName} - {name}
				</Link>
				<div className="card-label">
					Page {currentPage || 1} sur {nbPages}
				</div>
			</Card>

			<CSSTransition nodeRef={contextMenuRef} in={show} timeout={250} classNames="fade" unmountOnExit>
				<ContextMenuReadingVolume
					ref={contextMenuRef}
					anchorPoint={anchorPoint}
					name={name}
					collectionName={collectionName}
					currentPage={currentPage || 1}
					toCollection={toCollection}
					onReadVolume={markReadVolume}
					onUnreadVolume={markUnreadVolume}
					isActive={show}
				/>
			</CSSTransition>

			{showModal && (
				<ModalContinueReadingVolume
					ref={modalRef}
					title={`${collectionName} - ${name}`}
					url={urlRead}
					currentPage={currentPage || 1}
					nbPages={nbPages}
					onClose={() => toggleModal(false)}
				/>
			)}
		</>
	);
};

const ContextMenuReadingVolume = forwardRef(
	(
		{ anchorPoint, name, collectionName, currentPage, toCollection, onReadVolume = () => {}, onUnreadVolume = () => {}, isActive },
		ref
	) => {
		return (
			<ContextMenu ref={ref} name={`${collectionName} - ${name}`} anchorPoint={anchorPoint} isActive={isActive}>
				<LinkContextMenu to={toCollection} icon="visibility" label={`Voir la collection ${collectionName}`} />
				<ItemContextMenu onClick={() => onReadVolume()} icon="done" label="Marquer comme lu" />
				{currentPage > 1 && <ItemContextMenu onClick={() => onUnreadVolume()} icon="remove_done" label="Marquer comme non lu" />}
			</ContextMenu>
		);
	}
);
