const sortLinks = async (url) => {
  try {
    const response = await fetch(
      `https://linksbanao.in/api?api=0c3be989556e092eda17bbaa98c804d19e554285&url=${url}`
    );
    const resData = await response.json();
    return resData;
  } catch (error) {
    console.log(error.message);
  }
};
export default sortLinks;
