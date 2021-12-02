import './css/styles.css';
import{fetchCountries} from './fetchCountries.js';
import{countryList} from './countryList.js';
import debounce from 'lodash/debounce';
import Notiflix from 'notiflix';
import { value } from 'lodash/seq';

const inputJS = document.querySelector("#search-box")
const countryListTitle= document.querySelector(".country-list")
const DEBOUNCE_DELAY = 300;

const inputHandler = (event) => {
  const trimSt = event.target.value.trim()
  if(!trimSt.length){
    const countryListItems = document.querySelectorAll(".list-item");

    Array.from(countryListItems).map(item => item.remove())
    return
  }

  fetchCountries(trimSt)
  .then((countries) => countriesLogic(countries))
  .catch((error) => console.log(error));

}

inputJS.addEventListener("input", debounce(inputHandler, DEBOUNCE_DELAY))

function countriesLogic(countries){
  const countryListItems = document.querySelectorAll(".list-item")

  if(countryListItems.length){
    Array.from(countryListItems).map(item => item.remove())
  }

  const markup = countries
    .map(item => `<li class="list-item new"><img class="list-item__img" src=${item.flags.png} alt=${item.name.common}/><span>${item.name.official}</span></li>`)
    .join("");

  if(countries.length > 10){
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")

  } else if(countries.length <= 10 && countries.length >= 2){

    console.log("<= 10 && countries.length >= 2)")

    countryListTitle.insertAdjacentHTML("beforeend", markup);

  } else {
    console.log("=1")

  }

}



