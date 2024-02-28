import src from './业务综合分析.png'
import store from './store'

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

export default (text = ENV) => {
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
        button.textContent = lazy.default
      })
      .catch((e) => console.log(e))
  }
  el.appendChild(button)

  console.log(store)
  const env = document.createElement('p')
  env.innerHTML = store
  el.appendChild(env)

  const req = require.context('./pages', true, /\.json$/)
  console.log(
    req,
    req.keys(),
    req.id,
    req.resolve,
    req.resolve(req.keys()[0]),
    req(req.keys()[0])
  )

  const lang = 'zh'
  import(`./locale/${lang}.json`).then((module) => {
    console.log(module)
  })

  const worker = new Worker(new URL('./worker.js', import.meta.url))
  const webWorkerBtn = document.createElement('button')
  webWorkerBtn.innerHTML = 'web worker'
  webWorkerBtn.onclick = () => {
    worker.postMessage({ name: 'worker' + Math.floor(Math.random() * 100) })
  }
  worker.addEventListener('message', ({ data: { greeting } }) => {
    webWorkerBtn.innerHTML = greeting
  })
  el.appendChild(webWorkerBtn)

  return el
}
