import { TransitionGroup } from "react-transition-group";
import "./category.css";

export const CategoryTransitionGroup = ({ title, description, children }) => {
	return (
		<section className="category-collections">
			<Header title={title} description={description} />
			<TransitionGroup className="category-content">{children}</TransitionGroup>
		</section>
	);
};

export const Category = ({ title, description, children }) => {
	return (
		<section className="category-collections">
			<Header title={title} description={description} />
			<div className="category-content">{children}</div>
		</section>
	);
};

const Header = ({ title, description, isSortable = false, onSort = () => {} }) => {
	return (
		<div className="category">
			<div className="category-header">
				<h1>
					{title}
					{isSortable && <span className="material-icons">sort</span>}
				</h1>
				<p>{description}</p>
			</div>
		</div>
	);
};
