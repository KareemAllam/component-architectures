// This hook handles application logic, interacts with the store, and simulates server communication.

import { useClientStore } from "./provider";
import { actionTypes, Post } from "./redux";

const simulatedData: Post[] = [
  { id: 1, author: 'Alice', content: 'This is the first post!', timestamp: new Date().toISOString(), likes: 5 },
  { id: 2, author: 'Bob', content: 'Another exciting post!', timestamp: new Date().toISOString(), likes: 10 },
];

export const useController = () => {
  const { state, dispatch } = useClientStore();

  // Simulate fetching initial feed data from the server using fetch
  const fetchFeedData = async (): Promise<void> => {
    dispatch({ type: actionTypes.FETCH_POSTS_START });
    try {
      // Replace with your actual API endpoint
      // const response = await fetch('/api/posts');
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
      // const data: Post[] = await response.json();

      // --- Simulated fetch for demonstration ---
      await new Promise(resolve => setTimeout(resolve, 1000));

      const data = simulatedData;
      // --- End simulated fetch ---


      dispatch({ type: actionTypes.FETCH_POSTS_SUCCESS, payload: data });
    } catch (error: any) {
      console.error('Failed to fetch posts:', error);
      dispatch({ type: actionTypes.FETCH_POSTS_FAILURE, payload: error.message || 'Failed to fetch posts.' });
    }
  };

  // Simulate adding a new post (sending to server and updating store) using fetch
  const addNewPost = async (postContent: string): Promise<void> => {
    dispatch({ type: actionTypes.ADD_POST_START });
    try {
      // Replace with your actual API endpoint and request body
      // const response = await fetch('/api/posts', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ content: postContent, author: 'CurrentUser' }), // Adjust based on your API
      // });

      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }

      // const newPost: Post = await response.json(); // Assuming API returns the created post

      // --- Simulated fetch for demonstration ---
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate server delay
      const newPost: Post = { // Simulate server response
        id: Date.now(), // Simple unique ID
        author: 'CurrentUser', // Replace with actual user
        content: postContent,
        timestamp: new Date().toISOString(),
        likes: 0,
      };
      // --- End simulated fetch ---


      // Update the client store with the new post
      dispatch({ type: actionTypes.ADD_POST_SUCCESS, payload: newPost });
      console.log('New post added to store:', newPost);

    } catch (error: any) {
      console.error('Failed to add new post:', error);
      dispatch({ type: actionTypes.ADD_POST_FAILURE, payload: error.message || 'Failed to add post.' });
    }
  };

  // Simulate handling an interaction (e.g., liking) using fetch
  const handleInteraction = async (postId: number, interactionType: string): Promise<void> => {
    console.log(`Handling interaction "${interactionType}" for post ID: ${postId}`);
    try {
      // Replace with your actual API endpoint for interactions
      // const response = await fetch(`/api/posts/${postId}/interact`, {
      //     method: 'POST', // Or PUT, depending on your API design
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ type: interactionType }), // Adjust based on your API
      // });
      // if (!response.ok) {
      //     throw new Error(`HTTP error! status: ${response.status}`);
      // }
      // // Assuming API might return updated post data
      // const updatedPost: Post = await response.json();
      // // You would then dispatch an action to update the specific post in the store

      // --- Simulated fetch for demonstration ---
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate server delay
      console.log(`Interaction "${interactionType}" for post ID ${postId} processed on server.`);
      // In a real app, you'd update the client store here based on server response
      // --- End simulated fetch ---

    } catch (error: any) {
      console.error(`Failed to handle interaction for post ID ${postId}:`, error);
      // Optionally dispatch an error action for interactions
    }
  };


  // Expose state and actions needed by UI components
  return {
    posts: state.posts,
    loadingFeed: state.loadingFeed,
    postingNew: state.postingNew, // Expose posting loading state
    error: state.error,
    fetchFeedData,
    addNewPost,
    handleInteraction, // Expose interaction handler
  };
};