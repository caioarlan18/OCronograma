import styles from './LoadingSpinner.module.css';

export function LoadingSpinner() {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Carregando...</p>
        </div>
    );
}
