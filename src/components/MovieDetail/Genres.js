const Genres = (props) => {
  return (
    <div className="px-4 py-2 rounded-full border md:border-2 font-normal md:font-[600] text-xs md:text-sm border-primary text-primary">
      {props.genre}
    </div>
  );
};
export default Genres;
