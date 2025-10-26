import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24 * 90, // 90 dias - dados ficam "frescos"
      gcTime: 1000 * 60 * 60 * 24 * 180, // 180 dias no cache (6 meses)
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false, // Não refaz ao montar se tem cache
      retry: 2,
    },
  },
});