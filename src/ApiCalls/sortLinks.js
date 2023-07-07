const sortLinks = async (url, alias) => {
  // console.log(alias, alias.length);
  try {
    const response = await fetch(
      `https://tnshort.net/api?api=882c08dc883b362777026393fd31aeff684e3b64&url=${url}&alias=${alias}`
    );
    const resData = await response.json();
    // console.log(resData);
    return resData;
  } catch (error) {
    console.log(error.message);
  }
};
export default sortLinks;
