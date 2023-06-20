const Trim = (value, length) => {
  if (value.length > length) {
    return value.slice(0, length) + "...";
  } else {
    return value;
  }
};
export default Trim;
