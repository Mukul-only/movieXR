import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import LandingPage, { loader as movieLoader } from "./pages/LandingPage";
import { Skeleton } from "./pages/MovieTypePage";
import Card from "./UI/Card";
import MovieTypePage, { loader as typeLoader } from "./pages/MovieTypePage";
import MovieDetailPage, {
  loader as movieDetailLoader,
} from "./pages/MovieDetailPage";
import { lazy, Suspense } from "react";
import MovieDetailSkeleton from "./components/MovieDetail/MovieDetailSkeleton";
// const MovieDetailPage = lazy(() => import("./pages/MovieDetailPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <p>Error</p>,
    children: [
      { index: true, element: <LandingPage />, loader: movieLoader },
      {
        path: "/:type",
        element: <MovieTypePage />,
        loader: typeLoader,
      },
      {
        path: "/detail/:movieId",
        element: (
          <MovieDetailPage />
          // <Suspense
          //   fallback={
          //     <Card className="py-4">
          //       <MovieDetailSkeleton />
          //     </Card>
          //   }
          // >
          //   <MovieDetailPage />
          // </Suspense>
        ),
        loader: movieDetailLoader,
        //(meta) =>
        //   import("./pages/MovieDetailPage").then((module) =>
        //     module.loader(meta)
        //   ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
