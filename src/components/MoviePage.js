import { useSearchParams, useNavigation } from "react-router-dom";
import NavigationButton from "./NavigationButton";
import AltCard from "./Landingpage/AltCard";
import { useEffect } from "react";
import { Skeleton } from "../pages/MovieTypePage";

const MoviePage = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();
  const page = searchParams.get("page");
  useEffect(() => {
    setSearchParams({ page: 1 });
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  const totalPage = props?.data?.total_pages;
  return (
    <>
      <NavigationButton totalPage={totalPage} />
      <div className="grid-movie">
        {navigation.state === "loading" ? (
          <Skeleton />
        ) : (
          props.data.results.map((item) => (
            <AltCard
              key={item.id}
              data={item}
              className="w-auto md:w-[204px] "
            />
          ))
        )}
      </div>
      <NavigationButton totalPage={totalPage} />
    </>
  );
};
export default MoviePage;
