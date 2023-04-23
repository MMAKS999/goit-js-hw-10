import './css/styles.css';
// Notiflix
import Notiflix from 'notiflix';
import { debounce } from 'debounce';

const DEBOUNCE_DELAY = 300;
const inputEl = document.getElementById('search-box');
const list = document.querySelector('.country-list');
// Функція генерування запиту за назвою країни
const fetchCountries = name => {
  fetch(
    `https://restcountries.com/v3.1/name/${name}`
    //  `https://restcountries.com/v3.1/name/${name}?fields=capital,population,flag,languages,name.official`
  )
    .then(response => response.json())
    .then(data => {
      console.log(data);
      listCountries(data[0]);
      insertContent(data[0]);
    });
};

// Функція виведення інформаційного повідомлення
const numberCountriesMore = () => {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
};
// Функція генерування розмітки для країн 2-10
const listCountries = countries => {
  console.log(countries.flags.svg);
  console.log(countries.capital);
  console.log(countries.population);
  console.log(countries.languages);
  console.log(countries.name.official);
};

// функція генерування одного елементу списку
const createListItem =
  item => `<li style="display: flex; align-items: center; margin: 5px;">
<img src="${item.flags.svg}" alt="${item.flags.alt}" style="width: 30px; height: 20px; object-fit: cover; margin-right: 10px;">
<span> ${item.name.official} </span>
</li>`;
// Функція розмноження рядка розмітки для всих елементів масиву
const generateContent = array =>
  array.reduce((acc, item) => acc + createListItem(item), '');

// функція генерування розмітки на 1 країну
const ar1 = ['ofjf ', 'lklklk ', 'lklklk '];
const createItem = item =>
  `<img src="${item.flags.svg}" alt="${item.flags.alt}"style="width: 30px; object-fit: cover; margin-right: 10px;">
  <h2> ${item.name.official} </h2>
  <p> <span class="name-country-data">Capital:</span> ${item.capital} </p>
  <p> <span style="font-weight: bold;">Population: </span> ${item.population}</p>
  <p> <span >Languages:</span> ${ar1}</p>`;
// 
// функція додавання розмітки
const insertContent = array => {
  // const result = generateContent(array);
  const result = createItem(array);
  list.insertAdjacentHTML('beforeend', result);
};

// Функція фільтрації веденої назви країни
let name1;
const handleInputChange = event => {
  console.log(inputEl.value);
  name1 = event.target.value.trim();
  if (name1 !== '') {
    fetchCountries(name1);
  } else {
    numberCountriesMore();
  }
};
// функція затримки обробки введеного тексту
const debouncedInputChange = debounce(handleInputChange, 3000);
// відслідковування ведденя назви країни
inputEl.addEventListener('input', debouncedInputChange);

Notiflix.Notify.success('Sol lucet omnibus');

Notiflix.Notify.failure('Qui timide rogat docet negare');

Notiflix.Notify.warning('Memento te hominem esse');

Notiflix.Notify.info('Cogito ergo sum');
