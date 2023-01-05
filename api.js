const BASE_URL = 'https://api.themoviedb.org/3/movie';
const API_KEY = '07a8c1016ba33e1636341cd8ddebd15c';

export const getNowPlayings = () =>
  fetch(`${BASE_URL}/now_playing?api_key=${API_KEY}&language=en-US&page=1`).then((res) => res.json());

export const getTopRatedMovies = () =>
  fetch(`${BASE_URL}/top_rated?api_key=${API_KEY}&language=en-US&page=1`).then((res) => res.json());

export const getUpcomingMovies = ({ pageParam = 1 }) =>
  fetch(`${BASE_URL}/upcoming?api_key=${API_KEY}&language=en-US&page=${pageParam}`).then((res) => res.json());

export const getDetail = (params) => {
  const [_, movieId] = params.queryKey;
  return fetch(`${BASE_URL}/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`).then((res) =>
    res.json()
  );
};
