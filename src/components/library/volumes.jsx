import { forwardRef, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { Card, ContextMenu, ItemContextMenu, useContextMenu } from "Components/card";
import { useModal } from "Components/modal";

import { markRead, markUnread } from "Services/metadata.service";

import { Category } from "./category";
import { ModalContinueReadingVolume } from "Components/modal/modalreadingvolume";
import { PATH_COVER } from "Config/";

export const Volumes = ({ volumes, collectionName, onRefreshParent = () => {} }) => {
	return (
		<Category title={collectionName} description={`${volumes.length} volume(s)`}>
			{volumes.map((item, key) => (
				<CardVolume
					key={`${collectionName}-${item.name}`}
					collectionName={collectionName}
					item={item}
					onRefresh={onRefreshParent}
				/>
			))}
		</Category>
	);
};

const CardVolume = ({ collectionName, item = {}, onRefresh = () => {} }) => {
	const { id, cover, currentPage, nbPages, name, isCompleted } = item;

	const cardRef = useRef(null);
	const contextMenuRef = useRef(null);
	const modalRef = useRef(null);

	const { anchorPoint, show } = useContextMenu(cardRef);
	const { showModal, toggleModal } = useModal(modalRef);

	const navigate = useNavigate();

	const readingUrl = `/reader/${collectionName}/${name}`;

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
			navigate(readingUrl);
		}
	};

	return (
		<>
			<Card ref={cardRef} cover={`${PATH_COVER}${cover}`} onClick={onClickCover}>
				<Link title={`${collectionName} - ${name}`} to={`${readingUrl}/${currentPage || ""}`} className="card-title">
					{name}
				</Link>
				<div className="card-label">
					{currentPage === nbPages
						? "Terminé"
						: !currentPage || currentPage === 1
						? `Non lu`
						: `Page ${currentPage || 1} sur ${nbPages}`}
				</div>
			</Card>

			<CSSTransition nodeRef={contextMenuRef} in={show} timeout={250} classNames="fade" unmountOnExit>
				<ContextMenuVolume
					ref={contextMenuRef}
					anchorPoint={anchorPoint}
					name={name}
					currentPage={currentPage || 1}
					isCompleted={isCompleted}
					onReadVolume={markReadVolume}
					onUnreadVolume={markUnreadVolume}
					isActive={show}
				/>
			</CSSTransition>

			{showModal && (
				<ModalContinueReadingVolume
					ref={modalRef}
					title={`${collectionName} - ${name}`}
					url={readingUrl}
					currentPage={currentPage || 1}
					nbPages={nbPages}
					onClose={() => toggleModal(false)}
				/>
			)}
		</>
	);
};

const ContextMenuVolume = forwardRef(
	({ anchorPoint, name, currentPage, isCompleted, onReadVolume = () => {}, onUnreadVolume = () => {}, isActive }, ref) => {
		return (
			<ContextMenu ref={ref} name={`${name}`} anchorPoint={anchorPoint} isActive={isActive}>
				{!isCompleted && <ItemContextMenu onClick={onReadVolume} icon="done" label="Marquer comme lu" />}
				{currentPage > 1 && <ItemContextMenu onClick={onUnreadVolume} icon="remove_done" label="Marquer comme non lu" />}
			</ContextMenu>
		);
	}
);
