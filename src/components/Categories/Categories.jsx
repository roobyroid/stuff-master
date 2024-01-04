import { Link } from 'react-router-dom';

import styles from '../../styles/Categories.module.css';

const Categories = ({ title, categories = [], amount }) => {
	const list = categories.filter((_, i) => i < amount);
	return (
		<section className={styles.section}>
			<h2>{title}</h2>
			<div className={styles.list}>
				{list.map(({ id, name, image }) => (
					<Link to={`/categories/${id}`} key={id} className={styles.item}>
						<div
							className={styles.image}
							style={{ backgroundImage: `url(${image})` }}
						></div>
						<h3 className={styles.title}>{name}</h3>
					</Link>
				))}
			</div>
		</section>
	);
};

export default Categories;
