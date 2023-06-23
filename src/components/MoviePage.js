import { useSearchParams, useNavigation } from "react-router-dom";
import NavigationButton from "./NavigationButton";
import AltCard from "./Landingpage/AltCard";
import { useEffect } from "react";
import { Skeleton } from "../pages/MovieTypePage";
import ErrorElement from "../UI/ErrorElement";

const MoviePage = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();
  // console.log(navigation.state);
  const page = searchParams.get("page");
  useEffect(() => {
    if (!page) setSearchParams({ page: 1 });
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  const totalPage = props?.data?.total_pages;
  const totalResults = props?.data?.total_results;
  return (
    <>
      <p className="text-xs md:text-sm text-gray-400 mt-1">
        results : {totalResults}{" "}
      </p>
      {totalResults > 0 ? (
        <>
          <NavigationButton totalPage={totalPage} className="mt-6" />
          <div className="grid-movie mt-6">
            {navigation.state === "loading" ? (
              <Skeleton />
            ) : (
              props.data.results.map((item) => (
                <AltCard
                  key={item.id}
                  data={item}
                  className="w-full md:w-[204px] "
                />
              ))
            )}
          </div>
          <NavigationButton totalPage={totalPage} className="mt-6" />
        </>
      ) : (
        <ErrorElement error="No results found" className="mx-auto mt-6" />
      )}
    </>
  );
};
export default MoviePage;
