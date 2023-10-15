import PropTypes from "prop-types";

function Etiqueta({ texto, texto2}) {
    let classNames = "flex flex-row gap-2 rounded-md p-2";
    const estiloInput = {
        backgroundColor: 'lightgray', // Establecer el color del fondo de la etiqueta
        color: 'gray', // Establecer el color de texto
        border: '2px solid transparent',  
        outline: 'none',
    };
    return (
        <label>
            {texto} <input className={classNames} type="text" style={estiloInput} placeholder={texto2} />
        </label>
    );
}

Etiqueta.propTypes = {
    texto: PropTypes.string.isRequired,
    texto2: PropTypes.string.isRequired,    
};

export default Etiqueta;