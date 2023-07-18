const removeNotification = async (userId, movieId) => {
  try {
    const url = `https://moviesxr-3dcab-default-rtdb.firebaseio.com/notifications/${userId}/${movieId}.json`;
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
