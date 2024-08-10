import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SearchInput() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search/${query}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <div className="flex w-full  items-center space-x-2">
      <div className="relative flex w-full">
        <Input
          type="search"
          placeholder="Search"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="pr-12"
        />
        <Button
          type="submit"
          onClick={handleSearch}
          className="bg-white absolute inset-y-0 right-0 flex items-center px-3"
        >
          ⭕
        </Button>
      </div>
    </div>
  );
}
