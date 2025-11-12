// Function to perform a search using Google's Custom Search API
async function search() {
    // Get the search query from the input field and trim whitespace
    const query = $('#query').val().trim();
    
    // If no query is entered, show an alert and stop
    if (!query) {
        alert('Please enter a search query.');
        return;
    }

    // Construct the API URL with the query, limiting to 5 results
    const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CSE_ID}&q=${encodeURIComponent(query)}&num=5`;

    // Show "Searching..." message in results area and clear any previous errors
    $('#results').html('Searching...');
    $('#error').html('');

    try {
        // Fetch data from the API using jQuery's getJSON (which handles JSON parsing automatically)
        const data = await $.getJSON(url);
        
        // Display the results (or an empty array if none)
        displayResults(data.items || []);
    } catch (error) {
        // On error, show the error message and clear results
        $('#error').html(`Error: ${error.message}`);
        $('#results').html('');
    }
}

// Function to display the search results in the DOM
function displayResults(results) {
    // Get the results div and clear its content
    const resultsDiv = $('#results');
    resultsDiv.empty();

    // If no results, show a message
    if (results.length === 0) {
        resultsDiv.html('<p>No results found.</p>');
        return;
    }

    // Loop through each result and create a div for it
    results.forEach(item => {
        // Create a new div with class 'result' and populate it with title and snippet
        const resultDiv = $('<div>').addClass('result').html(`
            <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
            <p>${item.snippet}</p>
        `);
        
        // Append the result div to the results container
        resultsDiv.append(resultDiv);
    });
}
