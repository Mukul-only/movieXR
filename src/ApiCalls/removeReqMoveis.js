const removeReqMovies = async (movieId) => {
  try {
    const url = `https://moviesxr-3dcab-default-rtdb.firebaseio.com/requestedMovies/${movieId}.json`;
    const options = { method: "DELETE" };
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error("cannot remove");
    }
  } catch (error) {
    return error.message;
  }
};
export default removeReqMovies;
