// HMR
if (module.hot) {
  module.hot.accept()
}

// Strart Game ================================================
document.querySelector(`.start-game button`).onclick = () => {
  let yourName = prompt(`Your Name?`)
  if (yourName == null || yourName == ``) {
    document.querySelector(`.name`).innerHTML = `Unknown`
  } else {
    document.querySelector(`.name`).innerHTML = yourName
  }

  document.querySelector(`.start-game`).remove()
  document.getElementById(`start`).play()
}

// Varibles ===================================================
let imgs = document.querySelectorAll(`.memory-card`)

let hasShow = false
let lockImg = false
let firstImg, secImg

// Show Img
function showImg() {
  if (lockImg) return
  if (this === firstImg) return
  this.classList.add(`flip`)
  if (!hasShow) {
    // First click
    hasShow = true
    firstImg = this

    return
  }

  // Second click
  secImg = this

  checkMatc()
}

// Chech Match
let checkMatc = () => {
  let tries = document.querySelector(`.tries span`)
  firstImg.dataset.img === secImg.dataset.img ? disableImg() : unflipImg()
  tries.innerHTML = Number(tries.innerHTML) + 1
  document.getElementById(`click-img`).play()
}

// Disable Img
let disableImg = () => {
  firstImg.removeEventListener(`click`, showImg)
  secImg.removeEventListener(`click`, showImg)

  resetBoard()
  document.getElementById(`success`).play()
}

// Unflip Img
let unflipImg = () => {
  lockImg = true
  setTimeout(() => {
    firstImg.classList.remove(`flip`)
    secImg.classList.remove(`flip`)

    resetBoard()
  }, 500)
}

// Reset Board
let resetBoard = () => {
  ;[hasShow, lockImg] = [false, false]
  ;[firstImg, secImg] = [null, null]
}

// Shuffle Imgs
;(function shuffleImgs() {
  imgs.forEach(img => {
    let randomImgs = Math.floor(Math.random() * 20)
    img.style.order = randomImgs
  })
})()

imgs.forEach(img => img.addEventListener(`click`, showImg))
