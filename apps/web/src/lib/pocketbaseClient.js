import Pocketbase from 'pocketbase';

const PROD_URL = "https://db.worthmytimecalculator.com";
const DEV_URL = "http://127.0.0.1:8090";

const POCKETBASE_API_URL = import.meta.env.PROD ? PROD_URL : DEV_URL;

const pocketbaseClient = new Pocketbase(POCKETBASE_API_URL);

export default pocketbaseClient;
export { pocketbaseClient };
