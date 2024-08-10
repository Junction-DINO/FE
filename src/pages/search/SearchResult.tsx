import Layout from '@/components/layout/layout';
import { SearchInput } from '@/components/search/SearchInput';
import { getNutritionData } from '@/services/NuturitionAPI';

import { Nutrition } from '@/type/product';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const SearchResults = () => {
  const { query } = useParams<{ query: string }>();
  const {
    data: nutritionData,
    error,
    isLoading,
  } = useQuery<Nutrition[]>({
    queryKey: ['nutritionData,', query],
    queryFn: () => getNutritionData({ query: query || '', size: 10 }),
    staleTime: 1000 * 60 * 5,
    enabled: !!query,
  });
  console.log(nutritionData);
  if (isLoading) {
    return (
      <Layout>
        <div className="relative w-full h-screen flex justify-center items-center">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="relative w-full h-screen flex justify-center items-center">
          <p>Error loading data</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="relative w-full h-screen overflow-hidden">
        <SearchInput mt="mt-10" placeholder={`Search results for "${query}"`} />
        <div className="bg-white mt-3 w-full h-full rounded-t-3xl">
          <h2 className="pt-5 text-center text-customGrey text-lg">
            Products searched by photos taken
          </h2>
          <div className="p-4"></div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchResults;
