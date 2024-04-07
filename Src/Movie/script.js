/** All Variable **/
let menu =
  document.querySelector('.Menu input')
let menuBox =
  document.querySelector('.MenuBox')
let main =
  document.querySelector('.Main')
let apiKey = '86f82ab615c34bd1881316b45b659f77'
let Box =
  document.querySelector('.MovieBox')
  
/* NavBar */
menu.addEventListener('click', () => {
  menu.checked ? MenuBox() : MenuBox() 
})
function MenuBox() {
  menuBox.classList.toggle('MenuBoxOn')
}

// Movie Id 
let id = localStorage.getItem('MovieId')
//let id = "1011985"

// The Movie
getTheMovie(id)
function getTheMovie(id) {
  let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=genres`
  
  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new console.log('Chek your internet!')
      }
      return res.json()
    })
    .then(data => {
      document.title = data.title
      let MovieInfos = 
        document.querySelector('.MovieInfos')
      let MovieName =
        document.createElement('div')
      MovieName.className = 'MovieName'
      MovieName.innerHTML = 
      `<p>${data.title} <small>(${data.release_date.slice(0, 4)})</small></p>`
      MovieInfos.append(MovieName)
      let MovieCard =
        document.createElement('div')
      MovieCard.className = 'MovieCard'
      MovieCard.innerHTML =
      `<img loading="lazy" alt="Movie Image" src="https://media.themoviedb.org/t/p/w220_and_h330_face${data.poster_path}">`
      MovieInfos.append(MovieCard)
      let MovieRite =
        document.createElement('div')
      MovieRite.className = 'MovieRite'
      MovieRite.innerHTML =
      `<p>${data.vote_average.toFixed(1)}</p><span>IMDb</span>`
      MovieInfos.append(MovieRite)
      let MovieGender = 
        document.createElement('div')
      MovieGender.className = 'MovieGender'
      MovieInfos.append(MovieGender)
      data.genres.map(e => {
        let MGItem =
          document.createElement('span')
        MGItem.textContent = e.name
        MovieGender.append(MGItem)
      })
      let MovieStory =
        document.createElement('div')
      MovieStory.className = 'MovieStory'
      MovieStory.innerHTML = 
      `<p>The Summary:</p>
      <p>${data.overview}</p>`
      MovieInfos.append(MovieStory)
    })
    .catch(error => console.log(error))
}

// Movie Videos 
getMovieVideo(id)
function getMovieVideo(id) {
  let url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`
  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new console.log('Chek your internet!')
      }
      return res.json()
    })
    .then(data => {
      let Data = data.results.filter(e => e.type === "Trailer")
      let key = Data[0].key;
      let videoLink = `https://www.youtube.com/embed/${key == undefined || null ? '' : key}`
      let MovieTrailer =
        document.querySelector('.MovieTrailer')
      let Video = 
        document.createElement('div')
      Video.className = 'Trailer'
      Video.innerHTML =
      `<p>Movie Trailer:</p>
      <iframe width="100%" height="220px"
        src=${videoLink} frameborder="0" allowfullscreen>
      </iframe>`
      MovieTrailer.append(Video)
    })
    .catch(error => console.log(error))
}

// Movie Costs
getMovieCosts(id)
function getMovieCosts(id) {
  let url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new console.log('Chek your internet!')
      }
      return res.json()
    })
    .then(data => {
      let MoviesCosts =
      document.querySelector('.MoviesCosts')

      let Title = 
        document.createElement('p')
      Title.textContent = 'Movie Casts:'
      MoviesCosts.append(Title)
      let CostsBox =
        document.createElement('div')
      CostsBox.className = 'CostsBox'
      MoviesCosts.append(CostsBox)
      data.cast.map(e => {
        let Cost =
          document.createElement('div')
        Cost.className = 'Cost'
        Cost.id = e.cast_id
        CostsBox.append(Cost)
        let CostImg =
          document.createElement('img')
        CostImg.src = `https://media.themoviedb.org/t/p/w240_and_h266_face${e.profile_path}`
        Cost.append(CostImg)
        let CostInfo =
          document.createElement('dic')
        CostInfo.className = 'CostInfo'
        Cost.append(CostInfo)
        let CostName =
          document.createElement('p')
        CostName.innerHTML = 
        `<p>${e.original_name.toUpperCase()}</p>`
        CostInfo.append(CostName)
        
      })
    })
    .catch(error => console.log(error))
}

// Movie Similar 
getSimilarMovies(id)
function getSimilarMovies(id, page = 1) {
  let url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&page=${page}`
  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new console.log('Chek your internet!')
      }
      return res.json()
    })
    .then(data => {
      let Movies = data.results
      let MoviesSimilar =
        document.querySelector('.MoviesSimilar')

      Movies.map(e => {
        let SMM =
          document.querySelector('.SimilarMovies')
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
        SMM.append(Movie)
      })
    })
    .catch(error => console.log(error))
}

let SMMMore =
  document.querySelector('.SMMMore')
let count = 2;
SMMMore.addEventListener('click', () => {
  getSimilarMovies(id, count)
  count++
})

function saveMovieId(e) {
  let MovieId = e.id
  localStorage.setItem("MovieId", MovieId)
}



/*
// Movie Images
function getMovieImages(id) {
  let url = `https://api.themoviedb.org/3/movie/${id}/images?api_key=${apiKey}`
  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new console.log('Chek your internet!')
      }
      return res.json()
    })
    .then(data => {
      let images = data.backdrops.filter(e => e.file_path != null )
      //console.log(images[0])
      let MovieImages =
        document.createElement('div')
      MovieImages.className = "MovieImages"
      MovieImages.textContent = "Movie Images"
      IB2.append(MovieImages)
      let MImagesBox =
        document.createElement('div')
      MImagesBox.className = "MImagesBox"
      IB2.append(MImagesBox)
      let MIBox =
        document.querySelector('.MImagesBox')
      images.map(e => {
        let ImgBox =
        document.createElement('div')
        MIBox.append(ImgBox)
        let Shadow =
          document.createElement('div')
        Shadow.className = "Shadow_2"
        ImgBox.append(Shadow)
        let Img =
          document.createElement('img')
        Img.src = `https://media.themoviedb.org/t/p/w1000_and_h563_face${e.file_path}`
        ImgBox.append(Img)
      })
    })
    .catch(error => {
      console.log(error)
    })
  setTimeout(() => {
    getMovieVideo(id)
  }, 1500)
}
*/