import PropTypes from "prop-types";

function AppNav({ children }) {
  return (
    <div className="absolute bottom-0 flex w-full flex-row justify-center gap-10 p-2">
      {children}
    </div>
  );
}

AppNav.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default AppNav;
