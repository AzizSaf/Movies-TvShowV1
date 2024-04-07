/** All Variable **/
let menu =
  document.querySelector('.Menu input')
let menuBox =
  document.querySelector('.MenuBox')
let main =
  document.querySelector('.Main')
let apiKey = '86f82ab615c34bd1881316b45b659f77'
let UPM =
  document.querySelector('.UpcomingMovies')
let UPMBtn =
  document.querySelector('.UPMMore')
let TRM =
  document.querySelector('.TrendingMovies')
let TRMBtn =
  document.querySelector('.TRMMore')
let PPM =
  document.querySelector('.PopulerMovies')
let PPMBtn =
  document.querySelector('.PPMMore')
let MBG =
  document.querySelector('.MoviesByGenders')
let MBGBtn =
  document.querySelector('.MBGMore')
let GendersBox =
  document.querySelector('.GendersBox')
let White =
  document.querySelector('.White')
let Dark =
  document.querySelector('.Dark')
  
  
  
/* NavBar */
menu.addEventListener('click', () => {
  menu.checked ? MenuBox() : MenuBox() 
})
function MenuBox() {
  menuBox.classList.toggle('MenuBoxOn')
}


// Upcoming Movies
getUpcomingMovies()
function getUpcomingMovies(page = 1) {
  let url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&page=${page}`
  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new console.log('Chek your internet!')
      }
      return res.json()
    })
    .then(data => {
      let Movies = data.results.filter(e => e.release_date.includes("2023") || e.release_date.includes("2024") && e.vote_average.toFixed(1) != 0.0)
      Movies.map(e => {
        let Movie =
          document.createElement('a')
        Movie.id = e.id
        Movie.href = "./Src/Movie/Movie.html"
        Movie.target = '_blank'
        Movie.setAttribute('onclick', 'saveMovieId(this)')
        Movie.className = 'Movie'
        Movie.innerHTML =
          `<div class="MovieCover">
            <img loading="lazy" alt="Movie Image" src="https://media.themoviedb.org/t/p/w220_and_h330_face${e.poster_path}">
            <span class="MovieRiting">
              ${e.vote_average.toFixed(1)}
            </span>
            <div class="MovieInfo">
              <p>${e.title.toUpperCase()}</p>
              <small>${e.release_date}</small>
            </div>
          </div>`
        UPM.append(Movie)
      })
    })
    .catch(error => console.log(error))
}

let count = 2;
UPMBtn.addEventListener('click', () => {
  getUpcomingMovies(count)
  count++
})


// Trending Movies

getTrendingMovies()
function getTrendingMovies(page = 1) {
  let timeWindow = 'day'
  let url = `https://api.themoviedb.org/3/trending/movie/${timeWindow}?api_key=${apiKey}&page=${page}`
  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new console.log('Chek your internet!')
      }
      return res.json()
    })
    .then(data => {
      let Movies = data.results
      Movies.map(e => {
        let Movie =
          document.createElement('a')
        Movie.id = e.id
        Movie.href = "./Src/Movie/Movie.html"
        Movie.target = '_blank'
        Movie.setAttribute('onclick', 'saveMovieId(this)')
        Movie.className = 'Movie'
        Movie.innerHTML =
          `<div class="MovieCover">
            <img loading="lazy" alt="Movie Image" src="https://media.themoviedb.org/t/p/w220_and_h330_face${e.poster_path}">
            <span class="MovieRiting">
              ${e.vote_average.toFixed(1)}
            </span>
            <div class="MovieInfo">
              <p>${e.title.toUpperCase()}</p>
              <small>${e.release_date}</small>
            </div>
          </div>`
        TRM.append(Movie)
      })
    })
    .catch(error => console.log(error))
}

TRMBtn.addEventListener('click', () => {
  getTrendingMovies(count)
  count++
})

// Populer Movies

