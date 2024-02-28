import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

function I18N() {
  const [language, setLanguage] = useState('en')
  const [content, setContent] = useState('')

  useEffect(() => {
    translate(language, 'hello')
      .then((data) => setContent(data))
      .catch(console.error)
  }, [language])

  return (
    <div>
      <button
        onClick={() => {
          const temp = language === 'en' ? 'zh' : 'en'
          setLanguage(temp)
        }}
      >
        translate
      </button>
      <p>{content}</p>
    </div>
  )
}

function translate(language, content) {
  return getTranslation(language).then((locale) => locale[content])
}

async function getTranslation(language) {
  return import(`./locale/${language}.json`)
}

const div = document.createElement('div')
document.body.appendChild(div)
ReactDOM.render(<I18N />, div)
