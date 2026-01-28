export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p
            {...props}
            className={'input-error-msg ' + className}
        >
            {message}
        </p>
    ) : null;
}
