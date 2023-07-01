import { Suspense } from "react";
import readRequestedMovies from "../ApiCalls/readRequestedMovies";
import { Await, defer, useLoaderData } from "react-router-dom";

import ErrorElement from "../UI/ErrorElement";
import { useEffect } from "react";
import Card from "../UI/Card";
import SectionHeader from "../components/Landingpage/SectionHeader";
import RequestedMovieList from "../components/RequestedMovie/RequestedMovieList";

import { Skeleton } from "./MovieTypePage";
import { useSelector } from "react-redux";
const RequestedMoviePage = () => {
  const { requestedMovie } = useLoaderData();
  const { reqUrl } = useSelector((state) => state.navigationSlice);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Card className="mt-3 mb-16 ">
      <SectionHeader title="Requested Movies" back={reqUrl} />
      <Suspense
        fallback={
          <div className="mt-10 grid-movie">
            <Skeleton />
          </div>
        }
      >
        <Await
          resolve={requestedMovie}
          errorElement={
            <ErrorElement error="Could not fetch data." className="my-12 " />
          }
        >
          {(loadedData) => <RequestedMovieList data={JSON.parse(loadedData)} />}
        </Await>
      </Suspense>
    </Card>
  );
};
export default RequestedMoviePage;

export const loader = async () => {
  return defer({
    requestedMovie: readRequestedMovies(),
  });
};
