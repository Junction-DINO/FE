import Layout from '@/components/layout/layout';
import { SearchInput } from '@/components/search/SearchInput';
import { useParams } from 'react-router-dom';

const SearchResults = () => {
  const { query } = useParams<{ query: string }>();

  return (
    <Layout>
      <div className="relative w-full h-screen overflow-hidden">
        <SearchInput mt="mt-10" placeholder={`Search results for "${query}"`} />
        <div className="bg-white mt-3 w-full h-full rounded-t-3xl">
          <h2 className="pt-5 text-center text-customGrey text-lg">
            Products searched by photos taken
          </h2>
        </div>
      </div>
    </Layout>
  );
};

export default SearchResults;
