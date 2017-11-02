import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './utils/registerServiceWorker'
import './main.scss'

ReactDOM.render(<App />, document.getElementById('app'))
registerServiceWorker()
