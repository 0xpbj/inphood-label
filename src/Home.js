var React = require('react')
import Alert from 'react-bootstrap/lib/Alert'
import Button from 'react-bootstrap/lib/Button'

export default class Home extends React.Component {
  render() {
    return (
      <Alert bsStyle="warning">
        <h4>Missing information for userid and labelid</h4>
        <p>
          Example Label: <i>https://www.label.inphood.com/userid/labelid</i>
        </p>
      </Alert>
    )
  }
}
