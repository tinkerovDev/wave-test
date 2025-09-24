import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { setAccent } from '../../store/themeSlice';
import styles from './AccentPicker.module.css';

const PRESETS = ['#646cff', '#22c55e', '#ef4444', '#a855f7', '#eab308'];

export const AccentPicker = () => {
    const dispatch = useDispatch();
    const value = useSelector((s: RootState) => (s as any).theme.accent);
    return (
        <div className={styles.wrap}>
            {PRESETS.map((c) => (
                <button
                    key={c}
                    className={styles.swatch}
                    style={{ background: c, outline: value === c ? `2px solid ${c}` : 'none' }}
                    onClick={() => dispatch(setAccent(c))}
                    aria-label={`Set accent ${c}`}
                />
            ))}
        </div>
    );
};


