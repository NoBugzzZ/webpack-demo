import src from './业务综合分析.png'

async function test(t = '113') {
  console.log(t, '1')
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve('end!!')
    }, 1000)
  }).then((res) => {
    console.log(res)
  })
  console.log('2')
}

export default (text = 'hello webpack') => {
  test()

  console.log(text)
  const el = document.createElement('div')
  el.className = 'rounded bg-red-100 border max-w-md m-4 p-4'
  el.innerHTML = text

  const p = document.createElement('p')
  p.className = 'p'
  p.innerHTML = 'svg'
  el.appendChild(p)

  const img = document.createElement('img')
  img.src = src
  el.appendChild(img)

  const font = document.createElement('p')
  font.className = 'font'
  font.innerHTML = 'hello'
  el.appendChild(font)

  const button = document.createElement('div')
  button.innerHTML = 'click me'
  button.className = 'rounded bg-red-50 border max-w-md m-4 p-4'
  button.onclick = () => {
    import('./lazy')
      .then((lazy) => {
        console.log(lazy)
        button.textContent=lazy.default
      })
      .catch((e) => console.log(e))
  }
  el.appendChild(button)

  return el
}
