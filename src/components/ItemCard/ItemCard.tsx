import styles from './ItemCard.module.css';
import type { Item } from '../../store/itemsSlice';

const getColor = (category: Item['category']) => {
	if (category === 'оружие') return styles.purple;
	if (category === 'ресурс') return styles.gray;
	if (category === 'одежда') return styles.blue;
	if (category === 'медикаменты') return styles.red;
	return styles.gray;
};

export const ItemCard = ({ item, onClick }: { item: Item; onClick: (i: Item) => void }) => {
	return (
		<div className={styles.row} onClick={() => onClick(item)}>
			<div className={styles.inner}>
				<img className={styles.img} src={item.image} alt={item.name} />
				<div className={styles.content}>
					<div className={styles.name}>{item.name}</div>
					<div className={styles.desc}>{item.description}</div>
				</div>
				<div className={`${styles.badge} ${getColor(item.category)}`}>{item.category.toUpperCase()}</div>
			</div>
		</div>
	);
};

