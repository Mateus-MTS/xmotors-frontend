import { CACHE_KEY, EXPIRY_KEY, TTL } from './constants';

export const getCachedData = () => {
  const now = Date.now();
  const stored = localStorage.getItem(CACHE_KEY);
  const expiry = localStorage.getItem(EXPIRY_KEY);

  if (stored && expiry && now < +expiry) {
    return JSON.parse(stored);
  }
  return null;
};

export const saveToCache = (data) => {
  const now = Date.now();
  localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  localStorage.setItem(EXPIRY_KEY, String(now + TTL));
};