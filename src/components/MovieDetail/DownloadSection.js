import { twMerge } from "tailwind-merge";
import SVG from "../../svg/SVG";
import Download from "../../svg/Download";
const DownloadButton = ({ data, className }) => {
  const downloadLink = data?.download_link;
  const releaseType = data?.release_type;
  const resolution = data?.resolution;
  const size = data?.size;
  return (
    <a
      href={downloadLink}
      target="_blank"
      className={twMerge(
        "flex justify-between items-center rounded-lg bg-primary px-3 py-1 w-52 md:w-64 hover:bg-primary-500 duration-300",
        className
      )}
    >
      <span className="flex space-x-1 items-center">
        <SVG svg={Download} className="w-7 h-7" />
        <span>
          <h1 className="font-bold">{resolution}</h1>
          <p className="text-xs text-gray-200">{releaseType}</p>
        </span>
      </span>
      <p className="font-bold">{size}</p>
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
