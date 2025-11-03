import { useQuery } from '@tanstack/react-query';
import { fetchBrazilianCities } from '../../../../services/locationService';

export const useBrazilianCities = () => {
  return useQuery({
    queryKey: ['brazilian-cities'],
    queryFn: fetchBrazilianCities,
    
    // Configuração ultra conservadora
    staleTime: 1000 * 60 * 60 * 24 * 90, // 90 dias (3 meses)
    gcTime: 1000 * 60 * 60 * 24 * 180, // 180 dias (6 meses) no cache
    
    // Nunca refaz automaticamente
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};