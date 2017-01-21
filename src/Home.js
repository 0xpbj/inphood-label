var React = require('react')
import Alert from 'react-bootstrap/lib/Alert'

export default class Home extends React.Component {
  render() {
    return (
      <Alert bsStyle="warning">
        <h4>Missing information for user and label</h4>
        <p>
          Example Label URL: <i>http://www.label.inphood.com/?user=user&label=label</i>
        </p>
      </Alert>
    )
  }
}
