function getFavoritesFromLS() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  }
  
  export { getFavoritesFromLS };
  