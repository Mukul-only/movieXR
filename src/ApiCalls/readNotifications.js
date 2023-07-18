const readNotifications = async (userId) => {
  try {
    const url = `https://moviesxr-3dcab-default-rtdb.firebaseio.com/notifications/${userId}.json`;
    const options = {
      method: "GET",
    };
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error("Could not fetch notification data!");
    }
    const resData = await res.json();

    return resData;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};
export default readNotifications;
