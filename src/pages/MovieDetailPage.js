import { Await, defer, useLoaderData } from "react-router-dom";
import Card from "../UI/Card";
import { Suspense, useEffect } from "react";
import ErrorElement from "../UI/ErrorElement";
import MovieDetail from "../components/MovieDetail/MovieDetail";
import PageHeader from "../components/MovieDetail/PageHeader";
import MovieDetailSkeleton from "../components/MovieDetail/MovieDetailSkeleton";
import { useDispatch } from "react-redux";
import { formDataAction } from "../store/formData-slice";
import { formValidationAction } from "../store/formValidation-slice";
const MovieDetailPage = (props) => {
  const dispatch = useDispatch();
  const { movieDetail } = useLoaderData();
  useEffect(() => {
    return () => {
      dispatch(formDataAction.reset());
      dispatch(formValidationAction.reset());
    };
  }, []);
  return (
    <Card className="py-4">
      <PageHeader />

      <Suspense fallback={<MovieDetailSkeleton />}>
        <Await
          resolve={movieDetail}
          errorElement={
            <ErrorElement
              error="Could not fetch data."
              className="my-12 mx-auto"
            />
          }
        >
          {(loadedDetails) => <MovieDetail data={loadedDetails} />}
        </Await>
      </Suspense>
    </Card>
  );
};
export default MovieDetailPage;

const movieDetailLoader = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
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
export const loader = async ({ params }) => {
  const id = params.movieId;
  return defer({
    movieDetail: movieDetailLoader(id),
  });
};
