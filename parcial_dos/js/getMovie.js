const movie_id = new URLSearchParams(window.location.search).get('movie_id');
const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=bf42acf712bba686cfff9820897f4edb&language=es-US`
const urlCredits = `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=bf42acf712bba686cfff9820897f4edb&language=es-US`
const urlSimilar = `https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=bf42acf712bba686cfff9820897f4edb&language=es-US`
const urlReviews = `https://api.themoviedb.org/3/movie/${movie_id}/reviews?api_key=bf42acf712bba686cfff9820897f4edb`

let body = document.getElementById('body-movie')
let poster = document.getElementById('movie-poster')
let title = document.getElementById('movie-title')
let genres = document.getElementById('genres')
let overview = document.getElementById('movie-overview')
let release_date = document.getElementById('release_date')
let duration = document.getElementById('duration')
let budget = document.getElementById('budget')
let vote_average = document.getElementById('vote_average')
let reviews = document.getElementById('reviews')
let cast = document.getElementById('cast')
let recomendations = document.getElementById('recomendations')
let prev_review = document.getElementById('prev_review')
let next_review = document.getElementById('next_review')
let see_all_cast = document.getElementById('see_all_cast')
let comments_box = document.getElementById('comments_box')

let comments = []
let show_all_cast = false
let show_all_recomendations = false
let current_review = 0
let reviewItemsFetch = []
let castItemsFetch = []
let recomendationsItemsFetch = []

prev_review.addEventListener('click', (e) => {
    if (current_review > 0) {
        current_review -= 1
        reviews.innerHTML = ''
        getReviews(current_review)
    }
})
next_review.addEventListener('click', (e) => {
    if (current_review < reviewItemsFetch.length - 1) {
        current_review += 1
        reviews.innerHTML = ''
        getReviews(current_review)
    }
})
see_all_cast.addEventListener('click', (e) => {
    show_all_cast = e.target.checked
    cast.innerHTML = ''
    getCredits()
})
see_all_recomendations.addEventListener('click', (e) => {
    show_all_recomendations = e.target.checked
    recomendations.innerHTML = ''
    getRecomendations()
})

getReviews()
getCredits()
getRecomendations()
getComments()


function createNode(element) {
    return document.createElement(element);
}
function append(parent, el) {
    return parent.appendChild(el);
}
function formatMoney(money) {
    return money.toLocaleString("en", {
        style: "currency",
        currency: "USD"
    })
}

fetch(url)
    .then((res) => res.json())
    .then((data) => {
        let movie = data
        poster.src = `http://image.tmdb.org/t/p/w300/${movie.poster_path}`
        title.innerHTML = movie.title
        overview.innerHTML = movie.overview
        data.genres.map((genre) => {
            let li = createNode('li')
            let a = createNode('a')
            li.className = 'bg-warning px-xs py-xs br-xs'
            a.className = 'fw-bold text-decoration-none text-dark text-size-sm'
            a.href = `movies.html?genre=${genre.id}`
            a.innerHTML = genre.name
            append(li, a)
            append(genres, li)
        })
        release_date.innerHTML = movie.release_date
        duration.innerHTML = `${movie.runtime} min`
        budget.innerHTML = formatMoney(movie.budget)
        vote_average.innerHTML = movie.vote_average.toFixed(1)
    })
    .catch((error) => {
        console.error(error)
    })

function getCredits() {
    if (castItemsFetch?.length) {
        let cast_items = show_all_cast ? castItemsFetch : castItemsFetch.slice(0, 5)
        cast_items.map((member) => {
            let div = createNode('div');
            let img = createNode('img');
            let h3 = createNode('h3');
            h3.innerHTML = member.name
            h3.className = 'm-0 text-center'
            if (member.profile_path) img.src = `http://image.tmdb.org/t/p/w300/${member.profile_path}`
            img.className = 'w-80'
            div.style.backgroundRepeat = 'no-repeat'
            div.style.backgroundSize = 'cover'
            div.style.width = '100%'
            div.className = 'text-decoration-none text-dark w-100 bg-white py-1 br-1 border-dark-2 all-center flex-column'
            div.alt = `${member.name}`
            div.title = `${member.name}`
            append(div, h3)
            append(div, img)
            append(cast, div)
        })
    } else {
        fetch(urlCredits)
            .then((res) => res.json())
            .then((data) => {
                let cast_items = show_all_cast ? data.cast : data.cast.slice(0, 5)
                cast_items.map((member) => {
                    let div = createNode('div');
                    let img = createNode('img');
                    let h3 = createNode('h3');
                    h3.innerHTML = member.name
                    h3.className = 'm-0 text-center cursor-default'
                    if (member.profile_path) img.src = `http://image.tmdb.org/t/p/w300/${member.profile_path}`
                    img.className = 'w-80'
                    div.style.backgroundRepeat = 'no-repeat'
                    div.style.backgroundSize = 'cover'
                    div.style.width = '100%'
                    div.className = 'text-decoration-none text-dark w-100 bg-white py-1 br-1 border-dark-2 all-center flex-column'
                    div.alt = `${member.name}`
                    div.title = `${member.name}`
                    append(div, h3)
                    append(div, img)
                    append(cast, div)
                })
                castItemsFetch = data.cast
            })
            .catch((error) => {
                console.error(error)
            })
    }
}

