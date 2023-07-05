import { defer, Await, useLoaderData } from "react-router-dom";
import Card from "../UI/Card";
import TrendingSection from "../components/Landingpage/TrendingSection";
import { Suspense, useEffect } from "react";
import SectionHeader from "../components/Landingpage/SectionHeader";
import ErrorElement from "../UI/ErrorElement";
import MovieSection from "../components/Landingpage/MovieSection";

import TrendingSectionLoading from "../components/Loading/TrendingSectionLoading";
import AltLoading from "../components/Loading/AltLoading";

const LandingPage = (props) => {
  const {
    trendingMovie,
    topRatedMovie,
    upcomingMovie,
    popularMovie,
    bollywoodMovie,
    hollywoodMovie,
  } = useLoaderData();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Card className="mt-2 mb-16">
      <SectionHeader
        title="Trending"
        className="py-6"
        to="now_playing?page=1"
      />
      <Suspense fallback={<TrendingSectionLoading />}>
        <Await
          resolve={trendingMovie}
          errorElement={
            <ErrorElement error="Could not fetch data." className="my-12 " />
          }
        >
          {(loadedMovies) => <TrendingSection data={loadedMovies?.results} />}
        </Await>
      </Suspense>
      <SectionHeader
        title="Upcoming"
        className="py-6 mt-10"
        to="upcoming?page=1"
      />
      <Suspense fallback={<AltLoading />}>
        <Await
          resolve={upcomingMovie}
          errorElement={
            <ErrorElement error="Could not fetch data." className="my-12 " />
          }
        >
          {(loadedMovies) => <MovieSection data={loadedMovies?.results} />}
        </Await>
      </Suspense>
      <SectionHeader
        title="Popular"
        className="py-6 mt-2 md:mt-6"
        to="popular?page=1"
      />
      <Suspense fallback={<AltLoading />}>
        <Await
          resolve={popularMovie}
          errorElement={
            <ErrorElement error="Could not fetch data." className="my-12 " />
          }
        >
          {(loadedMovies) => <MovieSection data={loadedMovies?.results} />}
        </Await>
      </Suspense>
      <SectionHeader
        title="Bollywood"
        className="py-6 mt-2 md:mt-6"
        to="bollywood?page=1"
      />
      <Suspense fallback={<AltLoading />}>
        <Await
          resolve={bollywoodMovie}
          errorElement={
            <ErrorElement error="Could not fetch data." className="my-12 " />
          }
        >
          {(loadedMovies) => <MovieSection data={loadedMovies?.results} />}
        </Await>
      </Suspense>
      <SectionHeader
        title="Hollywood"
        className="py-6 mt-2 md:mt-6"
        to="hollywood?page=1"
      />
      <Suspense fallback={<AltLoading />}>
        <Await
          resolve={hollywoodMovie}
          errorElement={
            <ErrorElement error="Could not fetch data." className="my-12 " />
          }
        >
          {(loadedMovies) => <MovieSection data={loadedMovies?.results} />}
        </Await>
      </Suspense>
      <SectionHeader
        title="Top Rated"
        className="py-6 mt-2 md:mt-6"
        to="top_rated?page=1"
      />
      <Suspense fallback={<AltLoading />}>
        <Await
          resolve={topRatedMovie}
          errorElement={
            <ErrorElement error="Could not fetch data." className="my-12 " />
          }
        >
          {(loadedMovies) => <MovieSection data={loadedMovies?.results} />}
        </Await>
      </Suspense>
    </Card>
  );
};
export default LandingPage;

export const dataFetcher = async (type, page, query) => {
  let url = "";
  if (query) {
    url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`;
  } else {
    if (type === "bollywood" || type === "hollywood") {
      url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${
        page ? page : "1"
      }&primary_release_year=2023&release_date.gte=2023-01-01&sort_by=popularity.desc&with_original_language=${
        type === "bollywood" ? "hi" : "en"
      }`;
    } else {
      url = `https://api.themoviedb.org/3/movie/${type}?language=en-US&page=${
        page ? page : "1"
      }&region=IN`;
    }
  }
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
    },
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Response("could not fetch data.", { status: 400 });
  }
  const resData = await response.json();
  // console.log(resData);
  return resData;
};

export const loader = async () => {
  return defer({
    trendingMovie: dataFetcher("now_playing"),
    upcomingMovie: dataFetcher("upcoming"),
    topRatedMovie: dataFetcher("top_rated"),
    popularMovie: dataFetcher("popular"),
    hollywoodMovie: dataFetcher("hollywood"),
    bollywoodMovie: dataFetcher("bollywood"),
  });
};
