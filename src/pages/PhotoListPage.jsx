import { useEffect, useRef } from "react";
import PhotoGrid from "../components/PhotoGrid";
import Loader from "../components/Loader";
import ErrorBanner from "../components/ErrorBanner";
import { useInfinitePhotos } from "../hooks/useInfinitePhotos";

const PhotoListPage = () => {
  const { photos, loading, error, hasMore, loadMore, retry } =
    useInfinitePhotos(24);
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (!hasMore || error) {
      return undefined;
    }

    const node = sentinelRef.current;
    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "300px", threshold: 0 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [loadMore, hasMore, error]);

  return (
    <div className="container py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <p className="text-uppercase text-muted small mb-1">Explore</p>
          <h1 className="fw-semibold mb-0">Lorem Picsum photo stream</h1>
        </div>
        <p className="text-muted mb-0">
          Scroll to keep discovering random photography.
        </p>
      </div>

      {error && <ErrorBanner message={error} onRetry={retry} />}

      {!photos.length && !loading && !error && (
        <p className="text-center text-muted py-5">No photos found.</p>
      )}

      {!!photos.length && <PhotoGrid photos={photos} />}

      {loading && <Loader text="Fetching photos..." />}

      {!hasMore && !loading && (
        <p className="text-center text-muted py-4">
          You have reached the end of the catalogue.
        </p>
      )}

      <div ref={sentinelRef} className="sentinel" aria-hidden="true" />
    </div>
  );
};

export default PhotoListPage;
