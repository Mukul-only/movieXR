import Card from "./Card";

const BlogPage = (props) => {
  return (
    <Card className="flex flex-col items-center pt-6 pb-24 md:items-start">
      <h1 className="text-2xl font-bold md:text-3xl">{props.heading}</h1>
      <div className="max-w-md mt-8 space-y-3 text-center md:max-w-4xl text-Gray-200 md:text-left">
        {props.children}
      </div>
    </Card>
  );
};
export default BlogPage;
