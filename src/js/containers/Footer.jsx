import React from "react"
import { connect } from "react-redux"

// containers
import ConnectedLink from "./ConnectedLink"

// components
import Btn from "../components/Btn"

const Footer = props => {
  const { page00, page01, page02 } = props.routes
  return (
    <footer className="Footer">
      <h1>FOOTER</h1>

      <ul className="link-list">
        <li className="item"><ConnectedLink to={page00.uri}><Btn><i className="fas fa-bug" />{page00.heading}</Btn></ConnectedLink></li>
        <li className="item"><ConnectedLink to={page01.uri}><Btn><i className="fab fa-accusoft" />{page01.heading}</Btn></ConnectedLink></li>
        <li className="item"><ConnectedLink to={page02.uri}><Btn><i className="fas fa-code" />{page02.heading}</Btn></ConnectedLink></li>
      </ul>

    </footer>
  )
}

const mapStateToProps = state => ({
  routes: state.routes,
})

export default connect(mapStateToProps)(Footer)
