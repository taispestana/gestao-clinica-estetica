import { createPortal } from 'react-dom';
import { useEffect } from 'react';

export default function Modal({
    children,
    show = false,
    maxWidth = '2xl',
    onClose = () => { },
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
    }[maxWidth] || '500px';

    const modalContent = (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'var(--bg-transparent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 99999,
                padding: '1rem',
                ...overlayStyle
            }}
            onClick={onClose}
        >
            <div
                style={{
                    backgroundColor: '#FFFFFF',
                    width: '100%',
                    maxWidth: maxWidthClass,
                    borderRadius: '16px',
                    boxShadow: '0 25px 50px -12px var(--bg-transparent)',
                    overflow: 'hidden',
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
