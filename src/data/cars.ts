export interface Car {
    id: number;
    img: string;
    type: string;
    make: string;
    title: string;
    price: number;
    miles: number;
    fuel: string;
    trans: string;
    year: number;
    featured?: boolean;
}

export const CARS_DATA: Car[] = [
    { id: 0, img: '1628155930515-8d0ab7a66cd5', type: 'SUV', make: 'BMW', title: '2017 BMW X1 xDrive 20d xline', price: 70064, miles: 85908, fuel: 'Diesel', trans: 'Automatic', year: 2017, featured: true },
    { id: 1, img: '1540209581-2292f763bb53', type: 'Hatchback', make: 'Audi', title: '2018 Audi Q3 Premium', price: 73751, miles: 70872, fuel: 'Petrol', trans: 'Manual', year: 2024, featured: true },
    { id: 2, img: '1617531653332-bd46c24f2068', type: 'SUV', make: 'BMW', title: '2017 BMW X1 xDrive 20d xline', price: 82758, miles: 51897, fuel: 'Petrol', trans: 'Manual', year: 2017 },
    { id: 3, img: '1554744512-d6c5bb5d2b1f', type: 'SUV', make: 'BMW', title: '2018 BMW X1 xDrive 20d xline', price: 74896, miles: 89298, fuel: 'Diesel', trans: 'Manual', year: 2018 },
    { id: 4, img: '1549317661-bd32c8ce0db2', type: 'Sedan', make: 'BMW', title: '2017 BMW X1 xDrive 20d xline', price: 59443, miles: 78262, fuel: 'Petrol', trans: 'Automatic', year: 2024, featured: true },
    { id: 5, img: '1552519507-da3b142c6e3d', type: 'SUV', make: 'BMW', title: '2017 BMW X1 xDrive 20d xline', price: 95854, miles: 64737, fuel: 'Diesel', trans: 'Manual', year: 2017 },
    { id: 6, img: '1560958089-b8a1929cea89', type: 'Sedan', make: 'BMW', title: '2017 BMW X1 xDrive 20d xline', price: 69533, miles: 98830, fuel: 'Diesel', trans: 'Automatic', year: 2019, featured: true },
    { id: 7, img: '1583072236894-3784bd2e3524', type: 'Hatchback', make: 'BMW', title: '2017 BMW X1 xDrive 20d xline', price: 66588, miles: 64733, fuel: 'Petrol', trans: 'Manual', year: 2018 },
    { id: 8, img: '1594042861619-331003fdbbd1', type: 'SUV', make: 'BMW', title: '2017 BMW X1 xDrive 20d xline', price: 67175, miles: 82323, fuel: 'Diesel', trans: 'Automatic', year: 2020 },
    { id: 9, img: '1519641471654-76ce0107ad1b', type: 'Hatchback', make: 'BMW', title: '2021 BMW X1 xDrive 20d xline', price: 70262, miles: 50727, fuel: 'Diesel', trans: 'Automatic', year: 2021 },
    { id: 10, img: '1617788138017-80ad40651399', type: 'SUV', make: 'BMW', title: '2017 BMW X1 xDrive 20d xline', price: 78779, miles: 62112, fuel: 'Diesel', trans: 'Manual', year: 2022 },
    { id: 11, img: '1555353540-64fd1b626496', type: 'SUV', make: 'BMW', title: '2017 BMW X1 xDrive 20d xline', price: 61135, miles: 72387, fuel: 'Diesel', trans: 'Automatic', year: 2019 },
];
