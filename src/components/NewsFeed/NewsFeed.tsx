import React, { useEffect } from "react";
import { useController } from "./controller";
import Feed from "./components/Feed";
import { ClientStoreProvider } from "./provider";

const NewsFeed = () => {
  const { fetchFeedData } = useController(); // Use controller to fetch initial data

  // Fetch feed data when the component mounts
  useEffect(() => {
    fetchFeedData();
  }, []); // Include fetchFeedData in dependency array

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold text-center">Simple Feed Application</h1>
      </header>
      <main>
        <Feed /> {/* Render the main feed UI */}
      </main>
    </div>
  );
};

export default () => {
  return (
    <ClientStoreProvider>
      <NewsFeed />
    </ClientStoreProvider>
  );
};
