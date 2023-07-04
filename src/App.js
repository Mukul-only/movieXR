import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import LandingPage, { loader as movieLoader } from "./pages/LandingPage";
// import { Skeleton } from "./pages/MovieTypePage";
// import Card from "./UI/Card";
import MovieTypePage, { loader as typeLoader } from "./pages/MovieTypePage";
import MovieDetailPage, {
  loader as movieDetailLoader,
} from "./pages/MovieDetailPage";
import RequestedMoviePage, {
  loader as requestedMoviesLoader,
} from "./pages/RequestedMoviePage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ipSliceAction } from "./store/ip-slice";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import DownloadProcessPage from "./pages/DownloadProcessPage";

// import { lazy, Suspense } from "react";
// import MovieDetailSkeleton from "./components/MovieDetail/MovieDetailSkeleton";
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
      {
        path: "/requested",
        element: <RequestedMoviePage />,
        loader: requestedMoviesLoader,
      },
      {
        path: "download_process",
        element: <DownloadProcessPage />,
      },
      {
        path: "/terms",
        element: <TermsPage />,
      },
      {
        path: "/privacy",
        element: <PrivacyPage />,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getIp = async () => {
      try {
        const res = await fetch("https://api.ipify.org/?format=json");
        if (!res.ok) {
          throw new Error("some thing went wrong!");
        }
        const resData = await res.json();
        // console.log(resData);
        dispatch(ipSliceAction.setIp(resData.ip));
      } catch (error) {
        console.log(error.message);
      }
    };
    getIp();
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
