import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

// Функція для показу/приховування елементів на сторінці
function toggleElements(isLoading) {
  breedSelect.style.display = isLoading ? 'none' : 'block';
  loader.style.display = isLoading ? 'block' : 'none';
  error.style.display = 'none';
  catInfo.style.display = 'none';
}
// console.log(toggleElements(isLoading));

// Завантаження списку порід котів при завантаженні сторінки
document.addEventListener('DOMContentLoaded', async () => {
  toggleElements(true);
  try {
    const breeds = await fetchBreeds();
    breedSelect.innerHTML = breeds.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join('');
    toggleElements(false);
  } catch (error) {
    console.error('Error fetching cat breeds:', error);
    toggleElements(false);
    Notiflix.Notify.failure('❌ Error fetching cat breeds');
  }
});

// Запит за інформацією про кота при виборі породи у селекті
breedSelect.addEventListener('change', async () => {
  toggleElements(true);
  const breedId = breedSelect.value;
  try {
    const catData = await fetchCatByBreed(breedId);
    const { name, description, temperament } = catData.breeds[0];
    const imageSrc = catData.url;

    catInfo.innerHTML = `
      <h2>${name}</h2>
      <p><strong>Description:</strong> ${description}</p>
      <p><strong>Temperament:</strong> ${temperament}</p>
      <img src="${imageSrc}" alt="${name}" />
    `;

    catInfo.style.display = 'block';
    toggleElements(false);
  } catch (error) {
    console.error('Error fetching cat info:', error);
    toggleElements(false);
    Notiflix.Notify.failure('❌ Error fetching cat info');
  }
});
