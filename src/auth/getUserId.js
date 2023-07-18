const getUserId = () => {
  let userId = localStorage.getItem("userId");

  if (!userId) {
    userId =
      "user" +
      new Date().getTime() +
      Math.trunc(Math.random() * Math.pow(10, 12));
    localStorage.setItem("userId", userId);
  }
  return userId;
};

export default getUserId;
