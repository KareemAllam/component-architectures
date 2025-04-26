import { useEffect } from "react";
import { useController } from "./provider/useController";
import Feed from "./components/Feed";
import { ClientStoreProvider } from "./provider/provider";

const NewsFeed = () => {
  const { fetchFeedData } = useController(); // Use controller to fetch initial data

  // Fetch feed data when the component mounts
  useEffect(() => {
    fetchFeedData();
  }); // Include fetchFeedData in dependency array

  return (
    <div className="flex flex-col gap-4 w-[80%] mx-auto">
      <div className="bg-yellow-400 text-white rounded-lg">
        <div className="text-xl font-bold py-2 text-black text-center">Simple Feed Application</div>
      </div>
      <Feed />
    </div>
  );
};

const NewsFeedWrapper = () => {
  return (
    <ClientStoreProvider>
      <NewsFeed />
    </ClientStoreProvider>
  );
};

export default NewsFeedWrapper;