import { useCallback, useEffect, useState } from "react";
import { fetchPhotos } from "../services/picsumApi";

const DEFAULT_LIMIT = 24;

export const useInfinitePhotos = (limit = DEFAULT_LIMIT) => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      if (!hasMore && page !== 1) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await fetchPhotos({ page, limit });
        if (!isMounted) {
          return;
        }

        setPhotos((prev) => (page === 1 ? data : [...prev, ...data]));
        if (!data.length || data.length < limit) {
          setHasMore(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Unable to load photos.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [page, limit, hasMore, reloadKey]);

  const loadMore = useCallback(() => {
    if (error) {
      return;
    }
    setPage((prev) => {
      if (loading || !hasMore) {
        return prev;
      }
      return prev + 1;
    });
  }, [loading, hasMore, error]);

  const retry = useCallback(() => {
    setError(null);
    setReloadKey((prev) => prev + 1);
  }, []);

  const reset = useCallback(() => {
    setPhotos([]);
    setPage(1);
    setHasMore(true);
    setError(null);
    setReloadKey((prev) => prev + 1);
  }, []);

  return { photos, loading, error, hasMore, loadMore, retry, reset };
};
