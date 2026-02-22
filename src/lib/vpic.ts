/**
 * NHTSA vPIC API Utility
 * Documentation: https://vpic.nhtsa.dot.gov/api/
 */

const BASE_URL = 'https://vpic.nhtsa.dot.gov/api/vehicles';

export async function decodeVin(vin: string) {
    if (!vin || vin.length < 11) return null;
    try {
        const response = await fetch(`${BASE_URL}/DecodeVinValuesExtended/${vin}?format=json`);
        const data = await response.json();
        return data.Results?.[0] || null;
    } catch (error) {
        console.error('Error decoding VIN:', error);
        return null;
    }
}
