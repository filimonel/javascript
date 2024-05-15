import './style.css';

// Initiating asynchronous fetch operations for joke and user data
const newJoke = fetchJokeData();
const newUser = fetchUserData();

// Handling multiple asynchronous operations by passing their promises to a function
handleMultiplePromises([newJoke, newUser]);

// Function to handle multiple promises by waiting for all to resolve and then processing their results
function handleMultiplePromises(promises) {
	// Using Promise.all to wait for all provided promises to resolve
	Promise.all(promises).then(function (values) {
		// Outputting the joke from the first resolved promise
		console.log('Chuck Norris Joke: ', values[0].value);
		// Destructuring to extract and output user name from the second resolved promise
		const { name } = values[1].results[0];
		console.log(`User: ${name.title} ${name.first} ${name.last}`);
	});
}

// Asynchronous function to fetch joke data from an API and parse it as JSON
async function fetchJokeData() {
	try {
		// Fetching data and waiting for the promise to resolve to a response
		const resp = await fetch('https://api.chucknorris.io/jokes/random/');
		// Parsing the response body as JSON and returning the parsed data
		const parsedResp = await resp.json();
		return parsedResp;
	} catch (error) {
		// Returning the error if the fetch operation fails
		return error;
	}
}

// Asynchronous function to fetch user data from an API and parse it as JSON
async function fetchUserData() {
	try {
		// Fetching data and waiting for the promise to resolve to a response
		const resp = await fetch('https://randomuser.me/api/');
		// Parsing the response body as JSON and returning the parsed data
		const parsedResp = await resp.json();
		return parsedResp;
	} catch (error) {
		// Returning the error if the fetch operation fails
		return error;
	}
}

// Function to handle a single fetch operation using a custom fetch function
async function fetchData(fetchHandler) {
	try {
		// Executing the fetch function and waiting for the promise to resolve
		const user = await fetchHandler();
		// Outputting the fetched user data
		console.log(user);
	} catch (error) {
		// Outputting the error if the fetch operation fails
		console.log(error);
	}
}
