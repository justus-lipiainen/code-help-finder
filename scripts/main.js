const API_KEY = 'AIzaSyCUeTqSkHcoJTvBpTfvmtzn5UJ7pq_cbH0';
const CSE_ID = '356bb56d9aadd499f';

async function search() {
    const query = document.getElementById('query').value.trim();
    if (!query) {
        alert('Please enter a search query.');
        return;
    }

    const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CSE_ID}&q=${encodeURIComponent(query)}&num=5`;  // Limit to 5 results

    document.getElementById('results').innerHTML = 'Searching...';
    document.getElementById('error').innerHTML = '';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        displayResults(data.items || []);
    } catch (error) {
        document.getElementById('error').innerHTML = `Error: ${error.message}`;
        document.getElementById('results').innerHTML = '';
    }
}

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (results.length === 0) {
        resultsDiv.innerHTML = '<p>No results found.</p>';
        return;
    }

    results.forEach(item => {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'result';
        resultDiv.innerHTML = `
            <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
            <p>${item.snippet}</p>
        `;
        resultsDiv.appendChild(resultDiv);
    });
}

async function webSearch() {
    const query = $("#searchBar").val().trim();
    if (!query) {
        $("#error").html("No query writen")
        return;
    }

    const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CSE_ID}&q=${encodeURIComponent(query)}&num=5`;
    
    $("#results").html("Searching...");
    $("#error").html("");

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        displayResults(data.items || []);
    } catch (error) {
        $("#error").html(`Error: ${error.message}`);
        $("#results").html("");
    }
};