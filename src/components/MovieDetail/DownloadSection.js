import { twMerge } from "tailwind-merge";
import SVG from "../../svg/SVG";
import Download from "../../svg/Download";
import Trim from "../../Utility/Trim";
import magnet from "../../svg/magnet";
const DownloadButton = ({ data, className }) => {
  const downloadLink = data?.download_link;
  const releaseType = data?.release_type;
  const resolution = data?.resolution;
  const size = data?.size;
  const language = data?.language;
  const Info = Trim(
    `${releaseType}, ${language}`,
    window.innerWidth < 768 ? 14 : 22
  );

  return (
    <a
      href={downloadLink}
      target="_blank"
      className={twMerge(
        "flex justify-between items-center rounded-lg bg-primary px-2 py-1 w-56 md:w-64 hover:bg-primary-500 duration-300",
        className
      )}
    >
      <span className="flex items-center space-x-1">
        {data?.isTorrent ? (
          <SVG svg={magnet} className="w-7 h-7" />
        ) : (
          <SVG svg={Download} className="w-7 h-7" />
        )}
        <span>
          <h1 className="font-bold">{resolution}</h1>

          <p className="text-xs text-gray-200">{Info}</p>
        </span>
      </span>
      <p className="font-bold">{size.trim()}</p>
    </a>
  );
};
const DownloadSection = (props) => {
  return (
    <>
      {props.data.map((item, index) => (
        <DownloadButton data={item} key={index} className="mt-6" />
      ))}
    </>
  );
};
export default DownloadSection;
