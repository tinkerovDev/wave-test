import styles from './CloseButton.module.css';
import { asset } from '../../utils/assets';

type Props = {
    onClick: () => void;
    iconBlack?: string;
    iconGray?: string;
};

export const CloseButton = ({ onClick, iconBlack = asset('items/iconGr.png'), iconGray = asset('items/iconBl.png') }: Props) => {
    const style = {
        ['--icon-url' as any]: `url(${iconBlack})`,
        ['--icon-hover-url' as any]: `url(${iconGray})`,
    } as React.CSSProperties;

    return (
        <button
            className={styles.btn}
            onClick={onClick}
            aria-label="Close"
            style={style}
        />
    );
};


