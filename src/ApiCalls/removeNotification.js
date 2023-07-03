const removeNotification = async (ip, movieId) => {
  try {
    const url = `https://moviesxr-3dcab-default-rtdb.firebaseio.com/notifications/${ip}/${movieId}.json`;
    const options = { method: "DELETE" };
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error("cannot remove");
    }
    return res.ok;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};
export default removeNotification;
