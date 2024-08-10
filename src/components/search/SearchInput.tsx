import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@/assets/search.svg';
import { useForm } from 'react-hook-form';

type FormValues = {
  query: string;
};
type SearchInputProps = {
  mt?: string;
  placeholder?: string;
};

export function SearchInput({ mt = '0px', placeholder = 'Search directly' }: SearchInputProps) {
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
    <div className={`flex bg-customBackground w-full items-center space-x-2 ${mt}`}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex w-full mx-4 bg-customBackground"
      >
        <Input
          type="search"
          placeholder={placeholder}
          {...register('query', { required: 'Search query is required' })}
          className="pr-12 bg-white text-xl text-left font-semibold placeholder:text-center placeholder:text-customYellow rounded-2xl py-6"
        />
        <Button
          type="submit"
          className="bg-customYellow w-[40px] h-[40px] rounded-full absolute inset-y-1 right-0 flex items-center justify-center mr-2"
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