function getRecomendations() {
    if (recomendationsItemsFetch?.length) {
        let recomendation_items = show_all_recomendations ? recomendationsItemsFetch : recomendationsItemsFetch.slice(0, 5)
        recomendation_items.map((movie) => {
            let a = createNode('a');
            let img = createNode('img');
            img.src = `http://image.tmdb.org/t/p/w300/${movie.poster_path}`
            img.className = 'w-80'
            a.style.backgroundRepeat = 'no-repeat'
            a.style.backgroundSize = 'cover'
            a.style.width = '100%'
            a.className = 'text-decoration-none text-dark w-100 bg-white py-1 br-1 border-dark-2 all-center flex-column'
            a.href = `movie.html?movie_id=${movie.id}`
            a.alt = `${movie.title}`
            a.title = `${movie.title}`
            append(a, img)
            append(recomendations, a)
        })
    } else {
        fetch(urlSimilar)
            .then((res) => res.json())
            .then((data) => {
                data.results = data.results.filter((recom) => recom.poster_path)
                recomendationsItemsFetch = data.results
                let recomendation_items = show_all_recomendations ? recomendationsItemsFetch : recomendationsItemsFetch.slice(0, 5)
                recomendation_items.map((movie) => {
                    let a = createNode('a');
                    let img = createNode('img');
                    img.src = `http://image.tmdb.org/t/p/w300/${movie.poster_path}`
                    img.className = 'w-80'
                    a.style.backgroundRepeat = 'no-repeat'
                    a.style.backgroundSize = 'cover'
                    a.style.width = '100%'
                    a.className = 'text-decoration-none text-dark w-100 bg-white py-1 br-1 border-dark-2 all-center flex-column'
                    a.href = `movie.html?movie_id=${movie.id}`
                    a.alt = `${movie.title}`
                    a.title = `${movie.title}`
                    append(a, img)
                    append(recomendations, a)
                })
            })
            .catch((error) => {
                console.error(error)
            })
    }
}

