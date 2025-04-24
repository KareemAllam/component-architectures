// --- Type Definitions ---
// Define interfaces for the data structures and state

export interface Post {
  id: number;
  createdAt: string;
  name: string;
  avatar: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
}

export interface FeedState {
  posts: Post[];
  loadingFeed: boolean; // Loading state specifically for fetching the feed
  postingNew: boolean; // Loading state specifically for posting a new item
  error: string | null; // To store any error messages
}

// Define action types
export type ActionType =
  | { type: 'FETCH_POSTS_START' }
  | { type: 'FETCH_POSTS_SUCCESS'; payload: Post[] }
  | { type: 'FETCH_POSTS_FAILURE'; payload: string }
  | { type: 'ADD_POST_START' } // Action for starting the add post process
  | { type: 'ADD_POST_SUCCESS'; payload: Post } // Action for successful add post
  | { type: 'ADD_POST_FAILURE'; payload: string }; // Action for failed add post

// --- Client Store (Context and Reducer) ---
// This simulates the client-side data store using React Context and useReducer.

// Define the initial state with its type
const initialState: FeedState = {
  posts: [], // Array to hold feed post objects
  loadingFeed: false, // Flag to indicate if feed data is being loaded
  postingNew: false, // Flag to indicate if a new post is being submitted
  error: null, // To store any error messages
};

// Define action types for the reducer (using the ActionType union)
const actionTypes = {
  FETCH_POSTS_START: 'FETCH_POSTS_START',
  FETCH_POSTS_SUCCESS: 'FETCH_POSTS_SUCCESS',
  FETCH_POSTS_FAILURE: 'FETCH_POSTS_FAILURE',
  ADD_POST_START: 'ADD_POST_START',
  ADD_POST_SUCCESS: 'ADD_POST_SUCCESS',
  ADD_POST_FAILURE: 'ADD_POST_FAILURE',
  // Could add more action types for liking, commenting, etc.
} as const;

// Reducer function to handle state transitions based on actions
const reducer = (state: FeedState, action: ActionType): FeedState => {
  switch (action.type) {
    case actionTypes.FETCH_POSTS_START:
      return { ...state, loadingFeed: true, error: null };
    case actionTypes.FETCH_POSTS_SUCCESS:
      // Assuming action.payload is an array of post objects
      return { ...state, loadingFeed: false, posts: action.payload };
    case actionTypes.FETCH_POSTS_FAILURE:
      // Assuming action.payload is an error message
      return { ...state, loadingFeed: false, error: action.payload };
    case actionTypes.ADD_POST_START:
      return { ...state, postingNew: true, error: null };
    case actionTypes.ADD_POST_SUCCESS:
      // Add the new post to the beginning of the posts array
      // Assuming action.payload is the new post object
      return { ...state, postingNew: false, posts: [action.payload, ...state.posts] };
    case actionTypes.ADD_POST_FAILURE:
      return { ...state, postingNew: false, error: action.payload };
    default:
      return state;
  }
};

export { initialState, actionTypes, reducer };