import PropTypes from "prop-types";

function AppNav({ elementos }) {
  return (
    <div className="absolute bottom-0 flex w-full flex-row justify-center gap-10 p-2">
      {elementos.map((elem) => elem)}
    </div>
  );
}

AppNav.propTypes = {
  elementos: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default AppNav;
