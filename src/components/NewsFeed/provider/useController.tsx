// This hook acts as a controller, orchestrating calls to data hooks and potentially managing local UI state.
import { useHandleInteraction, useAddPost, useFetchPosts } from '../hooks';

export const useController = () => {
  // Use the Tanstack Query hooks
  const {
    data: posts = [], // Default to empty array
    isLoading: loadingFeed,
    error: fetchError,
    refetch: fetchFeedData // Expose refetch function
  } = useFetchPosts();

  const { mutate: addNewPostMutate,
    isPending: postingNew,
    error: addPostError
  } = useAddPost();

  const { mutate: handleInteractionMutate,
    isPending: isHandlingInteraction,
    error: interactionError
  } = useHandleInteraction();

  // Combine errors or handle them individually as needed
  const error = fetchError || addPostError || interactionError;


  // Adapt the interaction handler to call the mutation
  const handleInteraction = (postId: number, interactionType: string) => {
    handleInteractionMutate({ postId, interactionType });
  };

  // Adapt the add post handler to call the mutation
  const addNewPost = (postContent: string) => {
    addNewPostMutate(postContent);
  };


  // Expose state and actions needed by UI components
  return {
    posts,          // Data from useFetchPosts
    loadingFeed,    // Loading state from useFetchPosts
    postingNew,     // Loading state from useAddPost
    isHandlingInteraction, // Expose interaction pending state
    error: error ? error.message : null, // Provide error message string
    fetchFeedData,  // Function to manually refetch posts
    addNewPost,     // Function to trigger adding a post
    handleInteraction, // Function to trigger an interaction
  };
};