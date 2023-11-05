import PropTypes from "prop-types";

function AppNav({ visible, children }) {
  if (!visible) return;
  return (
    <div className="absolute bottom-0 flex w-full flex-row justify-center gap-10 p-2">
      {children}
    </div>
  );
}

AppNav.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default AppNav;
