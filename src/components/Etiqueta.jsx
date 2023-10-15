import PropTypes from "prop-types";

function Etiqueta({ texto, texto2, icono}) {
    let classNames = 
        "flex flex-row gap-2 rounded-md p-2";

    const estiloInput = {
        flex: 1,
        color: 'black',
        border: 'none',
        backgroundColor: 'transparent',
        outline: 'none',
    };

    const estiloEtiquetaContenedor = {
        backgroundColor: '#EAF2F8',
        color: 'gray',
        border: '2px solid transparent',
        display: 'flex',
        alignItems: 'center',
    };

    return (
        <label>
            {texto} 
            <div className={classNames} style={estiloEtiquetaContenedor}>
                <input type="text" style={estiloInput} placeholder={texto2} />
                {icono}
            </div>
        </label>
    );
}

Etiqueta.propTypes = {
    texto: PropTypes.string.isRequired,
    texto2: PropTypes.string.isRequired,
    icono: PropTypes.element.isRequired,    
};

export default Etiqueta;
