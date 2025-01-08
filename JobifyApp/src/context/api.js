import axios from 'axios';
import { axiosClient } from './axios';


export const fetchInterests = async () => {
  try {
    const response = await axiosClient .get('/interests');
    return response.data.data; // Assuming the interest data is in response.data.data
  } catch (error) {
    console.error('Error fetching interest list: ', error);
    throw error; // Propagate the error for the caller to handle
  }
};

export const fetchCountries = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    const sortedCountries = response.data
      .map(({ name, cca2 }) => ({ name: name.common, code: cca2 }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return sortedCountries;
  } catch (err) {
    console.error('API Error: ', err);
    throw err; // Rethrow or handle the error as needed
  }
};


export const fetchCities = async (selectedCountry) => {
  try {
    const response = await axios.get('http://api.geonames.org/searchJSON', {
      params: {
        formatted: 'true',
        lang: 'en',
        username: "daviddracer",  // GeoNames username
        country: selectedCountry, // Use country code (e.g., 'NG')
        maxRows: 1000,
        featureClass: 'P',
        featureCode: 'PPL',
      },
    });

    // Check if we have the 'geonames' property in the response
    if (response.data && response.data.geonames) {
      // Map, sort and store data in one go
      const cityData = response.data.geonames
        .map(city => ({
          name: `${city.name}, ${city.adminName1}`, // City name
          code: city.geonameId, // City unique code
          state: city.adminName1, // State or region
        }))
        .sort((a, b) => a.state.localeCompare(b.state));  // Sort cities by state

      return cityData;
    } else {
      throw new Error('No cities found for the selected country');
    }
  } catch (error) {
    console.error('Error fetching cities: ', error);
    throw error;  // Propagate the error so the caller can handle it
  }
}




