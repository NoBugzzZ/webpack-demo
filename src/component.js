export default (text = 'hello webpack') => {
    console.log(text)
    const el = document.createElement('div')
    el.innerHTML = text
    return el
}