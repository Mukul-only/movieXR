import { twMerge } from "tailwind-merge";
import Card from "./Card";
import { useEffect } from "react";
const BlogPage = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Card className={"flex flex-col items-center pt-6 pb-24 md:items-start"}>
      <h1 className="text-2xl font-bold md:text-3xl">{props.heading}</h1>
      <div
        className={twMerge(
          "max-w-md mt-8 space-y-3 text-center md:max-w-4xl text-Gray-200 md:text-left",
          props.className
        )}
      >
        {props.children}
      </div>
    </Card>
  );
};
export default BlogPage;
