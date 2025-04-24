// --- PostComposer Component ---
// Allows users to create and submit new posts.

import React from "react";
import { useState } from "react";

interface PostComposerProps {
  onNewPost: (postContent: string) => void;
  posting: boolean;
}

const PostComposer: React.FC<PostComposerProps> = ({ onNewPost, posting }) => {
  const [postContent, setPostContent] = useState('');
  const [error, setError] = useState<string | null>(null); // Local state for input validation error

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    if (!postContent.trim()) {
      setError('Post content cannot be empty.');
      return;
    }

    await onNewPost(postContent); // Call the handler from the controller
    setPostContent(''); // Clear the input field on successful post
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h3 className="text-lg font-semibold text-black mb-3 text-left">Create New Post</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          className={`w-full p-2 text-black border rounded-md focus:outline-none focus:ring ${error ? 'border-red-500 focus:ring-red-300' : 'focus:border-blue-300 focus:ring-blue-300'}`}
          rows={3} // Use number for rows prop
          placeholder="What's on your mind?"
          value={postContent}
          onChange={(e) => {
            setPostContent(e.target.value);
            if (error && e.target.value.trim()) { // Clear error if user starts typing after an error
              setError(null);
            }
          }}
          disabled={posting} // Disable textarea while posting
        ></textarea>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        <button
          type="submit"
          className="mt-3 px-4 py-2 w-full text-white rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
          disabled={posting} // Disable button while posting
        >
          {posting ? 'Posting...' : 'Post'} {/* Change button text while posting */}
        </button>
      </form>
    </div>
  );
};

export default PostComposer;