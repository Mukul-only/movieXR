const NotificationSkeleton = () => {
  return (
    <div className="flex max-w-sm space-x-3">
      <span className="block w-12 h-20 rounded-lg loading-card" />
      <div className="py-1 space-y-3">
        <span className="block h-3 rounded-lg w-44 loading-text " />
        <span className="block h-2 rounded-lg w-36 loading-text" />
        <span className="block w-40 h-2 rounded-lg loading-text" />
        <span className="block w-32 h-2 rounded-lg loading-text" />
      </div>
    </div>
  );
};
export default NotificationSkeleton;
