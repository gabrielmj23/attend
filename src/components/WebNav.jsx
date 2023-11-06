import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function WebNav({ children }) {
  return (
    <div className="flex w-full flex-row items-center gap-10 bg-verde px-12 py-6">
      <Link to="/admin/home" className="text-2xl font-bold hover:scale-105">
        Attend
      </Link>
      {children}
      <Link
        to="/admin/login"
        className="absolute right-16 text-red-950 hover:underline"
      >
        Cerrar Sesión
      </Link>
    </div>
  );
}

WebNav.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default WebNav;
