import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api/";

export const getGallery = async (query, page = 1) => {
  const API_KEY = "34864371-45b05fc4683b315c0d551fd9e";

  try {
    const response = await axios.get(
      `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
