import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import LandingPage, { loader as movieLoader } from "./pages/LandingPage";
import MovieTypePage, { loader as typeLoader } from "./pages/MovieTypePage";
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
