const prefix = "storedProducts";

function getStorage() {
  return JSON.parse(localStorage.getItem(prefix) || "[]");
}

function setStorage(data) {
  localStorage.setItem(prefix, JSON.stringify(data));
}

export function addProductToCart(key) {
  const data = getStorage();
  if (!data.find(o => o.id === key)) data.push({ id: key, count: 1 });
  setStorage(data);
}

export function deleteProductFromCart(key) {
  const data = getStorage();
  setStorage(data.filter(item => item.id !== key));
}

export function updateProductCountInCart(key, count) {
  const data = getStorage();
  const index = data.findIndex(obj => obj.id === key);
  data[index].count = count;
  setStorage(data);
}

export function getProductCountInCart(key) {
  const data = getStorage();
  const index = data.findIndex(obj => obj.id === key);
  if (index === -1) return 0;
  return data[index].count;
}

export function getAllProductIdsInCart() {
  const data = getStorage();
  const exportData = [];
  for (let item of data) {
    exportData.push(item.id);
  }
  return exportData;
}

export function getCountProductsInCart() {
  const data = getStorage();
  return data.length;
}
