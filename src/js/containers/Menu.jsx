import React from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

// containers
import ConnectedLink from "./ConnectedLink"
import MenuTrigger from "./MenuTrigger"

// components
import Btn from "../components/Btn"
// import KikiLogoType from "../components/KikiLogoType"
// import HeightTransitionToFull from "../components/HeightTransitionToFull"

class Menu extends React.Component{
  constructor(props){
    super(props)
  }
  render(){

    const { page00, page01, page02 } = this.props.routes

    if (this.props.windowSize === "sm") { // sm
      return (
        <div className="Menu sm">

          <div className="menu-switch">
            <MenuTrigger />
          </div>

          <div
            className={`container ${this.props.mobileMenuContext ? "show" : "hide"}`}
            onClick={this.props.toggleMobileMenu}
            >
            <ul className="link-list">
              <li className="link-list-item"><ConnectedLink to={page00.uri}><Btn><i className="fas fa-bug" />{page00.heading}</Btn></ConnectedLink></li>
              <li className="link-list-item"><ConnectedLink to={page01.uri}><Btn><i className="fab fa-accusoft" />{page01.heading}</Btn></ConnectedLink></li>
              <li className="link-list-item"><ConnectedLink to={page02.uri}><Btn><i className="fas fa-code" />{page02.heading}</Btn></ConnectedLink></li>
            </ul>
          </div>

        </div>
      )
    } else { // over md
      return (
        <div className="Menu md">
          <div className="container-left">MAYLILY</div>
          <div className="container-right">CONTACT</div>
          <div className="container">

            <ul className="link-list">
              <li className="link-list-item"><ConnectedLink to={page00.uri}><Btn>
                <i className="fas fa-bug" />
                {page00.heading}
                </Btn></ConnectedLink></li>
              <li className="link-list-item"><ConnectedLink to={page01.uri}><Btn>
                <i className="fab fa-accusoft" />
                {page01.heading}
                </Btn></ConnectedLink></li>
              <li className="link-list-item"><ConnectedLink to={page02.uri}><Btn>
                <i className="fas fa-code" />
                {page02.heading}
                </Btn></ConnectedLink></li>
            </ul>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  windowSize: state.windowSize,
  mobileMenuContext: state.mobileMenuContext,
  routes: state.routes,
})

import * as action from "../modules/action"
const mapStateToDispatch = dispatch => ({
  toggleMobileMenu: () => dispatch(action.toggleMobileMenu()),
})

export default withRouter(connect(mapStateToProps, mapStateToDispatch)(Menu))
