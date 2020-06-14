// HMR
if (module.hot) {
  module.hot.accept()
}

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
  firstImg.dataset.img === secImg.dataset.img ? disableImg() : unflipImg()
}

// Disable Img
let disableImg = () => {
  firstImg.removeEventListener(`click`, showImg)
  secImg.removeEventListener(`click`, showImg)

  resetBoard()
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
