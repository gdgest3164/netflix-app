const API_KEY = "f1d1fcbe2360ec5b79544e20ae2b892f";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMove {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMove[];
  total_pages: number;
  total_results: number;
}

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=kr`).then((response) => response.json());
}
