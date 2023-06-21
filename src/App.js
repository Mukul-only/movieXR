import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import LandingPage, { loader as movieLoader } from "./pages/LandingPage";
import { Skeleton } from "./pages/MovieTypePage";
import Card from "./UI/Card";
// import MovieTypePage, { loader as typeLoader } from "./pages/MovieTypePage";
// import MovieDetailPage, { loader as movieDetailLoader,} from "./pages/MovieDetailPage";
import { lazy, Suspense } from "react";
import MovieDetailSkeleton from "./components/MovieDetail/MovieDetailSkeleton";

const MovieTypePage = lazy(() => import("./pages/MovieTypePage"));
const MovieDetailPage = lazy(() => import("./pages/MovieDetailPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <p>Error</p>,
    children: [
      { index: true, element: <LandingPage />, loader: movieLoader },
      {
        path: "/:type",
        element: (
          <Suspense
            fallback={
              <Card className="py-4">
                <div className="loading-text w-44 rounded-lg h-6" />
                <div className="loading-text w-36 rounded-md h-4 mt-4" />
                <div className="grid-movie mt-10">
                  <Skeleton />
                </div>
              </Card>
            }
          >
            <MovieTypePage />
          </Suspense>
        ),
        loader: (meta) =>
          import("./pages/MovieTypePage").then((module) => module.loader(meta)),
      },
      {
        path: "/detail/:movieId",
        element: (
          <Suspense
            fallback={
              <Card className="py-4">
                <MovieDetailSkeleton />
              </Card>
            }
          >
            <MovieDetailPage />
          </Suspense>
        ),
        loader: (meta) =>
          import("./pages/MovieDetailPage").then((module) =>
            module.loader(meta)
          ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
