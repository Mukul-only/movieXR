const writeNotification = async (ip, movieId, data) => {
  try {
    const url = `https://moviesxr-3dcab-default-rtdb.firebaseio.com/notifications/${ip}/${movieId}.json`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    };
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error("Something went wrong: could not write notification!");
    }
  } catch (error) {
    return error.message;
  }
};
export default writeNotification;
