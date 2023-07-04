import BlogPage from "../UI/BlogPage";

const DownloadProcessPage = (props) => {
  return (
    <BlogPage
      heading="How to download ?"
      className="w-full overflow-hidden bg-black border rounded-xl border-Gray aspect-video max-w-none md:max-w-none"
    >
      <iframe
        src="https://drive.google.com/file/d/1jFhux5claM1fF03TgGfyZ8CjiVkaFIwL/preview"
        allow="autoplay"
        className="w-full h-full"
        allowFullScreen
      />
    </BlogPage>
  );
};
export default DownloadProcessPage;
