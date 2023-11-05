import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

function BotonAtras({ path, text }) {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(path)}>
      <ArrowBackOutlinedIcon />
      {text}
    </button>
  );
}

BotonAtras.propTypes = {
  path: PropTypes.string.isRequired,
  text: PropTypes.string,
};

export default BotonAtras;
