import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PhotoCard = ({ photo }) => {
  const thumbnailUrl = `https://picsum.photos/id/${photo.id}/500/350`;
  const title = `Photo #${photo.id}`;

  return (
    <article className="card h-100 photo-card shadow-sm border-0">
      <Link
        to={`/photos/${photo.id}`}
        className="text-decoration-none text-dark"
      >
        <div className="ratio ratio-4x3 overflow-hidden rounded-top">
          <img
            src={thumbnailUrl}
            alt={`Photo by ${photo.author}`}
            loading="lazy"
            className="w-100 h-100 object-fit-cover"
          />
        </div>
        <div className="card-body">
          <h2 className="card-title h6 mb-1 text-truncate">{title}</h2>
          <p className="card-text text-muted small mb-0">By {photo.author}</p>
        </div>
      </Link>
    </article>
  );
};

PhotoCard.propTypes = {
  photo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }).isRequired,
};

export default PhotoCard;
