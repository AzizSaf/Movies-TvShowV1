/** All Variable **/
let menu =
  document.querySelector('.Menu input')
let menuBox =
  document.querySelector('.MenuBox')
let main =
  document.querySelector('.Main')
let apiKey = '86f82ab615c34bd1881316b45b659f77'
let UPTV = 
  document.querySelector('.UpcomingTV')
let UPTVBtn =
  document.querySelector('.UPTVMore')
let TRTV =
  document.querySelector('.TrendingTV')
let TRTVBtn =
  document.querySelector('.TRTVMore')
let PPTV =
  document.querySelector('.PopulerTV')
let PPTVBtn =
  document.querySelector('.PPTVMore')
let TVBG =
  document.querySelector('.TVByGenders')
let TVBGBtn =
  document.querySelector('.TVBGMore')
let GendersBox =
  document.querySelector('.GendersBox')
  
  
  
  
/* NavBar */
menu.addEventListener('click', () => {
  menu.checked ? MenuBox() : MenuBox() 
})
function MenuBox() {
  menuBox.classList.toggle('MenuBoxOn')
}

/* MenuBox */


// Upcoming TV
getUpcomingTV()
function getUpcomingTV(page = 1) {
  let url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${apiKey}&page=${page}`
  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new console.log('Chek your internet!')
      }
      return res.json()
    })
    .then(data => {
      let Tv = data.results
      Tv.map(e => {
        let Tv =
          document.createElement('a')
        Tv.id = e.id
        Tv.href = "../Src/TV/TV.html"
        Tv.target = '_blank'
        Tv.setAttribute('onclick', 'saveTVId(this)')
        Tv.className = 'TV'
        Tv.innerHTML =
        `<div class="TVCover">
          <img loading="lazy" alt="TV Image" src="https://media.themoviedb.org/t/p/w220_and_h330_face${e.poster_path}">
          <span class="TVRiting">
            ${e.vote_average.toFixed(1)}
          </span>
          <div class="TVInfo">
            <p>${e.name.toUpperCase()}</p>
            <small>${e.first_air_date}</small>
          </div>
        </div>`
        UPTV.append(Tv)
      })
    })
    .catch(error => console.log(error))
}

let count = 2;
UPTVBtn.addEventListener('click', () => {
  getUpcomingTV(count)
  count++
})

// Trending TV

getTrendingTV()
function getTrendingTV(page = 1) {
  let timeWindow = 'day'
  let url = `https://api.themoviedb.org/3/trending/tv/${timeWindow}?api_key=${apiKey}&page=${page}`
  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new console.log('Chek your internet!')
      }
      return res.json()
    })
    .then(data => {
      let Tv = data.results
      Tv.map(e => {
        let Tv =
            document.createElement('a')
          Tv.id = e.id
          Tv.href = "../Src/TV/TV.html"
          Tv.target = '_blank'
          Tv.setAttribute('onclick', 'saveTVId(this)')
          Tv.className = 'TV'
          Tv.innerHTML =
          `<div class="TVCover">
            <img loading="lazy" alt="TV Image" src="https://media.themoviedb.org/t/p/w220_and_h330_face${e.poster_path}">
            <span class="TVRiting">
              ${e.vote_average.toFixed(1)}
            </span>
            <div class="TVInfo">
              <p>${e.name.toUpperCase()}</p>
              <small>${e.first_air_date}</small>
            </div>
          </div>`
        TRTV.append(Tv)
      })
    })
    .catch(error => console.log(error))
}

TRTVBtn.addEventListener('click', () => {
  getTrendingTV(count)
  count++
})

// Populer TV

getPopulerTV()
function getPopulerTV(page = 1) {
  let url = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&page=${page}`
  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new console.log('Chek your internet!')
      }
      return res.json()
    })
    .then(data => {
      let Tv = data.results
      Tv.map(e => {
        let Tv =
          document.createElement('a')
        Tv.id = e.id
        Tv.href = "../Src/TV/TV.html"
        Tv.target = '_blank'
        Tv.setAttribute('onclick', 'saveTVId(this)')
        Tv.className = 'TV'
        Tv.innerHTML =
        `<div class="TVCover">
          <img loading="lazy" alt="TV Image" src="https://media.themoviedb.org/t/p/w220_and_h330_face${e.poster_path}">
          <span class="TVRiting">
            ${e.vote_average.toFixed(1)}
          </span>
          <div class="TVInfo">
            <p>${e.name.toUpperCase()}</p>
            <small>${e.first_air_date}</small>
          </div>
        </div>`
        PPTV.append(Tv)
      })
    })
    .catch(error => console.log(error))
}

PPTVBtn.addEventListener('click', () => {
  getPopulerTV(count)
  count++
})

// All Gender

let Genders = 
[
  {"id":10759,"name":"Action & Adventure"},
  {"id":16,"name":"Animation"},
  {"id":35,"name":"Comedy"},
  {"id":80,"name":"Crime"},
  {"id":99,"name":"Documentary"},
  {"id":18,"name":"Drama"},
  {"id":10751,"name":"Family"},
  {"id":10762,"name":"Kids"},
  {"id":9648,"name":"Mystery"},
  {"id":10763,"name":"News"},
  {"id":10764,"name":"Reality"},
  {"id":10765,"name":"Sci-Fi & Fantasy"},
  {"id":10766,"name":"Soap"},
  {"id":10767,"name":"Talk"},
  {"id":10768,"name":"War & Politics"},
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

getTVByGender()
function getTVByGender(id = 10759, page = 1){
  let url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${id}&page=${page}`
  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new console.log('Chek your internet!')
      }
      return res.json()
    })
    .then(data => {
      let Movies = data.results.filter(e => e.vote_average.toFixed(1) != 0.0)
      data.results.map(e => {
        let Tv =
          document.createElement('a')
        Tv.id = e.id
        Tv.href = "../Src/TV/TV.html"
        Tv.target = '_blank'
        Tv.setAttribute('onclick', 'saveTVId(this)')
        Tv.className = 'TV'
        Tv.innerHTML =
        `<div class="TVCover">
          <img loading="lazy" alt="Movie Image" src="https://media.themoviedb.org/t/p/w220_and_h330_face${e.poster_path}">
          <span class="TVRiting">
            ${e.vote_average.toFixed(1)}
          </span>
          <div class="TVInfo">
            <p>${e.name.toUpperCase()}</p>
            <small>${e.first_air_date}</small>
          </div>
        </div>`
        TVBG.append(Tv)
      })
    })
    .catch(error => console.log(error))
}

let ID;
function GenderId(e) {
  TVBG.innerHTML = ""
  ID = e.id
  getTVByGender(ID)
  e.classList.add('Active')
  let AllGenderBoxs =
    document.querySelectorAll('.GenderBox')
  AllGenderBoxs.forEach(a => {
    if (a.id !== e.id) {
      a.classList.remove('Active')
    }
  })
}

TVBGBtn.addEventListener('click', () => {
  getTVByGender(ID, count)
  count++
})

function saveTVId(e) {
  let TVid = e.id
  localStorage.setItem("TVid", TVid)
}