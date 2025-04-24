// Define a simple type for the suggestion data
export interface Suggestion {
  id: number;
  name: string; // Or whatever data your suggestions contain
}

// Define the shape of our cache
// The key will be the search query string
// The value will be an array of suggestions
export interface Cache {
  [query: string]: Suggestion[];
}
