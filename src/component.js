import src from './业务综合分析.png'

export default (text = 'hello webpack') => {
  console.log(text)
  const el = document.createElement('div')
  el.className = 'rounded bg-red-100 border max-w-md m-4 p-4'
  el.innerHTML = text

  const p = document.createElement('p')
  p.className = 'p'
  p.innerHTML = 'svg'
  el.appendChild(p)
  
  const img=document.createElement('img')
  img.src=src
  el.appendChild(img)
  
  const font = document.createElement('p')
  font.className = 'font'
  font.innerHTML = 'hello'
  el.appendChild(font)

  return el
}
