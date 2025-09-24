import { useEffect, useState } from 'react';
import styles from './Modal.module.css';
import type { Item } from '../../store/itemsSlice';
import { t } from '../../i18n';

export const Modal = ({ item, open, onClose }: { item: Item | null; open: boolean; onClose: () => void }) => {
	const [shouldRender, setShouldRender] = useState<boolean>(open && !!item);

	useEffect(() => {
		let timer: number | undefined;
		if (open && item) {
			setShouldRender(true);
		} else {
			timer = window.setTimeout(() => setShouldRender(false), 200);
		}
		return () => {
			if (timer) window.clearTimeout(timer);
		};
	}, [open, item]);

	if (!shouldRender || !item) return null;

	const labels: Record<string, string> = {
		damage: 'Урон',
		defense: 'Защита',
		healing: 'Лечение',
		durability: 'Прочность',
		radius: 'Радиус',
		rarity: 'Редкость',
	};

	const formatValue = (key: string, value: unknown) => {
		if (key === 'weight' && typeof value === 'number') return `${value} кг`;
		if (key === 'speed' && typeof value === 'number') return `${value}`;
		if (key === 'uses' && typeof value === 'number') return `${value}`;
		return String(value);
	};

	return (
		<div className={`${styles.backdrop} ${open ? styles.backdropOpen : ''}`} onClick={onClose}>
			<div className={`${styles.modal} ${open ? styles.open : ''}`} onClick={(e) => e.stopPropagation()}>
				<div className={styles.header}>
					<h2 style={{ fontSize: 18, fontWeight: 700 }}>{item.name}</h2>
					<button className={styles.btn} onClick={onClose}>×</button>
				</div>
				<div className={styles.body}>
					<div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
						<img src={item.image} alt={item.name} style={{ width: 80, height: 80, borderRadius: 8 }} />
						<p style={{ color: '#d1d5db' }}>{item.description}</p>
					</div>
					<div style={{ borderTop: '1px solid #374151', paddingTop: 12 }}>
						<h3 style={{ marginBottom: 8, fontWeight: 600 }}>Характеристики</h3>
						{Object.entries(item.details).map(([k, v]) => (
							<div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
								<span style={{ color: '#9ca3af' }}>{labels[k] ?? k}</span>
								<span style={{ color: '#fff' }}>{formatValue(k, v)}</span>
							</div>
						))}
					</div>
				</div>
				<div className={styles.footer}>
					<button className={styles.btn} onClick={onClose}>{t('close')}</button>
				</div>
			</div>
		</div>
	);
};

