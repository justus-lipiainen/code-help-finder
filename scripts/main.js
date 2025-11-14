const API_KEY = 'AIzaSyCUeTqSkHcoJTvBpTfvmtzn5UJ7pq_cbH0';
const CSE_ID = '13cbc1bdf1cb1475a';

setTimeout(() => {
    webSearch()
}, 100);

function displayResults(results) {
    const resultsDiv = $('#results');
    $(resultsDiv).html("");

    if (results.length === 0) {
        $(resultsDiv).html('<p>No results found.</p>');
        return;
    }

    results.forEach(item => {
        const resultDiv = $("<div>");
        $(resultDiv).appendTo(resultsDiv);
        $(resultDiv).attr("class", "result");
        $(resultDiv).html(`
            <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
            <p>${item.snippet}</p>
        `);
        $(resultDiv).appendTo(resultsDiv);
    });
}

async function webSearch() {
    const today = new Date();

    const intlDate = today.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    console.log(intlDate);

    $("title").html("What has trump done on: " + intlDate)
    $("#title").html("What has trump done on: " + intlDate)

    const query = "News about Trump on " + intlDate;

    const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CSE_ID}&q=${encodeURIComponent(query)}&num=9`;

    $("#results").html("Loading...");
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