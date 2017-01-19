var React = require('react')
import ReactGA from 'react-ga'
import firebase from 'firebase'
import Label from './NutritionEstimate'
import {IngredientModel} from './IngredientModel'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Grid from 'react-bootstrap/lib/Grid'
import Image from 'react-bootstrap/lib/Image'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import instagram from './instagram.svg'
import './App.css'
import NoMatch from './NoMatch'
const Config = require('Config')

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {}
    }
  }
  componentWillMount() {
    const path = '/global/nutritionLabel/' + this.props.params.userId + '/' + this.props.params.labelId
    firebase.database().ref(path).once('value')
    .then(function(dataSnapshot) {
      this.setState({data: dataSnapshot.val()})
    }.bind(this));
    ReactGA.initialize('UA-88850545-2', {
      debug: !Config.DEBUG,
      titleCase: false,
      gaOptions: {
        userId: this.props.params.userId,
      }
    })
  }
  render() {
    if (Object.prototype.hasOwnProperty.call(this.state.data, 'composite')) {
      ReactGA.event({
        category: 'inPhood Nutrition Label',
        action: 'Label Opened',
        label: this.props.params.labelId
      })
      let ingredientData = JSON.parse(this.state.data.composite)
      let ingredient = new IngredientModel()
      ingredient.initializeFromSerialization(ingredientData)
      const user = (this.props.params.userId !== 'anonymous') ? "http://www.instagram.com/" + this.props.params.userId : ''
      const link = (this.props.params.userId !== 'anonymous')
      ? <a href={user}>
        <img src={instagram} className="App-logo" alt="logo" />
        <text className="App-intro">@{this.props.params.userId}</text>
        </a>
      : null
      return (
        <Grid>
          <div className="text-center">
          <Row className="show-grid">
            <Col xs={4} md={4} />
            <Col xs={4} md={4}>
              <Label ingredientComposite={ingredient}/>
              {link}
            </Col>
            <Col xs={4} md={4} />
          </Row>
          </div>
        </Grid>
      )
    }
    return <NoMatch />
  }
}
