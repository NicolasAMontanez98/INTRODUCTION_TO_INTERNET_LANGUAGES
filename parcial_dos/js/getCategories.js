const grid = document.getElementById('categories')
const url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=bf42acf712bba686cfff9820897f4edb&language=es-US'

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

fetch(url)
    .then((res) => res.json())
    .then((data) => {
        let categories = data.genres
        return categories.map((genre) => {
            let a = createNode('a');
            let h2 = createNode('h2');
            a.className = 'text-decoration-none text-dark w-100 bg-white py-1 br-1 border-dark-2 d-flex flex-column justify-content-center align-items-center'
            a.href = `movies.html?genre=${genre.id}`
            h2.innerHTML = `${genre.name}`
            append(a, h2)
            append(grid, a)
        })
    })
    .catch((error) => {
        console.error(error)
    })