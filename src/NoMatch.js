const React = require('react')
import Alert from 'react-bootstrap/lib/Alert'
import Button from 'react-bootstrap/lib/Button'

export default class NoMatch extends React.Component {
  render() {
    return (
      <Alert bsStyle="danger">
        <h4>Missing information for user and label</h4>
        <p>
          Example Label URL: <i>http://www.label.inphood.com/?user=user&label=label</i>
        </p>
        <p>
          <a href="http://www.inphood.com"><Button bsStyle="danger">Go Home</Button></a>
        </p>
      </Alert>
    )
  }
}