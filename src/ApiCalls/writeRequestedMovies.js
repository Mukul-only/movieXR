const writeRequestedMovies = async (movieId, data) => {
  try {
    const url = `https://moviesxr-3dcab-default-rtdb.firebaseio.com/requestedMovies/${movieId}.json`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    };
    const resposnse = await fetch(url, options);
    if (!resposnse.ok) {
      throw new Error("failed");
    }
  } catch (error) {
    return error.message;
  }
};
export default writeRequestedMovies;
