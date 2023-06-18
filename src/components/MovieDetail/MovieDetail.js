import Globe from "../../svg/Globe";
import Imdb from "../../svg/Imdb";
import SVG from "../../svg/SVG";
import Genres from "./Genres";

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

const MovieDetail = ({ data }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500/${data?.poster_path}`;
  const title = data?.title;
  const genres = data?.genres;
  const releaseDate = data?.release_date;
  const vote = (data?.vote_average).toFixed(2);
  const voteCount = transformVote(data?.vote_count);
  const runtime = transformRuntime(data?.runtime);
  const spokenLanguage = data?.spoken_languages;
  const overview = data?.overview;
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-12 py-12 border-b border-Gray">
        <img
          src={imageUrl}
          className="rounded-xl w-64 lg:w-1/5 object-cover mx-auto"
        />
        <div className="space-y-4 flex-1">
          <h1 className="text-xl md:text-3xl font-black  rounded-lg border-l-8 border-primary pl-4 md:pl-6 py-2">
            {title}
          </h1>
          <div className="flex gap-3  flex-wrap">
            {genres.map((item) => (
              <Genres genre={item.name} key={item.id} />
            ))}
          </div>
          <p className="text-gray-200 text-sm md:text-base">
            Release date : {releaseDate}
          </p>
          <div className="flex gap-3 text-gray-200 text-sm md:text-base items-center flex-wrap">
            <span className="flex items-center space-x-2 ">
              <SVG svg={Imdb} className="w-6 h-6" />
              <p>{vote},</p>
            </span>
            <p>Votes : {voteCount},</p>
            <p>Rutime : {runtime}</p>
          </div>
          <span className="flex items-center space-x-2 text-gray-200 text-sm xl:text-base">
            <span className="flex gap-2 flex-wrap">
              <span className="flex gap-1 items-center">
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
          <p className="text-gray-400  font-normal text-sm md:text-base">
            {overview}
          </p>
        </div>
      </div>
    </div>
  );
};
export default MovieDetail;
