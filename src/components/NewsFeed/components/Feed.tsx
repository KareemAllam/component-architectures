// --- Feed Component ---
// Renders the PostComposer and the list of FeedPosts.

import React from "react";
import { useController } from "../controller.tsx";
import FeedPost from "./FeedPost.tsx";
import PostComposer from "./FeedComposer.tsx";

const Feed: React.FC = () => {
  const { posts, loadingFeed, postingNew, error, addNewPost, handleInteraction }
    = useController(); // Use the controller hook

  return (
    <div className="container mx-auto p-4">
      {/* Pass the posting state to the PostComposer */}
      <PostComposer onNewPost={addNewPost} posting={postingNew} />

      {/* Display global errors */}
      {error && !loadingFeed && !postingNew && (
        <p className="text-center text-red-500 mb-4">Error: {error}</p>
      )}

      {loadingFeed && <p className="text-center text-gray-600">Loading feed...</p>}


      {!loadingFeed && posts.length === 0 && !error && (
        <p className="text-center text-gray-600">No posts yet. Be the first to post!</p>
      )}

      {/* Only render posts if not loading the feed and no major error */}
      {!loadingFeed && !error && posts.map(post => (
        <FeedPost key={post.id} post={post} onInteraction={handleInteraction} /> // Pass the interaction handler
      ))}
    </div>
  );
};

export default Feed;