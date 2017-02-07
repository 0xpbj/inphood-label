var React = require('react')

import Footer from "./Footer"

export default class Layout extends React.Component {
  render() {
    const { location } = this.props
    const containerStyle = {
      marginTop: "60px"
    }
    const {embed} = this.props.location.query
    const footer = embed  === 'true' ? null : <Footer />
    return (
      <div>
        <div className="container" style={containerStyle}>
          <div className="row">
            <div className="col-lg-12">
              {this.props.children}
            </div>
          </div>
          {footer}
        </div>
      </div>
    )
  }
}