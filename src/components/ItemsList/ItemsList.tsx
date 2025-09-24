import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { finishLoading, loadNextPage } from '../../store/itemsSlice';
import type { Item } from '../../store/itemsSlice';
import styles from './ItemsList.module.css';
import { ItemCard } from '../ItemCard/ItemCard';

export const ItemsList = ({ onItemClick }: { onItemClick: (i: Item) => void }) => {
	const dispatch = useDispatch();
	const { items, search, category, page, itemsPerPage, isLoading } = useSelector((s: RootState) => s.items);

	const filtered = useMemo(() => {
		return items.filter((it) => {
			const matchesSearch = it.name.toLowerCase().includes(search.toLowerCase()) || it.description.toLowerCase().includes(search.toLowerCase());
			const matchesCat = category === 'all' || it.category === category;
			return matchesSearch && matchesCat;
		});
	}, [items, search, category]);

	const displayed = useMemo(() => filtered.slice(0, page * itemsPerPage), [filtered, page, itemsPerPage]);

	const observer = useRef<IntersectionObserver | null>(null);
	const lastRef = useCallback((node: HTMLDivElement | null) => {
		if (isLoading) return;
		if (observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) dispatch(loadNextPage());
		});
		if (node) observer.current.observe(node);
	}, [dispatch, isLoading]);

	useEffect(() => {
		if (page > 1) {
			const timer = setTimeout(() => dispatch(finishLoading()), 400);
			return () => clearTimeout(timer);
		}
	}, [dispatch, page]);

	return (
		<div className={styles.list}>
			{displayed.map((item, idx) => (
				<div key={item.id} ref={idx === displayed.length - 1 ? lastRef : null}>
					<ItemCard item={item} onClick={onItemClick} />
				</div>
			))}

			{isLoading && <div className={styles.loader}>Loading…</div>}
			{displayed.length === 0 && !isLoading && <div className={styles.empty}>Ничего не найдено</div>}
		</div>
	);
};

