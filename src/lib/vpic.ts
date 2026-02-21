/**
 * NHTSA vPIC API Utility
 * Documentation: https://vpic.nhtsa.dot.gov/api/
 */

const BASE_URL = 'https://vpic.nhtsa.dot.gov/api/vehicles';

export async function getAllMakes() {
    try {
        const response = await fetch(`${BASE_URL}/GetAllMakes?format=json`);
        const data = await response.json();
        return data.Results || [];
    } catch (error) {
        console.error('Error fetching makes:', error);
        return [];
    }
}

export async function getModelsForMake(make: string) {
    if (!make) return [];
    try {
        const response = await fetch(`${BASE_URL}/GetModelsForMake/${make}?format=json`);
        const data = await response.json();
        return data.Results || [];
    } catch (error) {
        console.error('Error fetching models:', error);
        return [];
    }
}

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
