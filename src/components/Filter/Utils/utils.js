export const normalize = (str) => 
  str?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") || '';

export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};