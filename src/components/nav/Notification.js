import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import NotificationSkeleton from "./NotificationSkeleton";
import { useSelector } from "react-redux";

import removeNotification from "../../ApiCalls/removeNotification";
const NotificationItem = ({ data, setFlag, setShowNotification }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500/${data?.poster_path}`;
  const title =
    data?.title?.length >= 22 ? data?.title?.slice(0, 21) + "..." : data?.title;
  const id = data?.id;
  const { userId } = useSelector((state) => state.userId);
  const removeNotificationHandler = () => {
    if (userId) {
      removeNotification(userId, id).then((e) => {
        setFlag((prev) => !prev);
      });
      setShowNotification(false);
    }
  };
  return (
    <Link
      to={`/detail/${id}`}
      className="flex max-w-sm space-x-3"
      onClick={removeNotificationHandler}
    >
      <img src={imageUrl} className="block w-12 rounded-lg " />
      <div className="text-Gray-200 ">
        <h1 className="font-bold tracking-tight text-gray-200 md:text-lg ">
          Your request is fullfilled!
        </h1>
        <p className="text-sm md:text-base">Links are now available.</p>
        <p className="text-sm font-semibold md:text-base">{title}</p>
      </div>
    </Link>
  );
};

const Notification = (props) => {
  const dataArr = props.data ? Object?.values(props?.data) : [];
  return (
    <div
      className={twMerge(
        `absolute top-[110%] space-y-6 right-3 max-h-[500px] bg-Dark-700 border border-Gray rounded-xl px-4 py-6 md:p-6  overflow-y-auto`,
        props.className
      )}
      onClick={props.onClick}
    >
      {props.loading && (
        <>
          <NotificationSkeleton />
          <NotificationSkeleton />
        </>
      )}
      {dataArr?.map((item) => (
        <NotificationItem
          key={item.id}
          data={item}
          setFlag={props.setFlag}
          setShowNotification={props.setShowNotification}
        />
      ))}
      {dataArr.length === 0 && !props.loading && (
        <p className="py-6 text-sm font-semibold text-center text-Gray-500">
          Notification list is empty!
        </p>
      )}
    </div>
  );
};
export default Notification;
