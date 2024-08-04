import axios from 'axios';
const API_KEY = '13811ab970e042a58341a54c9ce5e6f1'; 
const BASE_URL = 'https://newsapi.org/v2/everything';

export async function fetchNews(query) {
  const url = `${BASE_URL}?q=${query}&apiKey=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.articles.map(article => ({
      title: article.title,
      url: article.url,
      imageUrl: article.urlToImage 
    }));
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function fetchAllData(geoLocation) {
    const baseUrl = 'https://clinicaltables.nlm.nih.gov/api/npi_idv/v3/search';
    const params = new URLSearchParams({
      terms: 'OB-GYN',
      q: `addr_practice.state:WA AND ${geoLocation} AND provider_type:Obstetrics & Gynecology`, 
      df: 'NPI,name.credential,name.full,gender,provider_type,addr_practice.full,addr_practice.phone,licenses',
    });
  
    const url = `${baseUrl}?${params.toString()}`;
    console.log('Request URL:', url);
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Data:', data);
      return data[3]; 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

//get all doctor data
// async function fetchAllData() {
//     const baseUrl = 'https://clinicaltables.nlm.nih.gov/api/npi_idv/v3/search';
//     const params = new URLSearchParams({
//         terms: 'OB-GYN', //OB-GYN, single doctor for testing
//         q: 'addr_practice.state:WA',
//         // maxList: 7,
//         df: 'NPI,name.credential,name.full,gender,provider_type,addr_practice.full,addr_practice.phone,licenses',
//     });

//     const url = `${baseUrl}?${params.toString()}`;
//     console.log('Request URL:', url);

//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();

//         console.log('Total Results:', data[0]);
//         console.log('NPI Codes:', data[1]);
//         console.log('Extra Data:', data[2]);
//         console.log('Display Strings:', data[3]);
//         console.log('Code System:', data[4]);

//         return data;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }

// fetchAllData();

//get single doctor data
export async function fetchDoctorData(doctorName) {
    const baseUrl = 'https://clinicaltables.nlm.nih.gov/api/npi_idv/v3/search';
    const params = new URLSearchParams({
        terms: doctorName,
        q: 'addr_practice.state:WA',
        // maxList: 7,
        df: 'NPI,name.credential,name.full,gender,provider_type,addr_practice.full,addr_practice.phone,licenses',
    });

    const url = `${baseUrl}?${params.toString()}`;
    console.log('Request URL:', url);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        console.log('Total Results:', data[0]);
        console.log('NPI Codes:', data[1]);
        console.log('Extra Data:', data[2]);
        console.log('Display Strings:', data[3]);
        console.log('Code System:', data[4]);

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}



const proxyUrl = 'https://intense-earth-12088-3f9f7d790bb9.herokuapp.com/';
export async function fetchProvidersCoverage(providerIds, insurancePlan) {
    const baseUrl = 'https://marketplace.api.healthcare.gov/api/v1/providers/covered';
    const API_KEY = 'yEO4XBKVQZfWA3JkroVQpYlZxXt0xrkH1';
    const params = new URLSearchParams({
        providers: providerIds.join(','), 
    });

    const url = `${baseUrl}?${params.toString()}`;
    const proxiedUrl = `${proxyUrl}${url}`;
    console.log('Request URL:', proxiedUrl);

    try {
        const response = await fetch(proxiedUrl, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Coverage Data:', data);
        return data;
      } catch (error) {
        console.error('Error fetching coverage data:', error);
      }
   }

export async function fetchInsuranceIssuers(state = 'WA', year = new Date().getFullYear()) {
  const API_KEY = 'EO4XBKVQZfWA3JkroVQpYlZxXt0xrkH1'; 
  const baseUrl = 'https://marketplace.api.healthcare.gov/api/v1/issuers';
  const params = new URLSearchParams({
      state,
      year,
      apikey: API_KEY
  });

  const url = `${baseUrl}?${params.toString()}`;
  const proxiedUrl = `${proxyUrl}${url}`;
  console.log('Request URL:', proxiedUrl);

  try {
      const response = await fetch(proxiedUrl, {
          headers: {
              'Accept': 'application/json',
          }
      });
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data.issuers; 
  } catch (error) {
      console.error('Error fetching insurance issuers:', error);
      return [];
  }
}




//fetchDoctorData('Hisham Tamimi')

// //get insurance plans
// async function searchInsurance(insurancePlan) {
//     const baseUrl = 'https://clinicaltables.nlm.nih.gov/api/npi_idv/v3/search';
//     const params = new URLSearchParams({
//         terms: 'OB-GYN', 
//         q: `insurance:${insurancePlan} addr_practice.state:WA`,
//         df: 'NPI,name.credential,name.full,gender,provider_type,addr_practice.full,addr_practice.phone,licenses',
//     });

//     const url = `${baseUrl}?${params.toString()}`;
//     console.log('Request URL:', url);

//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();

//         console.log('Total Results:', data[0]);
//         console.log('NPI Codes:', data[1]);
//         console.log('Extra Data:', data[2]);
//         console.log('Display Strings:', data[3]);
//         console.log('Code System:', data[4]);

//         return data;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }

// searchInsurance('Insurance A');


// Inside NetworkManager.js

const GOOGLE_API_KEY = 'AIzaSyDsgAevVj4sKYfQNBgOfv64QDA-XXeA4zc';
export async function fetchDoctorReviews(doctorName, location) {
  const baseUrl = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json';
  const params = new URLSearchParams({
    input: `Dr. ${doctorName} ${location}`,
    inputtype: 'textquery',
    fields: 'place_id',
    key: GOOGLE_API_KEY,
  });

  const url = `${baseUrl}?${params.toString()}`;
  const proxiedUrl = `${proxyUrl}${url}`;

  try {
    const response = await axios.get(proxiedUrl);
    console.log('Response from fetchDoctorReviews:', response.data);
    if (response.data.candidates && response.data.candidates.length > 0) {
      const placeId = response.data.candidates[0].place_id;
      return await fetchPlaceDetails(placeId);
    }
    return { reviews: [] }; // Ensure reviews is an array even if no candidates found
  } catch (error) {
    console.error('Error fetching doctor reviews:', error);
    return { reviews: [] }; // Ensure reviews is an array even in case of error
  }
  
}

export async function fetchPlaceDetails(placeId) {
  const baseUrl = 'https://maps.googleapis.com/maps/api/place/details/json';
  const params = new URLSearchParams({
    place_id: placeId,
    fields: 'name,rating,reviews',
    key: GOOGLE_API_KEY,
  });

  const url = `${baseUrl}?${params.toString()}`;
  const proxiedUrl = `${proxyUrl}${url}`;
  
  try {
    console.log('Fetching place details with URL:', proxiedUrl);
    const response = await axios.get(proxiedUrl);
    console.log('Response from fetchPlaceDetails:', response.data);
    return response.data.result;
  } catch (error) {
    console.error('Error fetching place details:', error);
    throw error;
  }
  
}