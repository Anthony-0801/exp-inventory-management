export const RANDOM_DATA_CONFIG = {
  BASE_URL: "https://random-data-api.com/api/v2/",
};

// Function to fetch all categories with caching and filtering
const cache = new Map<string, any[]>(); // Cache for storing fetched data

export const fetchAllCategories = async (query: string): Promise<any[]> => {
  const endpoints = [
    { key: "users", url: `${RANDOM_DATA_CONFIG.BASE_URL}users?size=${recordsPerPage}` },
    { key: "appliances", url: `${RANDOM_DATA_CONFIG.BASE_URL}appliances?size=${recordsPerPage}` },
    { key: "beers", url: `${RANDOM_DATA_CONFIG.BASE_URL}beers?size=${recordsPerPage}` },
    { key: "addresses", url: `${RANDOM_DATA_CONFIG.BASE_URL}addresses?size=${recordsPerPage}` },
  ];

  try {
    const fetchPromises = endpoints.map(async ({ key, url }) => {
      // Check if data is cached
      if (cache.has(key)) {
        console.log(`Cache hit for ${key}`);
        return cache.get(key);
      }

      // Fetch data from the API
      console.log(`Fetching data for ${key}`);
      const response = await fetch(url, { method: "GET" });

      if (!response.ok) {
        console.warn(`Failed to fetch data from ${url}: ${response.status} ${response.statusText}`);
        return []; // Return empty array for failed requests
      }

      const data = await response.json();
      cache.set(key, data); // Cache the fetched data
      return data;
    });

    // Spread out requests to avoid overwhelming the API
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    for (let i = 0; i < fetchPromises.length; i++) {
      if (i > 0) await delay(200); // Add a 200ms delay between requests
    }

    const jsonData = await Promise.all(fetchPromises);

    // Flatten the data from all endpoints
    const allData = jsonData.flat();

    // Filter the data based on the query
    const lowerCaseQuery = query.toLowerCase();
    const filteredData = allData.filter((item: any) => {
      return (
        item.first_name?.toLowerCase().includes(lowerCaseQuery) || // For users
        item.last_name?.toLowerCase().includes(lowerCaseQuery) ||
        item.email?.toLowerCase().includes(lowerCaseQuery) ||
        item.equipment?.toLowerCase().includes(lowerCaseQuery) || // For appliances
        item.brand?.toLowerCase().includes(lowerCaseQuery) ||
        item.name?.toLowerCase().includes(lowerCaseQuery) || // For beers
        item.style?.toLowerCase().includes(lowerCaseQuery) ||
        item.street_address?.toLowerCase().includes(lowerCaseQuery) || // For addresses
        item.city?.toLowerCase().includes(lowerCaseQuery) ||
        item.state?.toLowerCase().includes(lowerCaseQuery)
      );
    });

    return filteredData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Function to set the number of records per page
let recordsPerPage = 10; // Default value

export const setRecordsPerPages = (size: number) => {
  recordsPerPage = size;
  if (size <= 1 || null || size > 100) {
    recordsPerPage = 10; // Reset to default if invalid
  }
};

export const fetchCategoryItems = async (category: string): Promise<any[]> => {
  const endpoint = `${RANDOM_DATA_CONFIG.BASE_URL}${category}?size=${recordsPerPage}`;
  const response = await fetch(endpoint, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch items for category: ${category}`);
  }

  const data = await response.json();

  // Add a fixed random price to each item based on the category
  return data.map((item: any) => {
    const min = category === "addresses" ? 100000 : 50; // Minimum price
    const max = category === "addresses" ? 9000000 : 500; // Maximum price
    const randomPrice = (Math.random() * (max - min) + min).toFixed(2);

    return {
      ...item,
      price: randomPrice, // Add a price property
    };
  });
};
