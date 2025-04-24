// --- FeedPost Component ---
// Displays a single post and handles interactions.

import React from "react";
import { Post } from "../redux";

export default function FeedPost({ post, onInteraction }: { post: Post; onInteraction: (postId: number, interactionType: string) => void }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <p className="text-gray-800">{post.content}</p>
      <div className="text-sm text-gray-500 mt-2">
        Posted by {new Date(post.timestamp).toLocaleString()} by {post.author}
      </div>
      <div className="mt-2">
        <button
          className="text-blue-500 hover:underline mr-4 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => onInteraction(post.id, 'like')} // Call interaction handler
        // You might disable the button while an interaction is in progress for this post
        // disabled={/* Add a state check here if implementing per-post interaction loading */}
        >
          Like ({post.likes})
        </button>
        {/* Add other interaction buttons like Comment, Share */}
      </div>
    </div>
  );
};