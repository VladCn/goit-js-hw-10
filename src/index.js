import './css/styles.css';
import{fetchCountries} from './fetchCountries.js';
import debounce from 'lodash/debounce';
import Notiflix from 'notiflix';

const inputJS = document.querySelector("#search-box")
const DEBOUNCE_DELAY = 300;

const inputHandler = (event) => {
  const trimSt = event.target.value.trim()
  if(trimSt.length <= 0){
    return
  }
  console.log(trimSt)
  fetchCountries(trimSt)
  .then((countries) => countriesLogic(countries))
  .catch((error) => console.log(error));

}

inputJS.addEventListener("input", debounce(inputHandler, DEBOUNCE_DELAY))

function countriesLogic(countries){
  if(countries.length > 10){
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
  } else if(countries.length <= 10 && countries.length >= 2){
    console.log("<= 10 && countries.length >= 2)")
  } else {
    console.log("=1")
  }
}
