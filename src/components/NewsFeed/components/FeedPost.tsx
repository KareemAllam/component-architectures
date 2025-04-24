// --- FeedPost Component ---
// Displays a single post and handles interactions.

import { Post } from "../provider/redux";

interface FeedPostProps {
  post: Post;
  onInteraction: (postId: number, interactionType: string) => void;
}

export default function FeedPost({ post, onInteraction }: FeedPostProps) {
  return (
    <div className="bg-white p-4 rounded-lg flex flex-col gap-3"> {/* Added border, adjusted shadow */}
      <div className="flex items-center gap-3"> {/* Flex container for avatar, name, time */}
        {/* Placeholder for User Avatar */}
        <div className="w-10 h-10 rounded-full bg-gray-300">
          <img src={post.avatar} alt={post.name} className="w-full h-full object-cover rounded-full" />
        </div>
        <div className="flex flex-col items-start">
          <span className="font-semibold text-gray-900">{post.name}</span>
          <div className="text-xs text-gray-500 mt-0.5"> {/* Smaller, less prominent timestamp */}
            {new Date(post.createdAt).toLocaleString()}
          </div>
        </div>
      </div>
      <p className="text-gray-800 text-left max-w-2xl">{post.content}</p>
      <div className="flex gap-2">
        <button onClick={() => onInteraction(post.id, 'like')}
        >
          <span className="mr-1">❤️</span>
          Like ({Number(post.likes).toFixed(0)})
        </button>
        <button onClick={() => onInteraction(post.id, 'share')}
        >
          <span className="mr-1">🔗</span>
          Share ({Number(post.shares).toFixed(0)})
        </button>
        <button onClick={() => onInteraction(post.id, 'comment')}
        >
          <span className="mr-1">💬</span>
          Comment ({Number(post.comments).toFixed(0)})
        </button>
        {/* Add other interaction buttons like Comment, Share here */}
      </div>
    </div>
  );
};
