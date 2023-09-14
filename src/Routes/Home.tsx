import { useQuery } from "react-query";
import * as S from "./Home.style";
import * as A from "./Home.animte";
import { IGetMoviesResult, getMovies } from "../api";
import { makeImagePath } from "../utils";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

const offset = 6;
let totalMovies = 0;

function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [randomNum, setRandomNum] = useState(0);
  const history = useHistory();
  const bigMovieMath = useRouteMatch<{ movieId: string }>("/movies/:movieId");

  useEffect(() => {
    totalMovies = 10;
    const maxIndex = Math.floor(Math.random() * totalMovies);
    setRandomNum(maxIndex);
  }, []);

  const incraseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();

      totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((p) => (p === maxIndex ? 0 : p + 1));
    }
  };

  const toggleLeaving = () => setLeaving((p) => !p);
  const onBoxClicked = (movieId: number) => {
    history.push(`/movies/${movieId}`);
  };

  const clickedMovie = bigMovieMath?.params.movieId && data?.results.find((vv) => vv.id === +bigMovieMath.params.movieId);

  return (
    <S.Wrapper>
      {isLoading ? (
        <S.Loader>Loading...</S.Loader>
      ) : (
        <>
          <S.Banner onClick={incraseIndex} bgPhoto={makeImagePath(data?.results[randomNum].backdrop_path || "")}>
            <S.Title>{data?.results[randomNum].title}</S.Title>
            <S.Overview>{data?.results[randomNum].overview}</S.Overview>
          </S.Banner>
          <S.Slider>
            <AnimatePresence onExitComplete={toggleLeaving} initial={false}>
              <S.Row variants={A.rowVariants} initial="hidden" animate="visible" exit="exit" transition={{ type: "tween", duration: 1 }} key={index}>
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <S.Box
                      layoutId={movie.id + ""}
                      variants={A.boxVariants}
                      initial="normal"
                      onClick={() => onBoxClicked(movie.id)}
                      whileHover="hover"
                      transition={{ type: "tween" }}
                      key={movie.id}
                      bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                    >
                      <S.Info variants={A.infoVariants}>
                        <h5>{movie.title}</h5>
                      </S.Info>
                    </S.Box>
                  ))}
              </S.Row>
            </AnimatePresence>
          </S.Slider>
          <AnimatePresence>
            {bigMovieMath ? (
              <>
                <S.Overlay onClick={() => history.push("/")} />
                <S.BigMovieBox layoutId={bigMovieMath.params.movieId + ""}>
                  {clickedMovie && (
                    <>
                      <S.BigCover src={makeImagePath(clickedMovie.backdrop_path, "w500")} />
                      <S.BigTitle>{clickedMovie.title}</S.BigTitle>
                      <S.BigOverview>{clickedMovie.overview}</S.BigOverview>
                    </>
                  )}
                </S.BigMovieBox>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </S.Wrapper>
  );
}

export default Home;
