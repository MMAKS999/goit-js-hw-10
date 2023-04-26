import './css/styles.css';
// Notiflix
import Notiflix from 'notiflix';
import { debounce } from 'debounce';

const DEBOUNCE_DELAY = 300;
const inputEl = document.getElementById('search-box');
const list = document.querySelector('.country-list');
const listInfo = document.querySelector('.country-info');
// Додавання стилів
const styles = document.createElement('style');
const styleText = `  
  .country-list-element{
      font-size: 26px;
      font-weight: bold;
  }
   .country-list-element-img{
      width: 30px;
   }
  
.name-country-data{
  font-weight: bold;
}`;
styles.textContent = styleText;
document.head.appendChild(styles);

// Функція генерування запиту за назвою країни
import { fetchCountries } from './fetchCountries';
// const fetchCountries = name => {
//   fetch(
//     `https://restcountries.com/v3.1/name/${name}`
//     //  `https://restcountries.com/v3.1/name/${name}?fields=capital,population,flag,languages,name.official`
//   )
//     .then(response => {
//       if (!response.ok) {
//        throw new Error(response.status);
//       } 
//       return response.json();
//     })
//     .then(data => {
//       selectionCountryFunction(data);
//     })
//     .catch((error) => {
//       CountriesNot();
//     });
// };

// Функція виведення інформаційного повідомлення
const numberCountriesMore = () => {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
};
// const CountriesNot = () => {
//   Notiflix.Notify.failure('Oops, there is no country with that name');
// };

// функція генерування одного елементу списку країн
const createListItem =
  item => `<li style="display: flex; align-items: center; margin: 5px;">
<img src="${item.flags.svg}" alt="${
    item.flags.alt
  }" style="width: 30px; object-fit: cover; margin-right: 10px;">
<span id="list-li"> ${item.name.official ?? ''} </span>
</li>`;
// Функція розмноження рядка розмітки для всих елементів масиву країн
const generateContent = array =>
  array.reduce((acc, item) => acc + createListItem(item), '');

// функція генерування розмітки на 1 країну

// функція створення масиву мов з обєкта використані тернарні оператори перевірки наявності значення ?? 
const createItem = item => {
  const arrayLang = Object.values(item.languages);
  return arrayLang.map(word => ' ' + word);
};
const createItemHTML = itemOb => {
  const item = itemOb[0];
  const arrayLangSpaces = createItem(item);
  return `
  <p> <span class="name-country-data">Capital:</span> ${item.capital ?? ""} </p>
  <p> <span style="font-weight: bold;">Population: </span> ${item.population ?? ""}</p>
  <p> <span style="font-weight: bold;">Languages:</span> ${arrayLangSpaces ?? ""}</p>`;
};
//
// функція додавання розмітки до списку країн
const insertContent = array => {
  // const result = generateContent(array);
  const result = createItemHTML(array);
  listInfo.innerHTML = '';
  listInfo.insertAdjacentHTML('beforeend', result);
};
// функція додавання розмітки інформації про країну
const insertContent1 = array => {
  const result = generateContent(array);
  clearList();
  list.insertAdjacentHTML('beforeend', result);
};

// Функція фільтрації веденої назви країни
let name1;
const handleInputChange = event => {
  console.log(inputEl.value);
  name1 = event.target.value.trim();
  if (name1 !== '') {
    fetchCountries(name1, selectionCountryFunction,clearList);
  } else {
    numberCountriesMore();
    clearList();
  }
};
// Функція очищення вмісту елементів
const clearList = () => {
  list.innerHTML = '';
  listInfo.innerHTML = '';
};

//  Функція перевірки кількості країн за запитом
const selectionCountryFunction = array => {
  if (array.length > 10) {
    numberCountriesMore();
    clearList();
  } else if (array.length <= 10) {
    insertContent1(array);
    if (array.length === 1) {
      insertContent(array);
      const listLi = document.getElementById('list-li');
      listLi.classList.add('country-list-element');
    }
  }
  // Якщо не використовувати відловлювання 404 можна просто орієнтуватись на наявність даних
    // else {
  //   CountriesNot();
  //   clearList();
  // }
};
// функція затримки обробки введеного тексту
const debouncedInputChange = debounce(handleInputChange, 300);
// відслідковування ведденя назви країни
inputEl.addEventListener('input', debouncedInputChange);

// дописати класи на зміну розміру елементів при виборі 1єї країни, винести функцію в окремий док відповідності до тз
