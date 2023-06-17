import { useState } from "react";
import SVG from "../../svg/SVG";
import Imdb from "../../svg/Imdb";
const TrendingCard = ({ data }) => {
  const [imageHasError, setImageHasError] = useState(false);
  const imageUrl = `https://image.tmdb.org/t/p/w500/${data?.backdrop_path}`;
  const rating = data?.vote_average;
  const title =
    data?.title?.length > 40 ? data?.title?.slice(0, 40) + "..." : data?.title;
  const year = data?.release_date?.slice(0, 4);
  if (!imageHasError) {
    return (
      <div className="relative  rounded-xl  min-w-max overflow-hidden group select-none">
        <img
          src={imageUrl}
          onError={() => {
            setImageHasError(true);
          }}
          className="w-[356px] min-h-[182px] md:w-[472px] md:h-[309px] object-cover group-hover:scale-110 duration-300"
        />
        <div className="absolute inset-0 flex flex-col justify-end grad-card">
          <div className="flex space-x-6 justify-between items-center px-6 py-4">
            <span className="space-y-2">
              <p className="max-w-[16rem] tracking-tight font-bold text-lg md:font-[900] md:text-2xl leading-tight">
                {title}
              </p>
              <p className="text-sm md:text-base">{year}</p>
            </span>
            <span className="space-y-3">
              <span className="flex gap-2 items-center">
                <SVG svg={Imdb} className="w-6 md:w-8  " />
                <p className="text-sm md:text-base font-semibold">{rating}</p>
              </span>
              <p className="rounded-lg border border-yellow-400 px-3 py-1 text-center text-xs md:text-sm w-max font-semibold text-yellow-400">
                HD
              </p>
            </span>
          </div>
          <span className="block w-full h-2 bg-primary" />
        </div>
      </div>
    );
  }
};
export default TrendingCard;
