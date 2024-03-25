
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

// det The Movie Data
let apiKey = '86f82ab615c34bd1881316b45b659f77'
let id = localStorage.getItem('MovieId')
//let id = "844417"

let IB1 = 
  document.querySelector('.section1')
let IB2 =
  document.querySelector('.section2')
let IB3 =
  document.querySelector('.section3')
  
  
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
      //console.log(data)
      let Movie =
        document.createElement('div')
      Movie.className = 'Movie_1'
      IB1.append(Movie)
      let MCover =
        document.createElement('img')
      MCover.className = "MCover"
      MCover.src = `https://media.themoviedb.org/t/p/w220_and_h330_face${data.poster_path}`
      Movie.append(MCover)
      let MInfo =
        document.createElement('div')
      MInfo.className = 'MInfo'
      Movie.append(MInfo)
      let MName =
        document.createElement('span')
      let name = data.title.toUpperCase()
      let date = `<small>(${data.release_date.split("-")[0]})</small>`
      MName.innerHTML = name + date
      MName.className = 'MName'
      MInfo.append(MName)
      document.title = MName.textContent
      let MRating =
        document.createElement('div')
      MRating.className = 'MRating'
      MInfo.append(MRating)
      let Rating =
        document.createElement('span')
      Rating.textContent = data.vote_average.toFixed(1)
      Rating.className = 'Rating'
      MRating.append(Rating)
      let RBox =
        document.createElement('span')
      RBox.textContent = "IMDb"
      RBox.className = 'RBox'
      MRating.append(RBox)
      let MGender =
        document.createElement('div')
      MGender.className = 'MGender'
      MInfo.append(MGender)
      let Genders = data.genres
      Genders.map(e => {
        let Gender =
          document.createElement('span')
        Gender.textContent = e.name.toUpperCase()
        Gender.className = 'Gender'
        MGender.append(Gender)
      })
      let MStory =
        document.createElement('span')
      MStory.textContent = data.overview
      MStory.className = 'MStory'
      MInfo.append(MStory)
      let Shadow =
        document.createElement('div')
      Shadow.className = 'Shadow'
      Movie.append(Shadow)
    })
    .catch(error => {
      console.log(error)
    })
  setTimeout(() => {
    getMovieCosts(id)
  }, 500)
}

// Movie Costs
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
      let TopCostTitle =
        document.createElement('span')
      TopCostTitle.className = "TopCostTitle"
      TopCostTitle.textContent = "Top Costs"
      IB2.append(TopCostTitle)
      let CostsBox =
        document.createElement('div')
      CostsBox.className = 'CostsBox'
      IB2.append(CostsBox)
      let Costs = data.cast.filter(e => e.profile_path != null)
      Costs.map(e => {
        let Costs =
          document.createElement('div')
        Costs.className = "Costs"
        Costs.id = e.id
        CostsBox.append(Costs)
        let CostsImg =
          document.createElement('div')
        CostsImg.className = "CostsImg"
        Costs.append(CostsImg)
        let Image =
          document.createElement('img')
        Image.src = `https://media.themoviedb.org/t/p/w240_and_h266_face${e.profile_path}`
        CostsImg.append(Image)
        let CostsName =
          document.createElement('div')
        CostsName.className = "CostsName"
        Costs.append(CostsName)
        let Name =
          document.createElement('span')
        Name.innerHTML = `${e.original_name} <p>(${e.character})</p>`
        CostsName.append(Name)
      })
      
    })
    .catch(error => {
      console.log(error)
    })
  setTimeout(() => {
    getMovieImages(id)
  }, 1000)
}

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

// Movie Videos 
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
      let Trailer = data.results.filter(e => e.type === "Trailer")
      let link = Trailer[0].key
      let videoLink = `https://www.youtube.com/embed/${link == undefined || null ? '' : link}`
      let TrailerTitle =
        document.createElement('div')
      TrailerTitle.className = "TrailerTitle"
      TrailerTitle.textContent = "Movie Trailer"
      IB3.append(TrailerTitle)
      let TrailerBox =
        document.createElement('div')
      TrailerBox.className = "TrailerBox"
      TrailerBox.innerHTML = 
      `<iframe width="100%" height="100%"
          src=${videoLink} frameborder="0" allowfullscreen>
      </iframe>`
      IB3.append(TrailerBox)
    })
    .catch(error => {
      console.log(error)
    })
  setTimeout(() => {
    getSimilarMovies(id)
  }, 2000)
}

// Movie Similar 
function getSimilarMovies(id) {
  let page =
  Math.floor(Math.random() * 3 + 1)
  let url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&page=${page}`
  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new console.log('Chek your internet!')
      }
      return res.json()
    })
    .then(data => {
      let SimilarTitle =
        document.createElement('div')
      SimilarTitle.className = "SimilarTitle"
      SimilarTitle.textContent = "Similar Movies"
      IB3.append(SimilarTitle)
      let SMBox =
        document.createElement('div')
      SMBox.className = "SimilarMoviesBox"
      IB3.append(SMBox)
      let MSimilar = data.results.filter(e => e.vote_average.toFixed(1) > 6.0)
      MSimilar.map(e => {
        let Movie =
          document.createElement('a')
        Movie.id = e.id
        Movie.href = "./src/Movie.html"
        Movie.target = '_blank'
        Movie.setAttribute('onclick', 'openMovie(this)')
        Movie.className = 'Movie'
        SMBox.append(Movie)
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
        MovieName.innerHTML = `${e.title}<small>(${e.release_date.split("-")[0]})</small>`
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
  window.open('./Movie.html', '_blank')
}