function getReviews(position) {
    if (position) {
        let reviewItem = reviewItemsFetch[position] 
        let div = createNode('div');
        let divHeader = createNode('div');
        let quote = createNode('quote');
        let small = createNode('small');
        let img = createNode('img');
        if (reviewItem.author_details.avatar_path) {
            img.src = `http://image.tmdb.org/t/p/w300/${reviewItem.author_details.avatar_path}`
        } else {
            img.src = `https://static.thenounproject.com/png/5034901-200.png`
        }
        divHeader.className = 'w-100 pl-2'
        img.style.width = '55px'
        img.style.height = '55px'
        img.className = 'br-circle'
        quote.className = 'w-80 font-style-italic'
        small.className = 'w-80 mt-2 fw-bold text-right'
        quote.innerHTML = `"${reviewItem.content.slice(0, 333)}..." <a href="${reviewItem.url}" target="_blank" alt="" title="">ver reseña completa</a>`
        small.innerHTML = `--${reviewItem.author}`
        div.style.backgroundRepeat = 'no-repeat'
        div.style.backgroundSize = 'cover'
        div.style.width = '80%'
        div.className = 'text-decoration-none text-dark w-100 bg-white py-1 br-1 border-dark-2 all-center flex-column'
        div.title = `${reviewItem.title}`
        append(divHeader, img)
        append(div, divHeader)
        append(div, quote)
        append(div, small)
        append(reviews, div)
    } else {
        fetch(urlReviews)
            .then((res) => res.json())
            .then((data) => {
                reviewItemsFetch = data.results
                if (reviewItemsFetch?.length === 0) {
                    let div = createNode('div');
                    div.style.backgroundRepeat = 'no-repeat'
                    div.style.backgroundSize = 'cover'
                    div.style.width = '80%'
                    div.innerHTML = 'Esta pelicula no cuenta con reseñas'
                    div.className = 'text-decoration-none text-dark w-100 bg-white py-1 br-1 border-dark-2 all-center flex-column'
                    append(reviews, div)
                } else {
                    let reviewItem = reviewItemsFetch[current_review] 
                    let div = createNode('div');
                    let divHeader = createNode('div');
                    let quote = createNode('quote');
                    let small = createNode('small');
                    let img = createNode('img');
                    if (reviewItem.author_details.avatar_path) {
                        img.src = `http://image.tmdb.org/t/p/w300/${reviewItem.author_details.avatar_path}`
                    } else {
                        img.src = `https://static.thenounproject.com/png/5034901-200.png`
                    }
                    divHeader.className = 'w-100 pl-2'
                    img.style.width = '55px'
                    img.style.height = '55px'
                    img.className = 'br-circle'
                    quote.className = 'w-80 font-style-italic'
                    small.className = 'w-80 mt-2 fw-bold text-right'
                    quote.innerHTML = `"${reviewItem.content.slice(0, 333)}..." <a href="${reviewItem.url}" target="_blank" alt="" title="">ver reseña completa</a>`
                    small.innerHTML = `--${reviewItem.author}`
                    div.style.backgroundRepeat = 'no-repeat'
                    div.style.backgroundSize = 'cover'
                    div.style.width = '80%'
                    div.className = 'text-decoration-none text-dark w-100 bg-white py-1 br-1 border-dark-2 all-center flex-column'
                    div.title = `${reviewItem.title}`
                    append(divHeader, img)
                    append(div, divHeader)
                    append(div, quote)
                    append(div, small)
                    append(reviews, div)
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }
}

function getComments() {
    comments = JSON.parse(localStorage.getItem('comments')) || []
    if (comments.length) {
        comments = comments.filter(comment => comment.movie_id === movie_id)
        comments.map((comment) => {
            let divGeneral = createNode('div')
            let img = createNode('img')
            let div = createNode('div')
            let small = createNode('small')
            let p = createNode('p')
            small.className = 'w-100 text-muted fw-bold text-right font-style-italic pr-1'
            small.innerHTML = comment.timestamp
            img.style.width = '77px'
            img.style.height = '77px'
            img.src = comment.profile
            img.className = 'br-circle border-white-1 mr-1'
            divGeneral.className = 'w-100 all-center mb-1'
            div.className = 'w-100 bg-white br-xs border-dark-2 all-center flex-column'
            p.className = 'w-100 text-left pl-2'
            p.innerHTML = comment.text
            append(div, p)
            append(div, small)
            append(divGeneral, img)
            append(divGeneral, div)
            append(comments_box, divGeneral)
        })
    }
}

function comentar() {
    let comments_storage = JSON.parse(localStorage.getItem('comments')) || []
    let profile_pictures = [
        'https://png.pngtree.com/png-clipart/20230514/original/pngtree-smile-dog-on-white-background-png-image_9160783.png',
        'https://png.pngtree.com/png-clipart/20230423/original/pngtree-real-photo-of-chihuahua-pet-dog-png-image_9092539.png',
        'https://www.petdarling.com/wp-content/uploads/2014/08/pastor-alem%C3%A1n.jpg',
        'https://png.pngtree.com/png-clipart/20230423/original/pngtree-real-picture-of-husky-dog-png-image_9092538.png',
        'https://img.freepik.com/fotos-premium/afaird-dog-mirando-camara-photo-studio-generative-ai_109813-3.jpg?w=2000',
        'https://png.pngitem.com/pimgs/s/105-1051520_german-pinscher-hd-png-download.png'
    ]
    let now = new Date()
    comments = [...comments_storage.filter(comment => comment.movie_id !== movie_id), ...comments]
    comments.push({
        movie_id: movie_id,
        text: document.getElementById('new_comment').value,
        timestamp: `${now.getDate()}/${now.getMonth()}/${now.getFullYear()} - ${now.getHours()}:${now.getMinutes()}`,
        profile: profile_pictures[parseInt(Math.random() * ((profile_pictures.length - 1) - 0) + 0)],
    })
    localStorage.setItem('comments', JSON.stringify(comments))
    comments_box.innerHTML = ''
    comments.filter(comment => comment.movie_id === movie_id).map((comment) => {
        let divGeneral = createNode('div')
        let img = createNode('img')
        let div = createNode('div')
        let small = createNode('small')
        let p = createNode('p')
        small.className = 'w-100 text-muted fw-bold text-right font-style-italic pr-1'
        small.innerHTML = comment.timestamp
        img.style.width = '77px'
        img.style.height = '77px'
        img.src = comment.profile
        img.className = 'br-circle border-white-1 mr-1'
        divGeneral.className = 'w-100 all-center mb-1'
        div.className = 'w-100 bg-white br-xs border-dark-2 all-center flex-column'
        p.className = 'w-100 text-left pl-2'
        p.innerHTML = comment.text
        append(div, p)
        append(div, small)
        append(divGeneral, img)
        append(divGeneral, div)
        append(comments_box, divGeneral)
    })
    document.getElementById('new_comment').value = ''
}