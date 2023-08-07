import { CatApiService } from './js/cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import Loader from './js/loader';

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

const catApiServiceInstance = new CatApiService();

const loader = new Loader({
  hidden: true,
});


catApiServiceInstance
  .fetchBreeds()
  .then(({ data }) => {
    createOptionMarkup(data);
    new SlimSelect({
      select: refs.select,
    });
  })
  .catch(data => {
    loader.showErrorLoader();
    Notiflix.Notify.failure(data.message);
  });

function createOptionMarkup(data) {
  const optionsMarkup = data
    .map(({ id, name }) => `<option value=${id}>${name}</option>`)
    .join('');

  return refs.select.insertAdjacentHTML('afterbegin', optionsMarkup);
}

refs.select.addEventListener('change', handleCatByBreed);


function handleCatByBreed(event) {
  const selectedBreed = event.target.value;
  refs.catInfo.innerHTML = ' ';
  loader.show();

  catApiServiceInstance
    .fetchCatByBreed(selectedBreed)
    .then(({ data }) => {
      loader.hide();
      const { breeds, url } = data[0];
      const { name, description, temperament } = breeds[0];

      refs.catInfo.innerHTML = createCatCardMarkup(
        url,
        name,
        description,
        temperament
      );
    })
    .catch(data => {
      loader.showErrorLoader();
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}


function createCatCardMarkup(url, name, description, temperament) {
  return `
    <img class="cat-image" src=${url} alt="${name}"/>
    <h2 class="cat-name">${name}</h2>
    <p class="cat-description"><span class="cat-span">Description: </span>${description}</p>
    <p class="cat-temperament"><span class="cat-span">Temperament: </span> ${temperament}</p>`;
}
