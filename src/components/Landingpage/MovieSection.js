import Carousel from "../../UI/Carousel";
import AltCard from "./AltCard";

const MovieSection = (props) => {
  return (
    <Carousel
      listItems={() => {
        return props.data
          .slice(0, 12)
          .map((item) => <AltCard data={item} key={item.id} />);
      }}
      outerH="h-[290px]"
      innerH="h-[250px] md:h-[290px]"
    />
  );
};
export default MovieSection;
