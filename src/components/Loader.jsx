import PropTypes from "prop-types";

const Loader = ({ text = "Loading..." }) => (
  <div
    className="d-flex flex-column align-items-center py-4 text-muted"
    role="status"
  >
    <div className="spinner-border text-primary mb-2" aria-hidden="true" />
    <small>{text}</small>
  </div>
);

Loader.propTypes = {
  text: PropTypes.string,
};

export default Loader;
