// Get the form, input, current image container, and search history elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const currentImageContainer = document.getElementById('current-image-container');
const searchHistoryList = document.querySelector('#search-history ul');

// Event listener for the form submission
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedDate = searchInput.value;
    getImageOfTheDay(selectedDate);
});

// Function to fetch and display the image of the day for the current date
function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split("T")[0];
    getImageOfTheDay(currentDate);
}

// Function to fetch and display the image of the day for a specific date
function getImageOfTheDay(date) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your NASA API key
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

    // Fetch the data from the NASA API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Display the image of the day in the current image container
            currentImageContainer.innerHTML = `
                <h2>${data.title}</h2>
                <img src="${data.url}" alt="${data.title}">
                <p>${data.explanation}</p>
            `;

            // Save the date to local storage
            saveSearch(date);

            // Add the date to the search history list
            addSearchToHistory(date);
        })
        .catch(error => {
            console.log('Error:', error);
            // Display an error message in the current image container
            currentImageContainer.innerHTML = '<p>Error occurred while fetching the image. Please try again later.</p>';
        });
}

// Function to save the selected date to local storage
function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.push(date);
    localStorage.setItem('searches', JSON.stringify(searches));
}

// Function to add the search date to the search history list
function addSearchToHistory(date) {
    const searchItem = document.createElement('li');
    searchItem.textContent = date;

    // Add a click event listener to the search item
    searchItem.addEventListener('click', () => {
        getImageOfTheDay(date);
    });

    // Add the search item to the search history list
    searchHistoryList.appendChild(searchItem);
}

// Run the getCurrentImageOfTheDay function when the page loads
getCurrentImageOfTheDay();
