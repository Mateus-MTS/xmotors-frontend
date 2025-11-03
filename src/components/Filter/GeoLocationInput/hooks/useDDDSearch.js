import { useQuery } from '@tanstack/react-query';
import { fetchCitiesByDDD } from '../../../../services/locationService';

export const useDDDSearch = (ddd) => {
  return useQuery({
    queryKey: ['ddd', ddd],
    queryFn: () => fetchCitiesByDDD(ddd),
    enabled: !!ddd && /^\d{2}$/.test(ddd),
    
    // DDDs mudam MUITO raramente - cache agressivo
    staleTime: 1000 * 60 * 60 * 24 * 180, // 180 dias (6 meses)
    gcTime: 1000 * 60 * 60 * 24 * 365, // 1 ano no cache
    
    // Nunca refaz automaticamente
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    
    retry: 2,
  });
};