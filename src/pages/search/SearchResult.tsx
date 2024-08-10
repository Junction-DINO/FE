import { useParams } from 'react-router-dom';

const SearchResults = () => {
  const { query } = useParams<{ query: string }>();

  return (
    <div>
      <h1>Search Results for: {query}</h1>
    </div>
  );
};

export default SearchResults;
