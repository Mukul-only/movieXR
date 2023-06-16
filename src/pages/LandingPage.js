import { json, defer, Await, useLoaderData } from "react-router-dom";
import Card from "../UI/Card";
import TrendingSection from "../components/Landingpage/TrendingSection";
import { Suspense } from "react";
import SectionHeader from "../components/Landingpage/SectionHeader";

import MovieSection from "../components/Landingpage/MovieSection";

const LandingPage = (props) => {
  const { trendingMovie, topRatedMovie, upcomingMovie, popularMovie } =
    useLoaderData();

  return (
    <Card className="mt-2 mb-16">
      <SectionHeader title="Trending" className="py-6" />
      <Suspense fallback={<p>Loading</p>}>
        <Await
          resolve={trendingMovie}
          errorElement={<p>could not fetch data.</p>}
        >
          {(loadedMovies) => <TrendingSection data={loadedMovies?.results} />}
        </Await>
      </Suspense>
      <SectionHeader title="Upcoming" className="py-6 mt-10" />
      <Suspense fallback={<p>Loading</p>}>
        <Await
          resolve={upcomingMovie}
          errorElement={<p>could not fetch data.</p>}
        >
          {(loadedMovies) => <MovieSection data={loadedMovies?.results} />}
        </Await>
      </Suspense>
      <SectionHeader title="Popular" className="py-6 mt-2 md:mt-6" />
      <Suspense fallback={<p>Loading</p>}>
        <Await
          resolve={popularMovie}
          errorElement={<p>could not fetch data.</p>}
        >
          {(loadedMovies) => <MovieSection data={loadedMovies?.results} />}
        </Await>
      </Suspense>
      <SectionHeader title="Top Rated" className="py-6 mt-2 md:mt-6" />
      <Suspense fallback={<p>Loading</p>}>
        <Await
          resolve={topRatedMovie}
          errorElement={<p>could not fetch data.</p>}
        >
          {(loadedMovies) => <MovieSection data={loadedMovies?.results} />}
        </Await>
      </Suspense>
    </Card>
  );
};
export default LandingPage;

const dataFetcher = async (type) => {
  const url = `https://api.themoviedb.org/3/movie/${type}?language=en-US&page=1&region=IN`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
    },
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw json({ message: "some error" }, { status: 500 });
  }
  const resData = await response.json();
  console.log(resData);
  return resData;
};

export const loader = async () => {
  return defer({
    trendingMovie: dataFetcher("now_playing"),
    upcomingMovie: dataFetcher("upcoming"),
    topRatedMovie: dataFetcher("top_rated"),
    popularMovie: dataFetcher("popular"),
  });
};
