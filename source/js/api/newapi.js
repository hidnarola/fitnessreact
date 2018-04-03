// Simple API wrapper

const API_URL = 'https://swapi.co/api';

// Custom API error to throw
function ApiError(message, data, status) {
    let response = null;
    let isObject = false;

    // We are trying to parse response
    try {
        response = JSON.parse(data);
        isObject = true;
    } catch (e) {
        response = data;
    }

    return {
        response,
        message,
        status,
        toString: () => {
            return `${this.message}\nResponse:\n${isObject ? JSON.stringify(this.response, null, 2) : this.response}`;
        },
    };
}

// API wrapper function
const fetchResource = (path, userOptions = {}, apiURL = 'https://swapi.co/api') => {
    // Define default options
    const defaultOptions = {};

    // Define default headers
    const defaultHeaders = {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    };

    const options = {
        // Merge options        
        ...defaultOptions,
        ...userOptions,
        // Merge headers
        headers: {
            ...defaultHeaders,
            ...userOptions.headers,
        }
    };

    // Build Url
    const url = `${apiURL}/${path}`;

    // Detect is we are uploading a file
    const isFile = typeof window !== 'undefined' && options.body instanceof File;

    // Stringify JSON data
    // If body is not a file
    if (options.body && typeof options.body === 'object' && !isFile) {
        options.body = JSON.stringify(options.body);
    }

    // Variable which will be used for storing response
    let response = null;

    return fetch(url, options)
        .then(responseObject => {
            // Saving response for later use in lower scopes
            response = responseObject;

            // HTTP unauthorized
            if (response.status === 401) {
                // Handle unauthorized requests
                // Maybe redirect to login page?
            }

            // Check for error HTTP error codes
            if (response.status < 200 || response.status >= 300) {
                // Get response as text
                return response.text();
            }

            // Get response as json
            return response.json();
        })
        // "parsedResponse" will be either text or javascript object depending if
        // "response.text()" or "response.json()" got called in the upper scope
        .then(parsedResponse => {
            // Check for HTTP error codes
            if (response.status < 200 || response.status >= 300) {
                // Throw error
                throw parsedResponse;
            }

            // Request succeeded
            return parsedResponse;
        })
        .catch(error => {
            // Throw custom API error
            // If response exists it means HTTP error occured
            if (response) {
                throw ApiError(`Request failed with status ${response.status}.`, error, response.status);
            } else {
                throw ApiError(error.toString(), null, 'REQUEST_FAILED');
            }
        });
};

const apiUrl = 'http://192.168.1.186:3300';
// const apiUrl = 'http://localhost:3000';

function getPeople() {
    return fetchResource('people/');
}

function getPosts() {
    return fetchResource('posts', {}, 'https://jsonplaceholder.typicode.com');
}

function getAPI() {
    return {
        allWidgets: {
            todayWorkOut: true, nextMeal: true, activity: true, goalProgress: true,
            bodyFat: true, badges: true, weeksCalories: true, activityFeed: true
        },
        todayWorkOut: {
            warmUp: [
                { "name": "Bench Press Up", exercise: "25kg for 6 sets of 6 reps", img: "" },
                { "name": "Bent Over Row", exercise: "10kg for 5 sets of 12 reps", img: "" },
                { "name": "Shoulder Press", exercise: "10kg for 5 sets of 12 reps", img: "" },
            ],
            workOut: [
                { "name": "Bench Press", exercise: "25kg for 6 sets of 6 reps", img: "" },
                { "name": "Bent Over Row", exercise: "10kg for 5 sets of 12 reps", img: "" },
                { "name": "Shoulder Press", exercise: "10kg for 5 sets of 12 reps", img: "" },
            ],
            coolDown: [
                { "name": "Bench Press", exercise: "25kg for 6 sets of 6 reps", img: "" },
                { "name": "Bent Over Row", exercise: "10kg for 5 sets of 12 reps", img: "" },
                { "name": "Shoulder Press", exercise: "10kg for 5 sets of 12 reps", img: "" },
            ]
        },
        nextMeal: {
            mealType: "breakfast",
            mealTitle: "Boiled eggs & avocado on rye toast",
            mealImg: "",
            cals: 400,
            protein: 26,
            fat: 20,
            carbs: 30
        },
        goalProgress: "70",
        bodyFat: {
            xAxis: "",
            yAxis: "weight",
            data: [
                { name: 'Jan', weight: 110 },
                { name: 'Feb', weight: 105 },
                { name: 'Mar', weight: 100 },
                { name: 'Apr', weight: 90 },
                { name: 'May', weight: 95 },
                { name: 'Jun', weight: 89 },
                { name: 'Jul', weight: 85 },
                { name: 'Sep', weight: 70 },
                { name: 'Oct', weight: 79 },
                { name: 'Nov', weight: 75 },
                { name: 'Dec', weight: 80 },
            ]
        },
        badges: {
            data: [
                { "title": "getting heavy", "desc": "Lift a total of 1000Kg overall.", "extra": "500/1000Kg", "status": "Completed", "badge_date": "June 8, 2017" },
                { "title": "getting heavy 2", "desc": "Lift a total of 1000Kg overall.", "extra": "", "status": "Completed", "badge_date": "June 8, 2018" },
                { "title": "getting heavy 3", "desc": "Lift a total of 1000Kg overall.", "extra": "500/1000Kg", "status": "Completed", "badge_date": "June 8, 2019" },
            ]
        },
        weeksCalories: "60978"
    }
    // return fetchResource('', {}, apiUrl + '/new_data');
}

function getNutritutionData() {
    return fetchResource('', {}, apiUrl + '/nutrition_meal');
}

function getExerciseFitnessData() {
    return fetchResource('', {}, apiUrl + '/exercise/fitness');
}

function getExerciseEquipmentsData() {
    return fetchResource('', {}, apiUrl + '/exercise/equipments');
}

function getFriendsData() {
    return fetchResource('', {}, apiUrl + '/friends');
}

function getProfilePhotosData() {
    return fetchResource('', {}, apiUrl + '/profile/photos');
}

export default {
    getPeople,
    getPosts,
    getAPI,
    getNutritutionData,
    getExerciseFitnessData,
    getExerciseEquipmentsData,
    getFriendsData,
    getProfilePhotosData
};
