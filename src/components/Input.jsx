import PropTypes from "prop-types";

function Input({ id, textoLabel, textoPlaceholder, type, icono }) {
  let classNames = "flex flex-row gap-2 rounded-md p-2";

  const estiloInput = {
    flex: 1,
    color: "black",
    border: "none",
    backgroundColor: "transparent",
    outline: "none",
  };

  const estiloEtiquetaContenedor = {
    backgroundColor: "#EAF2F8",
    color: "gray",
    border: "2px solid transparent",
    display: "flex",
    alignItems: "center",
  };

  return (
    <div>
      <label htmlFor={id}>{textoLabel}</label>
      <div className={classNames} style={estiloEtiquetaContenedor}>
        <input
          type={type || "text"}
          style={estiloInput}
          placeholder={textoPlaceholder}
        />
        {icono}
      </div>
    </div>
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  textoLabel: PropTypes.string.isRequired,
  textoPlaceholder: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "password", "number"]),
  icono: PropTypes.element,
};

export default Input;
