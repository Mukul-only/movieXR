import sortLinks from "../ApiCalls/sortLinks";

const shortLink = async (links) => {
  let shortedObject = {};

  for (let i = 0; i < links.length; i++) {
    const res = await sortLinks(links[i]);
    if (res.status === "success") {
      shortedObject[links[i]] = res.shortenedUrl;
    } else
      return {
        status: false,
        message: "some thing went wrong while shorting the url",
      };
  }
  // console.log(shortedObject);
  return shortedObject;
};

export default shortLink;
