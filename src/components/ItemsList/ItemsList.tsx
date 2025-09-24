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
		const order: Record<Item['category'], number> = { 'оружие': 0, 'ресурс': 1, 'одежда': 2, 'медикаменты': 3 };
		return items
			.filter((it) => {
				const q = search.toLowerCase();
				const matchesSearch = it.name.toLowerCase().includes(q) || it.description.toLowerCase().includes(q);
				const matchesCat = category === 'all' || it.category === category;
				return matchesSearch && matchesCat;
			})
			.sort((a, b) => {
				const byCat = order[a.category] - order[b.category];
				if (byCat !== 0) return byCat;
				return a.id - b.id;
			});
	}, [items, search, category]);

	const displayed = useMemo(() => filtered.slice(0, page * itemsPerPage), [filtered, page, itemsPerPage]);

	const hasMore = useMemo(() => displayed.length < filtered.length, [displayed.length, filtered.length]);

	const observer = useRef<IntersectionObserver | null>(null);
	const lastRef = useCallback((node: HTMLDivElement | null) => {
		if (isLoading || !hasMore) return;
		if (observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting && hasMore && !isLoading) {
				dispatch(loadNextPage());
			}
		}, { root: null, rootMargin: '200px 0px', threshold: 0 });
		if (node) observer.current.observe(node);
	}, [dispatch, isLoading, hasMore]);

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
			{!hasMore && !isLoading && <div style={{ height: 8 }} />}
		</div>
	);
};

