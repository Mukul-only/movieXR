import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import LandingPage, { loader as movieLoader } from "./pages/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <p>Error</p>,
    children: [{ index: true, element: <LandingPage />, loader: movieLoader }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
