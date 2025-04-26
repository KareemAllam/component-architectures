import { Post } from "../provider/redux";
import { useQuery } from '@tanstack/react-query';
import postsKeys from "./queryKeys";

// url.searchParams.append('sortBy', 'title');
// url.searchParams.append('order', 'desc'); 

const fetchPosts = async (): Promise<Post[]> => {
  const url = new URL(`${import.meta.env.VITE_API_URL}/posts`);
  url.searchParams.append('sortBy', 'id');
  url.searchParams.append('order', 'desc');

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: Post[] = await response.json();
  // TODO: Map API response if necessary to match the Post type
  // Example: Ensure `likes` field exists, potentially defaulting to 0
  return data.map(post => ({ ...post, likes: post.likes ?? 0, /* other defaults */ }));
};

export const useFetchPosts = () => {
  return useQuery<Post[], Error>({
    queryKey: postsKeys.all,
    queryFn: fetchPosts,
    // staleTime: 5 * 60 * 1000, // Optional: 5 minutes stale time
    // refetchOnWindowFocus: false, // Optional: Disable refetch on window focus
  });
};
