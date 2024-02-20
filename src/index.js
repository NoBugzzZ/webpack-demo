import './index.css'
import component from './component'
import 'react'
import 'react-dom'
import { bake } from './shack'

document.body.appendChild(component('hello, webpack'))
bake()
