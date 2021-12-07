import Notiflix from 'notiflix';

export function fetchCountries(name){
  console.log(name)
  return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`).then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json();
    }).catch(() => Notiflix.Notify.failure("Oops, there is no country with that name"))
}
