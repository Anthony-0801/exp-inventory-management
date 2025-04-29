interface Inventory {
  //for appliances, beers, addresses and people
  id: number;
  uid: string;

  //for appliances
  brand: string;
  equipment: string;

  //for beers
  name: string;
  style: string;
  hop: string;
  yeast: string;
  malts: string;
  ibu: string;
  alcohol: string;
  blg: string;

  //for addresses
  city: string;
  street_name: string;
  street_address: string;
  secondary_address: string;
  building_number: string;
  mailbox: string;
  community: string;
  zip_code: string;
  zip: string;
  postcode: string;
  time_zone: string;
  street_suffix: string;
  city_suffix: string;
  city_prefix: string;
  state: string;
  state_abbr: string;
  country: string;
  country_code: string;
  latitude: number;
  longitude: number;
  full_address: string;

  //for people
  password: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  avatar: string;
  gender: string;
  phone_number: string;
  social_insurance_number: string;
  date_of_birth: string;
  employment: {
    title: string;
    key_skill: string;
  };
  address: {
    city: string;
    street_name: string;
    street_address: string;
    zip_code: string;
    state: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  credit_card: {
    cc_number: string;
  };
  subscription: {
    plan: string;
    status: string;
    payment_method: string;
    term: string;
  };
}
