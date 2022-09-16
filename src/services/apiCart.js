const FAVORITE_KEY = 'shoppingCart';

if (!JSON.parse(localStorage.getItem(FAVORITE_KEY))) {
  localStorage.setItem(FAVORITE_KEY, JSON.stringify([]));
}
const readFavorite = () => JSON.parse(localStorage.getItem(FAVORITE_KEY));

const saveItem = (favoriteItem) => localStorage
  .setItem(FAVORITE_KEY, JSON.stringify(favoriteItem));

// --------------------------------------------------------------------
// A função simulateRequest simula uma requisição para uma API externa
// Esse tipo de função que "chama outra função" é chamada de
// "currying function" https://javascript.info/currying-partials
// não se preocupe, estudaremos isso futuramente.
// --------------------------------------------------------------------

const simulateRequest = (response) => (callback) => {
  setTimeout(() => {
    callback(response);
  }, TIMEOUT);
};

export const getFavorite = () => new Promise((resolve) => {
  const favoriteItem = readFavorite();
  simulateRequest(favoriteItem)(resolve);
});

// adiciona
export const addItem = (item) => {
  if (item) {
    const favoriteItem = readFavorite();
    saveItem([...favoriteItem, item]);
  }
};

// remove
export const removeItem = (item) => {
  const favoriteItem = readFavorite();
  saveItem(favoriteItem.filter((s) => s.trackId !== item.trackId));
};
