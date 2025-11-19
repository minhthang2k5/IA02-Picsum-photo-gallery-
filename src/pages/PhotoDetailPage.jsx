import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import ErrorBanner from "../components/ErrorBanner";
import { fetchPhotoById } from "../services/picsumApi";

const PhotoDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPhoto = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPhotoById(id);
      setPhoto(data);
    } catch (err) {
      setError(err.message || "Unable to load photo details.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadPhoto();
  }, [loadPhoto]);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/photos");
    }
  };

  if (loading) {
    return (
      <div className="container py-5">
        <Loader text="Loading photo..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <button
          type="button"
          className="btn btn-link px-0"
          onClick={handleBack}
        >
          ← Back to photos
        </button>
        <div className="mt-3">
          <ErrorBanner message={error} onRetry={loadPhoto} />
        </div>
      </div>
    );
  }

  if (!photo) {
    return null;
  }

  const title = `Photo #${photo.id}`;
  const description =
    "Placeholder description: Lorem Picsum generates random placeholder photography perfect for UI mockups.";

  return (
    <div className="container py-4">
      <button type="button" className="btn btn-link px-0" onClick={handleBack}>
        ← Back to photos
      </button>

      <div className="row g-4 align-items-start mt-2">
        <div className="col-12 col-lg-7">
          <div className="ratio ratio-4x3 rounded overflow-hidden shadow-sm">
            <img
              src={photo.download_url}
              alt={`Captured by ${photo.author}`}
              className="w-100 h-100 object-fit-cover"
            />
          </div>
        </div>
        <div className="col-12 col-lg-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <p className="text-uppercase text-muted small mb-1">
                Photo detail
              </p>
              <h1 className="card-title h3">{title}</h1>
              <p className="text-muted mb-4">By {photo.author}</p>
              <p className="mb-4">{description}</p>
              <dl className="row small text-muted">
                <dt className="col-4">Resolution</dt>
                <dd className="col-8">
                  {photo.width} × {photo.height}
                </dd>
                <dt className="col-4">Source</dt>
                <dd className="col-8">
                  <a
                    href={photo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="link-primary"
                  >
                    View on Lorem Picsum
                  </a>
                </dd>
              </dl>
              <a
                href={photo.download_url}
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                Open raw image
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetailPage;
