import BlogPage from "../UI/BlogPage";

const DownloadProcessPage = (props) => {
  return (
    <BlogPage
      heading="How to download ?"
      className="w-[80%] sm:w-full overflow-hidden bg-black border rounded-xl border-Gray aspect-[8/18] sm:aspect-video max-w-none md:max-w-none"
    >
      <iframe
        src="https://player.vimeo.com/video/844302710?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        className="w-full h-full "
        title="Download process.mp4"
      />

      <script src="https://player.vimeo.com/api/player.js"></script>
    </BlogPage>
  );
};
export default DownloadProcessPage;
