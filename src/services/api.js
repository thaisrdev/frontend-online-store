export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const url = ` https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getProductById(productId) {
  const url = `https://api.mercadolibre.com/items/${productId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getProductByQuery(query) {
  const assets = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  const response = await assets.json();
  return response;
}

export async function getProductByCategories(category) {
  const assets = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${category}`);
  const response = await assets.json();
  return response;
}
