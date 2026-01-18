export default function ApplicationLogo(props) {
    return (
        <img
            {...props}
            src="/images/logo-b.svg"
            alt="Templo de Gaya"
            className={props.className || "img-fluid d-block mx-auto"}
            style={!props.className ? { width: '100px', height: '100px', objectFit: 'contain' } : {}}
        />
    );


}
