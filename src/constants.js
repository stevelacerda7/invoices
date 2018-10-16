export const SAVE_INVOICE = "SAVE_INVOICE";
export const GET_ALL_INVOICES = "GET_ALL_INVOICES";
export const GET_INVOICE = "GET_INVOICE";
export const DELETE_INVOICE = "DELETE_INVOICE";


export const SAVE_CLIENT = "SAVE_CLIENT";
export const GET_ALL_CLIENTS = "GET_ALL_CLIENTS";
export const GET_CLIENT = "GET_CLIENT";
export const DELETE_CLIENT = "DELETE_CLIENT";


export const SAVE_SETTINGS = "SAVE_SETTINGS";
export const GET_SETTINGS = "GET_SETTINGS";


export const CURRENCIES = [
  { key: 'USD', value: 'United States Dollar' },
  { key: 'SGD', value: 'Singapore Dollar' },
];


export const CLIENT_STATUS = [ 'Active', 'Deleted' ];


export const RANDOM_ID_GENERATOR = () => {
  const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return randLetter + Date.now();
}
