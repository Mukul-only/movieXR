import Globe from "../../svg/Globe";
import Imdb from "../../svg/Imdb";
import SVG from "../../svg/SVG";
import Genres from "./Genres";
import { useState } from "react";
import DownloadSection from "./DownloadSection";
import { useEffect } from "react";

import RequestMovie from "./RequestMovie";

const transformVote = (num) => {
  if (num >= 1000 && num < 1000000) {
    return (num / 1000).toFixed(1) + "k";
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else {
    return num;
  }
};

const transformRuntime = (num) => {
  return `${Math.trunc(num / 60)}h  ${num % 60}m`;
};

const MovieDetail = ({ data, downloadDetail }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500/${data?.poster_path}`;
  const title = data?.title;
  const genres = data?.genres;
  const releaseDate = data?.release_date;
  const vote = (data?.vote_average).toFixed(2);
  const voteCount = transformVote(data?.vote_count);
  const runtime = transformRuntime(data?.runtime);
  const spokenLanguage = data?.spoken_languages;
  const overview = data?.overview;
  const movieId = data?.id;
  const [link, setLink] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchData = async () => {
    const resLink = await downloadDetail;

    setLink(resLink);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-12 py-12 border-b lg:flex-row border-Gray">
        <img
          src={imageUrl}
          className="object-cover w-64 mx-auto rounded-xl lg:w-1/5"
        />
        <div className="flex-1 space-y-4">
          <h1 className="py-2 pl-4 text-xl font-black border-l-8 rounded-lg md:text-3xl border-primary md:pl-6">
            {title}
          </h1>
          <div className="flex flex-wrap gap-3">
            {genres.map((item) => (
              <Genres genre={item.name} key={item.id} />
            ))}
          </div>
          <p className="text-sm text-gray-200 md:text-base">
            Release date : {releaseDate}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-200 md:text-base">
            <span className="flex items-center space-x-2 ">
              <SVG svg={Imdb} className="w-6 h-6" />
              <p>{vote},</p>
            </span>
            <p>Votes : {voteCount},</p>
            <p>Rutime : {runtime}</p>
          </div>
          <span className="flex items-center space-x-2 text-sm text-gray-200 xl:text-base">
            <span className="flex flex-wrap gap-2">
              <span className="flex items-center gap-1">
                <SVG svg={Globe} className="w-4 h-4 md:w-5 md:h-5" />
                <p>Languages : </p>
              </span>
              {spokenLanguage.map((item) => (
                <span className="" key={item.english_name}>
                  {item.english_name},
                </span>
              ))}
            </span>
          </span>
          <p className="text-sm font-normal text-gray-400 md:text-base">
            {overview}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center py-6">
        <h1 className="py-2 pl-6 mx-auto text-lg font-black tracking-wider border-l-8 rounded-lg md:text-2xl border-primary md:pl-8">
          Download Links
        </h1>

        {link === undefined && (
          <span className="h-12 mt-6 rounded-lg loading-text w-52 md:w-64" />
        )}
        {link ? (
          <DownloadSection data={link} />
        ) : (
          link === null && (
            <RequestMovie
              data={{
                id: movieId,
                vote_average: data?.vote_average,
                title: title,
                poster_path: data?.poster_path,
                release_date: data?.release_date,
              }}
            />
          )
        )}
      </div>
    </div>
  );
};
export default MovieDetail;
