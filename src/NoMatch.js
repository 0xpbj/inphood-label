var React = require('react')
import Alert from 'react-bootstrap/lib/Alert'
import Button from 'react-bootstrap/lib/Button'

export default class NoMatch extends React.Component {
  render() {
    return (
      <Alert bsStyle="danger">
        <h4>Oh snap! Label not found!</h4>
        <p>
          <a href="http://www.inphood.com"><Button bsStyle="danger">Go Home</Button></a>
        </p>
      </Alert>
    )
  }
}