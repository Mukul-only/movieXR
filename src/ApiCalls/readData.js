const readData = async (path) => {
  try {
    const url = `https://moviesxr-3dcab-default-rtdb.firebaseio.com/${path}.json`;
    const option = {
      method: "GET",
    };
    const response = await fetch(url, option);
    if (!response.ok) {
      throw new Error("could not fetch data");
    }
    const resData = await response.json();
    // console.log(resData);
    return resData;
  } catch (error) {
    return false;
  }
};
export default readData;
