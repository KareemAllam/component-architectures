import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Suggestion, Cache } from './types'; // Import types
import { debounce } from './utils'; // Import utility functions
import { fetchSuggestionsFromAPI } from './api'; // Import API functions

const AutoComplete: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false); // State to control suggestion list visibility

  // Use useRef to store the cache, as changes to the cache shouldn't trigger re-renders
  const cache = useRef<Cache>({});

  // Debounced version of the fetch logic
  const debouncedFetchSuggestions = useCallback(
    debounce(async (query: string) => {
      if (query.length < 2) { // Only fetch if query is at least 2 characters (optional)
        setSuggestions([]);
        setLoading(false); // Ensure loading is false if query is too short
        return;
      }

      // 1. Check Cache
      if (cache.current[query]) {
        console.log(`Cache hit for query: "${query}"`);
        setSuggestions(cache.current[query]);
        setLoading(false); // Ensure loading is false on cache hit
        return;
      }

      // 2. Cache Miss - Fetch from API
      setLoading(true); // Set loading true before API call
      const fetchedSuggestions = await fetchSuggestionsFromAPI(query);

      // 3. Update Cache
      cache.current[query] = fetchedSuggestions;
      console.log(`Cache updated for query: "${query}"`);

      // Update suggestions state
      setSuggestions(fetchedSuggestions);
      setLoading(false); // Set loading false after fetch
    }, 300), // Debounce delay of 300ms
    [] // Empty dependency array as fetchSuggestionsFromAPI is now imported and stable
  );

  // Effect to call the debounced fetch function when input changes
  useEffect(() => {
    if (inputValue.trim() === '') {
      setSuggestions([]);
      setLoading(false);
      return;
    }
    debouncedFetchSuggestions(inputValue);
  }, [inputValue, debouncedFetchSuggestions]);

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setShowSuggestions(true); // Show suggestions when typing
  };

  // Handle selecting a suggestion
  const handleSelectSuggestion = (suggestion: Suggestion) => {
    setInputValue(suggestion.name);
    setSuggestions([]); // Clear suggestions after selection
    setShowSuggestions(false); // Hide suggestions after selection
    // You might want to trigger another action here, like navigating or filling a form field
    console.log('Selected:', suggestion.name);
  };

  // Hide suggestions when input loses focus, but with a slight delay
  // to allow clicking on a suggestion
  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 100); // Adjust delay as needed
  };

  // Show suggestions when input gains focus if there's already input
  const handleFocus = () => {
    if (inputValue.trim() !== '') {
      setShowSuggestions(true);
    }
  };


  return (
    <div className="relative w-full max-w-md mx-auto mt-10">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder="Start typing..."
        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
      {loading && (
        <div className="absolute right-3 top-3">
          {/* Simple loading spinner (using Tailwind classes) */}
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
        </div>
      )}

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
          {suggestions.map(suggestion => (
            <li
              key={suggestion.id}
              onClick={() => handleSelectSuggestion(suggestion)}
              className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0"
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
      {showSuggestions && !loading && inputValue.length >= 2 && suggestions.length === 0 && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 p-3 text-gray-500">
          No suggestions found.
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
