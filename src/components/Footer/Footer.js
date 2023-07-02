import Card from "../../UI/Card";
import SVG from "../../svg/SVG";
import Brand from "../../svg/Brand";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import youtube from "../../svg/youtube";
import whatsapp from "../../svg/whatsapp";
import insta from "../../svg/insta";
import gmail from "../../svg/gmail";

const FooterLinks = (props) => {
  return (
    <Link to={props.to}>
      <span
        className={twMerge(
          "text-Gray-200 block py-1  hover:text-white",
          props.className
        )}
      >
        {props.text}
      </span>
    </Link>
  );
};

const Footer = (props) => {
  return (
    <div className="py-6 border-t border-Gray">
      <Card className="flex flex-col items-center justify-between md:items-start md:flex-row">
        <div className="flex flex-col items-center md:items-start">
          <Link to="/">
            <SVG svg={Brand} className="w-24 md:w-32" />
          </Link>
          <FooterLinks
            to="/how_to_download"
            text="How to download?"
            className="mt-6"
          />
          <FooterLinks to="/terms" text="Terms Of Service" />
          <FooterLinks to="/privacy" text="Privacy Policy" />
        </div>
        <div className="mt-6 md:mt-0">
          <h1 className="text-lg font-bold text-center ">Socials</h1>
          <div className="flex mt-4 space-x-2">
            <a
              href="https://www.youtube.com/channel/UCjIBYnKXMAiWx53vOuQfc4g"
              target="_blank"
            >
              <SVG svg={youtube} className="socials" />
            </a>
            <a href="https://wa.me/+918303621836" target="_blank">
              <SVG svg={whatsapp} className="socials" />
            </a>
            <a
              href="https://www.instagram.com/direct/t/17842091330355291"
              target="_blank"
            >
              <SVG svg={insta} className="socials" />
            </a>
            <a href="mailto:morbiusnotfound21@gmail.com" target="_blank">
              <SVG svg={gmail} className="socials" />
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default Footer;
