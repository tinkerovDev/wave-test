import { useDispatch, useSelector } from 'react-redux';
import styles from './SearchBar.module.css';
import type { RootState } from '../../store';
import { setSearch } from '../../store/itemsSlice';
import { t } from '../../i18n';

export const SearchBar = () => {
	const dispatch = useDispatch();
	const search = useSelector((s: RootState) => s.items.search);
	return (
		<div className={styles.wrapper}>
			<img src="/items/search.png" alt="" className={styles.icon} />
			<input
				className={styles.input}
				placeholder={t('search.placeholder')}
				value={search}
				onChange={(e) => dispatch(setSearch(e.target.value))}
			/>
		</div>
	);
};

