
// menu 
let menu =
  document.querySelector('#checkbox')
let menuItems =
  document.querySelector('.MenuItems')
menu.addEventListener('click', () => {
  if (menu.checked) {
    menuItems.classList.add("MenuItemsOn")
    document.body.style.overflow = 'hidden'
  } else {
    menuItems.classList.remove("MenuItemsOn")
    document.body.style.overflow = ''
  }
})

// Upcoming Movies
let apiKey = '86f82ab615c34bd1881316b45b659f77'
let UPM =
document.querySelector('.UpcomingMovies')
  
getUpcomingMovies()
function getUpcomingMovies() {
  let url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&page=1`
  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new console.log('Chek your internet!')
      }
      return res.json()
    })
    .then(data => {
      let movies = data.results.filter(e => e.release_date.includes("2023") || e.release_date.includes("2024") && e.vote_average.toFixed(1) != 0.0)
      //console.log(data)
      movies.map(e => {
        let Movie =
          document.createElement('a')
        Movie.id = e.id
        Movie.href = "./src/Movie.html"
        Movie.target = '_blank'
        Movie.setAttribute('onclick', 'openMovie(this)')
        Movie.className = 'UPMovie'
        UPM.append(Movie)
        let MCover =
          document.createElement('img')
        MCover.className = "MCover"
        MCover.src = `https://media.themoviedb.org/t/p/w220_and_h330_face${e.poster_path}`
        Movie.append(MCover)
        let MovieImg =
          document.createElement('img')
        MovieImg.className = "MovieImg"
        MovieImg.src = `https://media.themoviedb.org/t/p/w220_and_h330_face${e.poster_path}`
        Movie.append(MovieImg)
        let MovieInfo =
          document.createElement('div')
        MovieInfo.className = 'UPMovieInfo'
        Movie.append(MovieInfo)
        let MovieName =
          document.createElement('span')
        MovieName.textContent = `${e.title}(${e.release_date.split("-")[0]})`
        MovieName.className = 'UPMovieName'
        MovieInfo.append(MovieName)
        let MovieRating =
          document.createElement('span')
        MovieRating.textContent = e.vote_average.toFixed(1)
        MovieRating.className = 'UPMovieRating'
        MovieInfo.append(MovieRating)
        let UPShadow =
          document.createElement('div')
        UPShadow.className = 'UPShadow'
        Movie.append(UPShadow)
        let ButtonBox =
          document.createElement('div')
        ButtonBox.className = 'ButtonBox'
        Movie.append(ButtonBox)
        let Button =
          document.createElement('div')
        Button.textContent = "Show More"
        ButtonBox.append(Button)
      })
    })
    .catch(error => {
      console.log(error)
    })
}

// Trending Movies
let TRM =
document.querySelector('.TrendingMoviesBox')

getTrendingMovies()
function getTrendingMovies() {
  let timeWindow = 'day'
  let url = `https://api.themoviedb.org/3/trending/movie/${timeWindow}?api_key=${apiKey}`
  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new console.log('Chek your internet!')
      }
      return res.json()
    })
    .then(data => {
      let movies = data.results
      //console.log(movies)
      movies.map(e => {
        let Movie =
          document.createElement('a')
        Movie.id = e.id
        Movie.href = "./src/Movie.html"
        Movie.target = '_blank'
        Movie.setAttribute('onclick', 'openMovie(this)')
        Movie.className = 'Movie'
        TRM.append(Movie)
        let MovieImg =
          document.createElement('img')
        MovieImg.src = `https://media.themoviedb.org/t/p/w220_and_h330_face${e.poster_path}`
        Movie.append(MovieImg)
        let MovieInfo =
          document.createElement('div')
        MovieInfo.className = 'MovieInfo'
        Movie.append(MovieInfo)
        let MovieName =
          document.createElement('span')
        MovieName.textContent = `${e.title}(${e.release_date.split("-")[0]})`
        MovieName.className = 'MovieName'
        MovieInfo.append(MovieName)
        let MovieRating =
          document.createElement('span')
        MovieRating.textContent = e.vote_average.toFixed(1)
        MovieRating.className = 'MovieRating'
        MovieInfo.append(MovieRating)
      })
    })
    .catch(error => {
      console.log(error)
    })
}

