import styles from './CloseButton.module.css';

type Props = {
    onClick: () => void;
    iconBlack?: string;
    iconGray?: string;
};

export const CloseButton = ({ onClick, iconBlack = '/items/iconGr.png', iconGray = '/items/iconBl.png' }: Props) => {
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


