export default function InputLabel({
    // Props do label
    value,
    className = '',
    children,
    ...props
}) {
    // Renderização do label
    return (
        <label
            {...props}
            className={
                `block text-sm font-medium text-gray-700 ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
