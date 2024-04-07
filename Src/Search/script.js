/** All Variable **/
let menu =
  document.querySelector('.Menu input')
let menuBox =
  document.querySelector('.MenuBox')
let main =
  document.querySelector('.Main')
let apiKey = '86f82ab615c34bd1881316b45b659f77'
let SR =
  document.querySelector('.SearchResult')
let UserText =
  document.querySelector('.UserBox input')
let SRbtn =
  document.querySelector('.UserBox img')
let SRMore =
  document.querySelector('.SRMore')
let SearchBox =
  document.querySelector('.SearchBox')
let ItemsBox =
  document.querySelector('.ItemsBox')
  
/* NavBar */
menu.addEventListener('click', () => {
  menu.checked ? MenuBox() : MenuBox() 
})
function MenuBox() {
  menuBox.classList.toggle('MenuBoxOn')
}


// Search for data 
let userData;
SRbtn.addEventListener('click', (e) => {
  if (UserText.value.trim() != '') {
    userData = UserText.value
    SR.innerHTML = ''
    if (ItemsBox.value === 'Movie') {
      searchForMovie()
    }
    if (ItemsBox.value === 'TV') {
      searchForTV()
    }
    if (ItemsBox.value === '0') {
      e.preventDefault()
      SendError('Please choose the search type first!')
    }
    UserText.classList.remove('error')
  } else {
    UserText.focus()
    UserText.classList.add('error')
  }
})

let count = 2;
function getMore() {
  if (ItemsBox.value === 'Movie') {
    searchForMovie(count)
  } 
  if (ItemsBox.value === 'TV') {
    searchForTV(count)
  }
  count++
}

function searchForMovie(page = 1) {
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${userData}&page=${page}&sort_by=popularity.desc`;
  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new SendError('Chek your internet Please!')
      }
      return res.json()
    })
    .then(data => {
      let Movies = data.results.filter(e => e.vote_average.toFixed(1) != 0.0)
      if (Movies.length === 0) {
        SendError('No Results Found!')
      } else {
        SRMore.classList.add('showBtn')
      }
      if (page > data.total_pages ) {
        SRMore.classList.remove('showBtn')
      }
      Movies.map(e => {
        let Movie =
          document.createElement('a')
        Movie.id = e.id
        Movie.href = "../Movie/Movie.html"
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
        SR.append(Movie)
      })
    })
    .catch(err => { SendError('Chek your internet Please!') })
}

function searchForTV(page = 1) {
  let url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(userData)}&page=${page}&sort_by=popularity.desc`
  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new SendError('Chek your internet Please!')
      }
      return res.json()
    })
    .then(data => {
      let Movies = data.results.filter(e => e.vote_average.toFixed(1) != 0.0)
      if (Movies.length === 0) {
        SendError('No Results Found!')
      } else {
        SRMore.classList.add('showBtn')
      }
      if (page > data.total_pages) {
        SRMore.classList.remove('showBtn')
      }
      Movies.map(e => {
        let Movie =
          document.createElement('a')
        Movie.id = e.id
        Movie.href = "../TV/TV.html"
        Movie.target = '_blank'
        Movie.setAttribute('onclick', 'saveTVid(this)')
        Movie.className = 'Movie'
        Movie.innerHTML =
          `<div class="MovieCover">
          <img loading="lazy" alt="Movie Image" src="https://media.themoviedb.org/t/p/w220_and_h330_face${e.poster_path}">
          <span class="MovieRiting">
            ${e.vote_average.toFixed(1)}
          </span>
          <div class="MovieInfo">
            <p>${e.name.toUpperCase()}</p>
            <small>${e.first_air_date}</small>
           </div>
        </div>`
        SR.append(Movie)
      })
    })
    .catch(err => { SendError('Chek your internet Please!') })
}

function saveMovieId(e) {
  let MovieId = e.id
  localStorage.setItem("MovieId", MovieId)
}
function saveTVid(e) {
  let TVid = e.id
  localStorage.setItem("TVid", TVid)
}

function SendError(message) {
  alert(message)
}