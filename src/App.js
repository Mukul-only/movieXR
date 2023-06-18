import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import LandingPage, { loader as movieLoader } from "./pages/LandingPage";
import MovieTypePage, { loader as typeLoader } from "./pages/MovieTypePage";
import MovieDetailPage, {
  loader as movieDetailLoader,
} from "./pages/MovieDetailPage";
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
        element: <MovieDetailPage />,
        loader: movieDetailLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
