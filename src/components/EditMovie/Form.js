import { twMerge } from "tailwind-merge";
import Input from "../../UI/Input";
import Select from "../../UI/Select";
import urlRegx from "../../Utility/urlRegx";
import SVG from "../../svg/SVG";
import Delete from "../../svg/Delete";
import Checkbox from "../../UI/Checkbox";

const Form = (props) => {
  const sizeRegx = /^\d{1,3}(?:\.\d)?(?:KB|GB|MB|mb|kb|gb)$/;
  const urlValidation = (url) => {
    if (url.trim().length === 0) {
      return {
        valid: false,
        msg: "This feild is required !",
      };
    } else if (!url.match(urlRegx)) {
      return {
        valid: false,
        msg: "Please enter a valid url (https:// is must eg: https://google.com)",
      };
    } else {
      return {
        valid: true,
        msg: "",
      };
    }
  };

  const sizeValidation = (size) => {
    if (size.trim().length === 0) {
      return {
        valid: false,
        msg: "This feild is required !",
      };
    } else if (!size.match(sizeRegx)) {
      return {
        valid: false,
        msg: "Invalid (valid-> eg : 'max 3 digits' . 'max 1 digit' 'unit')",
      };
    } else {
      return {
        valid: true,
        msg: "",
      };
    }
  };

  return (
    <div className={twMerge("py-6 space-y-4", props.className)}>
      <span className="flex items-center space-x-4 ">
        <h1 className="text-base text-White lg:text-lg">
          Link #{props.index + 1}
        </h1>
        <SVG
          svg={Delete}
          className="w-5 h-5 cursor-pointer lg:w-6 lg:h-6 fill-gray-400 hover:fill-white"
          onClick={() => props.onDelete(props.index)}
        />
      </span>
      <div className="flex space-x-2 ">
        <Select
          className="flex-1 w-0"
          options={["240P", "360P", "480P", "720P", "1080P", "2K", "4K"]}
          placeholder="Resolution "
          id={props.index}
          name="resolution"
          val={props?.data?.resolution}
        />
        <Select
          className="flex-1 w-0"
          options={[
            "CAM-Rip",
            "HDCAM",
            "S-Print",
            "HDTS",
            "PreDVDRip",
            "HDTC",
            "DVDRip",
            "DVDR",
            "DVD-Full",
            "HDTV",
            "HDTVRip",
            "WebRip",
            "WebDL",
            "TVRip",
            "HDRip",
            "BluRay",
            "BDRip",
            "BRRip",
            "BRip",
          ]}
          placeholder="Release type"
          id={props.index}
          name="release_type"
          val={props?.data?.release_type}
        />
      </div>
      <div className="flex space-x-2 ">
        <Select
          className="basis-1/2 md:basis-1/3"
          options={[
            "Hindi",
            "Hin-Eng",
            "Eng",
            "Tamil",
            "Telegu",
            "Marathi",
            "Punjabi",
            "Bengali",
          ]}
          placeholder="Language"
          id={props.index}
          name="language"
          val={props?.data?.language}
        />
        <Input
          inputParams={{ type: "text", placeholder: "Size eg:- 1.3gb" }}
          id={props.index}
          name="size"
          validation={(val) => sizeValidation(val)}
          className="flex-1 w-0"
          val={props?.data?.size}
        />
      </div>
      <Input
        inputParams={{ type: "url", placeholder: "Download link" }}
        id={props.index}
        name="download_link"
        validation={(val) => urlValidation(val)}
        className="w-full"
        val={props?.data?.download_link}
      />
      <Checkbox
        id={props.index}
        name="isTorrent"
        val={props?.data?.isTorrent}
      />
    </div>
  );
};
export default Form;
