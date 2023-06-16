import Carousel from "../../UI/Carousel";
import TrendingCard from "./TrendingCard";
const TrendingSection = (props) => {
  return (
    <Carousel
      listItems={() => {
        {
          return props.data
            .slice(0, 7)
            .map((item) => <TrendingCard data={item} key={item.id} />);
        }
      }}
      outerH="h-[182px]"
      innerH="h-[182px]  md:h-[309px]"
    />
  );
};

export default TrendingSection;
