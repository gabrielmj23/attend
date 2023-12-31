import PropTypes from "prop-types";
import { forwardRef } from "react";

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

const Input = forwardRef(
  (
    { id, name, onChange, textoLabel, textoPlaceholder, type, icono, value },
    ref,
  ) => {
    return (
      <div>
        <label htmlFor={id}>{textoLabel}</label>
        <div className={classNames} style={estiloEtiquetaContenedor}>
          <input
            id={id}
            name={name}
            onChange={onChange}
            type={type || "text"}
            value={value}
            accept={type === "file" ? ".xls,.xlsx" : ""}
            style={estiloInput}
            placeholder={textoPlaceholder}
            ref={ref}
          />
          {icono}
        </div>
      </div>
    );
  },
);

Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  textoLabel: PropTypes.string.isRequired,
  textoPlaceholder: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "password", "number", "file", "date"]),
  icono: PropTypes.element,
  value: PropTypes.any,
};

Input.displayName = "Input";

export default Input;
