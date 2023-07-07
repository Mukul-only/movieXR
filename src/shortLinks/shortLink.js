import sortLinks from "../ApiCalls/sortLinks";

const convertMovieName = (name) => {
  return name.replaceAll(/[^\w]/gi, "").slice(0, 10);
};

const shortLink = async (links, movieName) => {
  let shortedObject = {};

  for (let i = 0; i < links.length; i++) {
    const alias = `${convertMovieName(movieName)}_${links[i].resolution}_${
      links[i].release_type
    }_${Math.trunc(Math.random() * 9999)}`;

    const res = await sortLinks(links[i]?.download_link, alias);
    if (res.status === "success") {
      shortedObject[links[i]?.download_link] = res.shortenedUrl;
    } else
      return {
        status: false,
        message: res.message,
      };
  }
  // console.log(shortedObject);
  return shortedObject;
};

export default shortLink;
