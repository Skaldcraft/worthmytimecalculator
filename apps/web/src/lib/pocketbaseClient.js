import Pocketbase from 'pocketbase';

/**
 * PocketBase Client Configuration
 * Automatically switches between Horizons platform (dev) and your custom production URL.
 */
const PROD_URL = "https://db.worthmytimecalculator.com"; 
const DEV_URL = "/hcgi/platform";

const POCKETBASE_API_URL = import.meta.env.PROD ? PROD_URL : DEV_URL;

const pocketbaseClient = new Pocketbase(POCKETBASE_API_URL);

export default pocketbaseClient;
export { pocketbaseClient };
