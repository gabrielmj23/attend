import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

function BotonAtras({ path }) {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(path)} className="z-50">
      <ArrowBackOutlinedIcon />
    </button>
  );
}

BotonAtras.propTypes = {
  path: PropTypes.string.isRequired,
};

export default BotonAtras;
