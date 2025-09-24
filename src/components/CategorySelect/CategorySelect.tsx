import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import styles from './CategorySelect.module.css';
import type { RootState } from '../../store';
import { setCategory } from '../../store/itemsSlice';
import type { Category } from '../../store/itemsSlice';
import { t } from '../../i18n';

const options: { value: Category; label: string }[] = [
	{ value: 'all', label: t('category.all') },
	{ value: 'оружие', label: t('category.weapon') },
	{ value: 'ресурс', label: t('category.resource') },
	{ value: 'одежда', label: t('category.clothes') },
	{ value: 'медикаменты', label: t('category.meds') },
];

export const CategorySelect = () => {
    const dispatch = useDispatch();
    const value = useSelector((s: RootState) => s.items.category);
    const [open, setOpen] = useState(false);
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const base = import.meta.env.BASE_URL;
    const cssVars = {
        ['--left-icon-url' as any]: `url(${base}items/vector.png)`,
        ['--left-icon-active-url' as any]: `url(${base}items/vector-active.png)`,
    } as React.CSSProperties;

    useEffect(() => {
        const onDoc = (e: MouseEvent) => {
            if (!wrapRef.current) return;
            if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', onDoc);
        return () => document.removeEventListener('mousedown', onDoc);
    }, []);

    const currentLabel = options.find(o => o.value === value)?.label ?? '';

    return (
        <div ref={wrapRef} className={`${styles.selectWrap} ${open ? styles.open : ''}`} style={cssVars}>
            <button type="button" className={styles.header} onClick={() => setOpen(v => !v)} aria-haspopup="listbox" aria-expanded={open}>
                <span className={styles.leftIcon} aria-hidden="true" />
                <span className={styles.label}>{currentLabel}</span>
                <span className={styles.rightIcon}>▾</span>
            </button>
            {open && (
                <div className={styles.panel} role="listbox" aria-activedescendant={`cat-${value}`}>
                    {options.filter(o => o.value !== 'all').map((o) => (
                        <div
                            key={o.value}
                            id={`cat-${o.value}`}
                            role="option"
                            aria-selected={o.value === value}
                            className={`${styles.option} ${o.value === value ? styles.optionActive : ''}`}
                            onClick={() => { dispatch(setCategory(o.value as Category)); setOpen(false); }}
                        >
                            {o.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

