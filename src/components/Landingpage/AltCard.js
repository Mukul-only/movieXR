import { useEffect, useState } from "react";
import SVG from "../../svg/SVG";

import Star from "../../svg/Star";
import Plus from "../../svg/Plus";
import { twMerge } from "tailwind-merge";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { navigationAction } from "../../store/Navigation-slice";
import readData from "../../ApiCalls/readData";
import LoadingCard from "../../UI/LoadingCard";
const AltCard = ({ data, className }) => {
  const [imageHasError, setImageHasError] = useState(false);
  const [searchParams] = useSearchParams();
  const imageUrl = `https://image.tmdb.org/t/p/w500/${data?.poster_path}`;
  const rating = data?.vote_average?.toFixed(1);
  const maxChar = window.innerWidth < 768 ? 32 : 46;
  const title =
    data?.title?.length > maxChar
      ? data?.title?.slice(0, maxChar) + "..."
      : data?.title;
  const year = data?.release_date?.slice(0, 4);
  const movieId = data?.id;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const page = searchParams.get("page");
  const query = searchParams.get("query");
  const cnt =
    data?.count >= 1000 ? (data?.count / 1000).toFixed(1) + "k" : data?.count;

  const [loading, setLoading] = useState(true);
  const [releaseType, setReleaseType] = useState();
  useEffect(() => {
    setLoading(true);
    readData(`movies/${movieId}/0/release_type`).then((e) => {
      setLoading(false);
      setReleaseType(e);
    });
  }, []);

  const movieClickHandler = () => {
    const url =
      location.pathname +
      (page ? `?page=${page}` : "") +
      (query ? `&query=${query}` : "");
    dispatch(navigationAction.setUrl(url));

    navigate(`/detail/${movieId}`);
  };

  if (!imageHasError && !loading) {
    return (
      <div
        className={twMerge(
          "relative rounded-lg w-[158px] min-h-[250px] md:w-[204px] md:h-[290px]  overflow-hidden group select-none cursor-pointer bg-Dark-700",
          className
        )}
        onClick={movieClickHandler}
      >
        <img
          src={imageUrl}
          onError={() => {
            setImageHasError(true);
          }}
          className={`object-cover w-full h-full duration-300 group-hover:scale-110  `}
        />
        <div className="absolute inset-0 flex flex-col justify-between grad-card">
          <div className="flex items-center justify-between gap-3 p-2 md:px-4 md:py-3">
            <div className="flex gap-1 px-3 py-1 bg-black rounded-full w-max md:px-4">
              <SVG svg={Star} className="w-3 md:w-4" />
              <p className="text-xs tracking-tighter md:text-sm">{rating}</p>
            </div>
            {data.count ? (
              <span className="flex items-center justify-center w-8 h-8 rounded-full md:w-10 md:h-10 bg-primary">
                {cnt}
              </span>
            ) : (
              // <SVG svg={Plus} className="w-8 md:hidden" />
              <div className="p-1 text-xs font-semibold text-black bg-[#FFC40C] rounded-md md:text-sm tracking-tight">
                {releaseType ? releaseType : "N/A"}
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center justify-between px-2 py-4 space-x-4">
              <span className="space-y-1">
                <p className=" tracking-tight font-medium md:font-[600] text-base  md:text-base leading-tight">
                  {title}
                </p>
                <p className="text-sm md:text-base">{year}</p>
              </span>
            </div>
            <span className="block w-full h-[0.4rem] bg-primary" />
          </div>
        </div>
      </div>
    );
  } else if (!imageHasError && loading) {
    return (
      <LoadingCard className="w-[158px] h-[250px] md:w-[204px] md:h-[290px]" />
    );
  }
};

export default AltCard;
