import { createPortal } from 'react-dom';
import { useEffect } from 'react';

export default function Modal({
    children,
    show = false,
    maxWidth = '2xl',
    onClose = () => { },
    closeable = true,
    style = {},
    overlayStyle = {},
}) {
    // Lock body scroll when modal is open
    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [show]);

    if (!show) return null;

    const maxWidthClass = {
        sm: '400px',
        md: '500px',
        lg: '600px',
        xl: '800px',
        '2xl': '1000px',
        '3xl': '1200px',
        '4xl': '1400px',
    }[maxWidth] || '500px';

    const modalContent = (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 99999,
                padding: '1rem',
                ...overlayStyle
            }}
            onClick={() => closeable && onClose()}
        >
            <div
                style={{
                    backgroundColor: 'var(--white)',
                    width: '100%',
                    maxWidth: maxWidthClass,
                    maxHeight: 'calc(100vh - 2rem)',
                    borderRadius: '16px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    overflowY: 'auto',
                    position: 'relative',
                    zIndex: 100000,
                    border: 'none',
                    ...style
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
