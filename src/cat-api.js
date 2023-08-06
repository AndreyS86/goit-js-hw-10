import axios from "axios";

// Встановлюємо заголовок з ключем доступу для всіх HTTP-запитів
axios.defaults.headers.common["x-api-key"] = "live_DFj4gSN6S75s14sRPAM8T9OXF7l8YTyiNSxLqafGruuTWhPOIaRYo9UuF3VL0QAF";


// Функція для здійснення HTTP-запиту за списком порід котів
export async function fetchBreeds() {
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/breeds");
    return response.data;
  } catch (error) {
    console.error("Error fetching cat breeds:", error);
    throw error;
  }
}
console.log(fetchBreeds());

// Функція для здійснення HTTP-запиту за інформацією про кота по ідентифікатору породи
export async function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  try {
    const response = await axios.get(url);
    return response.data[0];
  } catch (error) {
    console.error("Error fetching cat info:", error);
    throw error;
  }
}