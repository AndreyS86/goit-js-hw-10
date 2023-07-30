import axios from "axios";

const API_KEY = "тlive_DFj4gSN6S75s14sRPAM8T9OXF7l8YTyiNSxLqafGruuTWhPOIaRYo9UuF3VL0QAF";
axios.defaults.headers.common["x-api-key"] = API_KEY;


import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");

function showLoader() {
  loader.style.display = "block";
  breedSelect.style.display = "none";
  error.style.display = "none";
  catInfo.style.display = "none";
}

function hideLoader() {
  loader.style.display = "none";
}

function showError() {
  error.style.display = "block";
}

function hideError() {
  error.style.display = "none";
}

function updateCatInfo(catData) {
  catInfo.innerHTML = `
    <img src="${catData.url}" alt="${catData.breeds[0].name}" />
    <h2>${catData.breeds[0].name}</h2>
    <p><strong>Description:</strong> ${catData.breeds[0].description}</p>
    <p><strong>Temperament:</strong> ${catData.breeds[0].temperament}</p>
  `;
  catInfo.style.display = "block";
}

function populateBreedSelect(breeds) {
  breeds.forEach((breed) => {
    const option = document.createElement("option");
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
  breedSelect.style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  showLoader();
  fetchBreeds()
    .then((breeds) => {
      populateBreedSelect(breeds);
      hideLoader();
    })
    .catch((error) => {
      hideLoader();
      showError();
    });

  breedSelect.addEventListener("change", () => {
    const selectedBreedId = breedSelect.value;
    showLoader();
    hideError();
    fetchCatByBreed(selectedBreedId)
      .then((catData) => {
        updateCatInfo(catData);
        hideLoader();
      })
      .catch((error) => {
        hideLoader();
        showError();
      });
  });
});