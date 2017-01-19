var React = require('react')
var ReactDOM = require('react-dom')
import App from './App'
import NoMatch from './NoMatch'
import Layout from './Layout'
import Route from 'react-router/lib/Route'
import Router from 'react-router/lib/Router'
import browserHistory from 'react-router/lib/browserHistory'

import firebase from 'firebase'
require("firebase/database")
const Config = require('Config')
const fbConfig = {
  apiKey: Config.FIREBASE_API_KEY,
  databaseURL: Config.FIREBASE_DATABASE_URL,
}
firebase.initializeApp(fbConfig)
ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <Route path="/:userId/:labelId" name="label" component={App}></Route>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
