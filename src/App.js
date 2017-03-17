const React = require('react')
import ReactGA from 'react-ga'
const firebase = require('firebase')
import Label from './NutritionEstimate'
import {IngredientModel} from './IngredientModel'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Grid from 'react-bootstrap/lib/Grid'
import Alert from 'react-bootstrap/lib/Alert'
import Image from 'react-bootstrap/lib/Image'
import Button from 'react-bootstrap/lib/Button'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import instagram from './instagram.svg'
import './App.css'
import NoMatch from './NoMatch'

const Config = require('Config')

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {},
      error: false,
      embed: false
    }
  }
  componentDidMount() {
    const {user, label} = this.props.location.query
    const path = '/global/nutritionLabel/' + user + '/' + label
    firebase.database().ref(path).once('value')
    .then(function(dataSnapshot) {
      if (dataSnapshot.exists() === false) {
        this.setState({error: true})
      }
      else {
        this.setState({data: dataSnapshot.val()})
      }
    }.bind(this));
  }
  render() {
    if (Object.prototype.hasOwnProperty.call(this.state.data, 'composite')) {
      const {user, label, embed} = this.props.location.query
      ReactGA.initialize('UA-88850545-2', {
        debug: Config.DEBUG,
        titleCase: false,
        gaOptions: {
          user: user,
          label: label
        }
      })
      ReactGA.event({
        category: 'inPhood Nutrition Label',
        action: 'Label Opened',
        label: 'Valid label found',
        nonInteraction: false
      })
      let ingredientData = JSON.parse(this.state.data.composite)
      let ingredient = new IngredientModel()
      ingredient.initializeFromSerialization(ingredientData)
      // const userLink = (user !== 'anonymous') ? "http://www.instagram.com/" + user : ''
      // const link = (user !== 'anonymous')
      // ? <a href={userLink}>
      //   <img src={instagram} className="App-logo" alt="logo" />
      //   <text className="App-intro">@{user}</text>
      //   </a>
      // : null
      const embedUrl = 'http://www.label.inphood.com/?user=' + user + '&label=' + label
      const embedMsg = '<embed src=' + embedUrl + ' height=600 width=400>'
      return (
        <Label
          ingredientComposite={ingredient}
          embed={embed}
          displayGeneratedStatement={true}/>
      )
    }
    else if (this.state.error) {
      ReactGA.initialize('UA-88850545-2', {
        debug: Config.DEBUG,
        titleCase: false,
        gaOptions: {
          user: 'badUser',
          label: 'badLabel'
        }
      })
      ReactGA.event({
        category: 'inPhood Nutrition Label',
        action: 'Error Label',
        label: 'Bad url for label',
        nonInteraction: false
      })
      return <NoMatch />
    }
    else {
      return (
        <Alert bsStyle="info">
          <h4>Label loading...</h4>
        </Alert>
      )
    }
  }
}
