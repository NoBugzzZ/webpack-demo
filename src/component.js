export default (text = 'hello webpack') => {
  console.log(text)
  const el = document.createElement('div')
  el.className = 'rounded bg-red-100 border max-w-md m-4 p-4'
  el.innerHTML = text
  const p = document.createElement('p')
  p.className = 'p'
  p.innerHTML = 'svg'
  el.appendChild(p)
  return el
}
