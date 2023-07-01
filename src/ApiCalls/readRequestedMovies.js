const readRequestedMovies = async (movieId) => {
  try {
    const url = `https://moviesxr-3dcab-default-rtdb.firebaseio.com/requestedMovies${
      movieId ? `/${movieId}` : ""
    }.json`;
    const options = {
      method: "GET",
    };
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error("failed in fetching data!");
    }

    const resData = await res.text();

    return resData;
  } catch (error) {
    return error.message;
  }
};
export default readRequestedMovies;
