import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@/assets/search.svg';
import { useForm } from 'react-hook-form';

type FormValues = {
  query: string;
};

export function SearchInput() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();

  const onSubmit = (data: FormValues) => {
    const { query } = data;
    navigate(`/search/${query}`);
  };
  return (
    <div className="flex w-full items-center space-x-2 mt-10">
      <form onSubmit={handleSubmit(onSubmit)} className="relative flex w-full mx-4">
        <Input
          type="search"
          placeholder="Search directly"
          {...register('query', { required: 'Search query is required' })}
          className="pr-12 text-left placeholder:text-center rounded-2xl py-6"
        />
        <Button
          type="submit"
          className="bg-customMint w-[40px] h-[40px] rounded-full absolute inset-y-1 right-0 flex items-center justify-center mr-2"
        >
          <img src={SearchIcon} alt="search" className="max-w-5" />
        </Button>
        {errors.query && (
          <p className="text-red-500 text-sm absolute left-0 bottom-[-20px]">
            {errors.query.message}
          </p>
        )}
      </form>
    </div>
  );
}
