import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Post } from '../provider/redux';
import postsKeys from './queryKeys';

const addPost = async (postContent: string): Promise<Post> => {
  const newPost: Partial<Post> = {
    content: postContent, // Assuming content maps to 'body'
    createdAt: new Date().toISOString(), // Add creation time
    name: 'Admin', // Replace with actual user name
    avatar: 'https://avatars.githubusercontent.com/u/89702434', // Add default avatar
    likes: 0, // Initialize likes
    comments: 0, // Initialize comments
    shares: 0 // Initialize shares
  };

  const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, { // Using placeholder API
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // Adjust body based on your actual API and Post type structure
    body: JSON.stringify(newPost),
  });

  if (!response.ok) {
    const errorBody = await response.text(); // Read error body for more details
    console.error("Add Post API Error Body:", errorBody);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const newPostData = await response.json();

  return newPostData;
};

export const useAddPost = () => {
  const queryClient = useQueryClient();

  return useMutation<Post, Error, string>({ // <Return Type, Error Type, Variables Type>
    mutationFn: addPost,
    onSuccess: (newPost) => {
      console.log('Post added:', newPost);
      // Invalidate and refetch the posts query to include the new post
      queryClient.invalidateQueries({ queryKey: postsKeys.all });

      // --- OR --- Optimistic Update (Example) ---
      // Immediately add the new post to the cache before refetching
      // queryClient.setQueryData<Post[]>(postsKeys.all, (oldData) => {
      //   return oldData ? [...oldData, newPost] : [newPost];
      // });
      // --- End Optimistic Update ---
    },
    onError: (error) => {
      console.error('Failed to add post:', error.message);
      // Optionally show a notification to the user
    },
  });
};