// Populer Movies
let PPM =
document.querySelector('.PopulerMoviesBox')

getPopulerMovies()
function getPopulerMovies() {
  let page =
    Math.floor(Math.random() * 6 + 1)
  let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`
  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new console.log('Chek your internet!')
      }
      return res.json()
    })
    .then(data => {
      let movies = data.results
      //console.log(movies)
      movies.map(e => {
        let Movie =
          document.createElement('a')
        Movie.id = e.id
        Movie.href = "./src/Movie.html"
        Movie.target = '_blank'
        Movie.setAttribute('onclick', 'openMovie(this)')
        Movie.className = 'Movie'
        PPM.append(Movie)
        let MovieImg =
          document.createElement('img')
        MovieImg.src = `https://media.themoviedb.org/t/p/w220_and_h330_face${e.poster_path}`
        Movie.append(MovieImg)
        let MovieInfo =
          document.createElement('div')
        MovieInfo.className = 'MovieInfo'
        Movie.append(MovieInfo)
        let MovieName =
          document.createElement('span')
        MovieName.textContent = `${e.title}(${e.release_date.split("-")[0]})`
        MovieName.className = 'MovieName'
        MovieInfo.append(MovieName)
        let MovieRating =
          document.createElement('span')
        MovieRating.textContent = e.vote_average.toFixed(1)
        MovieRating.className = 'MovieRating'
        MovieInfo.append(MovieRating)
      })
    })
    .catch(error => {
      console.log(error)
    })
}

function openMovie(e) {
  let movieId = e.id
  localStorage.setItem('MovieId', movieId)
}

// All Movies Gender
let Genders = 
document.querySelector('.AllGender')

seeAllGender()
function seeAllGender() {
  let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new console.log('Chek your internet!')
      }
      return res.json()
    })
    .then(data => {
      let AllGender = data.genres
      AllGender.map(e => {
        let Gender = 
        document.createElement('span')
        Gender.textContent = e.name
        Gender.id = e.id
        Gender.className = "Gender"
        Gender.setAttribute('onclick', 'GenderId(this)')
        Genders.append(Gender)
      })
    })
    .catch(error => {
      console.log(error)
    })
}

// Movie By Gender
let AMG = 
document.querySelector('.AMGender')

getMovieByGender()
function getMovieByGender(id) {
  let genreId = id === undefined ? 28 : id
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=1`
  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new console.log('Chek your internet!')
      }
      return res.json()
    })
    .then(data => {
      let movies = data.results.filter(e => e.vote_average.toFixed(1) != 0.0)
      movies.map(e => {
        let Movie =
          document.createElement('a')
        Movie.id = e.id
        Movie.href = "./src/Movie.html"
        Movie.target = '_blank'
        Movie.setAttribute('onclick', 'openMovie(this)')
        Movie.className = 'Movie2'
        AMG.append(Movie)
        let MovieCover =
          document.createElement('div')
        MovieCover.className = "Movie2Cover"
        Movie.append(MovieCover)
        let MovieImg =
          document.createElement('img')
        MovieImg.src = `https://media.themoviedb.org/t/p/w220_and_h330_face${e.poster_path}`
        MovieCover.append(MovieImg)
        let MovieInfo =
          document.createElement('div')
        MovieInfo.className = 'MovieInfo2'
        Movie.append(MovieInfo)
        let MovieName =
          document.createElement('span')
        MovieName.innerHTML = `${e.title}<small>(${e.release_date.split("-")[0]})</small>`
        MovieName.className = 'MovieName2'
        MovieInfo.append(MovieName)
        let MovieRating =
          document.createElement('span')
        MovieRating.textContent = e.vote_average.toFixed(1)
        MovieRating.className = 'MovieRating2'
        MovieInfo.append(MovieRating)
      })
    })
    .catch(error => {
      console.log(error)
    })
}

// set Gender Id 
function GenderId(e) {
  AMG.innerHTML = ""
  getMovieByGender(e.id)
}
