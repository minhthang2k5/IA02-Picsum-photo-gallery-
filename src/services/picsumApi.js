const BASE_URL = "https://picsum.photos";

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Request failed");
  }
  return response.json();
};

export const fetchPhotos = async ({ page = 1, limit = 24 } = {}) => {
  const url = `${BASE_URL}/v2/list?page=${page}&limit=${limit}`;
  const response = await fetch(url);
  return handleResponse(response);
};

export const fetchPhotoById = async (id) => {
  if (!id) {
    throw new Error("Missing photo id");
  }
  const url = `${BASE_URL}/id/${id}/info`;
  const response = await fetch(url);
  return handleResponse(response);
};
