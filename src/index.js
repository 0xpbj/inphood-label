const React = require('react')
const ReactDOM = require('react-dom')
import App from './App'
import Home from './Home'
import Layout from './Layout'
import NoMatch from './NoMatch'
import Route from 'react-router/lib/Route'
import Router from 'react-router/lib/Router'
import IndexRoute from 'react-router/lib/IndexRoute'
import browserHistory from 'react-router/lib/browserHistory'

const Config = require('Config')
const firebase = require('firebase')
const fbConfig = {
  apiKey: Config.FIREBASE_API_KEY,
  databaseURL: Config.FIREBASE_DATABASE_URL,
}
if (firebase.apps.length === 0) {
  firebase.initializeApp(fbConfig)
}

import ReactGA from 'react-ga'
ReactGA.initialize('UA-88850545-3', {
  debug: Config.DEBUG,
  titleCase: false,
  gaOptions: {
    userId: 'labelUser'
  }
})

function fireTracking() {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

ReactDOM.render(
  <Router onUpdate={() => fireTracking()} history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={App}></IndexRoute>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
