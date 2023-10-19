const genre = new URLSearchParams(window.location.search).get('genre');
const query = new URLSearchParams(window.location.search).get('query');
const year = new URLSearchParams(window.location.search).get('year');

const grid = document.getElementById('movies')
const buttonOrder = document.getElementById('orderList')
const url = `https://api.themoviedb.org/3/discover/movie?api_key=bf42acf712bba686cfff9820897f4edb&language=es-US&with_genres=${genre || ''}`
let urlSearch = `https://api.themoviedb.org/3/search/movie?api_key=bf42acf712bba686cfff9820897f4edb&language=es-US&query=${query || ''}`
if (query) urlSearch += `&query=${query}`
if (year) urlSearch += `&year=${year}`

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

fetch(query ? urlSearch : url)
    .then((res) => res.json())
    .then((data) => {
        let movies = data.results
        if (movies.length) {
            let allMovies = {
                id: '',
                title: 'Ver todas las peliculas',
                poster_path: 1
            }
            let moviesToShow = genre ? [...movies, allMovies] : movies
            return moviesToShow.filter(mov => mov.poster_path).map((movie) => {
                let a = createNode('a');
                let img = createNode('img');
                if (typeof movie.poster_path === 'string') img.src = `http://image.tmdb.org/t/p/w300/${movie.poster_path}`
                if (movie.backdrop_path) a.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(http://image.tmdb.org/t/p/w1280/${movie.backdrop_path})`
                a.style.backgroundRepeat = 'no-repeat'
                a.style.backgroundSize = 'cover'
                a.style.height = '541px'
                a.className = 'text-decoration-none text-dark w-100 bg-white py-1 br-1 border-dark-2 d-flex flex-column justify-content-center align-items-center'
                a.href = movie.id ? `movie.html?movie_id=${movie.id}` : 'movies.html'
                a.alt = `${movie.title}`
                a.title = `${movie.title}`
                if (movie.poster_path) append(a, img)
                if (!movie.id) {
                    let h2 = createNode('h2')
                    h2.innerHTML = 'Ver todo'
                    append(a, h2)
                }
                append(grid, a)
            })
        } else {
            let h2 = createNode('h2')
            let a = createNode('a')
            a.href = `movies.html`
            a.className = 'text-white'
            a.innerHTML = 'Ver el catalogo completo'
            h2.style.width = '400px'
            h2.className = 'w-100 text-white d-flex flex-column'
            h2.innerHTML = 'No hay peliculas con esa categoria'
            append(h2, a)
            return append(grid, h2)
        }
    })
    .catch((error) => {
        console.error(error)
    })

function search() {
    let new_href = `movies.html`
    let search_movie = document.getElementById('searchMovie').value
    let searchMovieByYear = document.getElementById('searchMovieByYear').value
    if (search_movie) new_href += `?query=${search_movie}`
    if (searchMovieByYear) new_href += `${search_movie ? '&' : '?'}year=${searchMovieByYear}`
    if (new_href) location.href = new_href
}