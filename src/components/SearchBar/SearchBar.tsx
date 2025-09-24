import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import styles from './SearchBar.module.css';
import type { RootState } from '../../store';
import { setSearch } from '../../store/itemsSlice';
import { t } from '../../i18n';
import { asset } from '../../utils/assets';

export const SearchBar = () => {
	const dispatch = useDispatch();
	const search = useSelector((s: RootState) => s.items.search);
	const [focused, setFocused] = useState(false);
	const iconSrc = focused || (search?.length ?? 0) > 0 ? asset('items/searchWhite.png') : asset('items/search.png');
	return (
		<div className={styles.wrapper}>
			<img src={iconSrc} alt="" className={styles.icon} />
			<input
				className={styles.input}
				placeholder={t('search.placeholder')}
				value={search}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				onChange={(e) => dispatch(setSearch(e.target.value))}
			/>
		</div>
	);
};

