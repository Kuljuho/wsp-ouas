let currentPage = 1;
let currentQuery = '';
window.addEventListener('scroll', adjustFooter);
adjustFooter();

function saveApiKey(apiKey) {
    localStorage.setItem('apikey', apiKey);
    return "Success!";
}

function getApiKey() {
    return localStorage.getItem('apikey');
}

function fetchBooks(query, page) {
    const apiKey = getApiKey();

    if (!apiKey) {
        console.error('API key is not set');
        return;
    }

    const maxResults = 10;
    const startIndex = (page - 1) * maxResults;

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=${maxResults}&key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        console.log(data.totalItems);
        displayResults(data.items);
        updateButtons(data.totalItems);
    })
    .catch(error => console.error('Error:', error));
}

const prevPageButton = document.querySelector('#prevPage');
const nextPageButton = document.querySelector('#nextPage');
const searchForm = document.querySelector('#searchForm');

if (prevPageButton && nextPageButton) {
    prevPageButton.style.display = 'none';
    nextPageButton.style.display = 'none';

    prevPageButton.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            fetchBooks(currentQuery, currentPage);
            scrollToResults(); 
        }
    });

    nextPageButton.addEventListener('click', function() {
        currentPage++;
        fetchBooks(currentQuery, currentPage);
        scrollToResults();
    });
}

if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        currentPage = 1;
        currentQuery = document.querySelector('#searchInput').value;
        fetchBooks(currentQuery, currentPage);
    });
}

function updateButtons(totalItems) {
    const maxResults = 10;
    document.querySelector('#prevPage').style.display = currentPage > 1 ? 'block' : 'none';
    let morePagesAvailable = (currentPage * maxResults) < totalItems;
    document.querySelector('#nextPage').style.display = morePagesAvailable ? 'block' : 'none';
}

function scrollToResults() {
    const resultsElement = document.querySelector('#results');

    if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function saveRating(title, rating) {
    const ratings = JSON.parse(localStorage.getItem('bookRatings') || '{}');
    ratings[title] = rating;
    localStorage.setItem('bookRatings', JSON.stringify(ratings));
    console.log(`Rating saved: ${title} - ${rating} stars`);
    displayRatings();
    updateStarsVisual(title, rating);
}

function displayRatings() {
    const ratingsContainer = document.querySelector('#ratingsContainer');

    if (!ratingsContainer) {
        return;
    }

    const ratings = JSON.parse(localStorage.getItem('bookRatings') || '{}');
    ratingsContainer.innerHTML = '';

    Object.keys(ratings).forEach(title => {
        const rating = ratings[title];
        const element = document.createElement('div');
        element.innerHTML = `<p>${title}: ${rating} stars</p>`;
        element.style.marginBottom = '20px';
        ratingsContainer.appendChild(element);
    });
}

function displayResults(books) {
    const resultsContainer = document.querySelector('#results');
    resultsContainer.innerHTML = '';

    books.forEach(book => {
        const info = book.volumeInfo;
        const element = document.createElement('div');
        
        const ratingContainer = document.createElement('div');
        ratingContainer.innerHTML = 'Rate: ';
        for (let i = 1; i <= 5; i++) {
            const ratingBox = document.createElement('div');
            ratingBox.className = 'rating-box';

            const star = document.createElement('input');
            star.type = 'radio';
            star.id = `star-${info.title}-${i}`;
            star.name = `rating-${info.title}`;
            star.value = i;
            star.addEventListener('change', () => saveRating(info.title, i));
            ratingContainer.appendChild(star);

            const label = document.createElement('label');
            label.htmlFor = `star-${info.title}-${i}`;
            label.innerHTML = ''.padStart(i, '★');
            ratingBox.appendChild(label);

            ratingContainer.appendChild(ratingBox);
        }

        element.innerHTML = `
            <h2>${info.title}</h2>
            ${info.authors ? `<p>Tekijä(t): ${info.authors.join(', ')}</p>` : '<p>Tekijää ei saatavilla.</p>'}
            ${info.publishedDate ? `<p>Julkaisuvuosi: ${info.publishedDate}</p>` : '<p>Julkaisuvuosi ei saatavilla.</p>'}
            ${info.imageLinks ? `<img src='${info.imageLinks.thumbnail}' alt='${info.title}' style='max-width:100px;'><br>` : ''}
            ${info.description ? `<p>Kuvaus: ${info.description}</p>` : '<p>Kuvausta ei saatavilla.</p>'}
            ${info.categories ? `<p>Kategoriat: ${info.categories.join(', ')}</p>` : '<p>Kategorioita ei saatavilla.</p>'}
            ${info.infoLink ? `<a href='${info.infoLink}' style='color: blue' target='_blank'>Lue lisää (Google)</a>` : ''}
            `;

        element.appendChild(ratingContainer);
        resultsContainer.appendChild(element);
        element.className = 'book-container';
    });
}

if (document.querySelector('#ratingsContainer')) {
    displayRatings();
}

function adjustFooter() {
    const footer = document.querySelector('footer');
    const startOpacity = 0;
    const fadeDistance = 700;
    let opacity = Math.min(0.3, startOpacity + window.pageYOffset / fadeDistance);
    footer.style.opacity = opacity;
}

function updateStarsVisual(title, rating) {
    for (let i = 1; i <= 5; i++) {
        const starId = `star-${title}-${i}`;
        const label = document.querySelector(`label[for='${starId}']`);
        if (i <= rating) {
            label.style.color = 'gold';
        } else {
            label.style.color = 'gray';
        }
    }
}