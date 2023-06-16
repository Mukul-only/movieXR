import { useState } from "react";
import SVG from "../../svg/SVG";
import Imdb from "../../svg/Imdb";
import Star from "../../svg/Star";
import Plus from "../../svg/Plus";
const AltCard = ({ data }) => {
  const [imageHasError, setImageHasError] = useState(false);
  const imageUrl = `https://image.tmdb.org/t/p/w500/${data?.poster_path}`;
  const rating = data?.vote_average;
  const maxChar = window.innerWidth < 768 ? 35 : 26;
  const title =
    data?.title?.length > maxChar
      ? data?.title?.slice(0, maxChar) + "..."
      : data?.title;
  const year = data?.release_date?.slice(0, 4);
  if (!imageHasError) {
    return (
      <div className="relative rounded-lg min-w-max overflow-hidden group">
        <img
          src={imageUrl}
          onError={() => {
            setImageHasError(true);
          }}
          className="w-[158px] min-h-[182px] md:w-[204px] md:h-[290px] object-cover group-hover:scale-110 duration-300"
        />
        <div className="absolute inset-0 flex flex-col justify-between grad-card">
          <div className="flex justify-between gap-3 items-center p-2 md:px-4 md:py-3">
            <div className=" flex gap-1  w-max rounded-full px-3 md:px-4 py-1 bg-black">
              <SVG svg={Star} className="w-3 md:w-4" />
              <p className="text-xs tracking-tighter md:text-sm">{rating}</p>
            </div>
            <SVG svg={Plus} className="w-8 md:hidden" />
          </div>
          <div>
            <div className="flex space-x-4 justify-between items-center px-2 py-4">
              <span className="space-y-1">
                <p className="md:max-w-[8rem] tracking-tight font-medium md:font-[600] text-base  md:text-base leading-tight">
                  {title}
                </p>
                <p className="text-sm md:text-base">{year}</p>
              </span>
              <SVG svg={Plus} className="hidden md:block md:w-12" />
            </div>
            <span className="block w-full h-[0.4rem] bg-primary" />
          </div>
        </div>
      </div>
    );
  }
};

export default AltCard;
