const keywordsFetch = async (query) => {
  try {
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
      },
    };
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error("something went wrong!");
    }
    const resData = await res.json();
    // console.log(resData);
    return resData;
  } catch (error) {
    return error.message;
  }
};
export default keywordsFetch;
