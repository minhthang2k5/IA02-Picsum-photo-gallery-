import PropTypes from "prop-types";
import PhotoCard from "./PhotoCard";

const PhotoGrid = ({ photos }) => (
  <section className="row g-4">
    {photos.map((photo) => (
      <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={photo.id}>
        <PhotoCard photo={photo} />
      </div>
    ))}
  </section>
);

PhotoGrid.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PhotoGrid;
