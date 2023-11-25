export const getCountries = () => {
  // return fetch("http://localhost:3000/api/countries");
  return fetch(`${import.meta.env.VITE_REGISTRATION_SERVICES}/countries`);
};
