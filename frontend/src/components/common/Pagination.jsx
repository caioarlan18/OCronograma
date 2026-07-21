import styles from './Pagination.module.css';

export function Pagination({ currentPage, totalPages, onPageChange, itemsPerPage, totalItems }) {
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePageClick = (page) => {
        onPageChange(page);
    };

    const getPageNumbers = () => {
        const pages = [];
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);

        if (startPage > 1) {
            pages.push(1);
            if (startPage > 2) pages.push('...');
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) pages.push('...');
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className={styles.paginationContainer}>
            <div className={styles.paginationInfo}>
                <p>
                    Mostrando <strong>{((currentPage - 1) * itemsPerPage) + 1}</strong> até <strong>{Math.min(currentPage * itemsPerPage, totalItems)}</strong> de <strong>{totalItems}</strong> itens
                </p>
            </div>

            <div className={styles.paginationControls}>
                <button
                    className={styles.btnNav}
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    ← Anterior
                </button>

                <div className={styles.pageNumbers}>
                    {getPageNumbers().map((page, index) => (
                        page === '...' ? (
                            <span key={`dots-${index}`} className={styles.dots}>...</span>
                        ) : (
                            <button
                                key={page}
                                className={`${styles.pageBtn} ${currentPage === page ? styles.active : ''}`}
                                onClick={() => handlePageClick(page)}
                            >
                                {page}
                            </button>
                        )
                    ))}
                </div>

                <button
                    className={styles.btnNav}
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Próximo →
                </button>
            </div>
        </div>
    );
}
