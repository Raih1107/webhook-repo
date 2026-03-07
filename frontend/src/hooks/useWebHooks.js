import { useQuery } from '@tanstack/react-query';

const fetchWebhooks = async () => {
  // Use .replace to ensure no trailing slash before adding the route
  const rawBaseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
  const baseUrl = rawBaseUrl.endsWith('/') ? rawBaseUrl.slice(0, -1) : rawBaseUrl;
  
  const response = await fetch(`${baseUrl}/webhook/latest`);
  if (!response.ok) throw new Error('Failed to sync with server');
  
  return response.json();
};

export const useWebhooks = () => {
  return useQuery({
    queryKey: ['webhooks'],
    queryFn: fetchWebhooks,
    refetchInterval: 15000, // 15s Polling
  });
};