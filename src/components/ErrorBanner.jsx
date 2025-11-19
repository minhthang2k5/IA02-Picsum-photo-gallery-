import PropTypes from "prop-types";

const ErrorBanner = ({ message, onRetry }) => (
  <div
    className="alert alert-danger d-flex justify-content-between align-items-center"
    role="alert"
  >
    <span>{message}</span>
    {onRetry && (
      <button
        type="button"
        className="btn btn-outline-light btn-sm"
        onClick={onRetry}
      >
        Retry
      </button>
    )}
  </div>
);

ErrorBanner.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func,
};

export default ErrorBanner;
