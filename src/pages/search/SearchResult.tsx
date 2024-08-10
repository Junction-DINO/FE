import Layout from '@/components/layout/layout';
import { SearchInput } from '@/components/search/SearchInput';
import { getNutritionData } from '@/services/NuturitionAPI';

import { NutritionDTO } from '@/type/product';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import NutritionCard from './NutritionCard';
import Chatbot from '@/components/chatbot/ChatBox';

const SearchResults = () => {
  const { query } = useParams<{ query: string }>();

  const {
    data: nutritionData,
    error,
    isLoading,
  } = useQuery<NutritionDTO[]>({
    queryKey: ['nutritionData,', query],
    queryFn: () => getNutritionData({ query: query || '' }),
    staleTime: 1000 * 60 * 5,
    enabled: !!query,
  });
  // console.log(nutritionData);
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
      <div className="relative w-full min-h-screen overflow-hidden">
        <SearchInput mt="mt-10" placeholder={`Search results for "${query}"`} />
        <div className="bg-white mt-3 w-full h-full rounded-t-3xl">
          <h2 className="pt-5 text-center text-customGrey text-lg">
            Products searched by photos taken
          </h2>
          <div className="mt-4 space-y-4">
            {nutritionData && nutritionData.length > 0 ? (
              nutritionData.map((product: NutritionDTO, index: number) => (
                <NutritionCard key={index} product={product} />
              ))
            ) : (
              <p className="text-center text-lg">No results found for "{query}".</p>
            )}
          </div>
          <Chatbot position="bottom-right" />
        </div>
      </div>
    </Layout>
  );
};

export default SearchResults;
