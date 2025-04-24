import { Suggestion } from './types'; // Import types

// Simulate an API call to fetch suggestions
// In a real app, this would be an actual fetch or axios call
export const fetchSuggestionsFromAPI = async (query: string): Promise<Suggestion[]> => {
  console.log(`Simulating API fetch for query: "${query}"`);
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simulate API response based on the query
    const allPossibleSuggestions: Suggestion[] = [
      { id: 1, name: 'Apple' },
      { id: 2, name: 'Banana' },
      { id: 3, name: 'Cherry' },
      { id: 4, name: 'Date' },
      { id: 5, name: 'Grape' },
      { id: 6, name: 'Lemon' },
      { id: 7, name: 'Mango' },
      { id: 8, name: 'Orange' },
      { id: 9, name: 'Peach' },
      { id: 10, name: 'Pear' },
    ];

    const filteredSuggestions = allPossibleSuggestions.filter(suggestion =>
      suggestion.name.toLowerCase().includes(query.toLowerCase())
    );

    return filteredSuggestions;
  } catch (error) {
    console.error('Error fetching suggestions from API:', error);
    // In a real app, you might throw the error or return a specific error structure
    return [];
  }
};
