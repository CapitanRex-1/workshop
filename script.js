const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
function apiSearch(event){
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value,
    server = 'https://api.themoviedb.org/3/search/multi?api_key=0d4d8e60da97dd1418b59575a02c6f6d&language=en-US&query=' + searchText;
    requestApi('GET', server);
}

searchForm.addEventListener('submit', apiSearch);

function requestApi(method, url){
    const request = new XMLHttpRequest();
    request.open(method, url);
    request.send();

    request.addEventListener('readystatechange', function() {
        if (request.readyState !== 4) return;
        if (request.status !== 200){
            console.log('error: ' + request.status);
            return;
        }

        const output = JSON.parse(request.responseText);

        let inner = '';

        output.results.forEach(function(item){
            let nameItem = item.name || item.title;
            let dateRelease = item.release_date || item.first_air_date;
            let poster = item.poster_path;
            let text = item.overview;
            inner += `<div class="col-12 col-md-4 col-x1-3"> <img src="https://image.tmdb.org/t/p/w300${poster}" class="img-fluid"> <h4>${nameItem} <br> Release date: <span class="badge badge-primary">${dateRelease}</span></h4> <br> ${text}</div>`;
        });

        movie.innerHTML = inner;
        console.log(output);
    });
}