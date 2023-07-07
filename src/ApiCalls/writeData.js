const writeData = async (data, setIsSubmitting, setError, movieId) => {
  try {
    setIsSubmitting(true);
    setError(null);
    const url = `https://moviesxr-3dcab-default-rtdb.firebaseio.com/movies/${movieId}.json`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("failed");
    }
  } catch (error) {
    setError(error.message);
  }
  setIsSubmitting(false);
};
export default writeData;
