import { useMutation, useQueryClient } from '@tanstack/react-query';
import postsKeys from './queryKeys';

const handleInteractionApi = async (postId: number, interactionType: string): Promise<void> => {
  console.log(`Simulating interaction "${interactionType}" for post ID: ${postId} on server`);
  // Replace with your actual API endpoint for interactions
  // const response = await fetch(`/api/posts/${postId}/interact`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ type: interactionType }),
  // });
  // if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  // }
  // const updatedPost: Post = await response.json(); // Or maybe just a success status
  // return updatedPost; // Return data if needed for optimistic updates

  // --- Simulated fetch for demonstration ---
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate server delay
  if (Math.random() < 0.1) { // Simulate occasional failure
    throw new Error("Simulated interaction failure");
  }
  // --- End simulated fetch ---
  // Return void or updated data if your API provides it
};

export const useHandleInteraction = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { postId: number; interactionType: string }>({
    mutationFn: ({ postId, interactionType }) => handleInteractionApi(postId, interactionType),
    onSuccess: (_, variables) => { // First arg is mutation result (void here), second is variables
      console.log(`Interaction ${variables.interactionType} for post ${variables.postId} successful.`);
      // Invalidate the posts query to refetch updated data (e.g., like count)
      // This refetches the entire list, which might not be ideal for performance.
      // Consider optimistic updates or invalidating only the specific post's query if you have one.
      queryClient.invalidateQueries({ queryKey: postsKeys.all });

      // --- Alternative: Optimistic Update (Conceptual Example) ---
      // queryClient.setQueryData<Post[]>(postsKeys.all, (oldData) =>
      //   oldData?.map(post =>
      //     post.id === variables.postId
      //       ? { ...post, likes: post.likes + (variables.interactionType === 'like' ? 1 : 0) } // Adjust logic as needed
      //       : post
      //   ) ?? []
      // );
      // --- End Optimistic Update ---
    },
    onError: (error, variables) => {
      console.error(`Failed to handle interaction ${variables.interactionType} for post ${variables.postId}:`, error.message);
      // Optionally show notification
      // If using optimistic updates, you'd revert the change here in onError or onSettled
    },
    // onSettled: () => { // Runs after onSuccess or onError
    //    queryClient.invalidateQueries({ queryKey: postsKeys.all }); // Ensure data consistency even after optimistic updates
    // }
  });
};
