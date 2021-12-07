import './css/styles.css';
import{fetchCountries} from './fetchCountries.js';
import debounce from 'lodash/debounce';
import Notiflix from 'notiflix';


const inputJS = document.querySelector("#search-box")
const countryList= document.querySelector(".country-list")
const DEBOUNCE_DELAY = 300;

const inputHandler = (event) => {
  const trimSt = event.target.value.trim()
  if(!trimSt.length){
    return
  }
  countryList.innerHTML = "";
  fetchCountries(trimSt)
  .then((countries) => countriesLogic(countries))
  .catch((error) => console.log(error));

}

inputJS.addEventListener("input", debounce(inputHandler, DEBOUNCE_DELAY))

function countriesLogic(countries){
  if(!countries){
    return
  }


  if(countries.length > 10){
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")

  } else if(countries.length <= 10 && countries.length >= 2){

    console.log("<= 10 && countries.length >= 2)")
    const markup = countries
      .map(item => `<li class="list-item new"><img class="list-item__img" src=${item.flags.png} alt=${item.name.common}/><span>${item.name.official}</span></li>`)
      .join("");

    countryList.insertAdjacentHTML("beforeend", markup);

  } else {
    const langsSingle = countries[0].languages
    const langsArray = Object.values(langsSingle).join(", ")
    console.log("=1")
    const markupSingle = countries
      .map(item => `<li class="list-item new"><img class="list-item__img" src=${item.flags.png} alt=${item.name.common}/><span class='nameOff'>${item.name.official}</span></li>
                  <li class="list-item new"><span class='list-item__span'>Capital:</span>${item.capital}</li>
                  <li class="list-item new"><span class='list-item__span'>Population:</span>${item.population}</li>
                  <li class="list-item new"><span class='list-item__span'>Languages:</span>${langsArray}</li>`)
      .join("");
    countryList.insertAdjacentHTML("beforeend", markupSingle);
  }

}



