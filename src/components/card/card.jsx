import { forwardRef, useState } from "react";

import "./card.css";

const Card = forwardRef(({ cover, onClick = () => {}, children }, ref) => {
	const [isLoading, setLoading] = useState(true);

	return (
		<article className={`card${isLoading ? " loading-card" : ""}`}>
			<div ref={ref} onClick={onClick} className="card-cover">
				<img
					src={cover}
					onLoad={() => setLoading(false)}
					style={{ objectFit: "cover" }}
					alt="cover"
					loading="lazy"
					width="110"
					height="169.578"
				/>
			</div>

			<div className="card-content">{!isLoading && children}</div>
		</article>
	);
});

export default Card;
