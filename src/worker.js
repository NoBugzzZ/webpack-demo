self.onmessage = ({ data: { name } }) => {
  setTimeout(() => {
    self.postMessage({ greeting: `hello ${name}` })
  }, 1000)
}
