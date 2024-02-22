let apiKey = "AIzaSyAwin1IUf7024YSQKVwr9AapQKy2s75u04";

function saveApiKey(apiKey) {
    localStorage.setItem("apikey", apiKey);
}

function getApiKey() {
    return localStorage.getItem("apikey");
}

function fetchBooks(query) {
    //const apiKey = getApiKey();
    if (!apiKey) {
        console.error("API key is not set");
        return;
    }

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`)
        .then(response => response.json())
        .then(data => displayResults(data.items))
        .catch(error => console.error('Error:', error));
}

document.addEventListener("DOMContentLoaded", function() {
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener("submit", function(e) {
        e.preventDefault(); 
        const query = document.getElementById('searchInput').value;
        fetchBooks(query);
    });
});

function displayResults(books) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    books.forEach(book => {
        const info = book.volumeInfo;
        const element = document.createElement('div');
        
        const ratingContainer = document.createElement('div');
        ratingContainer.innerHTML = 'Arvostele: ';
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('input');
            star.type = 'radio';
            star.id = `star-${info.title}-${i}`;
            star.name = `rating-${info.title}`;
            star.value = i;
            star.addEventListener('change', () => saveRating(info.title, i));
            ratingContainer.appendChild(star);

            const label = document.createElement('label');
            label.htmlFor = `star-${info.title}-${i}`;
            label.textContent = '★';
            ratingContainer.appendChild(label);
        }

        element.innerHTML = `
            <h2>${info.title}</h2>
            ${info.authors ? `<p>Tekijä(t): ${info.authors.join(", ")}</p>` : "<p>Tekijää ei saatavilla.</p>"}
            ${info.publishedDate ? `<p>Julkaisuvuosi: ${info.publishedDate}</p>` : "<p>Julkaisuvuosi ei saatavilla.</p>"}
            ${info.imageLinks ? `<img src="${info.imageLinks.thumbnail}" alt="${info.title}" style="max-width:100px;"><br>` : ''}
            ${info.description ? `<p>Kuvaus: ${info.description}</p>` : "<p>Kuvausta ei saatavilla.</p>"}
            ${info.categories ? `<p>Kategoriat: ${info.categories.join(", ")}</p>` : "<p>Kategorioita ei saatavilla.</p>"}
            ${info.infoLink ? `<a href="${info.infoLink}" style="color: blue" target="_blank">Lue lisää (Google)</a>` : ""}
            `;

        element.appendChild(ratingContainer);
        resultsContainer.appendChild(element);
        element.className = 'book-container';

    });
}