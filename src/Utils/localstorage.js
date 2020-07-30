export const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLocalStorage = (key) => {
  const storedItem = localStorage.getItem(key);
  return JSON.parse(storedItem);
};
