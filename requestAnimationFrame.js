// 3s宽度从100到640，增加了540  60帧/s 共180帧 540/180=3，每帧变3px即可

let curWidth = 100
const box = document.querySelector('.box')
const maxWidth = 600

function animate() {
  curWidth += 3
  box.style.width = curWidth + 'px'

  if (curWidth <= 640) {
    setTimeout(animate, 16.67)
  }
}

function animate() {
  curWidth += 3
  box.style.width = curWidth + 'px'
  if (curWidth <= 640) {
    window.requestAnimationFrame(animate)
  }
}

animate()
