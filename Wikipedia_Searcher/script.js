document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.search-box');
    const input = form.querySelector('input[type="search"]');
    const resultsContainer = document.querySelector('.results');
    const resultsCounter = document.querySelector('header p');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const searchTerm = input.value;
        if (searchTerm) {
            searchWikipedia(searchTerm);
        }
    });

    function searchWikipedia(searchTerm) {
        const url = `https://zh.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=500&srsearch=${encodeURIComponent(searchTerm)}`;

        fetch(url).then(response => response.json()).then(data => {
            displayResults(data.query.search);
        }).catch(error => alert('出現錯誤，若無法解決請回報給開發者 : ' + error));
    }

    function displayResults(results) {
        resultsContainer.innerHTML = '';
        resultsCounter.textContent = `已找到 ${results.length} 筆結果`;
        results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.className = 'result';
            resultElement.innerHTML = `

            <h3>${result.title}</h3>
            <p>${result.snippet}</p>
            <a href="https://zh.wikipedia.org/?curid=${result.pageid}" target="_blank">查看更多</a>
            `;
            resultsContainer.appendChild(resultElement);
        });
    }
});