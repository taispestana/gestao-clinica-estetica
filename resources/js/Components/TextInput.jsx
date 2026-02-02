import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    // Props do input
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    // Ref local
    const localRef = useRef(null);

    // Handle do ref
    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    // Focus no input
    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    // Renderização do input
    return (
        <input
            {...props}
            type={type}
            className={
                'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ' +
                className
            }
            ref={localRef}
        />
    );
});
