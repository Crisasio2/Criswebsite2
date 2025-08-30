import Hero from '@/components/Hero';
import SearchForm from '@/components/SearchForm';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import type { SearchFilters } from '@shared/schema';

export default function Home() {
  const searchMutation = useMutation({
    mutationFn: async (filters: SearchFilters) => {
      const response = await apiRequest('POST', '/api/products/search', filters);
      return response.json();
    },
  });

  const handleSearch = (filters: SearchFilters) => {
    searchMutation.mutate(filters);
  };

  return (
    <div>
      <Hero />
      <SearchForm onSearch={handleSearch} />
    </div>
  );
}