getPopulerMovies()
function getPopulerMovies(page = 1) {
  let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`
  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new console.log('Chek your internet!')
      }
      return res.json()
    })
    .then(data => {
      let Movies = data.results
      Movies.map(e => {
        let Movie =
          document.createElement('a')
        Movie.id = e.id
        Movie.href = "./Src/Movie/Movie.html"
        Movie.target = '_blank'
        Movie.setAttribute('onclick', 'saveMovieId(this)')
        Movie.className = 'Movie'
        Movie.innerHTML =
          `<div class="MovieCover">
            <img loading="lazy" alt="Movie Image" src="https://media.themoviedb.org/t/p/w220_and_h330_face${e.poster_path}">
            <span class="MovieRiting">
              ${e.vote_average.toFixed(1)}
            </span>
            <div class="MovieInfo">
              <p>${e.title.toUpperCase()}</p>
              <small>${e.release_date}</small>
            </div>
          </div>`
        PPM.append(Movie)
      })
    })
    .catch(error => {
      console.log(error)
    })
}

PPMBtn.addEventListener('click', () => {
  getPopulerMovies(count)
  count++
})

// All Gender

let Genders = 
[
  {"id":28,"name":"Action"},
  {"id":12,"name":"Adventure"},
  {"id":16,"name":"Animation"},
  {"id":35,"name":"Comedy"},
  {"id":80,"name":"Crime"},
  {"id":99,"name":"Documentary"},
  {"id":18,"name":"Drama"},
  {"id":10751,"name":"Family"},
  {"id":14,"name":"Fantasy"},
  {"id":36,"name":"History"},
  {"id":27,"name":"Horror"},
  {"id":10402,"name":"Music"},
  {"id":9648,"name":"Mystery"},
  {"id":10749,"name":"Romance"},
  {"id":53,"name":"Thriller"},
  {"id":10752,"name":"War"},
  {"id":37,"name":"Western"}
]

setAllGendrs()
function setAllGendrs() {
  Genders.map(e => {
    let Gender = 
      document.createElement('div')
    Gender.id = e.id
    Gender.className = 'GenderBox'
    Gender.setAttribute('onclick', 'GenderId(this)')
    Gender.innerHTML = 
    `<p>${e.name}</p>`
    GendersBox.append(Gender)
  })
}

// Movie By Gender

getMovieByGender()
function getMovieByGender(id = 28, page = 1){
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${id}&page=${page}`
  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new console.log('Chek your internet!')
      }
      return res.json()
    })
    .then(data => {
      let Movies = data.results.filter(e => e.vote_average.toFixed(1) != 0.0)
      Movies.map(e => {
        let Movie =
          document.createElement('a')
        Movie.id = e.id
        Movie.href = "./Src/Movie/Movie.html"
        Movie.target = '_blank'
        Movie.setAttribute('onclick', 'saveMovieId(this)')
        Movie.className = 'Movie'
        Movie.innerHTML =
        `<div class="MovieCover">
          <img loading="lazy" alt="Movie Image" src="https://media.themoviedb.org/t/p/w220_and_h330_face${e.poster_path}">
          <span class="MovieRiting">
            ${e.vote_average.toFixed(1)}
          </span>
          <div class="MovieInfo">
            <p>${e.title.toUpperCase()}</p>
            <small>${e.release_date}</small>
          </div>
        </div>`
        MBG.append(Movie)
      })
    })
    .catch(error => console.log(error))
}

let ID;
function GenderId(e) {
  MBG.innerHTML = ""
  ID = e.id
  getMovieByGender(ID)
  e.classList.add('Active')
  let AllGenderBoxs =
    document.querySelectorAll('.GenderBox')
  AllGenderBoxs.forEach(a => {
    if (a.id !== e.id) {
      a.classList.remove('Active')
    }
  })
}

MBGBtn.addEventListener('click', () => {
  getMovieByGender(ID, count)
  count++
})

function saveMovieId(e) {
  let MovieId = e.id
  localStorage.setItem("MovieId", MovieId)
}