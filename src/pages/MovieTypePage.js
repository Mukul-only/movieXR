import Card from "../UI/Card";
import SectionHeader from "../components/Landingpage/SectionHeader";
import { dataFetcher } from "./LandingPage";
import {
  defer,
  Await,
  useLoaderData,
  useParams,
  useSearchParams,
} from "react-router-dom";

import { Suspense, useEffect, useState } from "react";
import MoviePage from "../components/MoviePage";
import LoadingCard from "../UI/LoadingCard";
import ErrorElement from "../UI/ErrorElement";

export const Skeleton = (props) => {
  return (
    <>
      <LoadingCard className="w-full" />
      <LoadingCard className="w-full" />
      <LoadingCard className="w-full" />
      <LoadingCard className="w-full" />
      <LoadingCard className="w-full" />
      <LoadingCard className="w-full" />
      <LoadingCard className="w-full" />
      <LoadingCard className="w-full" />
      <LoadingCard className="w-full" />
      <LoadingCard className="w-full" />
      <LoadingCard className="w-full" />
      <LoadingCard className="w-full" />
      <LoadingCard className="w-full" />
    </>
  );
};

const MovieTypePage = (props) => {
  const [error, setError] = useState(false);
  const { movieData } = useLoaderData();
  const { type } = useParams();
  const [title, setTitle] = useState("");
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  useEffect(() => {
    let title = "";
    for (let i = 0; i < type.length; i++) {
      if (i === 0 || title[i - 1] === " ") {
        title += type[i].toUpperCase();
        continue;
      }
      if (type[i] === "_") {
        title += " ";
        continue;
      }
      title += type[i];
    }
    title = type === "now_playing" ? "Trending" : title;
    title = type === "result" ? query : title;
    setTitle(title);
  }, [query]);

  const errorHandler = () => {
    setError(true);
    return <p>Could not fetch data.</p>;
  };

  useEffect(() => {
    if (error) {
      setTitle("Error");
    }
  }, [error]);

  return (
    <Card className="py-4 ">
      <SectionHeader title={title} back="/" />

      <Suspense
        fallback={
          <div className="mt-24 grid-movie">
            <Skeleton />
          </div>
        }
      >
        <Await
          resolve={movieData}
          errorElement={
            <ErrorElement
              error="Could not fetch data."
              className="mx-auto my-12"
            />
          }
        >
          {(loadedMovies) => <MoviePage data={loadedMovies} />}
        </Await>
      </Suspense>
    </Card>
  );
};
export default MovieTypePage;

export const loader = async ({ request, params }) => {
  const searchParams = new URL(request.url).searchParams;
  const page = searchParams.get("page");
  const query = searchParams.get("query");
  const type = params.type;

  return defer({
    movieData: dataFetcher(type, page, query),
  });
};
